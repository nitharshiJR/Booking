const express = require('express');
const router = express.Router();
const RoomDetails = require('../models/RoomDetails'); 



router.get('/', async (req, res) => {
    try {
        const rooms = await RoomDetails.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const room = await RoomDetails.findById(req.params.id); 
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    const room = new RoomDetails({
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        address: req.body.address,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        description: req.body.description,
        mapImage: req.body.mapImage ,
        mapLink: req.body.mapLink  

    });

    try {
        const newRoom = await room.save(); 
        res.status(201).json(newRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const room = await RoomDetails.findById(req.params.id); 
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

       
        room.title = req.body.title || room.title;
        room.image = req.body.image || room.image;
        room.price = req.body.price || room.price;
        room.address = req.body.address || room.address;
        room.bedrooms = req.body.bedrooms || room.bedrooms;
        room.bathrooms = req.body.bathrooms || room.bathrooms;
        room.description = req.body.description || room.description;
        room.mapImage =req.body.mapImage||room.mapImage;
        room.mapLink=req.body.mapLink||room.mapLink;

        const updatedRoom = await room.save(); 
        res.json(updatedRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const room = await RoomDetails.findById(req.params.id); 
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        await RoomDetails.findByIdAndDelete(req.params.id); 
        res.json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;