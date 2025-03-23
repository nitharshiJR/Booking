const express = require('express');
const router = express.Router();
const RoomDetails = require('../models/RoomDetails'); // Updated variable name to match model

// 📌 GET all room details
router.get('/', async (req, res) => {
    try {
        const rooms = await RoomDetails.find(); // Fetch all room details
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 📌 GET a single room detail by ID
router.get('/:id', async (req, res) => {
    try {
        const room = await RoomDetails.findById(req.params.id); // Fetch a room by ID
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 📌 CREATE a new room detail
router.post('/', async (req, res) => {
    const room = new RoomDetails({
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        address: req.body.address,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        description: req.body.description, // Added description field
    });

    try {
        const newRoom = await room.save(); // Save the new room
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 📌 UPDATE a room detail by ID
router.put('/:id', async (req, res) => {
    try {
        const room = await RoomDetails.findById(req.params.id); // Find room by ID
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        // ✅ Only update if new values are provided
        room.title = req.body.title || room.title;
        room.image = req.body.image || room.image;
        room.price = req.body.price || room.price;
        room.address = req.body.address || room.address;
        room.bedrooms = req.body.bedrooms || room.bedrooms;
        room.bathrooms = req.body.bathrooms || room.bathrooms;
        room.description = req.body.description || room.description; // Updated description field

        const updatedRoom = await room.save(); // Save the updated room
        res.json(updatedRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 📌 DELETE a room detail by ID
router.delete('/:id', async (req, res) => {
    try {
        const room = await RoomDetails.findById(req.params.id); // Find room by ID
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        await RoomDetails.findByIdAndDelete(req.params.id); // Delete the room
        res.json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;