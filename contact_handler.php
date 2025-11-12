<?php
// Set the content type to JSON so the JavaScript client knows how to interpret the response
header('Content-Type: application/json');

// --- IMPORTANT NOTE FOR LOCAL DEVELOPMENT (XAMPP/LAMPP) ---
// This script simulates a successful form submission for local testing purposes.
// The "server failed to send the email" error occurs because local XAMPP setups
// usually do not have a live SMTP server configured to actually send mail.
// By returning a mock success response, you can fully test your form's frontend logic
// and notifications without getting stuck on the email sending failure.
// -----------------------------------------------------------

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. You would normally validate and process form data here:
    // $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    // $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    // ... logic for database insertion or actual email sending ...

    // 2. Simulate a small processing delay for realism
    sleep(1); 
    
    // 3. Return the success JSON response that the JavaScript is expecting
    echo json_encode([
        'success' => true,
        // The message below will be displayed by your JavaScript showNotification function
        'message' => 'Your inquiry was successfully received (LOCAL MOCK SUBMISSION).'
    ]);

} else {
    // Handle non-POST requests gracefully
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>