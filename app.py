from gevent import monkey
monkey.patch_all()

from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, disconnect
from ai_service import AIService
import os
import logging
from datetime import datetime

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_key_12345')
port = int(os.environ.get("PORT", 10000))

# Configuration améliorée de SocketIO avec des timeouts plus longs
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    ping_timeout=120,
    ping_interval=30,
    async_mode='gevent',
    logger=True,
    engineio_logger=True,
    manage_session=True,
    cookie=None  # Désactive les cookies de session pour éviter les problèmes de mise en veille
)

ai_service = AIService()
active_sessions = set()

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    sid = request.sid
    active_sessions.add(sid)
    logger.info(f"Client connected: {sid} at {datetime.utcnow()}")
    emit('connection_response', {
        'status': 'connected',
        'message': 'Connexion établie avec le serveur'
    })

@socketio.on('disconnect')
def handle_disconnect():
    sid = request.sid
    active_sessions.discard(sid)
    logger.info(f"Client disconnected: {sid} at {datetime.utcnow()}")

@socketio.on('error')
def handle_error(error):
    sid = request.sid
    logger.error(f"SocketIO error for {sid}: {error}")
    emit('error_response', {'message': 'Une erreur est survenue'})

@socketio.on('ping')
def handle_ping():
    emit('pong')

@socketio.on('send_message')
def handle_message(data):
    try:
        sid = request.sid
        if sid not in active_sessions:
            logger.warning(f"Message received from inactive session {sid}")
            emit('reconnect_required', {'message': 'Session expirée, reconnexion nécessaire'})
            return

        user_message = data.get('message', '').strip()
        if not user_message:
            return

        logger.info(f"Message reçu de {sid}: {user_message}")
        
        # Obtenir la réponse du chatbot
        bot_response = ai_service.get_completion(user_message, [{"role": "user", "content": user_message}])
        
        logger.info(f"Réponse du bot pour {sid}: {bot_response}")
        
        if bot_response:
            emit('bot_response', {'message': bot_response})
        else:
            emit('bot_response', {
                'message': "Je suis désolée, je n'ai pas pu comprendre votre message. Pouvez-vous le reformuler ?"
            })
        
    except Exception as e:
        logger.error(f"Erreur pour {request.sid}: {str(e)}")
        emit('bot_response', {
            'message': "Désolée, j'ai rencontré une erreur. Pouvez-vous reformuler votre message ?"
        })

if __name__ == '__main__':
    socketio.run(app, port=port, debug=True)
