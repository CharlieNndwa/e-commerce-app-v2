import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const QuantityBox = ({ quantity, onQuantityChange }) => {
  const minus = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const plus = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex items-center space-x-2 w-32 h-10 border border-gray-700 rounded-lg overflow-hidden bg-stone-900">
      <button
        onClick={minus}
        disabled={quantity === 1}
        className="flex-shrink-0 w-1/3 h-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaMinus size={14} />
      </button>
      <input
        type="text"
        value={quantity}
        readOnly
        className="flex-grow w-1/3 h-full text-center text-gray-200 font-semibold bg-transparent outline-none focus:outline-none"
      />
      <button
        onClick={plus}
        className="flex-shrink-0 w-1/3 h-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
      >
        <FaPlus size={14} />
      </button>
    </div>
  );
};

export default QuantityBox;