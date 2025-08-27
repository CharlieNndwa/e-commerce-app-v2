const express = require("express");
const router = express.Router();
const { Order } = require("../models/order");
const verifyToken = require("../middleware/authMiddleware");

// Route to get a user's order history
router.get("/", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).sort({ orderDate: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("GET /orders: Error fetching order history:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Route to create a new order
// This is a simplified route and would normally be triggered after a successful payment
router.post("/", verifyToken, async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress } = req.body;

        if (!items || !totalAmount) {
            return res.status(400).json({ message: "Items and total amount are required." });
        }

        const newOrder = new Order({
            userId: req.user._id,
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
            totalAmount: totalAmount,
            shippingAddress: shippingAddress
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", orderId: newOrder._id });
    } catch (error) {
        console.error("POST /orders: Error creating order:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;