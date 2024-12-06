// Initialisation de Socket.IO
const socket = io();

// Éléments du DOM
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const voiceButton = document.getElementById('voice-button');
const chatContainer = document.getElementById('chat-container');
const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');

// État de l'application
let isRecording = false;
let currentLanguage = 'fr';

// Gestionnaire d'envoi de message
function sendMessage(message, isVoice = false) {
    if (!message.trim()) return;

    // Afficher le message de l'utilisateur
    appendMessage('user', message);

    // Envoyer au serveur
    socket.emit('message', {
        content: message,
        isVoice: isVoice,
        language: currentLanguage
    });

    // Vider l'input
    messageInput.value = '';
}

// Afficher un message dans le chat
function appendMessage(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
    
    // Formater le message avec des retours à la ligne (seulement pour les messages du bot)
    if (sender !== 'user') {
        // Ajouter un retour à la ligne après les salutations
        content = content.replace(/(Cher ami\/amie,|Bonjour,|Salut,)/, '$1\n\n');
        
        // Ajouter un retour à la ligne après l'introduction
        content = content.replace(/([.!?]) ([A-Z])/g, '$1\n\n$2');
        
        // Ajouter des retours à la ligne pour les points numérotés
        content = content.replace(/(\d+)\. /g, '\n\n$1. ');
        
        // Ajouter des retours à la ligne pour les tirets
        content = content.replace(/- /g, '\n- ');
        
        // Ajouter un retour à la ligne avant la conclusion (phrases commençant par "J'espère", "En espérant", etc.)
        content = content.replace(/(J'espère|En espérant|Pour conclure|Enfin)/g, '\n\n$1');
    }
    
    // Convertir les retours à la ligne en balises <br>
    messageDiv.innerHTML = content.replace(/\n/g, '<br>');
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Gestion de l'enregistrement vocal
function toggleVoiceRecording() {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
    isRecording = !isRecording;
    voiceButton.classList.toggle('recording');
}

// Démarrer l'enregistrement
function startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            let audioChunks = [];

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks);
                sendVoiceMessage(audioBlob);
            });

            mediaRecorder.start();
            setTimeout(() => mediaRecorder.stop(), 5000); // Arrêt après 5 secondes
        });
}

// Envoyer un message vocal
function sendVoiceMessage(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    
    fetch('/process-voice', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(text => {
        sendMessage(text, true);
    });
}

// Gestion du thème sombre/clair
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Gestion des émojis
function initEmojiPicker() {
    const picker = new EmojiButton();
    const emojiButton = document.getElementById('emoji-button');

    picker.on('emoji', emoji => {
        messageInput.value += emoji;
    });

    emojiButton.addEventListener('click', () => {
        picker.togglePicker(emojiButton);
    });
}

// Écouteurs d'événements
sendButton.addEventListener('click', () => sendMessage(messageInput.value));
voiceButton.addEventListener('click', toggleVoiceRecording);
themeToggle.addEventListener('click', toggleTheme);
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage(messageInput.value);
    }
});

// Réception des messages du serveur
socket.on('response', (data) => {
    appendMessage('bot', data.message);
    
    // Lecture vocale si activée
    if (data.audio_url) {
        const audio = new Audio(data.audio_url);
        audio.play();
    }
});

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Restaurer le thème
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    initEmojiPicker();
});
