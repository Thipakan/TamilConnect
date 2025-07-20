import { useEffect, useState } from "react";

function Cours() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost/tamilconnect/backend/get_courses.php")
      .then(res => res.json())
      .then(data => {
        console.log("Cours reçus :", data);
        setCourses(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📚 Mes Cours</h2>

      {courses.length === 0 ? (
        <p>Aucun cours disponible pour le moment.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map(course => {
            const fileUrl = course.file
              ? `http://localhost/TamilConnect/uploads/${encodeURIComponent(course.file)}`
              : null;

            return (
              <div
                key={course.id}
                className={`rounded-lg shadow-md p-5 ${
                  course.is_premium === "1" ? "bg-yellow-50 border-l-4 border-yellow-400" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                <p className="text-gray-600 mb-2">{course.description}</p>

                {course.is_premium === "1" && (
                  <p className="text-yellow-600 font-semibold">🔒 Réservé aux membres Premium</p>
                )}

                {fileUrl && course.is_premium === "0" && (
                  <a
                    href={fileUrl}
                    download
                    className="inline-block mt-3 text-blue-600 underline"
                  >
                    📥 Télécharger le cours
                  </a>
                )}

                {!fileUrl && (
                  <p className="text-sm text-red-500 mt-2">Fichier manquant</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Cours;
