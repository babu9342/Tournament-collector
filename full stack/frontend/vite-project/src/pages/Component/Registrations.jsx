import React, { useEffect, useState } from "react";
import OrganizerNavbar from "./OrganizerNavbar";
import "../CSS/registrations.css";

function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState("");
  const [loading, setLoading] = useState(true);

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

    fetch("http://127.0.0.1:5000/registrations")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRegistrations(data.registrations);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredRegistrations = registrations.filter(
    (r) => r.tournamentName === selectedTournament
  );

  const currentTournamentDetails = tournaments.find(
    (t) => t.tournamentName === selectedTournament
  );

  return (
    <div className="registrations-page">
      <OrganizerNavbar />

      <div className="registrations-container">
        <h1>Team Registrations</h1>
        <p>Review and manage all teams signed up for your events.</p>

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

        {selectedTournament && currentTournamentDetails && (
          <div className="tournament-summary">
            <h3>{selectedTournament} Info</h3>
            <p>
              <strong>Sport:</strong> {currentTournamentDetails.sport} |{" "}
              <strong>Slots:</strong> {filteredRegistrations.length} /{" "}
              {currentTournamentDetails.teamsNeeded} filled
            </p>
          </div>
        )}

        {loading ? (
          <div className="loader">Loading registrations...</div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="no-registrations">
            No teams registered for this tournament yet.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="registrations-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Captain Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Players List</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg, idx) => (
                  <tr key={reg._id}>
                    <td>{idx + 1}</td>
                    <td className="team-name">{reg.teamName}</td>
                    <td>{reg.captainName}</td>
                    <td>{reg.email}</td>
                    <td>{reg.contact}</td>
                    <td className="players-list">{reg.players || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Registrations;
