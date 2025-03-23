const mongoose = require('mongoose');

const roomDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, default: "" }, // Optional image field
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('RoomDetails', roomDetailsSchema);