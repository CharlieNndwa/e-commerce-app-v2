// src/Pages/CareersPage.js

import React from 'react';
import { FaBriefcase, FaUsers, FaChartLine } from 'react-icons/fa';

const CareersPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">Careers</h1>
        <p className="text-lg text-gray-600">Join our team and help us shape the future of e-commerce.</p>
      </div>
      
      {/* Introduction Section */}
      <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex items-center mb-12">
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Why Work at Nndwa & Co.?</h2>
          <p className="text-gray-600">
            We're a fast-growing, dynamic company committed to innovation, customer satisfaction, and creating a positive work environment. At Nndwa & Co., you'll have the opportunity to make a real impact, grow your skills, and be part of a team that's passionate about what we do.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://via.placeholder.com/800x400.png?text=Diverse+team+working+in+office"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md border-t-4 border-blue-500">
            <div className="flex justify-center mb-4">
              <FaUsers className="text-blue-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Teamwork</h3>
            <p className="text-gray-600">
              We believe that great things are achieved together. Collaboration and mutual respect are at the heart of our success.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md border-t-4 border-green-500">
            <div className="flex justify-center mb-4">
              <FaChartLine className="text-green-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth</h3>
            <p className="text-gray-600">
              We are committed to the professional and personal development of every team member, providing opportunities to learn and grow.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center shadow-md border-t-4 border-purple-500">
            <div className="flex justify-center mb-4">
              <FaBriefcase className="text-purple-500 text-4xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in everything we do, from the products we offer to the service we provide.
            </p>
          </div>
        </div>
      </div>

      {/* Job Openings Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Current Opportunities</h2>
        <div className="py-8 border-t border-gray-300">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">No positions available at the moment.</h3>
          <p className="text-gray-600 mb-6">
            We are constantly growing and new opportunities may arise. Please check back soon!
          </p>
          <button className="py-3 px-8 text-lg font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors duration-200">
            Connect with Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;