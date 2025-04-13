<?php
header("Content-Type: application/json");
$conn = new PDO("mysql:host=localhost;dbname=tamilconnect", "root", "");

$quizzes = $conn->query("SELECT * FROM quizzes")->fetchAll(PDO::FETCH_ASSOC);
echo json_encode(['success' => true, 'quizzes' => $quizzes]);


?>