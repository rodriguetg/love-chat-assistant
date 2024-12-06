# Chatbot Coach Amoureux - Armony

Un chatbot intelligent spécialisé dans les conseils en relations amoureuses, développé avec Flask et SQLite.

## Équipe de développement
Projet réalisé dans le cadre du Master Brand Content et Management à PEM (Paris École de Management) par :
- **Rodrigue GBADOU**
- **Loana LAMBERT**
- **Louise MAKIALA MATOMA**
- **Farah Mélissa AHMED**
- **Inès DAOUDI**
- **Aurélien YOMI**

## Présentation du projet
Armony est un assistant virtuel innovant qui utilise l'intelligence artificielle pour offrir des conseils personnalisés en matière de relations amoureuses. Notre objectif est de combiner technologie moderne et psychologie relationnelle pour aider les gens à mieux comprendre et gérer leurs relations.

## Fonctionnalités actuelles

### 1. Conseils personnalisés
- **Gestion des paiements**
  - Conseils sur qui doit payer
  - Comment partager l'addition
  - Gestion des situations délicates

- **Gestion du temps**
  - Gestion de la disponibilité
  - Fréquence des rencontres
  - Équilibre vie personnelle/relation

- **Conseils comportementaux**
  - Guide pour le premier rendez-vous
  - Reconnaissance des signes d'intérêt
  - Gestion du désintérêt

### 2. Fonctionnalités techniques
- Interface web interactive
- Stockage des conversations dans SQLite
- Système de clarification des questions

## Installation

1. Installer les dépendances :
```bash
pip install -r requirements.txt
```

2. Lancer l'application :
```bash
python app.py
```

## Structure du projet
```
chatbot amoureux/
├── app.py              # Application Flask principale
├── chatbot_logic.py    # Logique du chatbot
├── knowledge_base.py   # Base de connaissances
├── ai_model.py         # Modèle AI
├── requirements.txt    # Dépendances
├── static/            # Fichiers statiques
├── templates/         # Templates HTML
└── conversations.db   # Base de données SQLite
```

## À implémenter

1. **Améliorations prioritaires**
   - [ ] Enrichissement de la base de connaissances
   - [ ] Système d'apprentissage continu
   - [ ] Gestion des profils utilisateurs

2. **Fonctionnalités futures**
   - [ ] Analyse des émotions
   - [ ] Conseils personnalisés basés sur l'historique
   - [ ] Support multilingue
   - [ ] API pour intégration externe

## État actuel du développement
- ✅ Structure de base
- ✅ Système de réponse basique
- ✅ Stockage des conversations
- ✅ Interface utilisateur avancée
  - Design moderne avec thème rose/blanc
  - Animations de particules de cœurs
  - Suggestions de questions interactives
  - Interface responsive et adaptative
  - Indicateur de frappe amélioré
- ❌ Système d'apprentissage
- ❌ Gestion des profils

## Dernières mises à jour
### Interface utilisateur (v2.1)
- **Message d'accueil personnalisé**
  - Présentation complète de l'équipe
  - Description détaillée des fonctionnalités
  - Ton professionnel et empathique

- **Améliorations visuelles**
  - Logo animé avec effet flottant
  - Titre avec animation de gradient
  - Effets de particules optimisés

- **Optimisations UX**
  - Meilleur formatage des messages
  - Présentation claire des conseils
  - Interface plus engageante
