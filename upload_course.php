<?php
// Connexion à la base de données
$servername = "localhost";
$username = "root";  // ou votre nom d'utilisateur
$password = "";      // ou votre mot de passe
$dbname = "tamilconnect";  // nom de votre base de données

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupérer les cours
$sql = "SELECT id, title, description, file FROM courses";
$result = $conn->query($sql);

$courses = [];
if ($result->num_rows > 0) {
    // Récupérer chaque ligne et ajouter à l'array $courses
    while($row = $result->fetch_assoc()) {
        $courses[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'file' => $row['file']
        ];
    }
}




// Vérification si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $title = $_POST['title'];
    $description = $_POST['description'];

    // Vérifier si le fichier a été téléchargé sans erreur
    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        // Vérifier si le fichier est un PDF
        $allowedTypes = ['application/pdf'];
        if (in_array($_FILES['file']['type'], $allowedTypes)) {
            // Déplacer le fichier dans un dossier spécifique
            $fileName = basename($_FILES['file']['name']);
            $uploadDir = "uploads/";  // Le dossier où vous voulez stocker les fichiers
            $uploadFile = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
                // Insérer les informations dans la base de données
                $sql = "INSERT INTO courses (title, description, file, createdAt, updatedAt, teacherId)
                        VALUES ('$title', '$description', '$fileName', NOW(), NOW(), 1)";  // `1` étant l'ID de l'enseignant

                if ($conn->query($sql) === TRUE) {
                    echo "Le cours a été ajouté avec succès.";
                } else {
                    echo "Erreur: " . $sql . "<br>" . $conn->error;
                }
            } else {
                echo "Erreur lors du téléchargement du fichier.";
            }
        } else {
            echo "Seuls les fichiers PDF sont autorisés.";
        }
    } else {
        echo "Erreur de téléchargement du fichier.";
    }
}



// Fermer la connexion
$conn->close();

// Renvoi des résultats en JSON
header('Content-Type: application/json');
echo json_encode($courses);
?>
