import React from "react";
import { useTranslation } from "react-i18next";
import "../App.css"; // ou 'styles.css' selon l’emplacement

const Memoire = () => {

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


    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-pink-700 mb-6">
        Mémoire du Tamil Eelam
      </h1>

      <p className="text-lg text-gray-800 mb-6">
        Cette page est un espace de mémoire dédié à la langue, à l'histoire, et
        à la culture du <strong>Tamil Eelam</strong> — une région située au
        nord et à l'est de l’actuel Sri Lanka. Elle s’adresse autant aux
        personnes d’origine tamoule qu’à celles qui découvrent cette réalité
        souvent peu connue.
      </p>

      <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-3">
        📍 Où se situe le Tamil Eelam ?
      </h2>
      <p className="text-gray-800 text-lg mb-4">
        Le Tamil Eelam est un territoire revendiqué historiquement par la
        population tamoule au Sri Lanka, principalement dans les régions de
        <strong> Jaffna, Mullaitivu, Kilinochchi, Batticaloa, Trincomalee</strong> et
        Vavuniya. Ce n’est pas un État reconnu, mais un espace culturel et
        linguistique où les Tamouls vivaient depuis des siècles.
      </p>

      <p className="text-gray-800 text-lg mb-4">
        Il ne faut pas le confondre avec le <strong>Tamil Nadu</strong>, qui est
        un État du sud de l’Inde, bien plus grand, où la majorité des Tamouls vivent
        aujourd’hui dans un cadre politique stable.
      </p>

      <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-3">
        🎓 Une langue, une culture en danger
      </h2>
      <p className="text-gray-800 text-lg mb-4">
        Après des décennies de conflit entre le gouvernement sri-lankais et des
        groupes armés tamouls, la guerre s’est terminée en 2009. Depuis, les
        zones tamoules ont été profondément transformées sur le plan démographique
        et culturel. Le tamoul y est souvent marginalisé, au profit de la
        langue majoritaire, le cinghalais.
      </p>

      <p className="text-gray-800 text-lg mb-4">
        Aujourd’hui, de nombreux lieux autrefois tamouls sont devenus
        cinghalais. Temples, noms de villages, écoles ont changé. Cette
        disparition progressive rend la transmission de la langue et de la
        mémoire d’autant plus urgente.
      </p>

      <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-3">
        🌺 Qui sont les Maaveerar ?
      </h2>
      <p className="text-gray-800 text-lg mb-4">
        Le terme <strong>Maaveerar</strong> signifie littéralement "grands
        héros". Il est utilisé pour désigner celles et ceux qui ont perdu la
        vie dans le conflit, en particulier les combattants tamouls. Au-delà de
        leur rôle militaire, ils sont pour beaucoup un symbole de sacrifice,
        d’identité et de résistance face à l’effacement.
      </p>

      <p className="text-gray-800 text-lg mb-4">
        TamilConnect ne fait pas l’apologie de la guerre. Nous croyons à la
        mémoire, au respect des vies humaines, et à la transmission d’un
        patrimoine effacé.
      </p>

      <h2 className="text-2xl font-semibold text-pink-600 mt-8 mb-3">
        🕯️ Pourquoi se souvenir ?
      </h2>
      <p className="text-gray-800 text-lg mb-4">
        Se souvenir, ce n’est pas diviser. C’est comprendre. C’est reconnaître
        qu’un peuple a souffert, qu’une langue a été menacée, qu’une culture
        risque l’oubli. C’est redonner une voix à celles et ceux qui ont été
        réduits au silence.
      </p>

      <p className="text-gray-800 text-lg mb-4">
        TamilConnect veut être un pont entre mémoire et apprentissage. Car
        apprendre le tamoul, c’est aussi préserver une identité que l’on a
        voulu effacer.
      </p>

      <p className="text-gray-900 text-lg font-semibold mt-8 italic">
        Nous n’oublions pas.
        <br />
        Nous transmettons.
      </p>
    </div>



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

export default Memoire;
