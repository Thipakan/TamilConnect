import { useEffect, useState } from "react";

function EspaceClient() {
  const [courses, setCourses] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Charger les cours depuis l'API
  useEffect(() => {
    async function getCourses() {
      try {
        const response = await fetch("http://localhost/tamilconnect/backend/get_courses.php");
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des cours:", error);
      }
    }
    getCourses();
  }, []);

  // Charger les questions du quiz (fonction non utilisée dans le rendu ici, tu peux adapter)
  async function loadQuiz() {
    try {
      const response = await fetch("http://localhost/tamilconnect/get_quiz.php");
      const questions = await response.json();
      setQuizQuestions(questions);
    } catch (error) {
      console.error("Erreur lors de la récupération du quiz:", error);
    }
  }

  // Rediriger vers la page de paiement
  function redirectToPayment() {
    window.location.href = "/paiement"; // à adapter selon ta route React
  }

  return (
    <>
      <style>{`
        .course {
          border: 1px solid #ddd;
          padding: 15px;
          margin-bottom: 10px;
          border-radius: 5px;
          background-color: #f9f9f9;
        }
        .premium-course {
          background-color: #f4f4f4;
          border: 2px dashed #ff9800;
          opacity: 0.7;
        }
        .premium-message {
          color: #ff9800;
          font-weight: bold;
          text-align: center;
        }
        .video-gray video {
          filter: grayscale(100%);
          opacity: 0.6;
        }
        .video-info {
          font-size: 14px;
          color: #ff0000;
          margin-bottom: 10px;
        }
        button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
          border-radius: 5px;
        }
        button:hover {
          background-color: #45a049;
        }
      `}</style>

      <header>
        <h1>Bienvenue dans votre espace client</h1>
        <nav>
          <a href="/mon_profil">Mon Profil</a> |{" "}
          <a href="/connexion">Se connecter</a> |{" "}
          <a href="/inscription">S'inscrire</a> |{" "}
          <a href="/logout">Se déconnecter</a>
        </nav>
      </header>

      <section>
        <h2>Liste des cours disponibles</h2>
        <div id="cours-list">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className={`course ${
                  course.is_premium == 1 ? "premium-course" : ""
                }`}
              >
                <h3>{course.title}</h3>
                <p>{course.description || "Aucune description disponible."}</p>
                {course.is_premium == 0 ? (
                  <a
                    href={`http://localhost/TamilConnect/uploads/${course.file}`}
                    download={course.file}
                  >
                    Télécharger le cours
                  </a>
                ) : (
                  <p className="premium-message">
                    🔒 Ce cours est réservé aux membres premium.
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>Aucun cours disponible pour le moment.</p>
          )}
        </div>
      </section>

      <section className="video-container">
        <div className="video-item">
          <h3>Histoire des Tamouls</h3>
          <video width="360" height="360" controls>
            <source
              src="http://localhost/Tamilconnect/video/tamoul%20histoire.mp4"
              type="video/mp4"
            />
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        </div>

        <div className="video-item">
          <h3>Musique Tamoule</h3>
          <p className="video-info">
            Cette vidéo est payante. Cliquez ci-dessous pour y accéder.
          </p>
          <div id="video-container" className="video-gray">
            <video id="video" width="360" height="360" controls disabled>
              <source
                src="http://localhost/Tamilconnect/video/musique_tamoule.mp4"
                type="video/mp4"
              />
              Votre navigateur ne supporte pas la balise vidéo.
            </video>
          </div>
          <button onClick={redirectToPayment}>Accéder à la vidéo</button>
        </div>
      </section>

      <section>
        <h2>Devenir Premium</h2>
        <p>Abonnez-vous pour avoir accès à plus de cours et de fonctionnalités.</p>
        <a href="/abonnement">
          <button id="become-premium-btn">Devenir Premium</button>
        </a>
      </section>

      <section>
        <h2>Quiz interactif</h2>
        <a href="/quiz">
          <button id="start-quiz-btn">Nos Quiz</button>
        </a>
      </section>

      <footer>
        <p>&copy; 2025 TamilConnect - Tous droits réservés</p>
      </footer>
    </>
  );
}

export default EspaceClient;
