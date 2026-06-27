class Tournament:

    def __init__(
        self,
        tournamentName,
        sport,
        venue,
        startDate,
        endDate,
        teamsNeeded,
        registrationDeadline,
        description
    ):
        self.tournamentName = tournamentName
        self.sport = sport
        self.venue = venue
        self.startDate = startDate
        self.endDate = endDate
        self.teamsNeeded = teamsNeeded
        self.registrationDeadline = registrationDeadline
        self.description = description

    def to_dict(self):
        return self.__dict__