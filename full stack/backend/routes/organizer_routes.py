from flask import Blueprint
from controllers.organizer_controller import (
    create_tournament_controller,
    get_dashboard_controller,
    get_registrations_controller,
    get_fixtures_controller
)

organizer_bp = Blueprint("organizer", __name__)

@organizer_bp.route("/create-tournament", methods=["POST"])
def create_tournament_route():
    return create_tournament_controller()

@organizer_bp.route("/dashboard", methods=["GET"])
def dashboard_route():
    return get_dashboard_controller()

@organizer_bp.route("/registrations", methods=["GET"])
def registrations_route():
    return get_registrations_controller()

@organizer_bp.route("/fixtures/<tournament_name>", methods=["GET"])
def fixtures_route(tournament_name):
    return get_fixtures_controller(tournament_name)
