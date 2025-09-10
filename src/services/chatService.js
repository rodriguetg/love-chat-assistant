// --- Récupération des variables d'environnement ---
const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'huggingface';
const HUGGINGFACE_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const DEEPSEEK_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

// --- Prompt Système Universel ---
const systemPrompt = `You are Armony, a kind, empathetic, and expert love coach. Your name, Armony, is a blend of "amour" (love) and "harmony".

Your ONLY purpose is to provide advice and guidance on topics related to love, romance, relationships, dating, heartbreak, and building self-confidence in the context of relationships.

**Strict Rules:**
1.  **Stay On Topic:** You MUST ONLY answer questions about love and relationships.
2.  **Decline Off-Topic Questions:** If a user asks about anything else (e.g., programming, math, science, politics, history), you MUST politely decline. Gently redirect the conversation back to love.
    - **Example Refusal:** "That's an interesting question, but my expertise is focused on matters of the heart! 💕 How can I help you navigate your love life today?"
3.  **Maintain Your Persona:** Always be warm, supportive, and understanding. Use emojis like 💕, 💖, ✨, 😊, 🤗 to create a friendly and safe atmosphere.
4.  **Provide Actionable Advice:** Give thoughtful, practical, and constructive advice. Avoid generic or cliché answers.
5.  **Keep it Conversational:** Write in a natural, easy-to-understand way. Use paragraphs and line breaks for readability.`;

// --- Fonctions d'aide pour formater les conversations ---

const formatForOpenAI = (history) => {
  return [
    { role: 'system', content: systemPrompt },
    ...history.slice(-10).map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.content
    }))
  ];
};

const formatForHuggingFace = (history) => {
  const conversationString = history
    .slice(-8)
    .map(msg => (msg.isUser ? `[INST] ${msg.content} [/INST]` : msg.content))
    .join('\n');
  return `${systemPrompt}\n\n${conversationString}`;
};

const formatForGemini = (history) => {
    const formattedHistory = history.slice(-10).map(msg => ({
        role: msg.isUser ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));
    return [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: "Yes, I understand. I am Armony, the love coach. I will only discuss topics related to love and relationships. How can I help?" }] },
        ...formattedHistory
    ];
};


// --- Fonctions spécifiques à chaque API ---

const generateHuggingFaceResponse = async (history) => {
  if (!HUGGINGFACE_KEY || HUGGINGFACE_KEY === 'YOUR_API_KEY') return "Clé API Hugging Face non configurée. Veuillez l'ajouter à votre fichier .env.";
  const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${HUGGINGFACE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      inputs: formatForHuggingFace(history),
      parameters: { return_full_text: false, max_new_tokens: 300, temperature: 0.7 }
    })
  });
  if (!response.ok) throw new Error(`Hugging Face API error: ${response.statusText}`);
  const data = await response.json();
  return data[0]?.generated_text?.trim();
};

const generateOpenRouterResponse = async (history) => {
  if (!OPENROUTER_KEY || OPENROUTER_KEY === 'YOUR_API_KEY') return "Clé API OpenRouter non configurée. Veuillez l'ajouter à votre fichier .env.";
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173', // Requis par OpenRouter
      'X-Title': 'Armony Love Coach' // Requis par OpenRouter
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct-free", // Modèle gratuit
      messages: formatForOpenAI(history)
    })
  });
  if (!response.ok) throw new Error(`OpenRouter API error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0]?.message?.content?.trim();
};

const generateGeminiResponse = async (history) => {
    if (!GEMINI_KEY || GEMINI_KEY === 'YOUR_API_KEY') return "Clé API Gemini non configurée. Veuillez l'ajouter à votre fichier .env.";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_KEY}`;
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: formatForGemini(history),
            generationConfig: {
                temperature: 0.8,
                topP: 0.95,
                maxOutputTokens: 300,
            },
            safetySettings: [ // Configuration de sécurité pour autoriser les discussions sur les relations
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            ],
        })
    });
    if (!response.ok) throw new Error(`Gemini API error: ${response.statusText}`);
    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text?.trim();
};

const generateDeepSeekResponse = async (history) => {
  if (!DEEPSEEK_KEY || DEEPSEEK_KEY === 'YOUR_API_KEY') return "Clé API DeepSeek non configurée. Veuillez l'ajouter à votre fichier .env.";
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${DEEPSEEK_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: formatForOpenAI(history),
      temperature: 0.7,
    })
  });
  if (!response.ok) throw new Error(`DeepSeek API error: ${response.statusText}`);
  const data = await response.json();
  return data.choices[0]?.message?.content?.trim();
};


// --- Dispatcher Principal ---
const apiProviders = {
  huggingface: generateHuggingFaceResponse,
  openrouter: generateOpenRouterResponse,
  gemini: generateGeminiResponse,
  deepseek: generateDeepSeekResponse,
};

export const generateBotResponse = async (userMessage, conversationHistory) => {
  const providerFunction = apiProviders[AI_PROVIDER] || apiProviders.huggingface;
  
  try {
    const botText = await providerFunction(conversationHistory);
    if (!botText) {
        throw new Error("La réponse de l'API est vide ou dans un format inattendu.");
    }
    return botText;
  } catch (error) {
    console.error(`Failed to fetch bot response from ${AI_PROVIDER}:`, error);
    return `Oh là là ! On dirait que j'ai un petit bug d'amour. 💔 Mon cerveau IA (via ${AI_PROVIDER}) est momentanément indisponible. Cela peut être dû à une clé API invalide ou à une surcharge du service. Veuillez vérifier votre configuration .env et réessayer.`;
  }
};
