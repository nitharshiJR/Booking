const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb+srv://nitharjude:nitharjude1906@cluster0.lfd5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected!');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });

// Define Schema
const roomDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true } // Added description
});

const RoomDetails = mongoose.model('RoomDetails', roomDetailsSchema);

// Create new item
app.post('/details', async (req, res) => {
  const { title, bedrooms, bathrooms, price, address, description } = req.body;
  try {
    const newRoomDetail = new RoomDetails({ title, bedrooms, bathrooms, price, address, description });
    await newRoomDetail.save();
    res.status(201).json(newRoomDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Get all items
app.get('/details', async (req, res) => {
  try {
    const roomDetails = await RoomDetails.find();
    res.json(roomDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Update an item
app.put('/details/:id', async (req, res) => {
  try {
    const { title, bedrooms, bathrooms, price, address, description } = req.body;
    const id = req.params.id;
    const updateRoomDetail = await RoomDetails.findByIdAndUpdate(
      id,
      { title, bedrooms, bathrooms, price, address, description },
      { new: true }
    );
    if (!updateRoomDetail) {
      return res.status(404).json({ message: 'Room detail not found' });
    }
    res.json(updateRoomDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Delete an item
app.delete('/details/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await RoomDetails.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(8000, () => {
  console.log('🚀 Server is running on http://localhost:8000');
});
