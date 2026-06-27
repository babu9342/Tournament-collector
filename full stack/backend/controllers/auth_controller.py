from flask import request, jsonify
from services.auth_service import register_user


def register():

    data = request.get_json()

    result = register_user(data)

    if result["success"]:
        return jsonify({
            "message": result["message"]
        }), 201

    return jsonify({
        "message": result["message"]
    }), 400