<?php
session_start();
header('Content-Type: application/json');

// Connexion à la BDD
$host = '127.0.0.1';
$db = 'tamilconnect';
$user = 'root'; // adapte selon ta config
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur connexion BDD']);
    exit;
}

// Supposons que user_id est stocké en session
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Utilisateur non connecté']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Récupérer profil utilisateur
$stmtProfile = $pdo->prepare("SELECT first_name, last_name, level, languages FROM student_profiles WHERE user_id = ?");
$stmtProfile->execute([$user_id]);
$profile = $stmtProfile->fetch();

// Récupérer statut abonnement actif
$stmtSub = $pdo->prepare("SELECT status, subscription_type, start_date, end_date FROM subscriptions WHERE userId = ? AND status = 'active' ORDER BY end_date DESC LIMIT 1");
$stmtSub->execute([$user_id]);
$subscription = $stmtSub->fetch();

// Récupérer cours premium disponibles
$stmtCourses = $pdo->query("SELECT id, title, description FROM courses WHERE is_premium = 1");
$premiumCourses = $stmtCourses->fetchAll();

echo json_encode([
    'profile' => $profile ?: null,
    'subscription' => $subscription ?: null,
    'premiumCourses' => $premiumCourses,
]);
