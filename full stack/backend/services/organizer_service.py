import datetime
import random
from config.db import tournaments_collection, registrations_collection, fixtures_collection
from models.tournament_model import Tournament
from models.fixture_model import Fixture

def create_tournament_service(data):
    tournament = Tournament(
        data["tournamentName"],
        data["sport"],
        data["venue"],
        data["startDate"],
        data["endDate"],
        data["teamsNeeded"],
        data["registrationDeadline"],
        data["description"]
    )

    tournaments_collection.insert_one(tournament.to_dict())

    return {
        "success": True,
        "message": "Tournament Created Successfully"
    }

def get_dashboard_data_service():
    today = datetime.date.today().isoformat()
    tournaments = list(tournaments_collection.find())
    
    active_events_count = 0
    total_teams_needed = 0
    total_teams_registered = registrations_collection.count_documents({})
    upcoming_deadlines = []
    
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
            
        if today <= end_date:
            active_events_count += 1
            
        try:
            total_teams_needed += int(event.get("teamsNeeded", 0))
        except:
            pass
            
        if reg_deadline >= today:
            upcoming_deadlines.append(reg_deadline)
            
        event_data = {
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
        }
        events_list.append(event_data)
        
    next_deadline = min(upcoming_deadlines) if upcoming_deadlines else "-"
    matches_played = fixtures_collection.count_documents({"status": "Completed"})
    
    stats = {
        "activeEvents": active_events_count,
        "teamsRegistered": total_teams_registered,
        "totalTeams": total_teams_needed,
        "registrationCloses": next_deadline,
        "matchesPlayed": matches_played
    }
    
    return {
        "success": True,
        "stats": stats,
        "events": events_list
    }

def get_registrations_service():
    registrations = list(registrations_collection.find())
    res_list = []
    for r in registrations:
        res_list.append({
            "_id": str(r["_id"]),
            "tournamentName": r["tournamentName"],
            "teamName": r["teamName"],
            "captainName": r["captainName"],
            "email": r["email"],
            "contact": r.get("contact", ""),
            "players": r.get("players", "")
        })
    return {
        "success": True,
        "registrations": res_list
    }

def get_or_create_fixtures_service(tournament_name):
    fixtures = list(fixtures_collection.find({"tournamentName": tournament_name}))
    if fixtures:
        res_list = []
        for f in fixtures:
            res_list.append({
                "_id": str(f["_id"]),
                "tournamentName": f["tournamentName"],
                "round": f.get("round", 1),
                "teamA": f["teamA"],
                "teamB": f["teamB"],
                "status": f.get("status", "Scheduled"),
                "score": f.get("score", "")
            })
        return {
            "success": True,
            "fixtures": res_list,
            "generated": True
        }
        
    teams = list(registrations_collection.find({"tournamentName": tournament_name}))
    team_names = [t["teamName"] for t in teams]
    
    if len(team_names) < 2:
        return {
            "success": False,
            "message": f"Need at least 2 registered teams to generate fixtures. Current registration count: {len(team_names)}.",
            "fixtures": [],
            "generated": False
        }
        
    random.shuffle(team_names)
    generated_fixtures = []
    
    if len(team_names) % 2 != 0:
        team_names.append("BYE")
        
    n = len(team_names)
    rounds = n - 1
    
    for r in range(rounds):
        round_num = r + 1
        for i in range(n // 2):
            team_a = team_names[i]
            team_b = team_names[n - 1 - i]
            
            if team_a != "BYE" and team_b != "BYE":
                fixture = Fixture(
                    tournamentName=tournament_name,
                    round=round_num,
                    teamA=team_a,
                    teamB=team_b,
                    status="Scheduled",
                    score=""
                )
                res = fixtures_collection.insert_one(fixture.to_dict())
                fixture_dict = fixture.to_dict()
                fixture_dict["_id"] = str(res.inserted_id)
                generated_fixtures.append(fixture_dict)
                
        team_names = [team_names[0]] + [team_names[-1]] + team_names[1:-1]
        
    return {
        "success": True,
        "fixtures": generated_fixtures,
        "generated": True
    }
