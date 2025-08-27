// src/Pages/PrivacyPolicy.js

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="page-container privacy-policy-page">
      <div className="page-header">
        <h1>Privacy Policy</h1>
      </div>
      <div className="page-content">
        <div className="policy-section">
          <h2 className="section-title">1. Introduction</h2>
          <p>
            Welcome to Nndwa & Co. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website, use our services, or interact with us. By using our services, you consent to the data practices described in this policy.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="section-title">2. Information We Collect</h2>
          <p>
            We collect various types of information to provide and improve our services to you. This includes:
          </p>
          <ul className="policy-list">
            <li>
              **Personal Information:** Information you provide directly to us, such as your name, email address, phone number, and shipping address when you create an account, place an order, or subscribe to our newsletter.
            </li>
            <li>
              **Payment Information:** Details related to your purchases, such as your credit card number or other payment method information. Note that we do not store full credit card details on our servers; they are processed securely by a third-party payment gateway.
            </li>
            <li>
              **Browsing Data:** Information about your interaction with our website, including your IP address, browser type, pages viewed, and the time and date of your visit.
            </li>
          </ul>
        </div>
        
        <div className="policy-section">
          <h2 className="section-title">3. How We Use Your Information</h2>
          <p>
            We use the collected information for various purposes, including:
          </p>
          <ul className="policy-list">
            <li>To process your orders and manage your account.</li>
            <li>To provide, operate, and maintain our website.</li>
            <li>To improve and personalize your experience.</li>
            <li>To communicate with you about your orders, products, and services.</li>
            <li>For marketing and promotional purposes, with your consent.</li>
          </ul>
        </div>

        <div className="policy-section">
          <h2 className="section-title">4. Data Security</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and protected by industry-standard security protocols. We are committed to ensuring your information is treated securely and in accordance with this Privacy Policy.
          </p>
        </div>

        <div className="policy-section">
          <h2 className="section-title">5. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;