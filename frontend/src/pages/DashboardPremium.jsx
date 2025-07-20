import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function DashboardPremium() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllCourses() {
      try {
        const response = await fetch("http://localhost/tamilconnect/get_courses.php");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des cours:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getAllCourses();
  }, []);

  return (
    <>
      <header>
        <h1>Bienvenue dans votre espace Premium</h1>
        <nav>
          <a href="TamilConnect.html">Se déconnecter</a>
        </nav>
      </header>

      <section>
        <h2>Liste des cours Premium</h2>
        <div id="premium-courses-list">
          {loading && <p>Chargement des cours...</p>}
          {error && <p style={{ color: "red" }}>Erreur : {error}</p>}
          {!loading && !error && courses.length === 0 && (
            <p>Aucun cours disponible.</p>
          )}
          {!loading && !error && courses.length > 0 && courses.map((course) => (
            <div key={course.id || course.title} className="course" style={{ marginBottom: "20px" }}>
              <h3>{course.title}</h3>
              <p>{course.description || "Aucune description disponible."}</p>

              {course.file && (
                <a
                  href={`http://localhost/TamilConnect/uploads/${course.file}`}
                  download={course.file}
                  style={{ display: "inline-block", marginBottom: "10px" }}
                >
                  Télécharger le PDF
                </a>
              )}

              {course.video_file && (
                <video
                  src={`http://localhost/TamilConnect/uploads/${course.video_file}`}
                  controls
                  style={{ display: "block", width: "300px", marginBottom: "10px" }}
                />
              )}

              <p>{course.is_premium == 1 ? "Cours Premium" : "✔️ Cours Gratuit"}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <p>&copy; 2025 TamilConnect - Tous droits réservés</p>
      </footer>
    </>
  );
}
