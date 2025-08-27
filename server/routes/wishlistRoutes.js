const express = require('express');
const router = express.Router();
const { Wishlist } = require('../models/Wishlist');
const { Product } = require('../models/product'); // Assuming you have a Product model
const verifyToken = require('../middleware/authMiddleware');

// GET route to fetch all wishlist items for the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        const wishlistItems = await Wishlist.find({ userId: req.user._id });
        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST route to add a product to the wishlist
router.post('/add', verifyToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        const existingItem = await Wishlist.findOne({ userId, productId });
        if (existingItem) {
            return res.status(409).json({ message: "Product is already in your wishlist." });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        const newWishlistItem = new Wishlist({
            userId,
            productId: product._id,
            name: product.productName,
            price: product.price,
            image: product.productImage,
            category: product.category,
        });

        await newWishlistItem.save();
        res.status(201).json({ message: "Product added to wishlist successfully." });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE route to remove a product from the wishlist
router.delete('/remove/:productId', verifyToken, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        const result = await Wishlist.findOneAndDelete({ userId, productId });

        if (!result) {
            return res.status(404).json({ message: "Item not found in wishlist." });
        }

        res.status(200).json({ message: "Product removed from wishlist successfully." });
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;