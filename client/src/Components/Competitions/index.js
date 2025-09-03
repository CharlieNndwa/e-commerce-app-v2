// src/Pages/CompetitionsPage.js

import React from 'react';
import { FaGift, FaRegCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const CompetitionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Competitions & Giveaways</h1>
        <p className="text-lg text-gray-600">
          Ready to win? Check out our latest competitions, see what's coming up next, and celebrate with our recent winners!
        </p>
      </div>

      {/* Current Competition Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
          <FaGift className="text-purple-600" />
          <span>Current Competition</span>
        </h2>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
          <div className="md:w-1/2 flex items-center justify-center p-4 md:p-6 bg-gray-100">
            <img
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/grocery-sale-retail-or-e-commerce-banner-ad-design-template-67720435bb809be27f46dfb1dd44c6fa_screen.jpg?ts=1606113265"
              alt="Current competition banner"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">WIN a Year's Supply of Groceries!</h3>
            <p className="text-gray-600 mb-4">
              Get ready to fill your pantry! We're giving one lucky customer a year's supply of groceries from our store. Every purchase over R500 automatically enters you into the draw.
            </p>
            <div className="flex items-center text-gray-500 mb-6 space-x-2">
              <FaRegCalendarAlt className="text-red-500" />
              <span className="font-semibold">Ends: 31 August 2025</span>
            </div>
            <button className="w-full md:w-auto py-3 px-8 text-lg font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-200">
              Enter Now
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upcoming Competitions Section */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
            <FaRegCalendarAlt className="text-blue-500" />
            <span>Upcoming Competitions</span>
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="text-xl font-semibold text-gray-900">Family Holiday Getaway!</h3>
              <p className="text-gray-600 mt-1">
                Stay tuned! Next month, we're launching a massive giveaway for a family holiday to a surprise destination. Follow our social media pages for updates.
              </p>
              <span className="mt-2 inline-block px-3 py-1 text-sm font-bold rounded-full bg-blue-100 text-blue-800">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* Past Winners Section */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-3">
            <FaCheckCircle className="text-green-500" />
            <span>Past Winners</span>
          </h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-semibold text-gray-900">Congratulations to Sarah M. from Cape Town!</h4>
              <p className="text-gray-600 mt-1">
                Sarah won a brand new coffee machine in our August Coffee Lovers' Giveaway. Enjoy your perfect brews!
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h4 className="font-semibold text-gray-900">Congratulations to David L. from Johannesburg!</h4>
              <p className="text-gray-600 mt-1">
                David is the lucky winner of our PlayStation 5 Gaming Bundle. Happy gaming!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsPage;