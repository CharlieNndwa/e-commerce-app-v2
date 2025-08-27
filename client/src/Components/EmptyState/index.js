// src/Components/EmptyState/EmptyState.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'; // Import Material UI Button
import { motion } from 'framer-motion'; // Import Framer Motion

const EmptyState = ({ icon, title, message, buttonText, linkTo }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto my-12 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-6xl text-gray-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">{message}</p>
      {buttonText && linkTo && (
        <Button
          component={Link}
          to={linkTo}
          variant="contained"
          color="primary"
          className="rounded-full px-6 py-2 transition-transform transform hover:scale-105"
        >
          {buttonText}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;