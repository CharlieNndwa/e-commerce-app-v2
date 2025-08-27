const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

// You must have these imports
const authMiddleware = require("../middleware/auth"); 
const User = require("../models/user"); 

// Nodemailer transport for email confirmation
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Use the authMiddleware to protect the route
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 
    const { shippingAddress } = req.body;

    const user = await User.findById(userId).select('cart');
    if (!user || user.cart.length === 0) {
      return res.status(400).json({ message: "Your cart is empty. Please add items to proceed." });
    }

    const totalAmount = user.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const tx_id = require("crypto").randomBytes(16).toString("hex");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100),
      currency: "zar",
      description: `Order from your store | TX ID: ${tx_id}`,
      metadata: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        email: shippingAddress.email,
        transactionId: tx_id,
        cartItems: JSON.stringify(user.cart.map(item => ({ id: item._id, quantity: item.quantity })))
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: shippingAddress.email,
      subject: `Order Confirmation #${tx_id}`,
      html: `
        <h1>Thank you for your purchase!</h1>
        <p>Your order is being processed. You will be redirected to the payment page shortly.</p>
        <p>Total amount: R ${totalAmount.toFixed(2)}</p>
        <p>Please use this reference number for any inquiries: ${tx_id}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    res.status(200).json({
      message: "Stripe payment intent created successfully.",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Payment processing failed:", error);
    res.status(500).json({
      message: "Payment processing failed.",
      details: error.message,
    });
  }
});

module.exports = router;