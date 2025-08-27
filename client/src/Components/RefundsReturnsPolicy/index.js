// src/Pages/Policies/RefundsReturnsPolicy.js

import React from 'react';
import { Link } from 'react-router-dom';

const RefundsReturnsPolicy = () => {
  return (
    <div className="policy-page-wrapper">
      <div className="policy-content-box">
        <h1 className="policy-title">Refunds & Returns Policy</h1>

        {/* Section 1: Introduction */}
        <section className="policy-section">
          <h2 className="policy-heading">1. Your Satisfaction is Our Priority</h2>
          <p className="policy-paragraph">
            At <strong>Nndwa & Co</strong>, we are committed to providing you with the best possible shopping experience. We understand that sometimes things don't go as planned. This policy outlines our procedures for returns and refunds, ensuring a fair and transparent process for all our customers. By making a purchase from Nndwa & Co, you agree to the terms below.
          </p>
        </section>

        {/* Section 2: General Return Conditions */}
        <section className="policy-section">
          <h2 className="policy-heading">2. Eligibility for Returns</h2>
          <p className="policy-paragraph">
            To be eligible for a return, your item must meet these simple conditions:
          </p>
          <ul className="policy-list">
            <li>
              **Timeframe:** You must initiate the return within <strong>30 days</strong> of receiving your order.
            </li>
            <li>
              **Condition:** The item must be in its original, unused condition with all original tags, labels, and packaging intact.
            </li>
            <li>
              **Proof of Purchase:** A valid receipt or order number is required to process your return.
            </li>
          </ul>
        </section>

        {/* Section 3: How to Return an Item */}
        <section className="policy-section">
          <h2 className="policy-heading">3. Simple Steps to Return</h2>
          <p className="policy-paragraph">
            To start your return, please follow these easy steps:
          </p>
          <ol className="policy-list-numbered">
            <li>
              **Request a Return:** Contact our customer service team at <a href="mailto:support@nndwa.co.za">support@nndwa.co.za</a> with your order number and the reason for the return.
            </li>
            <li>
              **Get Authorization:** Our team will provide you with a return authorization number and detailed instructions on how and where to send your package.
            </li>
            <li>
              **Package & Ship:** Carefully pack the item and include all original materials. Ship the package to the address provided by our team.
            </li>
          </ol>
        </section>

        {/* Section 4: Refunds */}
        <section className="policy-section">
          <h2 className="policy-heading">4. Processing Your Refund</h2>
          <p className="policy-paragraph">
            Once we receive and inspect your returned item, we will notify you of the status of your refund. If approved, the refund will be processed and automatically applied to your original payment method within **5-10 business days**.
          </p>
        </section>

        {/* Section 5: Exclusions */}
        <section className="policy-section">
          <h2 className="policy-heading">5. Non-Returnable Items</h2>
          <p className="policy-paragraph">
            Some items cannot be returned for hygiene or safety reasons. These include:
          </p>
          <ul className="policy-list">
            <li>Perishable goods (e.g., food, flowers)</li>
            <li>Personal care items</li>
            <li>Gift cards</li>
            <li>Digital products</li>
          </ul>
        </section>

        {/* Section 6: Need Help? */}
        <section className="policy-section">
          <h2 className="policy-heading">6. We're Here to Help</h2>
          <p className="policy-paragraph">
            If you have any questions or concerns about your return or refund, please don't hesitate to reach out to our friendly support team.
          </p>
          <p className="policy-paragraph contact-info">
            Email: <a href="mailto:support@nndwa.co.za">support@nndwa.co.za</a>
            <br />
            Phone: 0800 123 456
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundsReturnsPolicy;