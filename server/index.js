require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const tyreRoutes = require('./routes/tyres');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
// These run on every request before routes

// Parse incoming JSON request bodies
app.use(express.json());

// Allow requests from the frontend
// In production replace (*) with the actual domain
app.use(cors({
    origin: ''
}));

// Serve static files - HTML CSS JS
app.use(express.static(path.join(__dirname, '../')));

// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, '../admin')));

// ROUTES
app.use('/api/tyres', tyreRoutes);
app.use('/api/auth', authRoutes);

// Health check - confirm server is running
app.get('/api/health', (req, res) =>{
    res.json({status: 'ok', message: 'Smart Kings API is running'});
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Smart Kings Server running on http://localhost:${PORT}`);
});