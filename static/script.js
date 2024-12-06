document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');

    // Gérer l'envoi avec la touche Entrée
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Focus automatique sur l'input
    userInput.focus();
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = userInput.value.trim();

    if (message === '') return;

    // Ajouter le message de l'utilisateur
    addMessage('user', message);
    userInput.value = '';

    // Afficher l'indicateur de frappe
    showTypingIndicator();

    // Envoyer la requête au serveur
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        // Cacher l'indicateur de frappe
        hideTypingIndicator();
        // Ajouter la réponse du bot
        addMessage('bot', data.response);
    })
    .catch(error => {
        console.error('Error:', error);
        hideTypingIndicator();
        addMessage('bot', "Désolé, j'ai rencontré une erreur. Pouvez-vous reformuler votre question ?");
    });
}

function addMessage(type, content) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${type}-message`);
    
    // Formater le contenu avec des sauts de ligne
    const formattedContent = content.replace(/\n/g, '<br>');
    messageDiv.innerHTML = formattedContent;

    chatMessages.appendChild(messageDiv);
    
    // Animation d'apparition
    requestAnimationFrame(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    });

    // Scroll automatique vers le bas
    smoothScrollToBottom(chatMessages);
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typing-indicator';
    
    // Ajouter les points d'animation
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingDiv.appendChild(dot);
    }
    
    chatMessages.appendChild(typingDiv);
    smoothScrollToBottom(chatMessages);
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function smoothScrollToBottom(element) {
    const start = element.scrollTop;
    const end = element.scrollHeight - element.clientHeight;
    const duration = 300; // ms
    const startTime = performance.now();

    function scroll(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Fonction d'easing
        const easeOutCubic = progress => 1 - Math.pow(1 - progress, 3);
        
        element.scrollTop = start + (end - start) * easeOutCubic(progress);

        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }

    requestAnimationFrame(scroll);
}

// Gestion des erreurs globales
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    return false;
};
