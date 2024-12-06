from textblob import TextBlob
from transformers import pipeline
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

class EmotionAnalyzer:
    def __init__(self):
        # Télécharger les ressources NLTK nécessaires
        try:
            nltk.data.find('tokenizers/punkt')
        except LookupError:
            nltk.download('punkt')
        try:
            nltk.data.find('corpora/stopwords')
        except LookupError:
            nltk.download('stopwords')
        
        # Initialiser le pipeline d'analyse des émotions
        self.emotion_classifier = pipeline("text-classification", 
                                        model="j-hartmann/emotion-english-distilroberta-base", 
                                        return_all_scores=True)

    def analyze_emotion(self, text):
        if not isinstance(text, str) or not text.strip():
            return []
        
        try:
            # Assurez-vous que le texte est une chaîne de caractères
            text = str(text).strip()
            
            # Analyse de sentiment basique
            blob = TextBlob(text)
            sentiment_score = blob.sentiment.polarity
            
            # Analyse des émotions
            result = self.emotion_classifier(text)
            
            if result and isinstance(result, list) and len(result) > 0:
                # Extraction des scores d'émotion
                emotions = result[0]
                # Tri des émotions par score décroissant
                sorted_emotions = sorted(emotions, key=lambda x: x['score'], reverse=True)
                
                # Extraction des mots-clés
                tokens = word_tokenize(text.lower())
                stop_words = set(stopwords.words('french'))
                keywords = [word for word in tokens if word.isalnum() and word not in stop_words]
                
                return {
                    'sentiment_score': sentiment_score,
                    'emotions': sorted_emotions,
                    'keywords': keywords,
                    'sentiment_label': self._get_sentiment_label(sentiment_score),
                    'primary_emotion': max(sorted_emotions, key=lambda x: x['score'])['label']
                }
            
            return []
            
        except Exception as e:
            print(f"Erreur lors de l'analyse des émotions: {str(e)}")
            return []
    
    def _get_sentiment_label(self, score):
        if score > 0.3:
            return 'très positif'
        elif score > 0:
            return 'positif'
        elif score == 0:
            return 'neutre'
        elif score > -0.3:
            return 'négatif'
        else:
            return 'très négatif'
            
    def get_response_suggestion(self, emotion_analysis):
        primary_emotion = emotion_analysis.get('primary_emotion', 'neutral')
        sentiment = emotion_analysis.get('sentiment_label', 'neutre')
        
        responses = {
            'joy': "Je sens de la joie dans vos mots ! ",
            'sadness': "Je comprends que vous vous sentiez triste. Je suis là pour vous écouter. ",
            'anger': "Je perçois de la colère. Prenons un moment pour en parler calmement. ",
            'fear': "N'ayez pas peur, je suis là pour vous aider. ",
            'love': "L'amour est un sentiment merveilleux ! ",
            'surprise': "Oh ! Cela semble surprenant ! ",
            'neutral': "Je vous écoute. "
        }
        
        return responses.get(primary_emotion, "Je vous écoute. ")
