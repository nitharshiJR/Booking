const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const roomRouter = require('./routes/roomRouter');  

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb+srv://nitharjude:nitharjude1906@cluster0.lfd5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(' MongoDB Connected!'))
  .catch((err) => console.error(' MongoDB Connection Error:', err));

const roomDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  mapImage: { type: String,required: true }, 
  mapLink: { type: String, required: true }   
});


const RoomDetails = mongoose.models.RoomDetails || mongoose.model('RoomDetails', roomDetailsSchema);


app.use('/api/rooms', roomRouter);


app.post('/details', async (req, res) => {
  const { title,image, bedrooms, bathrooms, price, address, description, mapImage, mapLink } = req.body;
  try {
    const newRoomDetail = new RoomDetails({ title, bedrooms, bathrooms, price, address, description, mapImage, mapLink });
    await newRoomDetail.save();
    res.status(201).json(newRoomDetail);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


app.get('/details', async (req, res) => {
  try {
    const roomDetails = await RoomDetails.find();
    res.json(roomDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


app.put('/details/:id', async (req, res) => {
  try {
    const { title, image ,bedrooms, bathrooms, price, address, description } = req.body;
    const id = req.params.id;
    const updateRoomDetail = await RoomDetails.findByIdAndUpdate(
      id,
      { title,image, bedrooms, bathrooms, price, address, description },
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
  console.log(' Server is running on http://localhost:8000');
});
