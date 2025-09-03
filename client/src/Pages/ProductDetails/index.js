// src/Pages/ProductDetailsPage.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import QuantityBox from '../../Components/QuantityBox';
import ProductZoom from '../../Components/ProductZoom';
import RelatedProducts from '../ProductDetails/RelatedProducts/index';
import { IoCartSharp, IoHeartOutline, IoSyncOutline } from 'react-icons/io5';
import { FaStore } from "react-icons/fa";
import axios from 'axios';
import Rating from "@mui/material/Rating";
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const context = useContext(MyContext);
    const { addToCart, addToWishlist, user } = context;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [simulatedRating, setSimulatedRating] = useState(0);
    const [simulatedOldPrice, setSimulatedOldPrice] = useState(0);

    // Mock data for other sellers - Platzi API doesn't have this feature
    const otherSellers = [
        { name: "Makro", price: 10499.00, id: "makro-seller" },
        { name: "Takealot", price: 11500.00, id: "takealot-seller" },
        { name: "Amazon", price: 10899.00, id: "amazon-seller" }
    ];

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`);
                setProduct(response.data);
                
                // Simulate rating and old price based on the fetched data
                const randomRating = (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
                setSimulatedRating(parseFloat(randomRating));
                const oldPrice = (response.data.price * 1.25).toFixed(2); // 25% price increase for old price
                setSimulatedOldPrice(oldPrice);
            } catch (err) {
                console.error("Failed to fetch product details:", err);
                setError("Product not found or an error occurred. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetails();
        }
    }, [productId]);

    const onQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };

    const handleAddToWishlist = () => {
        if (product) {
            addToWishlist(product);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <p className="text-xl text-red-500 font-semibold">{error}</p>
            </div>
        );
    }

    const { title, price, description, images, category } = product;

    return (
        <div className="bg-gray-100 min-h-screen py-8 sm:py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <button
                    onClick={handleBackClick}
                    className="flex items-center text-gray-700 hover:text-purple-600 transition-colors mb-4 md:mb-6 text-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Go Back
                </button>
                <motion.div
                    className="flex flex-col lg:flex-row bg-white rounded-lg shadow-2xl overflow-hidden p-6 md:p-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Left Column: Product Image Gallery */}
                    <div className="w-full lg:w-1/2 p-4 md:p-8 flex items-center justify-center">
                        <ProductZoom images={images} />
                    </div>
                    {/* Right Column: Product Details */}
                    <div className="w-full lg:w-1/2 p-4 md:p-8 flex flex-col justify-center">
                        <div className="mb-4">
                            <span className="text-sm text-gray-500 font-semibold uppercase">{category.name}</span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">{title}</h1>
                            <div className="flex items-center mt-2">
                                <Rating
                                    name="read-only"
                                    value={simulatedRating}
                                    readOnly
                                    size="small"
                                    precision={0.5}
                                />
                                <span className="ml-2 text-gray-600 text-sm">({simulatedRating})</span>
                            </div>
                        </div>
                        <div className="mb-6 flex items-baseline space-x-3">
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-600">R{price.toFixed(2)}</h2>
                            <span className="text-xl sm:text-2xl font-bold text-gray-400 line-through">R{simulatedOldPrice}</span>
                        </div>
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full mb-4 inline-block uppercase">
                            In Stock
                        </span>
                        <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">{description}</p>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                            <QuantityBox quantity={quantity} onQuantityChange={onQuantityChange} />
                            <button
                                onClick={handleAddToCart}
                                className="flex-grow flex items-center justify-center w-full sm:w-auto bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                            >
                                <IoCartSharp className="mr-2" />
                                ADD TO CART
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <button 
                                onClick={handleAddToWishlist}
                                className="flex-1 flex items-center justify-center border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                            >
                                <IoHeartOutline className="mr-2" />
                                ADD TO WISHLIST
                            </button>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex-1 flex items-center justify-center border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                            >
                                <FaStore className="mr-2" />
                                OTHER SELLERS
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Related Products Section */}
                {product && (
                    <div className="mt-12">
                        <RelatedProducts
                            title="You might also like"
                            categoryId={product.category.id}
                            currentProductId={product.id}
                        />
                    </div>
                )}
            </div>

            {/* Other Sellers Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-6 w-full max-w-md lg:max-w-xl max-h-[80vh] overflow-y-auto shadow-xl"
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            transition={{ duration: 0.3 }}
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center border-b pb-3 mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">Other Sellers for this Product</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800 text-3xl font-bold leading-none">&times;</button>
                            </div>
                            <ul className="space-y-4">
                                {otherSellers.map(seller => (
                                    <li key={seller.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                                        <div className="flex items-center">
                                            <FaStore className="text-purple-600 mr-3 text-lg" />
                                            <span className="font-semibold text-gray-700">{seller.name}</span>
                                        </div>
                                        <span className="font-bold text-gray-900">R{seller.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetailsPage;