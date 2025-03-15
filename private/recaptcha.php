<?php

function verifyRecaptcha()
{
    // Načítanie premenných prostredia z .env súboru
    $envFile = __DIR__ . '/.env';
    if (file_exists($envFile)) {
        $envVariables = parse_ini_file($envFile);
        // Prihlasovacie údaje do databázy
        $secretKey = $envVariables['RECAPTCHA_SECRET'];
    } else {
        // Ak chýba konfiguračný súbor, môžeme považovať overenie za neúspešné
        echo "chýbajúci konfiguračný kód pre recaptchu.";
        return false;
    }

    // 1) Získame token, ktorý poslal klient
    $captchaResponse = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';

    if (!$captchaResponse) {
        return false;
    }

    // 2) Zavoláme Google reCAPTCHA API

    $verifyUrl = "https://www.google.com/recaptcha/api/siteverify"
        . "?secret=" . urlencode($secretKey)
        . "&response=" . urldecode($captchaResponse);

    $ch = curl_init($verifyUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $responseData = curl_exec($ch);
    curl_close($ch);

    $captchaObj = json_decode($responseData, true); // decode JSON -> pole

    // Pridajte dočasné logovanie alebo var_dump:
    error_log("RECAPTCHA RESPONSE: " . print_r($captchaObj, true));

    $captchaResponse = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';
    if (!$captchaResponse) {
        return false;
    }

    return isset($captchaObj['success']) && $captchaObj['success'];
}
