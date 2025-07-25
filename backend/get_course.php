<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tamilconnect";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if (!isset($_GET['id'])) {
    echo json_encode(["error" => "ID du cours manquant"]);
    exit();
}

$id = intval($_GET['id']);

// Récupérer les infos du cours
$sql = "SELECT id, title, description, file, video_file, is_premium FROM courses WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "Cours non trouvé"]);
    exit();
}

$course = $result->fetch_assoc();
$stmt->close();

// Récupérer les chapitres
$sql = "SELECT part_number, chapter_number, title, content FROM chapters WHERE course_id = ? ORDER BY part_number, chapter_number";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

$parts = [];
$content = [];

while ($row = $result->fetch_assoc()) {
    $partNum = $row['part_number'];
    $chapterNum = $row['chapter_number'];
    $chapterId = "p{$partNum}c{$chapterNum}";

    if (!isset($parts[$partNum])) {
        $parts[$partNum] = [
            "title" => "Partie $partNum",
            "chapters" => []
        ];
    }

    $parts[$partNum]["chapters"][] = [
        "id" => $chapterId,
        "title" => $row["title"]
    ];

    $content[$chapterId] = $row["content"];
}

ksort($parts); // Trier les parties
$parts = array_values($parts); // Réindexer

// Fusionner tout dans un objet final
$response = [
    "id" => $course["id"],
    "title" => $course["title"],
    "description" => $course["description"],
    "file" => $course["file"],
    "video_file" => $course["video_file"],
    "is_premium" => $course["is_premium"],
    "parts" => $parts,
    "content" => $content
];

echo json_encode($response, JSON_UNESCAPED_UNICODE);

$stmt->close();
$conn->close();
?>
