import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import "../CSS/registerTeam.css";

function RegisterTeam() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const preselectedTournament = searchParams.get("tournament") || "";

  const [tournaments, setTournaments] = useState([]);
  const [formData, setFormData] = useState({
    tournamentName: preselectedTournament,
    teamName: "",
    captainName: "",
    email: "",
    contact: "",
    players: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tournaments")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const openTournaments = data.tournaments.filter(
            (t) => t.status === "Registration Open"
          );
          setTournaments(openTournaments);
          if (!preselectedTournament && openTournaments.length > 0) {
            setFormData((prev) => ({
              ...prev,
              tournamentName: openTournaments[0].tournamentName,
            }));
          }
        }
      })
      .catch((err) => console.error(err));
  }, [preselectedTournament]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tournamentName) {
      alert("Please select a tournament");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/register-team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message);
        navigate("/browseEvents");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error. Please try again later.");
    }
  };

  return (
    <div className="register-team-page">
      <UserNavbar />

      <div className="form-container">
        <h1>Register Your Team</h1>
        <p>Fill out the form below to lock in your spot in the bracket.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Tournament</label>
            <select
              name="tournamentName"
              value={formData.tournamentName}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Tournament --</option>
              {tournaments.map((t) => (
                <option key={t._id} value={t.tournamentName}>
                  {t.tournamentName} ({t.sport})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Team Name</label>
            <input
              type="text"
              name="teamName"
              placeholder="e.g. Thunderbolts FC"
              value={formData.teamName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Captain Name</label>
            <input
              type="text"
              name="captainName"
              placeholder="e.g. John Doe"
              value={formData.captainName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Captain Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="e.g. captain@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              placeholder="e.g. +91 98765 43210"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Players List (optional, comma-separated)</label>
            <textarea
              name="players"
              placeholder="e.g. Player 1, Player 2, Player 3..."
              value={formData.players}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Registration 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterTeam;
