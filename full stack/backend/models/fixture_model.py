class Fixture:
    def __init__(self, tournamentName, round, teamA, teamB, status="Scheduled", score=""):
        self.tournamentName = tournamentName
        self.round = round
        self.teamA = teamA
        self.teamB = teamB
        self.status = status
        self.score = score

    def to_dict(self):
        return {
            "tournamentName": self.tournamentName,
            "round": self.round,
            "teamA": self.teamA,
            "teamB": self.teamB,
            "status": self.status,
            "score": self.score
        }
