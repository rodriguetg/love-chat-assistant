import os

port = os.environ.get("PORT", 10000)
bind = f"0.0.0.0:{port}"
workers = 4
worker_class = "geventwebsocket.gunicorn.workers.GeventWebSocketWorker"
timeout = 120
