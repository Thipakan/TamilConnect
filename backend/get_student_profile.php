<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
require_once 'config.php'; // change ce nom si ton fichier est ailleurs

$userId = $_GET['user_id'] ?? null;

if (!$userId) {
    echo json_encode(['error' => 'Paramètre manquant : user_id']);
    exit;
}

// On récupère les données du profil étudiant
try {
    $stmt = $pdo->prepare("SELECT sp.first_name, sp.last_name, sp.level, sp.languages, u.email 
                           FROM student_profiles sp
                           JOIN users u ON sp.user_id = u.id
                           WHERE sp.user_id = ?");
    $stmt->execute([$userId]);
    $profile = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($profile) {
        echo json_encode($profile);
    } else {
        echo json_encode(['error' => 'Profil non trouvé']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Erreur serveur : ' . $e->getMessage()]);
}
