// models/product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // Mongoose will automatically create and manage the ObjectId for _id
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };