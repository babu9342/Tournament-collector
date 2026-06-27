class Registration:
    def __init__(self, tournamentName, teamName, captainName, email, contact, players=""):
        self.tournamentName = tournamentName
        self.teamName = teamName
        self.captainName = captainName
        self.email = email
        self.contact = contact
        self.players = players

    def to_dict(self):
        return {
            "tournamentName": self.tournamentName,
            "teamName": self.teamName,
            "captainName": self.captainName,
            "email": self.email,
            "contact": self.contact,
            "players": self.players
        }
