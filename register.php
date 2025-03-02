<?php
// Paramètres de connexion à la base de données
$host = "localhost";
$dbname = "tamilconnect";
$username = "root";
$password = ""; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die(json_encode(["message" => "Erreur de connexion à la base de données"]));
}

// Vérifier si la requête est bien en POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["email"], $data["password"])) {
        echo json_encode(["message" => "Données invalides"]);
        exit;
    }

    $email = filter_var($data["email"], FILTER_SANITIZE_EMAIL);
    $password = password_hash($data["password"], PASSWORD_DEFAULT);
    $role = "student"; // Par défaut, tous les nouveaux utilisateurs sont étudiants
    $createdAt = $updatedAt = date("Y-m-d H:i:s");

    // Vérifier si l'email existe déjà
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo json_encode(["message" => "Cet email est déjà utilisé"]);
        exit;
    }

    // Insérer le nouvel utilisateur
    $stmt = $pdo->prepare("INSERT INTO users (email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)");
    if ($stmt->execute([$email, $password, $role, $createdAt, $updatedAt])) {
        echo json_encode(["message" => "Inscription réussie !"]);
    } else {
        echo json_encode(["message" => "Erreur lors de l'inscription"]);
    }
} else {
    echo json_encode(["message" => "Méthode non autorisée"]);
}
?>
