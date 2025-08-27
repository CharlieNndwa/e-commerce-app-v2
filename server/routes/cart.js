const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/user");

// @route   POST /api/user/cart
// @desc    Saves the user's cart to the database
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // User ID from the authenticated token
        const { cartItems } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.cart = cartItems;
        await user.save();

        res.status(200).json({ msg: 'Cart saved successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET /api/user/cart
// @desc    Retrieves the user's cart from the database
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('cart');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json({ cart: user.cart });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;