// src/Pages/AboutUs.js

import React from 'react';
import { Button } from '@mui/material';
import { FaHeart } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="page-container about-us-page">
      <div className="page-header">
        <h1>About Us</h1>
      </div>
      <div className="page-content">
        <div className="about-section about-intro">
          <p>
            At **Nndwa & Co**, we're more than just an e-commerce platform; we're a community. Our mission is to transform the way you shop for everyday essentials, making it effortless, enjoyable, and accessible to everyone. We are dedicated to providing fresh, quality products at competitive prices, all delivered with a level of service that puts a smile on your face.
          </p>
          <img src="https://via.placeholder.com/800x400.png?text=Our+Team+Working+Together" alt="Nndwa & Co team working" className="about-image" />
        </div>

        <div className="about-section about-mission">
          <h2 className="section-title">Our Vision</h2>
          <p>
            Our vision is to become the most trusted name in online retail, known for our unwavering commitment to quality, integrity, and customer satisfaction. We strive to build lasting relationships with both our customers and our suppliers, creating a sustainable ecosystem where everyone thrives.
          </p>
        </div>

        <div className="about-section about-story">
          <h2 className="section-title">Our Story</h2>
          <p>
            Founded in 2025, Nndwa & Co was born from a passion for convenience and a deep understanding of the modern shopper's needs. We recognized a gap in the market for a reliable, user-friendly platform that prioritizes local sourcing and genuine value. What started as a small venture has grown into a thriving enterprise, and we are incredibly proud of the journey so far.
          </p>
        </div>

        <div className="about-section about-cta">
          <h2 className="section-title">Join Our Journey</h2>
          <p>
            Whether you're a new customer, a loyal patron, or a potential partner, we invite you to join us on this exciting journey. Explore our wide range of products, discover new favorites, and experience the convenience of Nndwa & Co.
          </p>
          <Button variant="contained" className="shop-now-btn">
            Shop Now <FaHeart className="heart-icon" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;