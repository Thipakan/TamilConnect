document.addEventListener("keydown", function (event) {
    const focusableElements = Array.from(
        document.querySelectorAll("a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])")
    );

    const currentIndex = focusableElements.indexOf(document.activeElement);

    if (event.key === "ArrowDown") {
        event.preventDefault();
        let nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
    } 
    else if (event.key === "ArrowUp") {
        event.preventDefault();
        let prevIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
        focusableElements[prevIndex].focus();
    }
});



document.addEventListener("DOMContentLoaded", function () {
    console.log("Le DOM est chargé !");

    // Vérifier que les éléments existent avant d'ajouter les événements
    let panel = document.getElementById("accessibility-panel");
    let btn = document.getElementById("accessibility-btn");
    let toggleContrast = document.getElementById("toggle-contrast");
    let increaseText = document.getElementById("increase-text");
    let decreaseText = document.getElementById("decrease-text");
    let toggleFont = document.getElementById("toggle-font");

    if (!btn || !panel || !toggleContrast || !increaseText || !decreaseText || !toggleFont) {
        console.error("Certains éléments d'accessibilité sont introuvables !");
        return;
    }

    // Masquer le panneau au chargement
    panel.style.display = "none";

    // Bouton pour afficher / masquer le panneau
    btn.addEventListener("click", function () {
        panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });

    // Mode contraste élevé
    toggleContrast.addEventListener("click", function () {
        document.body.classList.toggle("high-contrast");
    });

    // Augmenter la taille du texte
    increaseText.addEventListener("click", function () {
        document.body.classList.remove("small-text");
        document.body.classList.add("large-text");
    });

    // Diminuer la taille du texte
    decreaseText.addEventListener("click", function () {
        document.body.classList.remove("large-text");
        document.body.classList.add("small-text");
    });

    // Changer la police pour une plus lisible
    toggleFont.addEventListener("click", function () {
        document.body.classList.toggle("readable-font");
    });

    // Navigation au clavier (flèche haut/bas)
    document.addEventListener("keydown", function (event) {
        const focusableElements = Array.from(
            document.querySelectorAll("a, button, input, textarea, select, [tabindex]:not([tabindex='-1'])")
        );

        const currentIndex = focusableElements.indexOf(document.activeElement);

        if (event.key === "ArrowDown") {
            event.preventDefault();
            let nextIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[nextIndex].focus();
        } 
        else if (event.key === "ArrowUp") {
            event.preventDefault();
            let prevIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
            focusableElements[prevIndex].focus();
        }
    });
});
