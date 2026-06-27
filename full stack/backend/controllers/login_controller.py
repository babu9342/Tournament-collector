from flask import request, jsonify
from services.login_service import login_user

def login():

    data = request.get_json()

    result = login_user(data)

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 401