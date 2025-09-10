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

---

## Version React Moderne

Cette version est une refonte complète de l'interface en utilisant React, TailwindCSS et Framer Motion, avec une intégration d'IA multi-fournisseurs.

### Installation & Lancement (Version React)

1.  **Installer les dépendances :**
    ```bash
    npm install
    ```

2.  **Configurer l'IA (Obligatoire) :**

    *   **Créez un fichier `.env`** à la racine du projet en copiant le contenu de `.env.example`.
    *   **Choisissez votre fournisseur d'IA :** Dans `.env`, modifiez la variable `VITE_AI_PROVIDER` pour choisir le service que vous voulez utiliser.
        *   `"huggingface"` (Recommandé pour commencer)
        *   `"openrouter"` (Accès à de nombreux modèles, y compris des gratuits)
        *   `"gemini"` (API de Google)
        *   `"deepseek"`
    *   **Ajoutez votre clé API :**
        *   **Hugging Face:** Créez un compte sur [Hugging Face](https://huggingface.co/join) et un [jeton d'accès (Access Token)](https://huggingface.co/settings/tokens) avec le rôle `read`. Collez-le dans `VITE_HUGGINGFACE_API_KEY`.
        *   **OpenRouter:** Obtenez votre clé sur [OpenRouter Keys](https://openrouter.ai/keys) et collez-la dans `VITE_OPENROUTER_API_KEY`.
        *   **Google Gemini:** Obtenez votre clé sur [Google AI Studio](https://aistudio.google.com/app/apikey) et collez-la dans `VITE_GEMINI_API_KEY`.
        *   **DeepSeek:** Obtenez votre clé sur [DeepSeek Platform](https://platform.deepseek.com/api_keys) et collez-la dans `VITE_DEEPSEEK_API_KEY`.

3.  **Lancer l'application :**
    ```bash
    npm run dev
    ```

### Fonctionnalités de la version React
- ✅ Interface utilisateur moderne et responsive
- ✅ Animations fluides et micro-interactions
- ✅ **Multi-fournisseurs d'IA :** Intégration flexible de Hugging Face, OpenRouter, Gemini et DeepSeek.
- ✅ Persona et périmètre de conversation contrôlés par un prompt système
- ✅ Architecture modulaire et maintenable avec React

---

## Ancien projet (Python/Flask)

### Fonctionnalités actuelles

- **Conseils personnalisés**
- **Gestion des paiements**
- **Gestion du temps**
- **Conseils comportementaux**

### Installation

1. Installer les dépendances :
```bash
pip install -r requirements.txt
```

2. Lancer l'application :
```bash
python app.py
```
