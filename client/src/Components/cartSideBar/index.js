// src/Components/cartSideBar.js

import React, { useContext } from "react";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";

const CartSidebar = () => {
  const context = useContext(MyContext);

  const totalPrice = context.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full z-50 transition-transform duration-500 ease-in-out transform
        ${context.isSidebarOpen ? "translate-x-0" : "translate-x-full"}
        w-full sm:w-80 bg-stone-900 shadow-2xl flex flex-col`}
      style={{ backdropFilter: "blur(5px)" }} // Add a subtle blur effect to the background
    >
      {/* Dark overlay for outside click */}
      {context.isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-40 transition-opacity duration-500"
          onClick={() => context.setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="relative z-50 flex flex-col h-full bg-stone-900 text-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold tracking-wide uppercase">
            My Shopping Cart
          </h2>
          <button
            className="text-gray-400 hover:text-white transition-colors duration-200"
            onClick={() => context.setIsSidebarOpen(false)}
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto px-6 py-4 custom-scrollbar">
          {context.cartItems.length === 0 ? (
            <div className="text-center mt-12 text-gray-500 font-light">
              Your cart is empty.
            </div>
          ) : (
            context.cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-800 last:border-b-0 last:mb-0"
              >
                <div className="w-16 h-16 flex-shrink-0 bg-white rounded-md overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <Link
                    to={`/product/${item._id}`}
                    onClick={() => context.setIsSidebarOpen(false)}
                    className="text-sm font-semibold hover:text-blue-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-400 mt-1">
                    R{item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <button
                  className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                  onClick={() => context.removeCartItem(item._id)}
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 bg-stone-800">
          <div className="flex justify-between items-center mb-4 font-bold text-lg">
            <span>Subtotal</span>
            <span>R{totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/cart"
            onClick={() => context.setIsSidebarOpen(false)}
            className="w-full block text-center py-3 px-6 mb-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold"
          >
            VIEW CART
          </Link>
          <Link
            to="/checkout"
            onClick={() => context.setIsSidebarOpen(false)}
            className="w-full block text-center py-3 px-6 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white font-semibold"
          >
            SECURE CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;