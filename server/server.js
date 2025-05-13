const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk'); // Add chalk for colorful console output

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8081;

// Agriculture theme colors
const theme = {
    primary: '#2E7D32', // Forest Green
    secondary: '#81C784', // Light Green
    accent: '#DCEDC8', // Very Light Green
    text: '#33691E', // Dark Green
    background: '#F1F8E9' // Pale Green
};

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// API for theme
app.get('/api/theme', (req, res) => {
    res.json({ theme });
});

// API Routes
app.post('/api/contact', (req, res) => {
    const { name, email, phone, inquiry, message } = req.body;
    
    // In a real app, you would validate inputs and save to database
    console.log(chalk.green('🌱 Contact form submission:'), {
        name: chalk.green(name),
        email: chalk.green(email),
        phone: chalk.green(phone),
        inquiry: chalk.green(inquiry),
        message: chalk.green(message),
        timestamp: chalk.yellow(new Date().toISOString())
    });
    
    // Simulate successful form submission
    res.json({ 
        success: true, 
        message: 'Form submitted successfully',
        theme // Include theme colors in the response
    });
});

// Serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(chalk.green.bold(`🌿 Agriculture Server running on port ${chalk.yellow(PORT)} 🌿`));
});