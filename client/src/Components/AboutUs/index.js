// src/Components/AboutUs/index.js

import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 border-b-4 border-orange-500 pb-2 inline-block">About Us</h1>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl about-section about-intro">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At <strong className="font-bold">Nndwa & Co</strong>, we're more than just an e-commerce platform; we're a community. Our mission is to transform the way you shop for everyday essentials, making it effortless, enjoyable, and accessible to everyone. We are dedicated to providing fresh, quality products at competitive prices, all delivered with a level of service that puts a smile on your face.
          </p>
          <img 
            src="https://via.placeholder.com/800x400.png?text=Our+Team+Working+Together" 
            alt="Nndwa & Co team working" 
            className="w-full h-auto rounded-lg shadow-lg mb-8" 
          />
        </div>

        <div className="w-full max-w-4xl about-section about-mission my-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our vision is to become the most trusted name in online retail, known for our unwavering commitment to quality, integrity, and customer satisfaction. We strive to build lasting relationships with both our customers and our suppliers, creating a sustainable ecosystem where everyone thrives.
          </p>
        </div>

        <div className="w-full max-w-4xl about-section about-story my-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Founded in 2025, Nndwa & Co was born from a passion for convenience and a deep understanding of the modern shopper's needs. We recognized a gap in the market for a reliable, user-friendly platform that prioritizes local sourcing and genuine value. What started as a small venture has grown into a thriving enterprise, and we are incredibly proud of the journey so far.
          </p>
        </div>

        <div className="w-full max-w-4xl about-section about-cta my-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Journey</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Whether you're a new customer, a loyal patron, or a potential partner, we invite you to join us on this exciting journey. Explore our wide range of products, discover new favorites, and experience the convenience of Nndwa & Co.
          </p>
          <Link to="/allproducts">
            <button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
              <span>Shop Now</span> <FaHeart className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;