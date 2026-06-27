import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/organizerNavbar.css";

function OrganizerNavbar() {
  const navigate = useNavigate();
  return (
    <>
      <header className="topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="logo">🏆 LOCOTOUR</div>

        <button className="organizer-btn" onClick={() => navigate('/role-select')}>
          Switch Role ⇄
        </button>
      </header>

      <div className="nav-container">
        <NavLink
          to="/OrganizerDashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/CreateTournament"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Create Event
        </NavLink>

        <NavLink
          to="/registrations"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Registrations
        </NavLink>

        <NavLink
          to="/fixtures"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Fixtures
        </NavLink>

        


      </div>
    </>
  );
}

export default OrganizerNavbar;