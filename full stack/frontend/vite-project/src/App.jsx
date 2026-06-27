import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Component/LandingPage";
import Register from "./pages/Component/Register";
import Login from "./pages/Component/Login";
import RoleSelect from "./pages/Component/RoleSelect";
import CreateTournament from "./pages/Component/CreateTournament";
import OrganizerDashboard from "./pages/Component/OrganizerDashboard";
import Registrations from "./pages/Component/Registrations";
import Fixtures from "./pages/Component/Fixtures";
import BrowseEvents from "./pages/Component/BrowseEvents";
import RegisterTeam from "./pages/Component/RegisterTeam";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/OrganizerDashboard" element={<OrganizerDashboard />}/>
        <Route path="/CreateTournament" element={<CreateTournament />}/>
        <Route path="/registrations" element={<Registrations />}/>
        <Route path="/fixtures" element={<Fixtures />}/>
        <Route path="/browseEvents" element={<BrowseEvents />}/>
        <Route path="/registerTeam" element={<RegisterTeam />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;