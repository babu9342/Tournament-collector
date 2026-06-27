import { NavLink, useNavigate } from "react-router-dom";
import "../CSS/userNavbar.css";

function UserNavbar() {
  const navigate = useNavigate();
  return (
    <>
      <header className="topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="logo" onClick={() => navigate('/role-select')} style={{cursor: 'pointer'}}>🏆 LOCOTOUR</div>

        <button className="role-btn" onClick={() => navigate('/role-select')}>
          Switch Role ⇄
        </button>
      </header>

      <div className="nav-container">
        <NavLink
          to="/browseEvents"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Browse Events
        </NavLink>

        <NavLink
          to="/registerTeam"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Register Team
        </NavLink>
      </div>
    </>
  );
}

export default UserNavbar;
