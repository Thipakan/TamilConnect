<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - TamilConnect</title>
    <link rel="stylesheet" href="styles.css">
    <script src="accessibilite.js"></script>

</head>

<body>
    <header>
        <div class="logo">
            <h1>TamilConnect</h1>
        </div>
        <nav>
            <ul>
                <li><a href="TamilConnect.html">Accueil</a></li>
                <li><a href="a_propos.html">À propos</a></li>
                <li><a href="histoire.html">Histoire des Tamouls</a></li>
                <li><a href="cours.html">Cours</a></li>
                <li><a href="connexion.html">Se connecter</a></li>
                <li><a href="inscription.html">S'inscrire</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section class="signup">
        <h2>Inscription</h2>
        <form id="signup-form">
            <label for="username">Nom d'utilisateur :</label>
            <input type="text" id="username" name="username" required>
            
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" required>
            
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required>
            
            <button type="submit">S'inscrire</button>
        </form>
        <p>Déjà un compte ? <a href="connexion.html">Connectez-vous</a></p>
    </section>
    

    <button id="accessibility-btn">Accessibilité</button>
    <div id="accessibility-panel">
        <h2>Options d'accessibilité</h2>
        <button id="toggle-contrast">Contraste élevé</button>
        <button id="increase-text">Augmenter texte</button>
        <button id="decrease-text">Diminuer texte</button>
        <button id="toggle-font">Police lisible</button>
    </div>

    <footer>
        <p>&copy; 2025 TamilConnect. Tous droits réservés.</p>
    </footer>

    <script>
        document.getElementById("signup-form").addEventListener("submit", async function(event) {
            event.preventDefault();
            const formData = {
                username: document.getElementById("username").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            };
            
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            alert(data.message);
        });
    </script>
</body>

</html>