// src/Pages/PaymentsPage.js

import React from 'react';
import { FaLock, FaCcVisa, FaCcMastercard, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';

const PaymentsPage = () => {
  return (
    <div className="page-container payments-page">
      <div className="page-header">
        <h1>Payments & Security</h1>
      </div>
      <div className="page-content">
        <div className="payment-section payment-methods">
          <h2 className="section-title">Accepted Payment Methods</h2>
          <p>
            We offer a variety of secure and convenient payment options to make your shopping experience as smooth as possible. You can choose the method that works best for you at checkout.
          </p>
          <div className="payment-icons-container">
            <div className="payment-icon-item">
              <FaCcVisa className="payment-icon visa-color" />
              <span>Visa</span>
            </div>
            <div className="payment-icon-item">
              <FaCcMastercard className="payment-icon mastercard-color" />
              <span>Mastercard</span>
            </div>
            <div className="payment-icon-item">
              <FaCreditCard className="payment-icon generic-card-color" />
              <span>Credit Card</span>
            </div>
            <div className="payment-icon-item">
              <FaMoneyBillWave className="payment-icon cash-color" />
              <span>EFT</span>
            </div>
          </div>
        </div>

        <div className="payment-section payment-security">
          <h2 className="section-title">
            <FaLock className="lock-icon" /> Secure Transactions
          </h2>
          <p>
            Your security is our top priority. All transactions on our website are processed through a secure, encrypted connection to ensure your payment details are always protected. We use industry-standard SSL encryption to keep your personal and financial information safe.
          </p>
          <ul className="security-list">
            <li>We do not store your full credit card details.</li>
            <li>All data is encrypted during transmission.</li>
            <li>We comply with all relevant data protection regulations.</li>
          </ul>
        </div>
        
        <div className="payment-section payment-process">
          <h2 className="section-title">How It Works</h2>
          <p>
            Paying for your order is simple:
          </p>
          <ol className="process-list">
            <li>Add your desired products to your cart and proceed to checkout.</li>
            <li>Choose your preferred payment method.</li>
            <li>Enter your details on our secure payment page.</li>
            <li>Confirm your payment, and you're all set!</li>
          </ol>
          <p>
            You will receive an immediate confirmation email once your payment is successful.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;