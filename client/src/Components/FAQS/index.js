// src/Pages/FaqPage.js

import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FaqPage = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Nndwa & Co.?",
      answer: "Nndwa & Co. is your premier online shopping destination for groceries and everyday essentials in South Africa. We offer a wide range of products, from fresh produce to pantry staples, delivered right to your door."
    },
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our product categories, add items to your cart, and proceed to checkout. You will need to create an account or log in to complete your purchase."
    },
    {
      question: "What are your delivery times and costs?",
      answer: "Delivery times and costs vary based on your location and the size of your order. You can view the estimated delivery time and shipping fees at the checkout page before finalizing your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, including Visa and Mastercard. We also support EFT (Electronic Funds Transfer) for your convenience. All payments are processed securely through our trusted payment gateways."
    },
    {
      question: "Can I return a product?",
      answer: "Yes, we have a flexible return policy. If you receive a damaged or incorrect item, please contact our customer support team within 48 hours of delivery to arrange a return or exchange. Please refer to our full Return Policy for more details."
    },
    {
      question: "Do you have a physical store?",
      answer: "Nndwa & Co. is an exclusively online store, which allows us to offer a wider selection of products and lower prices by cutting out the overhead of a physical retail space. We deliver directly from our secure warehouse facilities."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our friendly customer support team via the 'Contact Us' page on our website, by sending an email to support@nndwa.co.za, or by calling us at +27 11 123 4567. We are available Monday to Friday from 9:00 AM to 5:00 PM."
    }
  ];

  return (
    <div className="page-container faq-page">
      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="page-content">
        <div className="faq-container">
          {faqData.map((item, index) => (
            <div key={index} className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="accordion-title">{item.question}</h3>
                <span className="accordion-icon">
                  {openAccordion === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>
              <div
                className={`accordion-content ${openAccordion === index ? "open" : ""}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;