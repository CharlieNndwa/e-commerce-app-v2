// src/Components/CartModal.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IoIosClose } from "react-icons/io";
import { MyContext } from "../../App";

const CartModal = ({ isOpen, onClose }) => {
  const context = useContext(MyContext);

  const totalCartPrice = context.cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ).toFixed(2);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    borderRadius: '8px',
    padding: '1.5rem',
    outline: 'none',
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="cart-modal-title"
      aria-describedby="cart-modal-description"
    >
      <Fade in={isOpen}>
        <Box sx={modalStyle} className="shadow-lg">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h5 id="cart-modal-title" className="text-lg font-bold">Your Cart</h5>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900">
              <IoIosClose size={24} />
            </button>
          </div>
          <div className="overflow-y-auto max-h-72 mb-4">
            {context.cartItems.length > 0 ? (
              context.cartItems.map((item) => (
                <div key={item._id} className="flex items-center space-x-4 py-2 border-b last:border-b-0">
                  <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h6 className="font-semibold text-sm truncate">{item.name}</h6>
                    <p className="text-gray-600 text-xs">
                      {item.quantity} x R{item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">Your cart is empty. 😔</p>
            )}
          </div>
          <div className="flex justify-between items-center font-bold text-lg mb-4">
            <span>Total:</span>
            <span>R{totalCartPrice}</span>
          </div>
          <Link to="/cart">
            <Button
              onClick={onClose}
              className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              View Cart
            </Button>
          </Link>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CartModal;