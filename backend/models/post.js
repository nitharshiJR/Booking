const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true }, // assuming 'image' is a URL or string
    price: { type: String, required: true },
    address: { type: String, required: true },
    bedrooms: { type: Number, required: true }, // Assuming bedrooms are a number
    bathrooms: { type: Number, required: true }, // Assuming bathrooms are a number
    
});

module.exports = mongoose.model('Post', PostSchema);


