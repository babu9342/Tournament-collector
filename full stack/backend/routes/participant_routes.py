from flask import Blueprint
from controllers.participant_controller import (
    get_tournaments_controller,
    register_team_controller
)

participant_bp = Blueprint("participant", __name__)

@participant_bp.route("/tournaments", methods=["GET"])
def tournaments_route():
    return get_tournaments_controller()

@participant_bp.route("/register-team", methods=["POST"])
def register_team_route():
    return register_team_controller()
