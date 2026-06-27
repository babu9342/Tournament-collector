from flask import Flask
from flask_cors import CORS

from routes.auth_routes import auth_bp
from routes.login_routes import login_bp
from routes.organizer_routes import organizer_bp
from routes.participant_routes import participant_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(login_bp)
app.register_blueprint(organizer_bp)
app.register_blueprint(participant_bp)

if __name__ == "__main__":
    app.run(debug=True)