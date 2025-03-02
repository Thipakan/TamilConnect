document.addEventListener("DOMContentLoaded", async () => {
    const userToken = localStorage.getItem("token");

    if (!userToken) {
        window.location.href = "connexion.html";
        return;
    }

    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "connexion.html";
    });

    const courseForm = document.getElementById("course-form");
    courseForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const fileInput = document.getElementById("file").files[0];

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", fileInput);

        const response = await fetch("http://localhost/tamilconnect/login.php", {
            method: "POST",
            headers: { "Authorization": `Bearer ${userToken}` },
            body: formData,
        });

        const data = await response.json();
        alert(data.message);
        loadCourses();
    });

    async function loadCourses() {
        const response = await fetch("http://localhost/tamilconnect/login.php", {
            headers: { "Authorization": `Bearer ${userToken}` },
        });
        const courses = await response.json();

        const courseList = document.getElementById("courses-list");
        courseList.innerHTML = "";

        courses.forEach(course => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${course.title}</strong> - <a href="http://localhost/tamilconnect/${course.file}" download>Télécharger</a>`;
            courseList.appendChild(li);
        });
    }

    loadCourses();
});
