const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }, 
    price: { type: String, required: true },
    address: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    mapLink: { type: String, required: true }, 
    mapImage: { type: String, required: true } 
});

module.exports = mongoose.model('Post', PostSchema);
