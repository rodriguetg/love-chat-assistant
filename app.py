from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from ai_service import AIService

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
ai_service = AIService()

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('send_message')
def handle_message(data):
    try:
        user_message = data.get('message', '').strip()
        if not user_message:
            return

        print(f"Message reçu: {user_message}")  # Debug log
        
        # Obtenir la réponse du chatbot
        bot_response = ai_service.get_completion(user_message, [{"role": "user", "content": user_message}])
        
        print(f"Réponse du bot: {bot_response}")  # Debug log
        
        if bot_response:
            emit('bot_response', {'message': bot_response})
        else:
            emit('bot_response', {
                'message': "Je suis désolée, je n'ai pas pu comprendre votre message. Pouvez-vous le reformuler ?"
            })
        
    except Exception as e:
        print(f"Erreur lors du traitement du message: {str(e)}")
        emit('bot_response', {
            'message': "Désolée, j'ai rencontré une erreur. Pouvez-vous reformuler votre message ?"
        })

if __name__ == '__main__':
    socketio.run(app, debug=True)
