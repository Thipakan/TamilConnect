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
$sql = "SELECT id, title, description, file, video_file FROM courses";
$result = $conn->query($sql);

$courses = [];
if ($result->num_rows > 0) {
    // Récupérer chaque ligne et ajouter à l'array $courses
    while($row = $result->fetch_assoc()) {
        $courses[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'description' => $row['description'],
            'file' => $row['file'],
            'video_file' => $row['video_file']
        ];
    }
}

// Vérification si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $title = $_POST['title'];
    $description = $_POST['description'];
    $pdfFile = null;
    $videoFile = null;

    // Vérifier si le fichier PDF a été téléchargé sans erreur
    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        // Vérifier si le fichier est un PDF
        $allowedTypes = ['application/pdf'];
        if (in_array($_FILES['file']['type'], $allowedTypes)) {
            // Déplacer le fichier PDF dans un dossier spécifique
            $pdfFile = basename($_FILES['file']['name']);
            $uploadDir = "uploads/";
            $uploadFile = $uploadDir . $pdfFile;

            if (!move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
                echo "Erreur lors du téléchargement du fichier PDF.";
            }
        } else {
            echo "Seuls les fichiers PDF sont autorisés.";
        }
    }

    // Vérifier si le fichier vidéo a été téléchargé sans erreur
    if (isset($_FILES['video']) && $_FILES['video']['error'] == 0) {
        // Vérifier si le fichier est une vidéo
        $allowedVideoTypes = ['video/mp4', 'video/x-m4v', 'video/*'];
        if (in_array($_FILES['video']['type'], $allowedVideoTypes)) {
            // Déplacer le fichier vidéo dans un dossier spécifique
            $videoFile = basename($_FILES['video']['name']);
            $uploadDir = "uploads/";
            $uploadVideoFile = $uploadDir . $videoFile;

            if (!move_uploaded_file($_FILES['video']['tmp_name'], $uploadVideoFile)) {
                echo "Erreur lors du téléchargement de la vidéo.";
            }
        } else {
            echo "Seuls les fichiers vidéo sont autorisés.";
        }
    }

    // Insérer les informations dans la base de données
    $sql = "INSERT INTO courses (title, description, file, video_file, createdAt, updatedAt, teacherId)
            VALUES ('$title', '$description', '$pdfFile', '$videoFile', NOW(), NOW(), 1)";  // `1` étant l'ID de l'enseignant

    if ($conn->query($sql) === TRUE) {
        echo "Le cours a été ajouté avec succès.";
    } else {
        echo "Erreur: " . $sql . "<br>" . $conn->error;
    }
}

// Fermer la connexion
$conn->close();

// Renvoi des résultats en JSON
header('Content-Type: application/json');
echo json_encode($courses);
?>
