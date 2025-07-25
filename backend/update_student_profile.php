<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'config.php'; // pour $pdo

$data = json_decode(file_get_contents("php://input"), true);

if (
    !isset($data['id']) ||
    !isset($data['first_name']) ||
    !isset($data['last_name']) ||
    !isset($data['level']) ||
    !isset($data['languages']) ||
    !isset($data['email'])
) {
    echo json_encode(['success' => false, 'message' => 'Champs manquants']);
    exit;
}

$userId = $data['id'];
$firstName = $data['first_name'];
$lastName = $data['last_name'];
$level = $data['level'];
$languages = $data['languages'];
$email = $data['email'];

try {
    // Met à jour le profil de l'étudiant
    $stmt1 = $pdo->prepare("UPDATE student_profiles SET first_name = ?, last_name = ?, level = ?, languages = ? WHERE user_id = ?");
    $stmt1->execute([$firstName, $lastName, $level, $languages, $userId]);

    // Met à jour l'email dans la table users
    $stmt2 = $pdo->prepare("UPDATE users SET email = ? WHERE id = ?");
    $stmt2->execute([$email, $userId]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur SQL : ' . $e->getMessage()]);
}
