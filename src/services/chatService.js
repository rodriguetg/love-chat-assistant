import { faker } from '@faker-js/faker'

// Base de connaissances pour les réponses du chatbot
const responses = {
  greeting: [
    "Bonjour ! 💕 Je suis ravie de vous parler aujourd'hui. Comment puis-je vous aider avec vos questions amoureuses ?",
    "Salut ! 😊 Je suis là pour vous accompagner dans vos relations. Que puis-je faire pour vous ?",
    "Hello ! 💖 Votre conseillère Armony est à votre écoute. Partagez-moi ce qui vous préoccupe."
  ],
  
  love_advice: [
    "L'amour véritable commence par l'amour de soi. 💕 Prenez le temps de vous connaître et de vous apprécier avant de chercher quelqu'un d'autre.",
    "Pour trouver l'amour, soyez authentique ! 🌟 Les bonnes personnes vous aimeront pour qui vous êtes vraiment.",
    "L'amour se trouve souvent quand on s'y attend le moins. 💫 Concentrez-vous sur votre bonheur personnel et restez ouvert aux opportunités."
  ],
  
  first_date: [
    "Pour un premier rendez-vous réussi : soyez vous-même, écoutez attentivement et posez des questions ouvertes. 💕",
    "Les premiers rendez-vous sont stressants, c'est normal ! 😊 Choisissez un lieu où vous vous sentez à l'aise et détendez-vous.",
    "Conseil premier rendez-vous : arrivez à l'heure, éteignez votre téléphone et montrez un véritable intérêt pour votre partenaire. ✨"
  ],
  
  breakup: [
    "Une rupture est douloureuse mais c'est aussi une opportunité de grandir. 💪 Prenez le temps de guérir avant de vous relancer.",
    "Après une rupture, entourez-vous de personnes qui vous aiment et pratiquez l'auto-compassion. 💕 Vous méritez le bonheur.",
    "Les ruptures font partie de la vie amoureuse. 🌈 Chaque relation nous apprend quelque chose d'important sur nous-mêmes."
  ],
  
  communication: [
    "La communication est la clé ! 🗝️ Exprimez vos sentiments clairement et écoutez sans juger.",
    "Dans une relation, il faut savoir parler mais aussi savoir écouter. 👂 Créez un espace sûr pour le dialogue.",
    "Les malentendus arrivent à tout le monde. 💬 L'important est de clarifier rapidement et avec bienveillance."
  ],
  
  confidence: [
    "La confiance en soi s'acquiert petit à petit. 🌱 Célébrez vos petites victoires et soyez patient avec vous-même.",
    "Vous êtes unique et merveilleux ! ⭐ Travaillez sur vos qualités et acceptez vos imperfections.",
    "Pour gagner en confiance : sortez de votre zone de confort progressivement et entourez-vous de personnes positives. 💪"
  ],
  
  default: [
    "C'est une question très intéressante ! 💭 Pouvez-vous me donner plus de détails pour que je puisse mieux vous conseiller ?",
    "Je comprends votre préoccupation. 💕 En amour, chaque situation est unique. Parlez-moi plus de votre contexte.",
    "Merci de me faire confiance ! 😊 Pour vous donner le meilleur conseil, j'aimerais en savoir plus sur votre situation."
  ]
}

// Fonction pour analyser le message et déterminer la catégorie
const analyzeMessage = (message) => {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
    return 'greeting'
  }
  
  if (lowerMessage.includes('trouver l\'amour') || lowerMessage.includes('rencontrer quelqu\'un') || lowerMessage.includes('célibataire')) {
    return 'love_advice'
  }
  
  if (lowerMessage.includes('premier rendez-vous') || lowerMessage.includes('premier date') || lowerMessage.includes('première rencontre')) {
    return 'first_date'
  }
  
  if (lowerMessage.includes('rupture') || lowerMessage.includes('séparation') || lowerMessage.includes('ex') || lowerMessage.includes('quitter')) {
    return 'breakup'
  }
  
  if (lowerMessage.includes('communication') || lowerMessage.includes('parler') || lowerMessage.includes('dispute') || lowerMessage.includes('comprend pas')) {
    return 'communication'
  }
  
  if (lowerMessage.includes('confiance') || lowerMessage.includes('timide') || lowerMessage.includes('complexe') || lowerMessage.includes('estime de soi')) {
    return 'confidence'
  }
  
  return 'default'
}

// Fonction pour personnaliser la réponse
const personalizeResponse = (baseResponse, userMessage) => {
  // Ajouter quelques variations personnalisées basées sur le message
  const personalizations = [
    `\n\nJ'espère que ces conseils vous aideront ! N'hésitez pas si vous avez d'autres questions. 💕`,
    `\n\nSouvenez-vous que chaque histoire d'amour est unique. Faites-vous confiance ! ✨`,
    `\n\nVous êtes sur la bonne voie ! L'amour demande du temps et de la patience. 🌸`,
    `\n\nJe suis là pour vous accompagner dans ce beau parcours amoureux ! 💖`
  ]
  
  const randomPersonalization = personalizations[Math.floor(Math.random() * personalizations.length)]
  return baseResponse + randomPersonalization
}

// Fonction principale pour générer une réponse
export const generateBotResponse = (userMessage) => {
  const category = analyzeMessage(userMessage)
  const categoryResponses = responses[category]
  const baseResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  
  return personalizeResponse(baseResponse, userMessage)
}

// Fonction pour obtenir des suggestions contextuelles
export const getContextualSuggestions = (conversationHistory) => {
  const allSuggestions = [
    "Comment trouver l'amour ?",
    "Conseils pour le premier rendez-vous",
    "Comment gérer une rupture ?",
    "J'ai des problèmes de communication",
    "Je manque de confiance en moi",
    "Mon partenaire ne me comprend pas",
    "Comment savoir si c'est la bonne personne ?",
    "Gérer la jalousie dans le couple",
    "Reconstruire après une trahison",
    "L'amour à distance, ça marche ?"
  ]
  
  // Pour l'instant, retourner un échantillon aléatoire
  return faker.helpers.arrayElements(allSuggestions, 4)
}
