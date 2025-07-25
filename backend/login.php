<?php
// ✅ Headers CORS à ajouter AVANT toute sortie
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// ✅ Gérer les requêtes OPTIONS (pré-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connexion à la base de données
$host = 'localhost';
$dbname = 'tamilconnect';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion BDD']);
    exit;
}

// Récupérer les données JSON envoyées depuis React
$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// Requête SQL
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Vérification des identifiants
if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Connexion réussie.',
        'role' => $user['role'],
        'user' => $user // 👈 On renvoie tout l'utilisateur ici
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Email ou mot de passe incorrect.'
    ]);
}
?>
