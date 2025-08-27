import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MyContext } from "../../App";
import { motion } from 'framer-motion';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import { ShoppingBagOutlined, ErrorOutline, LocalShippingOutlined } from '@mui/icons-material';

const OrdersPage = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const backendUrl = "http://localhost:8080";

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please log in to view your orders.");
                navigate('/sign-in');
                return;
            }

            const response = await axios.get(`${backendUrl}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching order history:", error);
            toast.error("Failed to load order history.");
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
                context.signOut();
                navigate('/sign-in');
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Typography variant="h5" color="text.secondary">Loading Orders...</Typography>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            <motion.div
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="text-center mb-10">
                    <Typography variant="h3" component="h1" className="font-extrabold text-blue-600 mb-2">
                        Your Order History 📦
                    </Typography>
                    <Typography variant="h6" className="text-gray-700">
                        A list of all your past orders.
                    </Typography>
                </div>

                {orders.length === 0 ? (
                    <Paper elevation={3} className="p-10 text-center rounded-xl bg-white-50 shadow-lg">
                        <ShoppingBagOutlined className="text-8xl text-purple-500 mb-4 animate-bounce" />
                        <Typography variant="h5" className="text-gray-800 font-bold mb-2">
                            No Orders Yet!
                        </Typography>
                        <Typography className="text-gray-600 mb-6">
                            Start filling your cart with amazing products to see your order history here.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate('/')}
                            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                        >
                            Start Shopping
                        </Button>
                    </Paper>
                ) : (
                    orders.map((order) => (
                        <motion.div key={order._id} variants={itemVariants} className="mb-6">
                            <Paper elevation={3} className="p-6 rounded-xl border-t-4 border-blue-500 transition-shadow duration-300 hover:shadow-xl">
                                <Box className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                    <div className="mb-4 sm:mb-0">
                                        <Typography variant="h6" className="font-bold text-gray-800">
                                            Order ID: <span className="text-blue-600">#{order._id.substring(0, 8)}</span>
                                        </Typography>
                                        <Typography variant="body2" className="text-gray-500">
                                            Order Date: <span className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</span>
                                        </Typography>
                                    </div>
                                    <Chip
                                        label={order.paymentStatus}
                                        color={order.paymentStatus === 'Paid' ? 'success' : 'warning'}
                                        icon={order.paymentStatus === 'Paid' ? <LocalShippingOutlined /> : <ErrorOutline />}
                                        className="text-white font-bold"
                                        style={{ backgroundColor: order.paymentStatus === 'Paid' ? '#10B981' : '#F59E0B' }}
                                    />
                                </Box>
                                <hr className="my-4 border-gray-200" />
                                <Typography variant="body1" className="font-semibold text-gray-700 mb-3">
                                    Items:
                                </Typography>
                                <ul className="list-none space-y-3">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                                            <ShoppingBagOutlined className="text-blue-400 mr-2" />
                                            <Typography variant="body2" className="flex-grow">
                                                Product ID: <span className="font-mono">{item.productId.substring(0, 8)}...</span>,
                                                Quantity: <span className="font-medium">{item.quantity}</span>
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                                <Box className="text-right mt-6 pt-4 border-t-2 border-gray-300">
                                    <Typography variant="h5" className="font-bold text-gray-800">
                                        Total: <span className="text-green-600">R{order.totalAmount.toFixed(2)}</span>
                                    </Typography>
                                </Box>
                            </Paper>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default OrdersPage;