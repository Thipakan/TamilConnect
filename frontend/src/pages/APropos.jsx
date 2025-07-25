import React from "react";
import { useTranslation } from "react-i18next";
import "../App.css"; // adapte le chemin si besoin

const APropos = () => {
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

      {/* Section principale */}
      <section className="about">
        <h2>À Propos de TamilConnect</h2>
        <p>
          TamilConnect est une entreprise née d'une volonté forte : préserver et promouvoir la langue et la culture tamoules grâce aux outils numériques.
          Face à un manque de ressources adaptées, nous avons développé une plateforme innovante qui permet d’apprendre le tamoul de manière interactive,
          accessible et engageante.
        </p>
        <p>
          Pour les Tamouls de l'Eelam, la langue et la culture ne sont pas seulement des éléments d'identité, mais aussi des symboles de résistance et de résilience.
          Après des décennies de lutte pour la reconnaissance de leurs droits et de leur histoire, il est essentiel de garantir que les générations futures puissent
          continuer à parler, écrire et célébrer leur héritage. TamilConnect répond à ce besoin en offrant une solution éducative moderne et inclusive.
        </p>
        <p>
          Notre mission est de créer un espace où la diaspora tamoule et les passionnés de langues peuvent se connecter, apprendre et partager. En alliant technologie et pédagogie,
          nous voulons faire du tamoul une langue accessible à tous, partout dans le monde.
        </p>
        <h3>Notre Engagement</h3>
        <p>
          Nous nous engageons à offrir une plateforme web intuitive, accessible et adaptée à tous les apprenants, y compris ceux en situation de handicap.
          Nos cours interactifs intègrent des éléments culturels forts pour permettre une immersion complète dans la richesse de la langue tamoule.
        </p>
        <p>
          Nous souhaitons également remercier profondément les pays qui ont accueilli les Tamouls avec bienveillance durant les périodes les plus sombres de leur histoire. 
          Grâce à la France, au Canada, au Royaume-Uni, à l’Allemagne, à la Suisse et à bien d’autres, des milliers de familles ont pu reconstruire une vie, éduquer leurs enfants 
          et faire vivre leur langue loin de leur terre natale.
        </p>
        <p>
          Quelle que soit son origine, apprendre une langue, c’est toujours un geste d’ouverture et de paix. C’est découvrir une autre manière de penser, de rêver, de ressentir. 
          Chez TamilConnect, nous croyons que chaque langue est précieuse, car elle porte en elle des émotions, des histoires et des valeurs humaines. Le tamoul ne fait pas exception. 
          Apprendre cette langue, c’est aussi apprendre à connaître un peuple, son courage, sa poésie et son espoir.
        </p>

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

export default APropos;
