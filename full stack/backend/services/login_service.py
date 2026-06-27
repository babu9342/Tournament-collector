from config.db import users_collection

def login_user(data):

    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({
        "email": email,
        "password": password
    })

    if user:
        return {
            "success": True,
            "message": "Login Successful"
        }

    return {
        "success": False,
        "message": "Invalid Email or Password"
    }