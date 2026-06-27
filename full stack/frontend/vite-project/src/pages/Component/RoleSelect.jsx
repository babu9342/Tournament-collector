import { useNavigate } from 'react-router-dom';
import '../CSS/roleSelect.css';

function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="role-container">
      <h1>Welcome back</h1>
      <p className="subtitle">Choose how you want to continue</p>

      <div className="cards">
        <div className="card organizer">
          <div className="badge">Full access</div>
          <div className="icon" />
          <h2>Tournament organizer</h2>
          <p>Create events, post ads, manage fixtures</p>
          <button onClick={() => navigate('/OrganizerDashboard', { replace: true })} className="continue">
            Continue ↗
          </button>
        </div>

        <div className="card team">
          <div className="badge muted">Team / viewer</div>
          <div className="icon muted" />
          <h2>Team leader / participant</h2>
          <p>Browse events, register team, view fixtures</p>
          <button onClick={() => navigate("/browseEvents", { replace: true })} className="continue muted">
            Continue ↗
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelect;
