<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $dob = trim($_POST["dob"]);

    $errors = [];

    if (strlen($name) < 3) {
        $errors[] = "Name must be at least 3 characters long.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email address.";
    }
    if (empty($dob)) {
        $errors[] = "Date of Birth is required.";
    }

    // Start HTML Output
    echo "<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Form Response</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #8e44ad, #3498db);
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(10px);
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.3);
                text-align: center;
                width: 90%;
                max-width: 500px;
            }
            h2 {
                margin-bottom: 20px;
                font-size: 28px;
            }
            ul {
                text-align: left;
                margin: 15px 0;
                padding-left: 20px;
            }
            li {
                color: #ffeb3b;
                font-size: 16px;
                margin-bottom: 8px;
            }
            .info {
                font-size: 18px;
                margin-bottom: 15px;
            }
            a.button {
                display: inline-block;
                padding: 12px 20px;
                background: #fff;
                color: #8e44ad;
                font-weight: bold;
                text-decoration: none;
                border-radius: 8px;
                transition: all 0.3s;
            }
            a.button:hover {
                background: #ffeb3b;
                color: #000;
            }
        </style>
    </head>
    <body>
        <div class='container'>";
    
    if (empty($errors)) {
        $_SESSION['student'] = [
            'name' => $name,
            'email' => $email,
            'dob' => $dob
        ];

        echo "<h2>Form Submitted Successfully!</h2>";
        echo "<p class='info'><strong>Name:</strong> $name</p>";
        echo "<p class='info'><strong>Email:</strong> $email</p>";
        echo "<p class='info'><strong>Date of Birth:</strong> $dob</p>";
    } else {
        echo "<h2>⚠ Errors Found:</h2><ul>";
        foreach ($errors as $error) {
            echo "<li>$error</li>";
        }
        echo "</ul>";
    }

    echo "<p><a href='javascript:history.back()' class='button'>Go Back</a></p>
        </div>
    </body>
    </html>";
}
?>
