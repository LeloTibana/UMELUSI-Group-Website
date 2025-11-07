const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Setup
// Change origin to your final domain when deploying (e.g., 'https://www.umelusigroup.com')
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow requests from your local VSCode Live Server
    methods: 'POST'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 1. Nodemailer Transporter
let transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' or switch to a professional service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 2. Form Submission Endpoint
app.post('/submit-contact', async (req, res) => {
    // These keys match the 'name' attributes we will add to the HTML form fields
    const { contactName, contactEmail, contactPhone, contactOffice, contactInterest } = req.body;
    
    if (!contactName || !contactEmail || !contactMessage) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // The recipient of the inquiry
            subject: `New Umelusi Contact Inquiry: ${contactSubject || 'General Contact'}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${contactName}</p>
                <p><strong>Email:</strong> ${contactEmail}</p>
                <p><strong>Phone:</strong> ${contactPhone}</p>
                <p><strong>Office:</strong> ${contactOffice}</p>
                <p><strong>Interest:</strong> ${contactInterest}</p>
                `
        };

        await transporter.sendMail(mailOptions);
        
        // Success response
        res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Nodemailer Error:', error);
        res.status(500).json({ message: 'Server error: Failed to send message.' });
    }
});

// 3. Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});