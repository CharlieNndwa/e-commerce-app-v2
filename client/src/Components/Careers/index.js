// src/Pages/CareersPage.js

import React from 'react';
import { Button } from '@mui/material';
import { FaBriefcase, FaUsers, FaChartLine } from 'react-icons/fa';

const CareersPage = () => {
  return (
    <div className="page-container careers-page">
      <div className="page-header">
        <h1>Careers</h1>
        <p className="careers-tagline">Join our team and help us shape the future of e-commerce.</p>
      </div>
      <div className="page-content">
        <div className="careers-section section-intro">
          <div className="intro-text">
            <h2>Why Work at Nndwa & Co.?</h2>
            <p>
              We're a fast-growing, dynamic company committed to innovation, customer satisfaction, and creating a positive work environment. At Nndwa & Co., you'll have the opportunity to make a real impact, grow your skills, and be part of a team that's passionate about what we do.
            </p>
          </div>
          <img 
            src="https://via.placeholder.com/800x400.png?text=Diverse+team+working+in+office" 
            alt="Team collaboration" 
            className="careers-image" 
          />
        </div>

        <div className="careers-section section-values">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <FaUsers className="value-icon" />
              <h3>Teamwork</h3>
              <p>We believe that great things are achieved together. Collaboration and mutual respect are at the heart of our success.</p>
            </div>
            <div className="value-item">
              <FaChartLine className="value-icon" />
              <h3>Growth</h3>
              <p>We are committed to the professional and personal development of every team member, providing opportunities to learn and grow.</p>
            </div>
            <div className="value-item">
              <FaBriefcase className="value-icon" />
              <h3>Excellence</h3>
              <p>We strive for excellence in everything we do, from the products we offer to the service we provide.</p>
            </div>
          </div>
        </div>

        <div className="careers-section section-openings">
          <h2 className="section-title">Current Opportunities</h2>
          <div className="job-listing">
            <h3>No positions available at the moment.</h3>
            <p>
              We are constantly growing and new opportunities may arise. Please check back soon!
            </p>
          </div>
          <Button variant="contained" className="careers-cta-btn">
            Connect with Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;