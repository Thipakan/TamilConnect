import React from "react";
import { useTranslation } from "react-i18next";
import "../App.css"; // adapte le chemin selon ta structure

const Histoire = () => {
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
            <li><a href="/histoire">Histoire des Tamouls</a></li>
            <li><a href="/cours">Cours</a></li>
            <li><a href="/connexion">Se connecter</a></li>
            <li><a href="/inscription">S'inscrire</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Section Histoire */}
      <section className="history">
        <h2>L'Histoire des Tamouls</h2>
        <p>
          Les Tamouls sont un peuple ancien, dont les racines remontent à plusieurs millénaires. Leur civilisation,
          issue de la culture dravidienne, s'est développée principalement dans le sud de l'Inde et au Sri Lanka.
        </p>

        <h3>Les Origines</h3>
        <p>
          Les premières traces de la civilisation tamoule remontent à l'époque de la culture de la vallée de l'Indus.
          Leur langue, le tamoul, est l'une des plus anciennes langues classiques encore parlées aujourd'hui.
        </p>

        <h3>Les Royaumes Tamouls</h3>
        <p>
          Au fil du temps, plusieurs royaumes tamouls puissants ont émergé, notamment les dynasties Chola, Pandya et Chera.
          Ces royaumes ont joué un rôle clé dans le commerce maritime et la diffusion du bouddhisme et de l'hindouisme en Asie du Sud-Est.
        </p>

        <h3>Le Tamil Eelam et les Conflits Modernes</h3>
        <p>
          Au Sri Lanka, les Tamouls ont longtemps revendiqué leurs droits culturels et politiques. Cette lutte a culminé avec
          la guerre civile sri-lankaise, qui a opposé les Tamouls aux forces gouvernementales. Aujourd'hui, la diaspora tamoule
          continue de préserver et promouvoir la culture tamoule à travers le monde.
        </p>

        <p><a href="#">En savoir plus</a></p>
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

export default Histoire;
