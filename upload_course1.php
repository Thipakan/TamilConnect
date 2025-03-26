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

// Vérification si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $title = $_POST['title'];
    $description = $_POST['description'];
    $pdfFile = null;
    $videoFile = null;
    
    // Vérifier si le cours est premium
    $isPremium = isset($_POST['isPremium']) ? 1 : 0;

    // Vérifier si le fichier PDF a été téléchargé sans erreur
    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        $allowedTypes = ['application/pdf'];
        if (in_array($_FILES['file']['type'], $allowedTypes)) {
            $pdfFile = basename($_FILES['file']['name']);
            $uploadDir = "uploads/";
            $uploadFile = $uploadDir . $pdfFile;
            move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile);
        } else {
            echo "Seuls les fichiers PDF sont autorisés.";
            exit;
        }
    }

    // Vérifier si le fichier vidéo a été téléchargé sans erreur
    if (isset($_FILES['video']) && $_FILES['video']['error'] == 0) {
        $allowedVideoTypes = ['video/mp4', 'video/x-m4v', 'video/*'];
        if (in_array($_FILES['video']['type'], $allowedVideoTypes)) {
            $videoFile = basename($_FILES['video']['name']);
            $uploadDir = "uploads/";
            $uploadVideoFile = $uploadDir . $videoFile;
            move_uploaded_file($_FILES['video']['tmp_name'], $uploadVideoFile);
        } else {
            echo "Seuls les fichiers vidéo sont autorisés.";
            exit;
        }
    }

    // Insérer les informations dans la base de données avec is_premium
    $sql = "INSERT INTO courses (title, description, file, video_file, createdAt, updatedAt, teacherId, is_premium)
            VALUES ('$title', '$description', '$pdfFile', '$videoFile', NOW(), NOW(), 1, $isPremium)";

    if ($conn->query($sql) === TRUE) {
        echo "Le cours premium a été ajouté avec succès.";
    } else {
        echo "Erreur: " . $sql . "<br>" . $conn->error;
    }
}

// Fermer la connexion
$conn->close();
?>
