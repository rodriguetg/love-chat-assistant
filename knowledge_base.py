import random

# Catégories de questions et réponses
KNOWLEDGE_BASE = {
    "relation": {
        "patterns": [
            "relation", "couple", "petit ami", "petite amie", "conjoint",
            "mariage", "marié", "mariée", "amour", "aimer"
        ],
        "responses": [
            "Une relation saine est basée sur la communication, le respect mutuel et la confiance. Prenez le temps d'écouter votre partenaire et d'exprimer vos sentiments.",
            "La clé d'une relation durable est de maintenir l'équilibre entre l'indépendance personnelle et le partage de moments ensemble.",
            "N'oubliez pas que chaque relation est unique. Ce qui fonctionne pour les autres peut ne pas fonctionner pour vous.",
            "La communication ouverte et honnête est essentielle pour résoudre les conflits dans une relation."
        ]
    },
    "rupture": {
        "patterns": [
            "rupture", "séparation", "break", "quitter", "abandonner",
            "divorce", "ex", "ancien", "ancienne"
        ],
        "responses": [
            "Une rupture est toujours difficile. Prenez le temps de vous concentrer sur vous-même et votre bien-être.",
            "Cette période difficile est aussi une opportunité de croissance personnelle. Utilisez ce temps pour réfléchir et apprendre.",
            "N'hésitez pas à vous entourer de vos amis et votre famille pendant cette période.",
            "Chaque fin est un nouveau début. Prenez soin de vous et restez positif pour l'avenir."
        ]
    },
    "rencontre": {
        "patterns": [
            "rencontre", "dating", "rendez-vous", "premier", "première",
            "draguer", "séduire", "attirer", "plaire"
        ],
        "responses": [
            "Soyez authentique lors des rencontres. C'est la meilleure façon d'établir une connexion sincère.",
            "Concentrez-vous sur la création d'une conversation intéressante plutôt que sur l'impression que vous donnez.",
            "Les activités partagées sont un excellent moyen de briser la glace lors d'une première rencontre.",
            "N'oubliez pas que la confiance en soi est attractive. Soyez vous-même !"
        ]
    },
    "confiance": {
        "patterns": [
            "confiance", "doute", "jalousie", "jaloux", "jalouse",
            "tromper", "infidélité", "méfiance"
        ],
        "responses": [
            "La confiance se construit progressivement. Prenez le temps nécessaire pour l'établir solidement.",
            "La jalousie excessive peut endommager une relation. Communiquez ouvertement avec votre partenaire sur vos inquiétudes.",
            "La confiance en soi est la base d'une relation saine. Travaillez d'abord sur votre propre estime de soi.",
            "Si vous avez des doutes, parlez-en calmement avec votre partenaire plutôt que de faire des suppositions."
        ]
    },
    "communication": {
        "patterns": [
            "communication", "parler", "discuter", "exprimer", "dire",
            "conversation", "dialogue", "écouter"
        ],
        "responses": [
            "Une bonne communication implique autant d'écoute que de parole. Soyez attentif aux besoins de votre partenaire.",
            "Choisissez le bon moment pour les discussions importantes. Évitez les conversations sérieuses quand l'un de vous est fatigué ou stressé.",
            "Exprimez vos sentiments sans accuser. Utilisez des phrases commençant par 'je ressens' plutôt que 'tu fais'.",
            "La communication non-verbale est aussi importante. Soyez attentif au langage corporel."
        ]
    }
}

def get_response(message):
    """
    Analyse le message de l'utilisateur et retourne une réponse appropriée
    """
    message = message.lower()
    
    # Cherche la catégorie la plus pertinente
    best_category = None
    max_matches = 0
    
    for category, data in KNOWLEDGE_BASE.items():
        matches = sum(1 for pattern in data["patterns"] if pattern in message)
        if matches > max_matches:
            max_matches = matches
            best_category = category
    
    # Si aucune catégorie ne correspond, utilise une réponse générique
    if best_category is None or max_matches == 0:
        return random.choice([
            "Je comprends votre situation. Pouvez-vous m'en dire plus ?",
            "C'est une question intéressante. Pouvez-vous préciser votre pensée ?",
            "Chaque situation est unique. Parlez-moi plus en détail de la vôtre.",
            "Je suis là pour vous aider. Que ressentez-vous exactement ?"
        ])
    
    # Retourne une réponse aléatoire de la catégorie correspondante
    return random.choice(KNOWLEDGE_BASE[best_category]["responses"])
