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
session_destroy();
header("Location: login.php");
exit();
