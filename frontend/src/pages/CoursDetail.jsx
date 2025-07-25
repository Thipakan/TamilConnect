import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CoursDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizValidated, setQuizValidated] = useState(false);

  const [chaptersRead, setChaptersRead] = useState(() => {
    const saved = localStorage.getItem(`chaptersRead-${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch(`http://localhost/tamilconnect/backend/get_course.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch(() => alert("Erreur réseau"));
  }, [id]);

  const toggleChapterRead = (chapterId) => {
    let updated;
    if (chaptersRead.includes(chapterId)) {
      updated = chaptersRead.filter((c) => c !== chapterId);
    } else {
      updated = [...chaptersRead, chapterId];
    }
    setChaptersRead(updated);
    localStorage.setItem(`chaptersRead-${id}`, JSON.stringify(updated));
  };

  const handleAnswerChange = (questionId, answerIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
  };

  const handleQuizSubmit = () => {
    setQuizValidated(true);
  };

  if (!course) return <p>Chargement...</p>;

  const fileUrl = course.file
    ? `http://localhost/TamilConnect/uploads/${encodeURIComponent(course.file)}`
    : null;

  const totalChapters = course.parts?.flatMap((p) => p.chapters).length || 0;
  const progress =
    totalChapters > 0 ? Math.round((chaptersRead.length / totalChapters) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{course.title}</h1>
      <p>{course.description}</p>

      {course.is_premium === "1" && (
        <p className="text-red-600 font-semibold">
          🔒 Réservé aux membres Premium
        </p>
      )}

      {fileUrl && (
        <a
          href={fileUrl}
          download
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📥 Télécharger le cours (PDF)
        </a>
      )}

      {course.video_file_path && (
        <div>
          <h2 className="text-xl font-semibold mt-6">🎥 Vidéo du cours</h2>
          <video controls className="w-full rounded shadow">
            <source
              src={`http://localhost/TamilConnect/${course.video_file_path}`}
              type="video/mp4"
            />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </div>
      )}

      {/* Barre de progression */}
      {totalChapters > 0 && (
        <div className="mt-6">
          <div className="text-sm text-gray-700 mb-1">Progression : {progress}%</div>
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Table des matières interactive avec liens vers chapitres */}
      {course.parts?.map((part, i) => (
        <div key={i} className="mt-8">
          <h2 className="text-lg font-semibold mb-2">{part.title}</h2>
          <ul className="space-y-1 pl-4 list-disc">
            {part.chapters.map((ch) => (
              <li key={ch.id} className="flex items-center space-x-2">
                <Link
                  to={`/cours/${course.id}/${ch.id}`}
                  className={`hover:underline ${
                    chaptersRead.includes(ch.id)
                      ? "text-green-700 font-medium"
                      : "text-blue-700"
                  }`}
                  onClick={() => toggleChapterRead(ch.id)}
                >
                  {ch.title}
                </Link>
                {chaptersRead.includes(ch.id) && <span>✅</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Quiz */}
      {course.quiz && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">📝 {course.quiz.title}</h2>
          {course.quiz.questions.map((q) => (
            <div key={q.id} className="mb-4">
              <p className="font-medium">{q.question}</p>
              <ul className="space-y-1 mt-1">
                {q.answers.map((a, index) => (
                  <li key={index}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={index}
                        checked={selectedAnswers[q.id] === index}
                        onChange={() => handleAnswerChange(q.id, index)}
                        disabled={quizValidated}
                      />
                      <span
                        className={
                          quizValidated
                            ? a.is_correct
                              ? "text-green-600 font-bold"
                              : selectedAnswers[q.id] === index
                              ? "text-red-600"
                              : ""
                            : ""
                        }
                      >
                        {a.text}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {!quizValidated && (
            <button
              onClick={handleQuizSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded mt-4"
            >
              ✅ Valider mes réponses
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CoursDetail;
