import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ChapitreDetail() {
  const { id, chapterId } = useParams();
  const [course, setCourse] = useState(null);
  const [chapterContent, setChapterContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost/tamilconnect/backend/get_course.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        // Trouver le contenu du chapitre
        if (data.content && data.content[chapterId]) {
          setChapterContent(data.content[chapterId]);
        } else {
          setChapterContent("Contenu du chapitre introuvable.");
        }
      })
      .catch(() => alert("Erreur réseau"));
  }, [id, chapterId]);

  if (!course) return <p>Chargement...</p>;

  // Trouver le titre du chapitre pour l'afficher
  let chapterTitle = "Chapitre";
  course.parts?.forEach((part) => {
    part.chapters.forEach((ch) => {
      if (ch.id === chapterId) {
        chapterTitle = ch.title;
      }
    });
  });

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <h2 className="text-xl font-semibold mt-4">{chapterTitle}</h2>

      <div className="mt-4 whitespace-pre-wrap">{chapterContent}</div>

      <Link
        to={`/cours/${id}`}
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Retour au cours
      </Link>
    </div>
  );
}

export default ChapitreDetail;
