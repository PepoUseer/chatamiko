<?php
header('Content-Type: application/json');

require __DIR__ . '/../private/db_connection.php';
require __DIR__ . '/../private/recaptcha.php';

// Najprv overíme reCAPTCHA
if (!verifyRecaptcha()) {
    echo json_encode(["status" => "error", "message" => "Prosím, potvrďte, že nie ste robot."]);
    exit();
}

// Funkcia na overenie existencie e-mailovej domény
function validateEmailDomain($email)
{
    // Extrahujeme doménu z e-mailu
    $domain = substr(strrchr($email, "@"), 1);

    // Kontrola, či doména existuje a má MX záznamy
    if (!checkdnsrr($domain, "MX")) {
        return false; // Doména nemá MX záznamy
    }

    return true; // Doména je platná
}

$email = isset($_POST['email']) ? trim($_POST['email']) : null;

if (!$email) {
    echo json_encode(["status" => "error", "message" => "E-mail nebol odoslaný."]);
    exit();
}

// Overenie formátu e-mailu
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Neplatný formát e-mailu."]);
    exit();
}

// Overenie existencie domény
if (!validateEmailDomain($email)) {
    echo json_encode(["status" => "error", "message" => "E-mailová doména neexistuje alebo nepodporuje prijímanie e-mailov."]);
    exit();
}

// Skontrolujeme či email už existuje
$checkQuery = $conn->prepare("SELECT id FROM subscribers WHERE email = ?");
$checkQuery->bind_param("s", $email);
$checkQuery->execute();
$result = $checkQuery->get_result();

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Tento email je už prihlásený."]);
    exit();
}

//Ak email neexistuje, vložíme ho do databázy
$insertQuery = $conn->prepare("INSERT INTO subscribers (email) VALUES (?)");
$insertQuery->bind_param("s", $email);

if ($insertQuery->execute()) {
    echo json_encode(["status" => "success", "message" => "E-mail bol úspešne prihlásený."]);
} else {
    echo json_encode(["status" => "error", "message" => "E-mail sa nepodarilo prihlásiť."]);
}

$conn->close();
