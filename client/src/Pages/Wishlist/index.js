// src/pages/WishlistPage.js
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MyContext } from "../../App";
import { motion } from 'framer-motion';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton, Button
} from '@mui/material';
import { DeleteOutline, Favorite, ShoppingCartOutlined, ArrowBack } from '@mui/icons-material';

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
            // Optionally remove from wishlist after adding to cart
            removeFromWishlist(item.productId);
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add to cart.");
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-50"><Typography variant="h5">Loading Wishlist...</Typography></div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-10" // Proper margin top/bottom
            >
                <div className="flex justify-between items-center mb-12">
                    <Typography variant="h4" className="font-bold text-red-600 flex items-center">
                        My Wishlist 
                        <img src="your-image-url-here" alt="Wishlist Icon" className="w-10 h-10 ml-4 rounded-full" />
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBack />}
                        onClick={() => navigate(-1)}
                        className="bg-gray-500 hover:bg-gray-600 transition-colors duration-300 rounded-full"
                    >
                        Back
                    </Button>
                </div>

                {wishlistItems.length === 0 ? (
                    <Box className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-lg">
                        <Favorite className="text-8xl text-red-400 mb-4 animate-pulse" />
                        <Typography variant="h5" className="font-semibold text-gray-700 mb-2">
                            Your wishlist is empty.
                        </Typography>
                        <Typography className="text-gray-500 mb-6">
                            Start adding products you love to your wishlist!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/')}
                            className="rounded-full"
                        >
                            Start Shopping
                        </Button>
                    </Box>
                ) : (
                    <Paper
                        elevation={6}
                        className="rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-3xl"
                        style={{ border: '2px solid transparent', boxShadow: '0 0 15px 5px rgba(59, 130, 246, 0.5)' }} // Blue glow effect
                    >
                        <TableContainer>
                            <Table aria-label="wishlist table">
                                <TableHead className="bg-red-500">
                                    <TableRow>
                                        <TableCell><Typography className="font-bold text-white hover:text-gray-200 transition-colors">Image</Typography></TableCell>
                                        <TableCell><Typography className="font-bold text-white hover:text-gray-200 transition-colors">Product</Typography></TableCell>
                                        <TableCell><Typography className="font-bold text-white hover:text-gray-200 transition-colors">Category</Typography></TableCell>
                                        <TableCell><Typography className="font-bold text-white hover:text-gray-200 transition-colors">Price</Typography></TableCell>
                                        <TableCell align="center"><Typography className="font-bold text-white hover:text-gray-200 transition-colors">Actions</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {wishlistItems.map((item) => (
                                        <TableRow key={item._id} className="hover:bg-red-50 transition-colors">
                                            <TableCell>
                                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/product/${item.productId}`}>
                                                    <Typography className="text-blue-600 font-semibold hover:underline">
                                                        {item.name}
                                                    </Typography>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{item.category}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography className="font-bold text-green-600">R{item.price.toFixed(2)}</Typography>
                                            </TableCell>
                                            <TableCell align="center" className="space-x-2">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    startIcon={<ShoppingCartOutlined />}
                                                    onClick={() => addToCart(item)}
                                                    className="bg-purple-600 hover:bg-purple-700 transition-colors duration-300 rounded-full"
                                                >
                                                    Add to Cart
                                                </Button>
                                                <IconButton
                                                    onClick={() => removeFromWishlist(item.productId)}
                                                    aria-label="unheart"
                                                    color="secondary"
                                                >
                                                    <Favorite style={{ color: '#E53E3E' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                )}
            </motion.div>
        </div>
    );
};

export default Wishlist;