import random
from datetime import datetime
import re
import json
import os
from ai_service import AIService

class LoveCoach:
    def __init__(self):
        self.conversation_history = []
        self.history_file = 'conversations.json'
        self.ai_service = AIService()
        
        self.knowledge_base = {
            'paiement': {
                'qui_paye': "Pour le paiement du rendez-vous :\n- Si vous avez invité, proposez de payer\n- Si elle insiste pour partager, acceptez poliment\n- Évitez d'en faire un sujet de discussion",
                'partager': "Pour partager l'addition :\n- Proposez simplement : 'On partage ?'\n- Ou suggérez : 'Je prends cette fois, tu prendras la prochaine ?'\n- Restez décontracté sur ce sujet",
                'budget': "Pour gérer le budget des rendez-vous :\n- Privilégiez la qualité du moment à la dépense\n- Soyez créatif (pique-nique, activités gratuites)\n- Communiquez ouvertement si vous avez des contraintes budgétaires"
            },
            'temps': {
                'pas_disponible': "Si elle n'est pas disponible :\n- Demandez-lui quand elle serait libre\n- Proposez 2-3 autres créneaux\n- Si elle refuse sans alternative, prenez du recul",
                'trop_de_temps': "Si elle demande trop de temps :\n- Exprimez vos besoins calmement\n- Trouvez un compromis qui convient aux deux\n- Gardez aussi du temps pour vous",
                'frequence': "Pour la fréquence des rencontres :\n- Discutez ouvertement de vos attentes\n- Trouvez un rythme qui convient aux deux\n- Respectez ses obligations",
                'distance': "Pour gérer une relation à distance :\n- Planifiez des appels vidéo réguliers\n- Gardez des activités communes même à distance\n- Prévoyez les prochaines retrouvailles"
            },
            'comportement': {
                'premier_rdv': "Pour le premier rendez-vous :\n- Soyez ponctuel\n- Restez naturel\n- Écoutez activement",
                'signes_interet': "Les signes d'intérêt à repérer :\n- Elle maintient le contact visuel\n- Elle pose des questions personnelles\n- Elle propose des projets futurs",
                'desinteret': "Les signes de désintérêt :\n- Réponses courtes\n- Peu disponible\n- Pas de contre-propositions",
                'langage_corporel': "Le langage corporel à observer :\n- L'orientation du corps vers vous\n- Les sourires et rires naturels\n- Les petits contacts physiques"
            },
            'communication': {
                'sujets_conversation': "Sujets de conversation recommandés :\n- Passions et hobbies\n- Projets et aspirations\n- Expériences de vie marquantes\n- Évitez les sujets sensibles au premier rendez-vous",
                'ecoute_active': "Pratiquer l'écoute active :\n- Posez des questions pertinentes\n- Reformulez pour montrer votre compréhension\n- Montrez de l'intérêt sincère",
                'conflits': "Gérer les désaccords :\n- Restez calme et respectueux\n- Exprimez vos sentiments sans accuser\n- Cherchez des solutions ensemble"
            },
            'progression': {
                'rythme': "Respecter le rythme de la relation :\n- Ne précipitez pas les choses\n- Soyez attentif aux signaux de l'autre\n- Communiquez vos attentes",
                'engagement': "Parler d'engagement :\n- Choisissez le bon moment\n- Soyez honnête sur vos intentions\n- Respectez sa réponse",
                'intimite': "Développer l'intimité :\n- Créez des moments de qualité\n- Partagez progressivement\n- Respectez les limites de chacun"
            }
        }

    def get_response(self, user_input):
        # D'abord, essayons d'obtenir une réponse de la base de connaissances
        question_type = self._analyze_question(user_input.lower())
        
        if question_type:
            # Si nous avons une réponse dans notre base de connaissances, utilisons-la
            response = self.knowledge_base[question_type[0]][question_type[1]]
        else:
            # Sinon, utilisons l'API OpenRouter pour une réponse plus personnalisée
            response = self.ai_service.get_completion(user_input, self.conversation_history)
        
        # Sauvegarder la conversation
        self._save_conversation(user_input, response)
        self.conversation_history.append({"role": "user", "content": user_input})
        self.conversation_history.append({"role": "assistant", "content": response})
        
        # Garder l'historique limité pour éviter d'utiliser trop de tokens
        if len(self.conversation_history) > 10:
            self.conversation_history = self.conversation_history[-10:]
        
        return response

    def _analyze_question(self, user_input):
        # Paiement
        if any(word in user_input for word in ['payer', 'addition', 'facture']):
            if 'partager' in user_input:
                return ('paiement', 'partager')
            if 'budget' in user_input:
                return ('paiement', 'budget')
            return ('paiement', 'qui_paye')

        # Temps
        if 'temps' in user_input or 'disponible' in user_input:
            if 'pas' in user_input and 'disponible' in user_input:
                return ('temps', 'pas_disponible')
            if 'trop' in user_input:
                return ('temps', 'trop_de_temps')
            if 'distance' in user_input:
                return ('temps', 'distance')
            return ('temps', 'frequence')

        # Comportement
        if 'premier' in user_input and ('rendez' in user_input or 'rdv' in user_input):
            return ('comportement', 'premier_rdv')
        if 'intéressé' in user_input or 'signe' in user_input:
            return ('comportement', 'signes_interet')
        if 'plus' in user_input and ('intéressé' in user_input or 'répond' in user_input):
            return ('comportement', 'desinteret')
        if 'langage' in user_input and 'corporel' in user_input:
            return ('comportement', 'langage_corporel')

        # Communication
        if 'sujet' in user_input and 'conversation' in user_input:
            return ('communication', 'sujets_conversation')
        if 'écoute' in user_input and 'active' in user_input:
            return ('communication', 'ecoute_active')
        if 'conflit' in user_input:
            return ('communication', 'conflits')

        # Progression
        if 'rythme' in user_input and 'relation' in user_input:
            return ('progression', 'rythme')
        if 'engagement' in user_input:
            return ('progression', 'engagement')
        if 'intimité' in user_input:
            return ('progression', 'intimite')

        return None

    def _ask_for_clarification(self, user_input):
        # Questions de clarification ciblées
        if 'temps' in user_input or 'disponible' in user_input:
            return "Concernant le temps, que souhaitez-vous savoir exactement ?\n- La fréquence des rencontres ?\n- Que faire si elle n'est pas disponible ?\n- Comment gérer son emploi du temps ?"
            
        if 'payer' in user_input or 'argent' in user_input:
            return "Pour l'aspect financier, précisez votre question :\n- Qui doit payer ?\n- Comment proposer de partager ?\n- Comment aborder le sujet ?"
            
        if 'rendez' in user_input or 'rdv' in user_input:
            return "Pour le rendez-vous, que voulez-vous savoir ?\n- Comment se comporter ?\n- Quels sujets aborder ?\n- Comment gérer la suite ?"
            
        return "Quelle est votre question précise ? Je peux vous conseiller sur :\n- Le paiement\n- La gestion du temps\n- Le comportement à adopter\n- La communication\n- La progression de la relation"

    def _save_conversation(self, user_input, response):
        conversation = {
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'user_input': user_input,
            'response': response
        }
        
        try:
            # Charger l'historique existant
            if os.path.exists(self.history_file):
                with open(self.history_file, 'r', encoding='utf-8') as f:
                    history = json.load(f)
            else:
                history = []
            
            # Ajouter la nouvelle conversation
            history.append(conversation)
            
            # Sauvegarder l'historique mis à jour
            with open(self.history_file, 'w', encoding='utf-8') as f:
                json.dump(history, f, ensure_ascii=False, indent=2)
                
        except Exception as e:
            print(f"Erreur lors de la sauvegarde : {str(e)}")

love_coach = LoveCoach()
