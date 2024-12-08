import os
import multiprocessing

# Server socket
port = os.environ.get("PORT", 10000)
bind = f"0.0.0.0:{port}"

# Worker processes
workers = multiprocessing.cpu_count() * 2 + 1  # Recommandé : (2 x NUM_CORES) + 1
worker_class = "geventwebsocket.gunicorn.workers.GeventWebSocketWorker"
worker_connections = 1000

# Timeouts
timeout = 120
keepalive = 5
graceful_timeout = 30

# Logging
accesslog = "-"
errorlog = "-"
loglevel = "info"
access_log_format = '%({x-forwarded-for}i)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s"'

# Process naming
proc_name = "love-chat-assistant"

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None
preload_app = True

# SSL
secure_scheme_headers = {
    'X-FORWARDED-PROTOCOL': 'ssl',
    'X-FORWARDED-PROTO': 'https',
    'X-FORWARDED-SSL': 'on'
}

# Performance tuning
max_requests = 1000
max_requests_jitter = 50
backlog = 2048
threads = 1

# Debugging
reload = False
reload_engine = 'auto'
spew = False
check_config = False
