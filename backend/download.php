// download.php?file=filename.pdf
session_start();
require 'db.php'; // connection MySQL
require 'auth.php'; // vérifie session et récupère user

$file = basename($_GET['file']);

$query = $pdo->prepare("SELECT * FROM courses WHERE file = ?");
$query->execute([$file]);
$course = $query->fetch();

if ($course['is_premium'] && $_SESSION['user']['premium_status'] != 'active') {
    http_response_code(403);
    die("Ce fichier est réservé aux membres premium.");
}

$filepath = __DIR__ . "/uploads/$file";
if (file_exists($filepath)) {
    header('Content-Type: application/pdf');
    header("Content-Disposition: attachment; filename=\"$file\"");
    readfile($filepath);
    exit;
} else {
    http_response_code(404);
    echo "Fichier introuvable.";
}
