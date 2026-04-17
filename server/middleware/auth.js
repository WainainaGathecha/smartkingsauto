const jwt = require('jsonwebtoken');
require('dotenv').config();

// JWT verification middleware
// sits between the request and the route handler
// If token is invalid the request is rejected here and never reaches the route handler
function verifyToken(req, res, next) {
    // Token arrives in Authentication header
    // Format: "Bearer eyygsdjjsdhkkckn..."
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Access denied. No token provided.'
        });
    }

    try {
        // Verify the token was signed with your secret
        // If it was tampered with or expired this throws an error
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Call next() to pass control to the route handler 
        next();
    } catch (error) {
        res.status(403).json({
            status: 'error',
            message: 'Invalid or expired token. Please log in again.'
        });
    }
}
module.exports = verifyToken;