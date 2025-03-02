<?php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'tamilconnect';
$username = 'root';  // Utilise 'root' par défaut pour XAMPP/WAMP
$password = '';  // Si tu utilises XAMPP, il est vide par défaut
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo 'Erreur de connexion : ' . $e->getMessage();
    exit;
}

// Récupérer les données du formulaire en JSON
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'];
$password = $data['password'];

// Requête pour récupérer l'utilisateur
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->bindParam(':email', $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Vérifier si l'utilisateur existe et si le mot de passe est correct
if ($user && password_verify($password, $user['password'])) {
    // Répondre avec les informations de l'utilisateur
    $response = [
        'success' => true,
        'message' => 'Connexion réussie.',
        'role' => $user['role'] // Récupère le rôle de l'utilisateur (enseignant ou élève)
    ];
    echo json_encode($response);
} else {
    // Si les identifiants sont incorrects
    $response = [
        'success' => false,
        'message' => 'Email ou mot de passe incorrect.'
    ];
    echo json_encode($response);
}
?>
