// seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const { Product } = require('./models/product');
const { PRODUCTS } = require('./data/productsData'); 

const seedDB = async () => {
  try {
    // CORRECTED LINE: Use DB_URI to match your .env file
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");

    await Product.deleteMany({});
    console.log("Existing products deleted");

    const productsWithObjectId = PRODUCTS.map(product => ({
      ...product,
      _id: new mongoose.Types.ObjectId(product._id)
    }));

    await Product.insertMany(productsWithObjectId);
    console.log("Database seeded successfully!");

    await mongoose.disconnect();
    console.log("Database connection closed");
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();