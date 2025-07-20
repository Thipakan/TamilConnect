<?php
header('Content-Type: application/json');

// Connexion à la base de données
$servername = "localhost";
$username = "root"; 
$password = "";  
$dbname = "tamilconnect";

$conn = new mysqli($servername, $username, $password, $dbname);

// Vérification de la connexion
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Récupérer TOUS les cours (premium et non-premium)
$sql = "SELECT id, title, description, file, video_file, is_premium FROM courses";
$result = $conn->query($sql);

$courses = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
}

echo json_encode($courses);

$conn->close();
?>
