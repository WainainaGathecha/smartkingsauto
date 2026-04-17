const express = require('express');
const router = express.Router();
const db = require('../database');
const verifyToken = require('../middleware/auth');

// GET /api/tyres
// Public - the customer website calls this 
// Returns all in-stock tyres
router.get('/', (req, res) => {
    try {
        const tyres = db.prepare(`
            SELECT * FROM tyres 
            WHERE inStock 
            ORDER BY brand ASC
        `).all();
        res.json({
            status: 'sucess',
            count: tyres.length,
            data: tyres
        });
    } catch (error) {
        res.status(500).json({
            status:'error',
            message: 'Failed to fetch tyres'
        });
    }
});

// Get /api/tyres/all
// Protected - admin only
// Returns all tyres including out of stock
router.get('/all', verifyToken, (req, res) => {
    try {
        const tyres = db.prepare(`
            SELECT * FROM tyres ORDER BY createdAt DESC
        `).all();

        res.json({ status: 'success', data:tyres});
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch tyres'
        });
    }
});

// POST /api/tyres
// Protected - admin only 
// Adds a new tyre
router.post('/', verifyToken, (req, res) => {
    const {brand, size, price, vehicleType, condition, description, image} = req.body;

    // Validate required fields
    if (!brand || !size || !vehicleType || !condition) {
        return res.status(400).json({
            status: 'error',
            messages: 'Brand, size, price, vehicle type, and condition are required'
        });
    }

    try {
        const result = db.prepare(`
            INSERT INTO tyres (brand, size, price, vehicleType, condition, description, image)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).run(brand, size, parseInt(price), vehicleType, condition, description || '', image || '');

        res.status(201).json({
            status: 'success',
            message: 'Tyre added successfully',
            id: result.lastInsertRowid
        });
    } catch (error) {
        res.status(500).json({
            status:'error',
            message: 'Failed to add tyre'
        });
    }
});

// PUT /api/tyres/:id
// Protected - admin only
// Update an existing tyre
router.put('/:id', verifyToken, (req, res) => {
    const {brand, size, price, vehicleType, condition, description, image, inStock} = req.body;
    const { id } = req.params;

    try {
        //check the tyre exists before trying to update
        const existing = db.prepare('SELECT id FROM tyres WHERE id =?').get(id);
        if (!existing) {
            return res.status(404).json({
                status: 'error',
                message: 'Tyre not found'
            });
        }
        
        db.prepare(`
            UPDATE tyres
            SET brand = ?, size = ?, price = ?, vehicleType = ?, condition =?, description = ?, image = ?, inStock = ?
            WHERE id = ?
        `).run(
            brand, size, parseInt(price), vehicleType, condition, description, image, inStock ? 1 : 0, id
        );
            
        res.json({
            status: 'success',
            message: 'Tyre updated successfully'
        });     
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update tyre'
        });
    }
});

// DELETE /api/tyres/:id
// Protected - admin only
// Deletes a tyre permanently
router.delete('/:id', verifyToken, (req, res) => {
    const {id} = req.params;

    try {
        const existing = db.prapare('SELECT id FROM tyres WHERE id = ?').get(id);
        if (!existing) {
            return res.status(404).json({
                status: 'error',
                message: 'Tyre not found'
            });
        }

        db.prepare('DELETE FROM tyres WHERE id = ?').run(id);

        res.json({
            status: 'success',
            message: 'Tyre deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete tyre'
        });
    }
});

module.exports = router;