// src/Pages/CompetitionsPage.js

import React from 'react';
import { Button } from '@mui/material';
import { FaGift, FaRegCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const CompetitionsPage = () => {
  return (
    <div className="page-container competitions-page">
      <div className="page-header">
        <h1>Competitions & Giveaways</h1>
      </div>
      <div className="page-content">
        <div className="competition-section current-competition">
          <h2 className="section-title">
            <FaGift className="title-icon" /> Current Competition
          </h2>
          <div className="competition-card active-card">
            <img 
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/grocery-sale-retail-or-e-commerce-banner-ad-design-template-67720435bb809be27f46dfb1dd44c6fa_screen.jpg?ts=1606113265" 
              alt="Current competition banner" 
              className="competition-image"
            />
            <div className="card-content">
              <h3>WIN a Year's Supply of Groceries!</h3>
              <p>
                Get ready to fill your pantry! We're giving one lucky customer a year's supply of groceries from our store. Every purchase over R500 automatically enters you into the draw.
              </p>
              <div className="competition-details">
                <p>
                  <FaRegCalendarAlt className="detail-icon" /> **Ends:** 31 August 2025
                </p>
              </div>
              <Button variant="contained" className="enter-now-btn">
                Enter Now
              </Button>
            </div>
          </div>
        </div>

        <div className="competition-section upcoming-competition">
          <h2 className="section-title">
            <FaRegCalendarAlt className="title-icon" /> Upcoming Competitions
          </h2>
          <div className="competition-card upcoming-card">
            <div className="card-content">
              <h3>Family Holiday Getaway!</h3>
              <p>
                Stay tuned! Next month, we're launching a massive giveaway for a family holiday to a surprise destination. Follow our social media pages for updates.
              </p>
              <p className="status-badge upcoming-badge">Coming Soon</p>
            </div>
          </div>
        </div>

        <div className="competition-section past-competition">
          <h2 className="section-title">
            <FaCheckCircle className="title-icon" /> Past Winners
          </h2>
          <div className="past-winners-list">
            <div className="winner-item">
              <h4>Congratulations to Sarah M. from Cape Town!</h4>
              <p>Sarah won a brand new coffee machine in our August Coffee Lovers' Giveaway. Enjoy your perfect brews!</p>
            </div>
            <div className="winner-item">
              <h4>Congratulations to David L. from Johannesburg!</h4>
              <p>David is the lucky winner of our PlayStation 5 Gaming Bundle. Happy gaming!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsPage;