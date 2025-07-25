import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch {
      console.error("Erreur parsing localStorage user");
    }

    if (user?.id) {
      fetch(`http://localhost/tamilconnect/backend/get_student_profile.php?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          console.log("Profile reçu :", data);
          setProfile(data);
        })
        .catch(err => console.error("Erreur chargement profil", err));

      fetch(`http://localhost/tamilconnect/backend/get_subscription_status.php?user_id=${user.id}`)
        .then(res => res.json())
        .then(data => {
          console.log("Subscription reçu :", data);
          setSubscription(data);
        })
        .catch(err => console.error("Erreur chargement abonnement", err));

      setProgress(Math.floor(Math.random() * 40 + 30));
    }
  }, []);

  if (!profile || !subscription) return <p>Chargement...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold mb-6">Mon espace</h2>
        <nav className="flex flex-col gap-3 text-gray-700">
          <Link to="/espace-client/cours" className="hover:text-blue-600">📚 Mes cours</Link>
          <Link to="/espace-client/quiz" className="hover:text-blue-600">🧠 Quiz</Link>
          <Link to="/espace-client/abonnement" className="hover:text-blue-600">💎 Abonnement</Link>
          <Link to="/espace-client/profil" className="hover:text-blue-600">👤 Mon profil</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-2">
          Bienvenue, {profile.first_name} {profile.last_name} 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Niveau : <strong>{profile.level}</strong> | Langues : {profile.languages}
        </p>

        <div className="bg-white p-5 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-2">🎯 Ma progression</h2>
          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-4"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm mt-2 text-gray-600">{progress}% complétés</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-2">💎 Mon abonnement</h2>
          <p className="text-gray-700">
            Statut :{" "}
            <span className={subscription.status === "active" ? "text-green-600" : "text-red-600"}>
              {subscription.status === "active" ? "Actif" : "Inactif"}
            </span>
          </p>
          {subscription.subscription_type && subscription.end_date && (
            <p className="text-gray-700">
              Type : {subscription.subscription_type} — expire le{" "}
              {new Date(subscription.end_date).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">📚 Cours disponibles</h2>
            <p className="mb-2">Continuez votre apprentissage.</p>
            <Link to="/espace-client/cours" className="text-blue-600 underline">Voir mes cours</Link>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">🧠 Quiz</h2>
            <p className="mb-2">Testez vos connaissances !</p>
            <Link to="/espace-client/quiz" className="text-blue-600 underline">Faire un quiz</Link>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">👤 Mon profil</h2>
            <p className="mb-2">Modifier mes informations personnelles.</p>
            <Link to="/espace-client/profil" className="text-blue-600 underline">Voir mon profil</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
