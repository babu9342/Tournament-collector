class User:

    def __init__(self, name, username, email, password):
        self.name = name
        self.username = username
        self.email = email
        self.password = password

    def to_dict(self):
        return {
            "name": self.name,
            "username": self.username,
            "email": self.email,
            "password": self.password
        }