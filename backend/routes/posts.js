const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // ✅ Fixed variable name

// 📌 GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 📌 GET a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // ✅ Fixed method name
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 📌 CREATE a new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        image: req.body.image,
        price: req.body.price,
        address: req.body.address,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 📌 UPDATE a post by ID
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // ✅ Fixed method name
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // ✅ Only update if new values are provided
        post.title = req.body.title || post.title;
        post.image = req.body.image || post.image;
        post.price = req.body.price || post.price;
        post.address = req.body.address || post.address;
        post.bedrooms = req.body.bedrooms || post.bedrooms;
        post.bathrooms = req.body.bathrooms || post.bathrooms;

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 📌 DELETE a post by ID
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // ✅ Fixed method name
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await Post.findByIdAndDelete(req.params.id); // ✅ Fixed method usage
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
