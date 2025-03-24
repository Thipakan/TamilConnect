<?php
// upgrade_to_premium.php

header('Content-Type: application/json');

// Paramètres de connexion à la base de données
$host = '127.0.0.1'; // Hôte de la base de données
$username = 'root'; // Nom d'utilisateur de la base de données
$password = ''; // Mot de passe de la base de données
$dbname = 'tamilconnect'; // Nom de la base de données

// Connexion à la base de données
$conn = new mysqli($host, $username, $password, $dbname);

// Vérifier la connexion
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Échec de la connexion à la base de données.']));
}

// Récupérer le token de l'utilisateur
$headers = getallheaders();
$token = $headers['Authorization'] ?? '';

// Vérifier si le token est valide et récupérer l'utilisateur
$user = getUserFromToken($token, $conn); // Fonction fictive pour récupérer l'utilisateur avec le token

if ($user) {
    // Mettre à jour l'utilisateur pour le rendre Premium
    $query = "UPDATE users SET is_premium = 1 WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $user['id']);
    $stmt->execute();

    // Vérification
    if ($stmt->affected_rows > 0) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'activation']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Utilisateur non trouvé']);
}

function getUserFromToken($token, $conn) {
    // Logique pour vérifier et récupérer l'utilisateur en fonction du token
    // Pour cet exemple, on suppose qu'on a un utilisateur dans la table `users` avec un token
    // On devrait vérifier le token contre une table de sessions ou d'authentification

    // Exemple : Rechercher l'utilisateur dans la base de données avec un token valide
    // Ici, on va juste récupérer un utilisateur avec un email fictif pour l'exemple
    $query = "SELECT id, email FROM users WHERE token = ?";  // Il te faut une logique pour la gestion des tokens
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $token);  // Assure-toi que le token est passé correctement
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();  // Retourne les données de l'utilisateur
    }
    
    return null;  // Aucun utilisateur trouvé avec ce token
}

$conn->close(); // Fermer la connexion à la base de données
?>
