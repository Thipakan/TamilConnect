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
