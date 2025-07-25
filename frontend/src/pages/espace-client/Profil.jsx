import { useEffect, useState } from "react";

function Profil() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      console.error("Erreur parsing localStorage user", err);
    }

    if (!user?.id) {
      setError("Utilisateur non connecté");
      setLoading(false);
      return;
    }

    fetch(`http://localhost/tamilconnect/backend/get_student_profile.php?user_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setFormData(data); // initialiser le formulaire avec les données
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement profil", err);
        setError("Impossible de charger les infos du profil.");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost/tamilconnect/backend/update_student_profile.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSuccessMsg("Profil mis à jour avec succès !");
          setProfile(formData); // mettre à jour l'affichage
        } else {
          setError("Erreur lors de la mise à jour.");
        }
      })
      .catch(err => {
        console.error(err);
        setError("Une erreur est survenue.");
      });
  };

  if (loading) return <p>Chargement du profil...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4">👤 Mon Profil</h2>

      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Nom :</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Niveau :</label>
          <input
            type="text"
            name="level"
            value={formData.level || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Langues :</label>
          <input
            type="text"
            name="languages"
            value={formData.languages || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          💾 Enregistrer
        </button>
      </form>
    </div>
  );
}

export default Profil;
