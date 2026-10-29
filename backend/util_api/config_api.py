"""
Config API service for KijaniCooling ASB system.
Returns the WaziGate configuration stored in asb_wazigate_config.json.
"""

from flask import Blueprint, jsonify

from data_ingestion.wazigate import wazigate_EdgeAPI_util

config_api = Blueprint("config_api", __name__, url_prefix="/kijanicooling/api/v1")

@config_api.route("/config", methods=["GET"])
def get_config():
    try:
        return jsonify(wazigate_EdgeAPI_util.load_json())
    except Exception as e:
        print(f"[CONFIG API] Error loading config: {e}")
        return jsonify({"error": "Failed to load WaziGate config"}), 500
