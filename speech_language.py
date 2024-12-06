from gtts import gTTS
import speech_recognition as sr
from flask_babel import Babel
import os
import tempfile

class SpeechLanguageManager:
    def __init__(self, app):
        self.babel = Babel(app)
        self.recognizer = sr.Recognizer()
        self.supported_languages = {
            'fr': 'Français',
            'en': 'English',
            'es': 'Español',
            'de': 'Deutsch'
        }
        
    def text_to_speech(self, text, lang='fr'):
        """Convertit le texte en fichier audio"""
        try:
            tts = gTTS(text=text, lang=lang)
            # Créer un fichier temporaire
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3')
            tts.save(temp_file.name)
            return temp_file.name
        except Exception as e:
            print(f"Erreur TTS: {str(e)}")
            return None

    def speech_to_text(self, audio_file, lang='fr'):
        """Convertit l'audio en texte"""
        try:
            with sr.AudioFile(audio_file) as source:
                audio = self.recognizer.record(source)
                text = self.recognizer.recognize_google(audio, language=lang)
                return text
        except Exception as e:
            print(f"Erreur STT: {str(e)}")
            return None

    @staticmethod
    def get_user_language(request):
        """Détecte la langue préférée de l'utilisateur"""
        return request.accept_languages.best_match(['fr', 'en', 'es', 'de'])

    def translate_response(self, text, target_lang):
        """
        Traduit la réponse dans la langue cible
        Note: Dans une version production, vous devriez utiliser un service de traduction comme Google Translate API
        """
        # Exemple simple de traduction (à remplacer par une vraie API de traduction)
        basic_translations = {
            'Bonjour': {'en': 'Hello', 'es': 'Hola', 'de': 'Hallo'},
            'Au revoir': {'en': 'Goodbye', 'es': 'Adiós', 'de': 'Auf Wiedersehen'}
        }
        
        # Retourner le texte original si pas de traduction disponible
        return basic_translations.get(text, {}).get(target_lang, text)
