import datetime
from config.db import tournaments_collection, registrations_collection
from models.registration_model import Registration

def get_all_tournaments_service():
    today = datetime.date.today().isoformat()
    tournaments = list(tournaments_collection.find())
    
    events_list = []
    for event in tournaments:
        event_id = str(event["_id"])
        reg_deadline = event.get("registrationDeadline", "")
        end_date = event.get("endDate", "")
        registered_count = registrations_collection.count_documents({"tournamentName": event["tournamentName"]})
        
        status = "Registration Open"
        if today > reg_deadline:
            status = "Registration Closed"
        if today > end_date:
            status = "Tournament Ended"
            
        events_list.append({
            "_id": event_id,
            "tournamentName": event["tournamentName"],
            "sport": event.get("sport", ""),
            "venue": event.get("venue", ""),
            "startDate": event.get("startDate", ""),
            "endDate": end_date,
            "teamsNeeded": event.get("teamsNeeded", 0),
            "registrationDeadline": reg_deadline,
            "description": event.get("description", ""),
            "registeredTeams": registered_count,
            "status": status
        })
        
    return {
        "success": True,
        "tournaments": events_list
    }

def register_new_team_service(data):
    # Check if team is already registered for this tournament
    existing = registrations_collection.find_one({
        "tournamentName": data["tournamentName"],
        "teamName": data["teamName"]
    })
    if existing:
        return {
            "success": False,
            "message": "Team name is already registered for this tournament"
        }
        
    registration = Registration(
        tournamentName=data["tournamentName"],
        teamName=data["teamName"],
        captainName=data["captainName"],
        email=data["email"],
        contact=data["contact"],
        players=data.get("players", "")
    )
    
    registrations_collection.insert_one(registration.to_dict())
    
    return {
        "success": True,
        "message": "Team Registered Successfully!"
    }
