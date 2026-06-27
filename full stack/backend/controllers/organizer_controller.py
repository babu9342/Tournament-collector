from flask import request, jsonify
from services.organizer_service import (
    create_tournament_service,
    get_dashboard_data_service,
    get_registrations_service,
    get_or_create_fixtures_service
)

def create_tournament_controller():
    try:
        data = request.get_json()
        result = create_tournament_service(data)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def get_dashboard_controller():
    try:
        result = get_dashboard_data_service()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def get_registrations_controller():
    try:
        result = get_registrations_service()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def get_fixtures_controller(tournament_name):
    try:
        result = get_or_create_fixtures_service(tournament_name)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
