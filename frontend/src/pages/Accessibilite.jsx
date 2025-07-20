import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Accessibilite = () => {
  const [panelVisible, setPanelVisible] = useState(false);

  // Gérer les actions clavier pour navigation (flèches haut/bas)
  useEffect(() => {
    const handleKeyNavigation = (event) => {
      const focusable = Array.from(
        document.querySelectorAll(
          "a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])"
        )
      );
      const currentIndex = focusable.indexOf(document.activeElement);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = (currentIndex + 1) % focusable.length;
        focusable[nextIndex]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        const prevIndex = (currentIndex - 1 + focusable.length) % focusable.length;
        focusable[prevIndex]?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyNavigation);
    return () => document.removeEventListener("keydown", handleKeyNavigation);
  }, []);

  // Fonctions d'accessibilité
  const toggleContrast = () => {
    document.body.classList.toggle("high-contrast");
  };

  const increaseText = () => {
    document.body.classList.remove("small-text");
    document.body.classList.add("large-text");
  };

  const decreaseText = () => {
    document.body.classList.remove("large-text");
    document.body.classList.add("small-text");
  };

  const toggleFont = () => {
    document.body.classList.toggle("readable-font");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        id="accessibility-btn"
        onClick={() => setPanelVisible(!panelVisible)}
        className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-800"
      >
        Accessibilité
      </button>

      {panelVisible && (
        <div
          id="accessibility-panel"
          className="mt-2 p-4 bg-white border rounded-lg shadow-lg space-y-2 w-64"
        >
          <h2 className="text-lg font-semibold mb-2">Options d'accessibilité</h2>
          <button onClick={toggleContrast} className="w-full bg-gray-100 py-2 rounded hover:bg-gray-200">
            Contraste élevé
          </button>
          <button onClick={increaseText} className="w-full bg-gray-100 py-2 rounded hover:bg-gray-200">
            Augmenter texte
          </button>
          <button onClick={decreaseText} className="w-full bg-gray-100 py-2 rounded hover:bg-gray-200">
            Diminuer texte
          </button>
          <button onClick={toggleFont} className="w-full bg-gray-100 py-2 rounded hover:bg-gray-200">
            Police lisible
          </button>
        </div>
      )}
    </div>
  );
};

export default Accessibilite;
