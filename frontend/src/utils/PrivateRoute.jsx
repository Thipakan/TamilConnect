import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("user"); // ou un state global
  return isAuthenticated ? children : <Navigate to="/connexion" />;
}

export default PrivateRoute;
