<?php

// Načítanie premenných prostredia z .env súboru
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $envVariables = parse_ini_file($envFile);
    // Prihlasovacie údaje do databázy
    $servername = $envVariables['DB_HOST'];
    $username = $envVariables['DB_USER'];
    $password = $envVariables['DB_PASS'];
    $dbname = $envVariables['DB_NAME'];
} else {
    die("Chýbajúci konfiguračný súbor.");
}

// Pripojenie k databáze
$conn = new mysqli($servername, $username, $password, $dbname);

// Kontrola spojenia
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Chyba pripojenia k databáze."]));
    exit();
}
