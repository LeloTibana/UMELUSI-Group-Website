<?php
// Set the content type to JSON
header('Content-Type: application/json');

// Define the recipient email address (CHANGE THIS TO YOUR EMAIL)
$to = 'your-business-email@umelusigroup.com'; 

// Define a safe origin for security (Optional, but good practice)
// header("Access-Control-Allow-Origin: *"); 

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed. This script only accepts POST requests.']);
    exit;
}

// 1. Collect and Sanitize Data
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING); // Use 'subject' from modal, or 'service' from main form
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

// If using the main contact form, the service field is named differently
if (empty($subject)) {
    // Attempt to retrieve the service field from the main form if 'subject' is empty (from modal)
    $subject = filter_input(INPUT_POST, 'service', FILTER_SANITIZE_STRING);
}


// 2. Validate Data
if (empty($name) || empty($email) || empty($subject) || empty($message) || $email === false) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Please fill out all required fields with valid information.']);
    exit;
}

// 3. Email Construction
$email_subject = "Umelusi Group Website Inquiry: " . $subject;
$email_body = "You have received a new message from the Umelusi Group website contact form.\n\n";
$email_body .= "Name: " . $name . "\n";
$email_body .= "Email: " . $email . "\n";
$email_body .= "Service/Subject: " . $subject . "\n\n";
$email_body .= "Message:\n" . $message;

$headers = "From: Website Contact <no-reply@umelusigroup.com>" . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// 4. Send Email
if (mail($to, $email_subject, $email_body, $headers)) {
    http_response_code(200); // OK
    echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent.']);
} else {
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'The server failed to send the email. Please try again later.']);
}
?>