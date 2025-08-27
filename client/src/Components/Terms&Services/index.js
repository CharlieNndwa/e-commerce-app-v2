// src/Pages/Policies/TermsAndServices.js

import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndServices = () => {
  return (
    <div className="policy-page-wrapper">
      <div className="policy-content-box">
        <h1 className="policy-title">Terms and Conditions of Use</h1>

        {/* Section 1: Introduction */}
        <section className="policy-section">
          <h2 className="policy-heading">1. Introduction</h2>
          <p className="policy-paragraph">
            Welcome to **Nndwa & Co**. By accessing or using our website and services, you agree to be bound by these Terms and Conditions. These terms govern your use of our e-commerce platform and all related services, features, and content. If you do not agree to these terms, you may not use our services.
          </p>
        </section>

        {/* Section 2: Account Registration */}
        <section className="policy-section">
          <h2 className="policy-heading">2. Account Registration</h2>
          <p className="policy-paragraph">
            To make a purchase, you may be required to create an account. You agree to:
          </p>
          <ul className="policy-list">
            <li>
              Provide accurate, current, and complete information during registration.
            </li>
            <li>
              Maintain the security of your password and account details.
            </li>
            <li>
              Be responsible for all activities that occur under your account.
            </li>
          </ul>
          <p className="policy-paragraph">
            Nndwa & Co reserves the right to suspend or terminate your account at our sole discretion if we suspect any breach of these terms.
          </p>
        </section>

        {/* Section 3: Intellectual Property */}
        <section className="policy-section">
          <h2 className="policy-heading">3. Intellectual Property Rights</h2>
          <p className="policy-paragraph">
            All content on this website, including text, graphics, logos, product images, and software, is the property of Nndwa & Co or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.
          </p>
        </section>

        {/* Section 4: Prohibited Conduct */}
        <section className="policy-section">
          <h2 className="policy-heading">4. Prohibited Conduct</h2>
          <p className="policy-paragraph">
            You agree not to use our website for any unlawful purpose or in any way that could damage, disable, or impair the site. Prohibited conduct includes, but is not limited to:
          </p>
          <ul className="policy-list">
            <li>
              Engaging in any form of fraudulent activity.
            </li>
            <li>
              Attempting to gain unauthorized access to our systems or user accounts.
            </li>
            <li>
              Using automated scripts to collect information from or interact with the site.
            </li>
          </ul>
        </section>

        {/* Section 5: Limitation of Liability */}
        <section className="policy-section">
          <h2 className="policy-heading">5. Limitation of Liability</h2>
          <p className="policy-paragraph">
            Nndwa & Co, its directors, employees, and partners will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or any products purchased through it. Our liability is limited to the fullest extent permitted by law.
          </p>
        </section>

        {/* Section 6: Governing Law */}
        <section className="policy-section">
          <h2 className="policy-heading">6. Governing Law</h2>
          <p className="policy-paragraph">
            These terms are governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions. Any legal action or proceeding related to this website shall be brought exclusively in the courts of South Africa.
          </p>
        </section>

        {/* Section 7: Changes to Terms */}
        <section className="policy-section">
          <h2 className="policy-heading">7. Changes to Terms</h2>
          <p className="policy-paragraph">
            We reserve the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the website after such changes constitutes your acceptance of the new terms.
          </p>
        </section>

        {/* Section 8: Contact Us */}
        <section className="policy-section">
          <h2 className="policy-heading">8. Contact Information</h2>
          <p className="policy-paragraph">
            If you have any questions about these Terms, please contact us at:
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

export default TermsAndServices;