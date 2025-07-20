import React, { useState } from "react";
import "../App.css"; // ajuste selon ton architecture

const Cours = () => {
  const [quizResult, setQuizResult] = useState("");

  const checkAnswer = (status) => {
    if (status === "correct") {
      setQuizResult("✅ Bonne réponse !");
    } else {
      setQuizResult("❌ Mauvaise réponse, essayez encore.");
    }
  };

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

      <section className="intro">
        <h2>Bienvenue dans nos cours ouverts à tous</h2>
        <p>Découvrez les bases de la langue tamoule à travers des leçons interactives et des ressources gratuites.</p>
      </section>

      <section className="alphabet">
        <h3>📖 Apprendre l'alphabet tamoul</h3>
        <p>Familiarisez-vous avec les lettres tamoules et leur prononciation.</p>
        <video width="640" height="360" controls>
          <source src="/video/alphabet tamoul.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas l'élément vidéo.
        </video>
        <p>
          <a href="/pdf/alphabet_tamoul.pdf" download>
            📄 Télécharger l'alphabet tamoul en PDF
          </a>
        </p>
      </section>

      <section className="quiz">
        <h3>📝 Petit quiz : Testez vos connaissances</h3>
        <p>Choisissez la bonne réponse :</p>
        <div className="quiz-container">
          <p>Comment dit-on "Bonjour" en tamoul ?</p>
          <button onClick={() => checkAnswer("correct")}>Vanakkam</button>
          <button onClick={() => checkAnswer("wrong")}>Namaste</button>
          <button onClick={() => checkAnswer("wrong")}>Hola</button>

          <p>Quelle est la langue officielle du Tamil Nadu ?</p>
          <button onClick={() => checkAnswer("correct")}>Tamoul</button>
          <button onClick={() => checkAnswer("wrong")}>Hindi</button>
          <button onClick={() => checkAnswer("wrong")}>Telugu</button>

          <p>Quel est le script utilisé pour écrire en tamoul ?</p>
          <button onClick={() => checkAnswer("correct")}>Tamil script</button>
          <button onClick={() => checkAnswer("wrong")}>Devanagari</button>
          <button onClick={() => checkAnswer("wrong")}>Latin</button>

          <p>Quel est un plat typique de la cuisine tamoule ?</p>
          <button onClick={() => checkAnswer("correct")}>Idli</button>
          <button onClick={() => checkAnswer("wrong")}>Sushi</button>
          <button onClick={() => checkAnswer("wrong")}>Tacos</button>

          <p id="quiz-result" style={{ fontWeight: "bold", marginTop: "10px", color: quizResult.includes("✅") ? "green" : "red" }}>
            {quizResult}
          </p>
        </div>
      </section>

      <section className="extrait">
        <h3>🎓 Extrait d'un cours premium</h3>
        <p>Découvrez un extrait de notre cours pour débutants :</p>
        <iframe src="/pdf/extrait_cours.pdf" width="100%" height="400px" title="Extrait Cours Tamoul"></iframe>
      </section>

      <section className="cta">
        <p>📚 Envie d'aller plus loin ? En vous inscrivant, vous accédez à des cours plus avancés et à du contenu exclusif !</p>
        <p>
          <a href="/inscription" style={{ color: "#8B0000", textDecoration: "underline" }}>
            Inscrivez-vous dès maintenant !
          </a>
        </p>
      </section>

      <footer>
        <p>&copy; 2025 TamilConnect. Tous droits réservés.</p>
      </footer>
    </>
  );
};

export default Cours;
