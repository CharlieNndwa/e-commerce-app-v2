import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Stripe Imports
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

/* ---------- Stripe Checkout Form (UNCHANGED LOGIC) ---------- */
const CheckoutForm = ({ amount, shippingAddress }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/checkout?payment=success",
                shipping: {
                    name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
                    address: {
                        line1: shippingAddress.address,
                        city: shippingAddress.city,
                        country: "ZA",
                        postal_code: shippingAddress.postalCode,
                    },
                },
            },
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit} className="mt-4">
            <PaymentElement id="payment-element" />
            <button
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading || !stripe || !elements}
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </form>
    );
};

/* ------------------------ Page ------------------------ */
const CheckoutPage = () => {
    const { cartItems } = useContext(MyContext);
    const navigate = useNavigate();

    const [clientSecret, setClientSecret] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        phone: "",
    });

    const [checkoutData, setCheckoutData] = useState({
        products: [],
        subtotal: 0,
        total: 0,
    });

    useEffect(() => {
        if (cartItems.length > 0) {
            const subtotal = cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            setCheckoutData({
                products: cartItems,
                subtotal,
                total: subtotal,
            });
        }

        const params = new URLSearchParams(window.location.search);
        const paymentStatus = params.get("payment");
        if (paymentStatus === "success") {
            toast.success("Payment successful! Redirecting...", { duration: 3000 });
            setTimeout(() => navigate("/"), 3000);
        }
    }, [cartItems, navigate]);

    const handleFormChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    /* ---------- Create PaymentIntent (UNCHANGED LOGIC) ---------- */
    const getClientSecret = async () => {
        const required = [
            "email",
            "firstName",
            "lastName",
            "address",
            "city",
            "province",
            "postalCode",
        ];
        if (!required.every((f) => formData[f])) {
            toast.error("Please fill in all required shipping details.");
            return;
        }
        if (checkoutData.products.length === 0) {
            toast.error("Your cart is empty.");
            return;
        }
        try {
            const paymentDetails = {
                amount: Math.round(checkoutData.total * 100),
                shippingAddress: formData,
            };
            const { data } = await axios.post(
                "http://localhost:8080/api/checkout",
                paymentDetails
            );
            setClientSecret(data.clientSecret);
        } catch (error) {
            toast.error(error.response?.data?.message || "Payment error");
        }
    };

    /* ---------- Small helper for safe images ---------- */
    const imgFallback = (e) => {
        e.currentTarget.src = "https://via.placeholder.com/44?text=%20";
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 sm:py-12 mt-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-8 sm:mb-12">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* -------- Left: Shipping Details -------- */}
                    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
                            Shipping Information
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    value={formData.email}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    value={formData.firstName}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    value={formData.lastName}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    value={formData.address}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    value={formData.city}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Province
                                </label>
                                <input
                                    type="text"
                                    name="province"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    value={formData.province}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    value={formData.postalCode}
                                    onChange={handleFormChange}
                                />
                            </div>
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone (optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* -------- Right: Order Summary + Payment -------- */}
                    <div>
                        <div className="sticky top-8 space-y-8">
                            {/* Order Summary */}
                            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                                <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">
                                    Order Summary
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Item
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Qty
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Unit
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {checkoutData.products.length > 0 ? (
                                                checkoutData.products.map((p) => (
                                                    <tr key={p._id} className="hover:bg-gray-50 transition-colors duration-200">
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <img
                                                                    src={p.images?.[0]}
                                                                    alt={p.name}
                                                                    width={40}
                                                                    height={40}
                                                                    onError={imgFallback}
                                                                    className="rounded-md mr-3"
                                                                />
                                                                <span className="text-sm font-medium text-gray-900 line-clamp-1">
                                                                    {p.name}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                                            {p.quantity}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                                            R{Number(p.price).toFixed(2)}
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                                                            R{(p.price * p.quantity).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-500">
                                                        Your cart is empty.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <hr className="my-6 border-gray-200" />
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Subtotal</span>
                                        <strong className="text-gray-900">
                                            R{checkoutData.subtotal.toFixed(2)}
                                        </strong>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Shipping</span>
                                        <strong className="text-green-600">FREE</strong>
                                    </div>
                                    <hr className="border-gray-200" />
                                    <div className="flex justify-between items-center text-lg font-bold pt-2">
                                        <span>Total</span>
                                        <span>R{checkoutData.total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        to="/cart"
                                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                    >
                                        ← Return to Cart
                                    </Link>
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
                                    Payment Method
                                </h2>
                                <label className="inline-flex items-center text-gray-700">
                                    <input
                                        type="radio"
                                        className="form-radio h-4 w-4 text-blue-600"
                                        name="paymentMethod"
                                        value="card"
                                        checked
                                        readOnly
                                    />
                                    <span className="ml-2">Credit / Debit Card</span>
                                </label>
                                <p className="text-xs text-gray-500 mt-2">
                                    You’ll be securely redirected by Stripe. We never store your card
                                    details.
                                </p>

                                <div className="mt-6">
                                    {clientSecret ? (
                                        <Elements options={{ clientSecret }} stripe={stripePromise}>
                                            <CheckoutForm
                                                amount={checkoutData.total}
                                                shippingAddress={formData}
                                            />
                                        </Elements>
                                    ) : (
                                        <button
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={getClientSecret}
                                            disabled={checkoutData.products.length === 0}
                                        >
                                            Confirm Details & Proceed to Payment
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;