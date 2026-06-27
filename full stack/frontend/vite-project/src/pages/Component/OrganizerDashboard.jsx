import { useEffect, useState } from "react";
import OrganizerNavbar from "./OrganizerNavbar";
import "../CSS/organizerDashboard.css";

function OrganizerDashboard() {
  const [stats, setStats] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
          setEvents(data.events);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const openEvents = events.filter(e => e.status === "Registration Open");
  const pastEvents = events.filter(e => e.status !== "Registration Open");

  return (
    <div className="dashboard-page">
      <OrganizerNavbar />

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <p>Active Events</p>
            <h1>{stats.activeEvents || 0}</h1>
          </div>

          <div className="stat-card">
            <p>Teams Registered</p>
            <h1>{stats.teamsRegistered || 0}</h1>
          </div>

          <div className="stat-card">
            <p>Registration Closes</p>
            <h2>{stats.registrationCloses || "-"}</h2>
          </div>

          <div className="stat-card">
            <p>Matches Played</p>
            <h1>{stats.matchesPlayed || 0}</h1>
          </div>
        </div>

        <div className="events-section">
          <h2>Open Tournaments</h2>
          {openEvents.length === 0 ? (
            <p className="no-events-text">No tournaments currently open for registration.</p>
          ) : (
            <div className="events-grid-custom">
              {openEvents.map((event) => (
                <div key={event._id} className="event-card-custom open-card">
                  <div className="card-top">
                    <h3>{event.tournamentName}</h3>
                    <span className="status-badge open">Open</span>
                  </div>
                  <div className="card-details">
                    <p><strong>Sport:</strong> {event.sport}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p><strong>Roster Slots:</strong> {event.registeredTeams || 0} / {event.teamsNeeded} Teams</p>
                    <p><strong>Deadline:</strong> {event.registrationDeadline}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="events-section">
          <h2>Past & Closed Tournaments</h2>
          {pastEvents.length === 0 ? (
            <p className="no-events-text">No past or closed tournaments.</p>
          ) : (
            <div className="events-grid-custom">
              {pastEvents.map((event) => (
                <div key={event._id} className="event-card-custom closed-card">
                  <div className="card-top">
                    <h3>{event.tournamentName}</h3>
                    <span className="status-badge closed">{event.status}</span>
                  </div>
                  <div className="card-details">
                    <p><strong>Sport:</strong> {event.sport}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p><strong>Dates:</strong> {event.startDate} - {event.endDate}</p>
                    <p><strong>Roster Slots:</strong> {event.registeredTeams || 0} / {event.teamsNeeded} Teams</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganizerDashboard;