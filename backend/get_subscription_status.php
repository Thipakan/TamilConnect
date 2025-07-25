<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require_once 'config.php'; // adapte si nécessaire

$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    echo json_encode(['error' => 'Paramètre manquant : user_id']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT status, subscription_type, end_date FROM subscriptions WHERE userId = ? ORDER BY end_date DESC LIMIT 1");
    $stmt->execute([$userId]);
    $subscription = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($subscription) {
        echo json_encode($subscription);
    } else {
        echo json_encode([
            "status" => "inactive",
            "subscription_type" => null,
            "end_date" => null
        ]);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur serveur : ' . $e->getMessage()]);
}
