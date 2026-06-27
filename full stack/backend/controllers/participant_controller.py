from flask import request, jsonify
from services.participant_service import (
    get_all_tournaments_service,
    register_new_team_service
)

def get_tournaments_controller():
    try:
        result = get_all_tournaments_service()
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

def register_team_controller():
    try:
        data = request.get_json()
        result = register_new_team_service(data)
        if result["success"]:
            return jsonify(result), 201
        return jsonify(result), 400
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
