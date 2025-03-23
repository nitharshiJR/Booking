const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

const MONGO_URI = "mongodb+srv://nitharjude:nitharjude1906@cluster0.lfd5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyparser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected!');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
  });

// Import the roomRouter
const roomRouter = require('./routes/roomRouter');

// Register the roomRouter with the /api/rooms prefix
app.use('/api/rooms', roomRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});