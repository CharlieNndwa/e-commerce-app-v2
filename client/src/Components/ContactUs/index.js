// src/Pages/ContactUs.js

import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We're here to help! Whether you have a question about an order, a product, or just want to say hello, our customer service team is ready to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Contact Information Section */}
        <div className="bg-gray-50 rounded-lg p-8 shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white p-3 rounded-full flex-shrink-0">
                <FaEnvelope size={20} />
              </div>
              <div>
                <span className="block font-semibold text-gray-700">Email</span>
                <a href="mailto:support@nndwa.co.za" className="text-blue-600 hover:underline transition-colors duration-200">
                  support@nndwa.co.za
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 text-white p-3 rounded-full flex-shrink-0">
                <FaPhone size={20} />
              </div>
              <div>
                <span className="block font-semibold text-gray-700">Phone</span>
                <a href="tel:+27111234567" className="text-green-600 hover:underline transition-colors duration-200">
                  +27 11 123 4567
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500 text-white p-3 rounded-full flex-shrink-0">
                <FaMapMarkerAlt size={20} />
              </div>
              <div>
                <span className="block font-semibold text-gray-700">Address</span>
                <p className="text-gray-600">
                  123 Main Street, Johannesburg, 1685
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg overflow-hidden">
            <img 
              src="https://via.placeholder.com/600x400.png?text=Our+Location+Map" 
              alt="Our location map" 
              className="w-full h-auto object-cover" 
            />
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows="6"
              className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 outline-none resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-4 px-6 text-lg font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;