import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../App.css"; // Assure-toi que ce fichier contient les styles globaux

const Connexion = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
        setMessage(t("login_success"));
        setTimeout(() => {
          if (data.role === "teacher") {
            navigate("/dashboard-enseignant");
          } else {
            navigate("/espace-client");
          }
        }, 1000);
      } else {
        setMessage(data.message || t("login_error"));
      }
    } catch (error) {
      setMessage(t("server_error"));
    }
  };

  return (
    <>
      {/* Header */}
      <header>
        <div className="logo">
          <h1>TamilConnect</h1>
          <div className="language-switcher">
            <button onClick={() => changeLanguage("fr")}>FR</button>
            <button onClick={() => changeLanguage("en")}>EN</button>
          </div>
        </div>
        <nav>
          <ul>
            <li><a href="/accueil">{t("home")}</a></li>
            <li><a href="/a-propos">{t("about")}</a></li>
            <li><a href="/histoire">{t("history")}</a></li>
            <li><a href="/cours">{t("courses")}</a></li>
            <li><a href="/connexion">{t("login")}</a></li>
            <li><a href="/inscription">{t("register")}</a></li>
            <li><a href="/contact">{t("contact")}</a></li>
          </ul>
        </nav>
      </header>

      {/* Formulaire de connexion */}
      <main className="connexion-container">
        <h2>{t("login")}</h2>
        <form onSubmit={handleLogin}>
          <label>{t("email")} :</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>{t("password")} :</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">{t("submit")}</button>

          {message && (
            <p
              className={`message ${
                message.includes(t("login_success"))
                  ? "success-message"
                  : "error-message"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        <p className="register-link">
          {t("not_registered")}{" "}
          <a href="/inscription">{t("create_account")}</a>
        </p>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 TamilConnect. {t("all_rights_reserved")}</p>
        <p>
          {t("follow_us")}{" "}
          <a href="#">Facebook</a>, <a href="#">Instagram</a>, <a href="#">Twitter</a>.
        </p>
      </footer>
    </>
  );
};

export default Connexion;
