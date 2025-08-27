import React from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiFruitBowl } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDiscount } from "react-icons/md";
import {CiBadgeDollar} from "react-icons/ci";


const Footer = () => {
  return (
    

    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="footer-container"
    >
    


 
 

      {/* Main Footer Section */}
      <div className="main-footer-section">
        <div className="container mx-auto main-footer-grid">
          {/* Column 1: Help Center */}
          <div className="footer-column">
            <h4 className="footer-heading">HELP CENTER</h4>
            <ul className="footer-links">
              <li>
                <a href="/contact-us">Contact Us</a>
              </li>
             
              <li>
                <a href="/queries">Frequently Asked Questions</a>
              </li>
              <li>
                <a href="/payments">Payments</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Policy */}
          <div className="footer-column">
            <h4 className="footer-heading">POLICY</h4>
            <ul className="footer-links">
              <li>
                <a href="/refund-returns">Returns Policy</a>
              </li>
              <li>
                <a href="/terms-and-conditions">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 3: About */}
          <div className="footer-column">
            <h4 className="footer-heading">ABOUT</h4>
            <ul className="footer-links">
               <li>
                <a href="/about-us">About Us</a>
              </li>
            
              <li>
                <a href="/careers">Careers</a>
              </li>
              <li>
                <a href="/competitions">Competitions</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Shopping App & Socials */}
          <div className="footer-column">
            <h4 className="footer-heading">NNDWA & CO SHOPPING APP</h4>
            <div className="app-icons">
              <img
                src="https://www.makro.co.za/asset/fcc-nextgen-ui-user/fcc-cp-zion/p/img/google_play_8a3de1.svg"
                alt=""
              />
              <img
                src="https://www.makro.co.za/asset/fcc-nextgen-ui-user/fcc-cp-zion/p/img/app_store_523abd.svg"
                alt=""
              />
            </div>
            <h4 className="footer-heading mt-4">FOLLOW US</h4>
            <div className="social-icons">
              <a href="#">
                <FaXTwitter className="social-icon" />
              </a>
              <a href="#">
                <FaFacebookF className="social-icon" />
              </a>
              <a href="#">
                <FaYoutube className="social-icon" />
              </a>
              <a href="#">
                <FaInstagram className="social-icon" />
              </a>
              <a href="#">
                <FaLinkedinIn className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar">
        <div className="container mx-auto bottom-bar-content">
          <div className="secure-payments">
            <RiSecurePaymentLine className="secure-icon" />
            <p>
              100% secure payments guaranteed by
              <span className="payu-logo-container">
                <img
                  src="https://e7.pngegg.com/pngimages/759/461/png-clipart-e-commerce-payment-system-logo-product-payu-latam-logo-text-payment-thumbnail.png"
                  alt="PayU"
                  className="payu-logo"
                />
              </span>
            </p>
          </div>
          <div className="payment-icons">
            <img
              src="https://toppng.com/uploads/preview/visa-eps-vector-logo-free-download-115740175210ige4vseau.png"
              alt="Visa"
              className="payment-icon-img"
            />
            <img
              src="https://www.iqacademy.ac.za//wp-content/uploads/2022/12/Instant-EFT.png"
              alt="EFT"
              className="payment-icon-img"
            />
            <img
              src="https://www.istore.co.za/media/catalog/product/cache/9312195337937e6890ce2fae5ec8c9ff/d/m/dm_image.jpeg"
              alt="Ucount"
              className="payment-icon-img"
            />
            <img
              src="https://payfast.io/wp-content/uploads/2023/04/Capitec-Pay-colour.png"
              alt="D"
              className="payment-icon-img"
            />
            <img
              src="https://getlogovector.com/wp-content/uploads/2021/07/mobicred-pty-ltd-logo-vector.png"
              alt="PayU"
              className="payment-icon-img"
            />
            <img
              src="https://e7.pngegg.com/pngimages/96/821/png-clipart-credit-card-payment-mastercard-logo-credit-card-flag-text.png"
              alt="Mastercard"
              className="payment-icon-img"
            />
          </div>
          <p className="copyright-text">
           Copyright © 2025 NNDWA & CO. All rights reserved
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
