import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MyContext } from "../../App";
import { motion } from 'framer-motion';
import { FaTruck } from 'react-icons/fa';
import { IoBagOutline, IoAlertCircleOutline,} from 'react-icons/io5';

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
                <p className="text-xl text-gray-700">Loading Orders...</p>
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
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 mb-2">
                        Your Order History 📦
                    </h1>
                    <p className="text-lg text-gray-700">
                        A list of all your past orders.
                    </p>
                </div>

                {orders.length === 0 ? (
                    <div className="p-10 text-center rounded-xl bg-white shadow-xl">
                        <IoBagOutline className="mx-auto text-8xl text-indigo-500 mb-4 animate-bounce" />
                        <h2 className="text-2xl text-gray-800 font-bold mb-2">
                            No Orders Yet!
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Start filling your cart with amazing products to see your order history here.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    orders.map((order) => (
                        <motion.div key={order._id} variants={itemVariants} className="mb-6">
                            <div className="p-6 rounded-xl bg-white shadow-md border-t-4 border-indigo-500 transition-shadow duration-300 hover:shadow-xl">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                    <div className="mb-4 sm:mb-0">
                                        <h3 className="text-xl font-bold text-gray-800">
                                            Order ID: <span className="text-indigo-600 font-mono">#{order._id.substring(0, 8)}</span>
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Order Date: <span className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                    <div
                                        className={`flex items-center gap-1 px-3 py-1 text-sm font-bold text-white rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}`}
                                    >
                                        {order.paymentStatus === 'Paid' ? < FaTruck className="text-base" /> : <IoAlertCircleOutline className="text-base" />}
                                        {order.paymentStatus}
                                    </div>
                                </div>
                                <hr className="my-4 border-gray-200" />
                                <p className="font-semibold text-gray-700 mb-3">
                                    Items:
                                </p>
                                <ul className="list-none space-y-3">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                                            <IoBagOutline className="text-indigo-400 mr-2" />
                                            <p className="flex-grow text-sm">
                                                Product ID: <span className="font-mono">{item.productId.substring(0, 8)}...</span>,
                                                Quantity: <span className="font-medium">{item.quantity}</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <div className="text-right mt-6 pt-4 border-t-2 border-gray-300">
                                    <p className="text-2xl font-bold text-gray-800">
                                        Total: <span className="text-green-600">R{order.totalAmount.toFixed(2)}</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>
        </div>
    );
};

export default OrdersPage;