import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cours() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost/tamilconnect/backend/get_courses.php")
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">📚 Mes Cours</h2>

      {courses.length === 0 ? (
        <p>Aucun cours disponible pour le moment.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start">
          {courses.map(course => (
            <div
              key={course.id}
              className={`course-card ${
                course.is_premium === "1" ? "border-l-4 border-yellow-400 bg-yellow-50" : ""
              }`}
            >
              <h3>{course.title}</h3>
              <p>{course.description}</p>

              {course.is_premium === "1" && (
                <p className="course-premium">🔒 Réservé aux membres Premium</p>
              )}

              <Link to={`/cours/${course.id}`} className="course-btn">
                📖 Voir le cours
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cours;
