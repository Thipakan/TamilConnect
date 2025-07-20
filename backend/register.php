<?php

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Pré-vol (préflight) OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}



// Connexion à la base de données
$host = '127.0.0.1';
$db   = 'tamilconnect';
$user = 'root';       // à adapter
$pass = '';           // à adapter
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur de connexion à la base de données']);
    exit;
}

// Récupérer les données JSON envoyées
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Données invalides']);
    exit;
}

// Validation simple (à améliorer selon besoins)
$email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
$password = $data['password'] ?? '';
$role = 'student'; // fixe ou récupéré selon logique

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(['error' => 'Email et mot de passe requis']);
    exit;
}

// Champs pour student_profiles
$first_name = $data['first_name'] ?? null;
$last_name = $data['last_name'] ?? null;
$birth_date = $data['birth_date'] ?? null; // format YYYY-MM-DD
$gender = $data['gender'] ?? null; // Homme, Femme, Autre
$country = $data['country'] ?? null;
$level = $data['level'] ?? null; // Débutant, Intermédiaire, Avancé
$languages = $data['languages'] ?? null; // chaîne, ex: "Français,Anglais"
$goals = $data['goals'] ?? null; // chaîne, ex: "Lire,Écrire,Parler"
$motivation = $data['motivation'] ?? null;

// Hash du mot de passe
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

try {
    // Démarrer une transaction
    $pdo->beginTransaction();

    // Insérer dans users
    $stmtUser = $pdo->prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)");
    $stmtUser->execute([$email, $passwordHash, $role]);

    // Récupérer l'id inséré
    $userId = $pdo->lastInsertId();

    // Insérer dans student_profiles
    $stmtProfile = $pdo->prepare("
        INSERT INTO student_profiles (
            user_id, first_name, last_name, birth_date, gender, country, level, languages, goals, motivation
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmtProfile->execute([
        $userId,
        $first_name,
        $last_name,
        $birth_date,
        $gender,
        $country,
        $level,
        $languages,
        $goals,
        $motivation
    ]);

    // Valider la transaction
    $pdo->commit();

    http_response_code(201);
    echo json_encode(['message' => 'Utilisateur créé avec succès']);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de l\'inscription', 'details' => $e->getMessage()]);
}