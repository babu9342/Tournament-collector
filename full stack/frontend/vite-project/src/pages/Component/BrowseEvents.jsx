import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import "../CSS/browseEvents.css";

function BrowseEvents() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [sportFilter, setSportFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tournaments")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTournaments(data.tournaments);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredTournaments = sportFilter === "All" 
    ? tournaments 
    : tournaments.filter(t => t.sport === sportFilter);

  return (
    <div className="browse-page">
      <UserNavbar />
      
      <div className="browse-header">
        <h1>Browse Sports Tournaments</h1>
        <p>Discover exciting local competitions and secure your team's slot!</p>
      </div>

      <div className="filter-container">
        <label>Filter by Sport: </label>
        <select 
          value={sportFilter} 
          onChange={(e) => setSportFilter(e.target.value)}
          className="sport-select"
        >
          <option value="All">All Sports</option>
          <option value="Cricket">Cricket</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Kabaddi">Kabaddi</option>
        </select>
      </div>

      {loading ? (
        <div className="loader">Loading Tournaments...</div>
      ) : filteredTournaments.length === 0 ? (
        <div className="no-events">No tournaments found for this sport.</div>
      ) : (
        <div className="events-grid">
          {filteredTournaments.map((t) => (
            <div key={t._id} className="event-card">
              <div className="sport-icon-badge">
                {t.sport === "Cricket" ? "🏏" : 
                 t.sport === "Football" ? "⚽" : 
                 t.sport === "Basketball" ? "🏀" : 
                 t.sport === "Volleyball" ? "🏐" : 
                 t.sport === "Kabaddi" ? "🤼" : "🏆"}
              </div>
              <div className="card-header">
                <h2>{t.tournamentName}</h2>
                <span className={`status-badge ${t.status.toLowerCase().replace(" ", "-")}`}>
                  {t.status}
                </span>
              </div>
              <div className="card-body">
                <p><strong>Sport:</strong> {t.sport}</p>
                <p><strong>Venue:</strong> {t.venue}</p>
                <p><strong>Dates:</strong> {t.startDate} to {t.endDate}</p>
                <p><strong>Roster Slots:</strong> {t.registeredTeams} / {t.teamsNeeded} Teams</p>
                <p><strong>Deadline:</strong> {t.registrationDeadline}</p>
                {t.description && <p className="description">{t.description}</p>}
              </div>
              <div className="card-footer">
                {t.status === "Registration Open" ? (
                  <button 
                    className="register-btn"
                    onClick={() => navigate(`/registerTeam?tournament=${encodeURIComponent(t.tournamentName)}`)}
                  >
                    Register Team ↗
                  </button>
                ) : (
                  <button className="register-btn disabled" disabled>
                    Closed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseEvents;
