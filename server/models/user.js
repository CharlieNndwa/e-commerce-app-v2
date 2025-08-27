// models/user.js
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    cart: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: String,
        price: Number,
        images: [String],
        quantity: {
            type: Number,
            default: 1
        }
    }],
    // The wishlist field now stores product IDs as numbers,
    // which matches your productsData.js file.
    wishlist: [{
        type: Number, // <-- Corrected from mongoose.Schema.Types.ObjectId
        ref: 'Product' 
    }]
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id }, // Sign the token with the user's ID
        process.env.JWT_SECRET, // Use the correct key from your .env file
        { expiresIn: '7d' }
    );
    return token;
};

const User = mongoose.model('user', userSchema);

const validate = (data) => {
    const standardSchema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });

    const googleSchema = Joi.object({
        firstName: Joi.string().label("First Name"),
        lastName: Joi.string().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        googleId: Joi.string().required().label("Google ID")
    });

    if (data.googleId) {
        return googleSchema.validate(data);
    } else {
        return standardSchema.validate(data);
    }
};

module.exports = { User, validate };