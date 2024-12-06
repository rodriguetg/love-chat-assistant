import requests

class AIService:
    def __init__(self):
        self.api_key = "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"
        self.api_url = "https://openrouter.ai/api/v1/chat/completions"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5000",
            "X-Title": "Armony Love Coach"
        }

    def get_completion(self, user_message, conversation_history=None):
        if conversation_history is None:
            conversation_history = []

        messages = [
            {"role": "system", "content": """Je suis Armony, un assistant virtuel créé par une équipe d'étudiants en Master Brand Content et Management à PEM (Paris École de Management).

Notre équipe est composée de :
• Rodrigue GBADOU
• Loana LAMBERT
• Louise MAKIALA MATOMA
• Farah Mélissa AHMED
• Inès DAOUDI
• Aurélien YOMI

Ce projet innovant, développé dans le cadre de notre formation, utilise l'intelligence artificielle pour offrir des conseils personnalisés en matière de relations amoureuses. Notre objectif est de combiner technologie moderne et psychologie relationnelle pour aider les gens à mieux comprendre et gérer leurs relations.

En tant que conseillère en relations amoureuses empathique et bienveillante, je donne des conseils personnalisés 
et réfléchis sur les relations, l'amour et le développement personnel. Je peux vous aider sur divers sujets comme :
• La communication dans le couple
• La gestion des conflits
• Le développement de la confiance
• Les premiers rendez-vous
• Et bien d'autres aspects des relations amoureuses

Mon objectif est d'aider les gens à avoir des relations saines et épanouissantes.
J'utilise un ton amical mais professionnel, et base mes conseils sur la psychologie des relations et le respect mutuel.
Je réponds toujours en français et adapte mon langage pour être accessible et compréhensible."""}
        ]

        # Ajouter l'historique de conversation (limité aux 5 derniers messages)
        for msg in conversation_history[-5:]:
            messages.append({"role": msg["role"], "content": msg["content"]})

        try:
            response = requests.post(
                self.api_url,
                headers=self.headers,
                json={
                    "model": "mistralai/mistral-7b-instruct",
                    "messages": messages,
                    "temperature": 0.7,
                    "max_tokens": 1000
                },
                timeout=30
            )
            
            if response.status_code != 200:
                print(f"Erreur API: Status {response.status_code}")
                print(f"Réponse: {response.text}")
                return "Désolée, j'ai rencontré une erreur technique. Pouvez-vous reformuler votre question ?"

            result = response.json()
            if 'choices' in result and len(result['choices']) > 0:
                if 'message' in result['choices'][0]:
                    return result['choices'][0]['message']['content'].strip()
            
            print(f"Réponse API inattendue: {result}")
            return "Je n'ai pas bien compris votre question. Pouvez-vous la reformuler différemment ?"

        except requests.exceptions.Timeout:
            print("Timeout de la requête API")
            return "Désolée, la réponse prend trop de temps. Pouvez-vous réessayer ?"
        except Exception as e:
            print(f"Erreur lors de l'appel à l'API: {str(e)}")
            return "Une erreur s'est produite. Pouvez-vous reformuler votre question ?"
