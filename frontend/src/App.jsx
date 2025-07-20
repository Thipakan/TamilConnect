import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";
import Histoire from "./pages/Histoire";
import Cours from "./pages/Cours";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import DashboardEnseignant from "./pages/DashboardEnseignant";
import EspaceClient from "./pages/EspaceClient";
import DashboardPremium from "./pages/DashboardPremium";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/accueil" replace />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/histoire" element={<Histoire />} />
        <Route path="/cours" element={<Cours />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/dashboard-enseignant" element={<DashboardEnseignant />} />
        <Route path="/espace-client" element={<EspaceClient />} />
        <Route path="/dashboard-premium" element={<DashboardPremium />} />
      </Routes>
    </Router>
  );
}

export default App;
