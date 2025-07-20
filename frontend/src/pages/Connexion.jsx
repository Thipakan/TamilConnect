import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/tamilconnect/backend/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Connexion réussie !");
        setTimeout(() => {
          if (data.role === "teacher") {
            navigate("/dashboard-enseignant");
          } else {
            navigate("/espace-client");
          }
        }, 1000);
      } else {
        setMessage(data.message || "Erreur d'identifiants.");
      }
    } catch (error) {
      setMessage("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Connexion</h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email :
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Se connecter
        </button>

        {message && (
          <p
            className={`text-center font-medium ${
              message.includes("réussie") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <p className="mt-4">
        Pas encore inscrit ?{" "}
        <a href="/inscription" className="text-blue-600 hover:underline">
          Créez un compte
        </a>
      </p>
    </div>
  );
};

export default Connexion;
