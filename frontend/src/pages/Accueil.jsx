import React from "react";
import { useTranslation } from "react-i18next";
import "../App.css"; // ou 'styles.css' selon l’emplacement

const Accueil = () => {
  return (
    <>
      {/* En-tête */}
      <header>
        <div className="logo">
          <h1>TamilConnect</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/accueil">Accueil</a></li>
            <li><a href="/a-propos">À propos</a></li>
            <li><a href="/mémoire">Mémoire</a></li>
            <li><a href="/histoire">Histoire des Tamouls</a></li>
            <li><a href="/cours">Cours</a></li>
            <li><a href="/connexion">Se connecter</a></li>
            <li><a href="/inscription">S'inscrire</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Section principale */}
      <section className="hero">
        <div className="hero-content">
          <h2>Apprenez, connectez, explorez la culture tamoule</h2>
          <p>
            Rejoignez des milliers d'apprenants à travers le monde et maîtrisez le tamoul avec TamilConnect.
          </p>
          <div className="cta-buttons"></div>
        </div>
      </section>

      {/* Section Histoire */}
      <section className="history">
        <h2>Histoire des Tamouls et du Tamil Eelam</h2>
        <p>
          Les Tamouls sont un peuple de la péninsule indienne, avec une riche histoire et une culture millénaire...
        </p>
        <p>
          Le Tamil Eelam fait référence à la région historique du peuple tamoul, notamment au Sri Lanka...
        </p>
        <p><a href="#">En savoir plus</a></p>
      </section>

      {/* Fonctionnalités */}
      <section className="features">
        <div className="feature">
          <h3>Cours interactifs</h3>
          <p>Découvrez des leçons adaptées à votre niveau, du débutant au confirmé.</p>
        </div>
        <div className="feature">
          <h3>Gamification</h3>
          <p>Apprenez en vous amusant avec des jeux éducatifs et des quiz.</p>
        </div>
        <div className="feature">
          <h3>Communauté en ligne</h3>
          <p>Échangez avec des apprenants et des experts de la langue tamoule.</p>
        </div>
        <div className="feature">
          <h3>Webinaires et événements</h3>
          <p>Participez à des événements culturels et des cours en direct.</p>
        </div>
      </section>

      {/* Cours */}
      <section className="courses">
        <h2>Nos Cours</h2>
        <div id="courses-container">
          <div className="course">
            <h3>Introduction au Tamoul</h3>
            <p>Un cours pour débutants pour apprendre les bases du tamoul.</p>
          </div>
          <div className="course">
            <h3>Grammaire Tamoule</h3>
            <p>Apprenez les règles grammaticales de base du tamoul.</p>
          </div>
          <div className="course">
            <h3>Culture Tamoule</h3>
            <p>Explorez les traditions et la culture tamoules.</p>
          </div>
          <a href="#" className="cta-btn">Voir tous les cours</a>
        </div>
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

      {/* Pied de page */}
      <footer>
        <p>&copy; 2025 TamilConnect. Tous droits réservés.</p>
        <p>
          Suivez-nous sur <a href="#">Facebook</a>, <a href="#">Instagram</a>, <a href="#">Twitter</a>.
        </p>
      </footer>
    </>
  );
};

export default Accueil;
