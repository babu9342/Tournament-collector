import React, { useEffect, useState } from "react";
import OrganizerNavbar from "./OrganizerNavbar";
import "../CSS/fixtures.css";

function Fixtures() {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTournaments(data.events);
          if (data.events.length > 0) {
            setSelectedTournament(data.events[0].tournamentName);
          }
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!selectedTournament) return;

    setLoading(true);
    setErrorMessage("");
    setFixtures([]);

    fetch(`http://127.0.0.1:5000/fixtures/${encodeURIComponent(selectedTournament)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setFixtures(data.fixtures);
        } else {
          setErrorMessage(data.message || "Failed to load fixtures");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Server Error");
        setLoading(false);
      });
  }, [selectedTournament]);

  const fixturesByRound = fixtures.reduce((acc, f) => {
    const round = f.round || 1;
    if (!acc[round]) acc[round] = [];
    acc[round].push(f);
    return acc;
  }, {});

  return (
    <div className="fixtures-page">
      <OrganizerNavbar />

      <div className="fixtures-container">
        <h1>Match Fixtures</h1>
        <p>Generate, view, and schedule fixtures for your sports events.</p>

        <div className="select-container">
          <label>Select Tournament: </label>
          <select
            value={selectedTournament}
            onChange={(e) => setSelectedTournament(e.target.value)}
            className="tournament-select"
          >
            {tournaments.map((t) => (
              <option key={t._id} value={t.tournamentName}>
                {t.tournamentName} ({t.sport})
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="loader">Loading Fixtures...</div>
        ) : errorMessage ? (
          <div className="error-card">
            <p>⚠️ {errorMessage}</p>
          </div>
        ) : Object.keys(fixturesByRound).length === 0 ? (
          <div className="no-fixtures">
            No fixtures generated yet. Make sure enough teams are registered.
          </div>
        ) : (
          <div className="rounds-container">
            {Object.keys(fixturesByRound).map((roundNum) => (
              <div key={roundNum} className="round-card">
                <h2>Round {roundNum}</h2>
                <div className="matches-grid">
                  {fixturesByRound[roundNum].map((match) => (
                    <div key={match._id} className="match-card">
                      <div className="team team-a">
                        <span className="team-name">{match.teamA}</span>
                      </div>
                      <div className="vs-badge">VS</div>
                      <div className="team team-b">
                        <span className="team-name">{match.teamB}</span>
                      </div>
                      <div className="match-status">
                        <span className="status-indicator"></span>
                        {match.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Fixtures;
