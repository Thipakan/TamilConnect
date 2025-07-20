<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require_once 'connexion.php';

$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    echo json_encode(['error' => 'Paramètre user_id manquant']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT status, subscription_type, end_date FROM subscriptions WHERE userId = ? ORDER BY end_date DESC LIMIT 1");
    $stmt->execute([$userId]);
    $subscription = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($subscription) {
        echo json_encode($subscription);
    } else {
        echo json_encode(['status' => 'inactive']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
