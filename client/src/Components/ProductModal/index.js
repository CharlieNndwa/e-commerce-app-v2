// src/Components/ProductModal.js
import Rating from "@mui/material/Rating";
import React, { useState, useContext, useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { MdOutlineCompareArrows } from "react-icons/md";
import { MyContext } from "../../App";
import QuantityBox from "../QuantityBox";
import ProductZoom from "../ProductZoom";
import { IoCartSharp } from "react-icons/io5";
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";

const ProductModal = () => {
    const context = useContext(MyContext);
    const { productModalData, setisOpenProductModal, addToCart, addToWishlist } = context;

    const [quantity, setQuantity] = useState(1);
    const [simulatedRating, setSimulatedRating] = useState(0);
    const [simulatedOldPrice, setSimulatedOldPrice] = useState(0);

    // Dynamic data mapping from Platzi API
    const platziProduct = productModalData;
    const title = platziProduct?.title;
    const price = platziProduct?.price;
    const description = platziProduct?.description;
    const images = platziProduct?.images;
    const category = platziProduct?.category?.name;

    // Simulate additional e-commerce data
    useEffect(() => {
        if (price) {
            const newOldPrice = (price * 1.2).toFixed(2);
            setSimulatedOldPrice(newOldPrice);
            const randomRating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
            setSimulatedRating(parseFloat(randomRating));
        }
    }, [price]);

    if (!platziProduct || Object.keys(platziProduct).length === 0) {
        return null;
    }

    const onQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        addToCart(platziProduct, quantity);
        toast.success(`${title} added to cart!`, { duration: 2000 });
        setisOpenProductModal(false);
    };

    const handleAddToWishlist = () => {
        addToWishlist(platziProduct);
        toast.success(`${title} added to wishlist!`, { duration: 2000 });
    };

    const totalPrice = price * quantity;

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {context.isOpenProductModal && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Overlay with blur effect */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
                        onClick={() => setisOpenProductModal(false)}
                    ></div>

                    {/* Modal Content */}
                    <motion.div
                        className="relative bg-white text-gray-800 p-6 rounded-xl shadow-2xl max-w-5xl w-full mx-auto lg:p-12"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors duration-200 z-10"
                            onClick={() => setisOpenProductModal(false)}
                        >
                            <MdClose size={28} />
                        </button>

                        <div className="flex flex-col lg:flex-row -mx-3">
                            {/* Product Image Section */}
                            <div className="lg:w-1/2 px-3 mb-6 lg:mb-0">
                                <ProductZoom images={images} />
                            </div>

                            {/* Product Details Section */}
                            <div className="lg:w-1/2 px-3">
                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-800 mb-2">{title}</h2>
                                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                                    <span>Category: <b className="font-semibold text-gray-700">{category}</b></span>
                                    <div className="flex items-center">
                                        <span className="mr-1"><Rating name="read-only" value={simulatedRating} size="small" precision={0.5} readOnly /></span>
                                        <span>({simulatedRating})</span>
                                    </div>
                                </div>
                                <hr className="border-gray-200 mb-4" />

                                <div className="flex items-end mb-3">
                                    <span className="text-xl font-bold text-gray-400 line-through mr-3">R{simulatedOldPrice}</span>
                                    <span className="text-4xl font-extrabold text-red-600">R{totalPrice.toFixed(2)}</span>
                                </div>

                                <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">IN STOCK</span>

                                <p className="text-gray-600 font-light leading-relaxed mb-6">{description}</p>

                                <div className="flex items-center space-x-4 mb-6">
                                    <QuantityBox quantity={quantity} onQuantityChange={onQuantityChange} />
                                    <button
                                        className="flex-grow flex items-center justify-center bg-purple-600 hover:bg-purple-700 transition-colors duration-300 text-white font-semibold py-3 px-6 rounded-full uppercase tracking-wide"
                                        onClick={handleAddToCart}
                                    >
                                        <IoCartSharp size={20} className="mr-2" /> Add to Cart
                                    </button>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <button 
                                        className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                                        onClick={handleAddToWishlist}
                                    >
                                        <IoIosHeartEmpty size={20} />
                                        <span>Add to Wishlist</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-gray-500 hover:text-purple-600 transition-colors duration-200">
                                        <MdOutlineCompareArrows size={20} />
                                        <span>Compare</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProductModal;