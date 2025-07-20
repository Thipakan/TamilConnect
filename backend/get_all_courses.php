<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Si tu acceptes des requêtes POST/PUT avec des en-têtes personnalisés :
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Si c'est un preflight request (OPTIONS), on la termine ici
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


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
