const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.post('/api/contact', (req, res) => {
    const { name, email, phone, inquiry, message } = req.body;
    
    // In a real app, you would validate inputs and save to database
    console.log('Contact form submission:', {
        name,
        email,
        phone,
        inquiry,
        message,
        timestamp: new Date().toISOString()
    });
    
    // Simulate successful form submission
    res.json({ success: true, message: 'Form submitted successfully' });
});

// Serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});