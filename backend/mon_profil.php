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


session_start();
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

require_once('config.php'); // ou ta connexion à la base

$userId = $_SESSION['user_id'];
$sql = "SELECT email, role, createdAt, premium_status FROM users WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$userId]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon Profil</title>
    <style>
        body { font-family: Arial; background: #f0f2f5; padding: 50px; }
        .profil-card {
            background: #fff;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            margin: auto;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        h1 { text-align: center; }
        .info { margin: 15px 0; font-size: 16px; }
        .label { font-weight: bold; color: #555; }
        .logout-btn {
            display: block;
            margin: 30px auto 0;
            text-align: center;
            background: #dc3545;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
        }
        .logout-btn:hover { background: #c82333; }
    </style>
</head>
<body>
    <div class="profil-card">
        <h1>Mon Profil</h1>
        <div class="info"><span class="label">Email :</span> <?= htmlspecialchars($user['email']) ?></div>
        <div class="info"><span class="label">Rôle :</span> <?= htmlspecialchars($user['role']) ?></div>
        <div class="info"><span class="label">Statut Premium :</span> <?= htmlspecialchars($user['premium_status']) ?></div>
        <div class="info"><span class="label">Inscription :</span> <?= date('d/m/Y', strtotime($user['createdAt'])) ?></div>

        <a href="logout.php" class="logout-btn">Se déconnecter</a>
    </div>
</body>
</html>
