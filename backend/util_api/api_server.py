"""
API server for KijaniCooling ASB system.
Registers all API services and serves them with Flask.
"""

from flask import Flask

from util_api.config_api import config_api
from util_api.dashboard_api import dashboard_api

API_HOST = "0.0.0.0"
API_PORT = 5000

def create_app():
    app = Flask(__name__)
    app.json.sort_keys = False # keep the key order of asb_wazigate_config.json
    app.register_blueprint(config_api)
    app.register_blueprint(dashboard_api)
    return app

def run_api_server(host=API_HOST, port=API_PORT):
    print(f"[API] Serving on {host}:{port}")
    create_app().run(host=host, port=port, use_reloader=False)
