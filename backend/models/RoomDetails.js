const mongoose = require('mongoose');

const RoomDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true }, 
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  mapImage: { type: String, required: true },
mapLink: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model('RoomDetails', RoomDetailsSchema);