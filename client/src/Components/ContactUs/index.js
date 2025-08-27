// src/Pages/ContactUs.js

import React from 'react';
import { TextField, Button } from '@mui/material';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="page-container contact-us-page">
      <div className="page-header">
        <h1>Contact Us</h1>
      </div>
      <div className="page-content">
        <div className="contact-info-section">
          <div className="contact-details">
            <h2 className="section-title">Get In Touch</h2>
            <p>
              We're here to help! Whether you have a question about an order, a product, or just want to say hello, our customer service team is ready to assist you.
            </p>
            <div className="contact-list">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>Email: support@nndwa.co.za</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>Phone: +27 11 123 4567</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Address: 123 Main Street, Johannesburg, 1685</span>
              </div>
            </div>
          </div>
          <div className="contact-image-map">
             {/* A professional placeholder for a map or image */}
             <img src="https://via.placeholder.com/600x400.png?text=Our+Location+Map" alt="Our location map" className="map-placeholder" />
          </div>
        </div>

        <div className="contact-form-section">
          <h2 className="section-title">Send Us a Message</h2>
          <form className="contact-form-container">
            <div className="form-row">
              <TextField label="Your Name" variant="outlined" fullWidth margin="normal" />
              <TextField label="Your Email" variant="outlined" fullWidth margin="normal" />
            </div>
            <TextField label="Subject" variant="outlined" fullWidth margin="normal" />
            <TextField label="Your Message" variant="outlined" fullWidth margin="normal" multiline rows={6} />
            <Button variant="contained" type="submit" className="submit-form-btn">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;