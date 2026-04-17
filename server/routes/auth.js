const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /api/auth/login
// Verifies credentials and returns a token
router.post('/login', async (requestAnimationFrame, res) => {
    const { username, password} = req.body;

    // Check username matches
    if(username !== process.env.ADMIN_USERNAME) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid credentials'
        });
    }

    // Check password matches
    // In a production system you would hash the password and store it in the database. 
    //For simplicity here we compare directly against the environment variable
    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid credentials'
        });
    }

    // Generate a JWT token that expires in 24 hours
    // The token contains the username and it is signed with your secret
    const token = jwt.sign(
        { username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    res.json({
        status: 'success',
        message: 'Login successful'
    });
});

module.exports = router;