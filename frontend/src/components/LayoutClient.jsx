import { NavLink, Outlet } from "react-router-dom";

function LayoutClient() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h1 className="text-xl font-bold mb-6">TamilConnect</h1>
        <nav className="space-y-4">
          <NavLink to="/espace-client" end className="block">🏠 Dashboard</NavLink>
          <NavLink to="/espace-client/cours" className="block">📚 Cours</NavLink>
          <NavLink to="/espace-client/profil" className="block">👤 Profil</NavLink>
          <NavLink to="/espace-client/abonnement" className="block">💎 Abonnement</NavLink>
          <NavLink to="/espace-client/quiz" className="block">🧠 Quiz</NavLink>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100 p-8">
        <Outlet /> {/* Ici seront rendues les sous-pages */}
      </main>
    </div>
  );
}

export default LayoutClient;
