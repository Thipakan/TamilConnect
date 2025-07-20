import React from "react";
import { useTranslation } from "react-i18next";
import "../App.css"; // ajuste ce chemin selon ton projet

const Contact = () => {
  return (
    <>
      <header>
        <div className="logo">
          <h1>TamilConnect</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/accueil">Accueil</a></li>
            <li><a href="/a-propos">À propos</a></li>
            <li><a href="/histoire">Histoire des Tamouls</a></li>
            <li><a href="/cours">Cours</a></li>
            <li><a href="/connexion">Se connecter</a></li>
            <li><a href="/inscription">S'inscrire</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="contact-info">
        <h2>Contactez-nous</h2>
        <p>Pour toute question ou information, vous pouvez nous joindre via les coordonnées suivantes :</p>
        <ul>
          <li><strong>Email :</strong> contact@tamilconnect.com</li>
          <li><strong>Téléphone :</strong> +33 1 23 45 67 89</li>
          <li><strong>Adresse :</strong> 12 rue de la Culture Tamoule, Paris, France</li>
        </ul>
      </section>

      {/* Accessibilité */}
      <button id="accessibility-btn">Accessibilité</button>
      <div id="accessibility-panel">
        <h2>Options d'accessibilité</h2>
        <button id="toggle-contrast">Contraste élevé</button>
        <button id="increase-text">Augmenter texte</button>
        <button id="decrease-text">Diminuer texte</button>
        <button id="toggle-font">Police lisible</button>
      </div>

      <footer>
        <p>&copy; 2025 TamilConnect. Tous droits réservés.</p>
      </footer>
    </>
  );
};

export default Contact;
