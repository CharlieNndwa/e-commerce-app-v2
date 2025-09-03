// src/pages/WishlistPage.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MyContext } from "../../App";
import { motion } from 'framer-motion';

// Icons from react-icons
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';

const Wishlist = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const backendUrl = "http://localhost:8080";

    useEffect(() => {
        fetchWishlistItems();
    }, []);

    const fetchWishlistItems = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please log in to view your wishlist.");
                navigate('/sign-in');
                return;
            }

            const response = await axios.get(`${backendUrl}/api/wishlist`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setWishlistItems(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
            toast.error("Failed to load wishlist.");
            setIsLoading(false);
        }
    };
    
    const removeFromWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(
                `${backendUrl}/api/wishlist/remove/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success(response.data.message);
            setWishlistItems(prevItems => prevItems.filter(item => item.productId !== productId));
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Failed to remove item.");
        }
    };

    const addToCart = async (item) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please sign in to add to your cart.");
                navigate('/sign-in');
                return;
            }

            const response = await axios.post(
                `http://localhost:8080/cart/add-to-cart`,
                {
                    productId: item.productId,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(response.data.message);
            removeFromWishlist(item.productId);
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add to cart.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <h2 className="text-xl text-gray-700 font-semibold">Loading Wishlist...</h2>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-10"
            >
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-4">
                        My Wishlist
                        <FaHeart className="text-red-500 text-3xl" />
                    </h1>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-300"
                    >
                        <FaArrowLeft />
                        Back
                    </button>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-lg border border-red-200">
                        <FaHeart className="text-8xl text-red-400 mb-4 animate-pulse" />
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            Your wishlist is empty.
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Start adding products you love to your wishlist!
                        </p>
                        <Link
                            to="/"
                            className="px-8 py-3 bg-red-600 text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                        <table className="min-w-full table-auto">
                            <thead className="bg-red-500">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        Image
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider hidden md:table-cell">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {wishlistItems.map((item) => (
                                    <tr key={item._id} className="hover:bg-red-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link to={`/product/${item.productId}`} className="text-red-600 hover:underline font-semibold">
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell text-gray-600">
                                            {item.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-bold text-green-600">
                                            R{item.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center items-center space-x-2">
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full font-semibold text-sm hover:bg-purple-700 transition-colors duration-300"
                                                >
                                                    <FaShoppingCart />
                                                    <span className="hidden sm:inline">Add to Cart</span>
                                                </button>
                                                <button
                                                    onClick={() => removeFromWishlist(item.productId)}
                                                    className="p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-300"
                                                    aria-label="Remove from wishlist"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Wishlist;