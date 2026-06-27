from config.db import users_collection
from models.user_model import User


def register_user(data):

    existing_user = users_collection.find_one({
        "$or": [
            {"email": data["email"]},
            {"username": data["username"]}
        ]
    })

    if existing_user:
        return {
            "success": False,
            "message": "Email or Username already exists"
        }

    user = User(
        data["name"],
        data["username"],
        data["email"],
        data["password"]
    )

    users_collection.insert_one(user.to_dict())

    return {
        "success": True,
        "message": "Registration Successful"
    }