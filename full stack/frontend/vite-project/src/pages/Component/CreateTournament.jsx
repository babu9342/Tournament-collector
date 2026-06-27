import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganizerNavbar from "./OrganizerNavbar";
import "../CSS/createTournament.css";

function CreateTournament() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tournamentName: "",
    sport: "",
    venue: "",
    startDate: "",
    endDate: "",
    teamsNeeded: "",
    registrationDeadline: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/create-tournament",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        navigate("/registrations");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };


  return (
    <div className="create-page">
      <OrganizerNavbar />
      
      <div className="create-container">
        <h1>Create Tournament</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Tournament Name</label>
              <input
                type="text"
                name="tournamentName"
                placeholder="e.g. Summer Championship"
                value={formData.tournamentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Select Sport</label>
              <select
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                required
              >
                <option value="">Select Sport</option>
                <option>Cricket</option>
                <option>Football</option>
                <option>Basketball</option>
                <option>Volleyball</option>
                <option>Kabaddi</option>
              </select>
            </div>

            <div className="form-group">
              <label>Venue</label>
              <input
                type="text"
                name="venue"
                placeholder="e.g. Madison Square Garden"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Teams Needed</label>
              <input
                type="number"
                name="teamsNeeded"
                placeholder="e.g. 8"
                value={formData.teamsNeeded}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Registration Deadline</label>
              <input
                type="date"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label>Tournament Description</label>
              <textarea
                name="description"
                placeholder="Write a brief overview of the tournament rules and schedule..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Create Tournament 🏆
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTournament;