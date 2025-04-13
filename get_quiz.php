<?php
header("Content-Type: application/json");

try {
    $conn = new PDO("mysql:host=localhost;dbname=tamilconnect", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $quiz_id = isset($_GET['id']) ? intval($_GET['id']) : 1;

    $questions_stmt = $conn->prepare("SELECT * FROM questions WHERE quiz_id = ?");
    $questions_stmt->execute([$quiz_id]);

    $questions_data = [];

    while ($q = $questions_stmt->fetch(PDO::FETCH_ASSOC)) {
        $reponses_stmt = $conn->prepare("SELECT id, reponse FROM reponses WHERE question_id = ?");
        $reponses_stmt->execute([$q['id']]);
        $q['reponses'] = $reponses_stmt->fetchAll(PDO::FETCH_ASSOC);
        $questions_data[] = $q;
    }

    echo json_encode([
        "success" => true,
        "questions" => $questions_data
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur : " . $e->getMessage()
    ]);
}
?>
