<?php

function verifyRecaptcha()
{
    // Načítanie premenných prostredia z .env súboru
    $envFile = __DIR__ . '/.env';
    if (file_exists($envFile)) {
        $envVariables = parse_ini_file($envFile);
        $secretKey = $envVariables['RECAPTCHA_SECRET'];
    } else {
        echo "chýbajúci konfiguračný kód pre recaptchu.";
        return false;
    }

    $captchaResponse = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';

    if (!$captchaResponse) {
        return false;
    }

    $verifyUrl = "https://www.google.com/recaptcha/api/siteverify"
        . "?secret=" . urlencode($secretKey)
        . "&response=" . urldecode($captchaResponse);

    $ch = curl_init($verifyUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $responseData = curl_exec($ch);
    curl_close($ch);

    $captchaObj = json_decode($responseData, true); // decode JSON -> pole

    error_log("RECAPTCHA RESPONSE: " . print_r($captchaObj, true));

    $captchaResponse = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';
    if (!$captchaResponse) {
        return false;
    }

    return isset($captchaObj['success']) && $captchaObj['success'];
}
