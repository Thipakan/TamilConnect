import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Accueil from "./pages/Accueil";
import APropos from "./pages/APropos";
import Histoire from "./pages/Histoire";
import Cours from "./pages/Courspublic";
import Contact from "./pages/Contact";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import DashboardEnseignant from "./pages/DashboardEnseignant";
import EspaceClient from "./pages/EspaceClient";
import DashboardPremium from "./pages/DashboardPremium";
import './i18n'; // importe la config i18n
import LayoutClient from "./components/LayoutClient";
import Dashboard from "./pages/espace-client/Dashboard";
import CoursClient from "./pages/espace-client/Cours";
import Profil from "./pages/espace-client/Profil";
import Abonnement from "./pages/espace-client/Abonnement";
import Quiz from "./pages/espace-client/Quiz";
import PrivateRoute from "./utils/PrivateRoute";



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
        <Route path="/espace-client" element={<LayoutClient />}>
  <Route index element={<Dashboard />} />
  <Route path="cours" element={<CoursClient />} />
  <Route path="profil" element={<Profil />} />
  <Route path="abonnement" element={<Abonnement />} />
  <Route path="quiz" element={<Quiz />} />
</Route>

<Route
  path="/espace-client/*"
  element={
    <PrivateRoute>
      <LayoutClient />
    </PrivateRoute>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="cours" element={<CoursClient />} />
  <Route path="profil" element={<Profil />} />
  <Route path="abonnement" element={<Abonnement />} />
  <Route path="quiz" element={<Quiz />} />
</Route>

      </Routes>
    </Router>
  );
}

export default App;
