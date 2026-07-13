# Local Sports Tournament Management System

A full-stack web application for organizing and joining local sports tournaments. Organizers can create tournaments and manage registrations and fixtures, while participants can browse open tournaments and register their teams.

## Features

**Organizer**
- Create a new tournament
- View a dashboard summarizing their tournaments
- View registrations received for their tournaments
- View fixtures for a given tournament

**Participant**
- Browse all available/open tournaments
- Register a team for a tournament

**Shared**
- User registration and login (role-based: organizer or participant)

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask, Flask-CORS |
| Database | MongoDB (via PyMongo) |
| Frontend | React 19 + Vite, React Router |
| Styling | Plain CSS per page/component |

## Project Structure

```
full stack/
├── backend/
│   ├── app.py                  # Flask app entry point, registers blueprints
│   ├── config/db.py            # MongoDB connection + collections
│   ├── controllers/            # Request handling logic
│   ├── services/               # Business logic
│   ├── models/                 # Data models (tournament, user, fixture, registration)
│   └── routes/                 # Blueprint route definitions
│       ├── auth_routes.py
│       ├── login_routes.py
│       ├── organizer_routes.py
│       └── participant_routes.py
└── frontend/
    └── vite-project/
        ├── src/
        │   ├── App.jsx, main.jsx
        │   └── pages/
        │       ├── Component/   # LandingPage, RoleSelect, Register, login,
        │       │                # OrganizerDashboard, CreateTournament,
        │       │                # Registrations, Fixtures, BrowseEvents,
        │       │                # RegisterTeam, OrganizerNavbar, UserNavbar
        │       └── CSS/         # matching per-page stylesheets
        └── package.json
```

## API Overview

| Method | Route | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | Log in |
| POST | `/create-tournament` | Organizer creates a tournament |
| GET | `/dashboard` | Organizer's tournament dashboard |
| GET | `/registrations` | Registrations for the organizer's tournaments |
| GET | `/fixtures/<tournament_name>` | Fixtures for a specific tournament |
| GET | `/tournaments` | List of open tournaments (participant view) |
| POST | `/register-team` | Register a team for a tournament |

Data is stored in a MongoDB database (`sports_event_db`) with four collections: `users`, `tournaments`, `registrations`, and `fixtures`.

## Getting Started

### Prerequisites
- Python 3.13 (or compatible)
- Node.js + npm
- MongoDB running locally on the default port (`mongodb://localhost:27017/`)

### 1. Run the backend

```bash
cd "full stack/backend"
pip install flask flask-cors pymongo
python app.py
```

The Flask dev server starts (default `http://127.0.0.1:5000`), and connects to MongoDB using the URI in `config/db.py`.

> There's no `requirements.txt` in the repo yet — the packages above (`flask`, `flask-cors`, `pymongo`) cover what `app.py` and `config/db.py` import. Worth adding a `requirements.txt` for easier setup.

### 2. Run the frontend

```bash
cd "full stack/frontend/vite-project"
npm install
npm run dev
```

Vite will start the dev server (default `http://localhost:5173`) with hot reload.

## Known Issues / To Do

- Login flow needs fixing — reported as buggy in current state.
- Database configuration is currently split across the codebase rather than centralized — consider consolidating into a single config source (e.g. environment variables).
- Some components are still missing/incomplete on the frontend.
- MongoDB connection string is hardcoded to `localhost` — move to an environment variable before deploying.
- No `requirements.txt` for the backend yet.

## License

Not specified.
