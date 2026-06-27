import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/landingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="grid-bg"></div>
      <header className="landing-header">
        <div className="logo">🏆 LOCOTOUR</div>
        <div className="auth-buttons">
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>Login</button>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
        </div>
      </header>

      <main className="landing-main">
        <section className="hero">
          <div className="badge">Next Generation Sports Portal</div>
          <h1 className="hero-title">
            Streamline Your <span className="highlight">Tournaments</span>
          </h1>
          <p className="hero-subtitle">
            The ultimate platform for organizers to schedule fixtures, manage registrations, and for participants to register teams and track events.
          </p>
          <div className="cta-group">
            <button className="btn btn-large btn-primary" onClick={() => navigate('/login')}>
              Get Started ↗
            </button>
            <button className="btn btn-large btn-outline" onClick={() => {
              const features = document.getElementById('features');
              if (features) features.scrollIntoView({ behavior: 'smooth' });
            }}>
              Learn More
            </button>
          </div>
        </section>

        <section id="features" className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon">🛡️</div>
              <h3>Tournament Creation</h3>
              <p>Easily post events with venues, dates, slot counts, and detailed rules.</p>
            </div>
            <div className="feature-card">
              <div className="icon">👥</div>
              <h3>Seamless Registration</h3>
              <p>Team leaders can browse open events and submit team rosters in just a few clicks.</p>
            </div>
            <div className="feature-card">
              <div className="icon">⚡</div>
              <h3>Automatic Fixtures</h3>
              <p>Generate optimized Round Robin fixtures and match schedules instantly.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2026 LOCOTOUR. Built for Champions.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
