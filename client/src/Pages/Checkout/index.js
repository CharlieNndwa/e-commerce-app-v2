import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
} from "@mui/material";

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
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        className="pay-button"
        type="submit"
        disabled={loading || !stripe || !elements}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
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
    <div className="checkout-page-container">
      <div className="checkout-content-wrapper">
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom className="checkout-header">
          Checkout
        </Typography>

        <Grid container spacing={4} className="checkout-grid">
          {/* -------- Left: Shipping Details -------- */}
          <Grid item xs={12} md={6}>
            <Card elevation={4} className="checkout-card shipping-card">
              <CardContent>
                <Typography variant="h6" fontWeight="bold" className="card-title">
                  Shipping Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Email Address"
                      name="email"
                      fullWidth
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name="firstName"
                      fullWidth
                      required
                      value={formData.firstName}
                      onChange={handleFormChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      fullWidth
                      required
                      value={formData.lastName}
                      onChange={handleFormChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Street Address"
                      name="address"
                      fullWidth
                      required
                      value={formData.address}
                      onChange={handleFormChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="City"
                      name="city"
                      fullWidth
                      required
                      value={formData.city}
                      onChange={handleFormChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Province"
                      name="province"
                      fullWidth
                      required
                      value={formData.province}
                      onChange={handleFormChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Postal Code"
                      name="postalCode"
                      fullWidth
                      required
                      value={formData.postalCode}
                      onChange={handleFormChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Phone (optional)"
                      name="phone"
                      fullWidth
                      value={formData.phone}
                      onChange={handleFormChange}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* -------- Right: Order Summary + Payment -------- */}
          <Grid item xs={12} md={6}>
            <Box className="sticky-box">
              {/* Order Summary */}
              <Card elevation={4} className="checkout-card summary-card">
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" className="card-title">
                    Order Summary
                  </Typography>
                  <TableContainer component={Paper} elevation={0} className="summary-table-container">
                    <Table size="small">
                      <TableHead>
                        <TableRow className="table-header-row">
                          <TableCell className="table-cell">Item</TableCell>
                          <TableCell align="center" className="table-cell">Qty</TableCell>
                          <TableCell align="right" className="table-cell">Unit</TableCell>
                          <TableCell align="right" className="table-cell">Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {checkoutData.products.length > 0 ? (
                          checkoutData.products.map((p) => (
                            <TableRow key={p._id} hover>
                              <TableCell>
                                <Box className="item-cell-content">
                                  <img
                                    src={p.images?.[0]}
                                    alt={p.name}
                                    width={40}
                                    height={40}
                                    onError={imgFallback}
                                    className="product-image"
                                  />
                                  <Typography variant="body2" className="item-name">{p.name}</Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="center">{p.quantity}</TableCell>
                              <TableCell align="right">R{Number(p.price).toFixed(2)}</TableCell>
                              <TableCell align="right">R{(p.price * p.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} align="center">
                              <Typography color="text.secondary" variant="body2">
                                Your cart is empty.
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Divider className="summary-divider" />
                  <Box className="totals-box">
                    <Box className="total-row">
                      <span>Subtotal</span>
                      <strong>R{checkoutData.subtotal.toFixed(2)}</strong>
                    </Box>
                    <Box className="total-row">
                      <span>Shipping</span>
                      <strong className="shipping-cost">FREE</strong>
                    </Box>
                    <Divider className="summary-divider" />
                    <Box className="total-row final-total-row">
                      <span>Total</span>
                      <span>R{checkoutData.total.toFixed(2)}</span>
                    </Box>
                  </Box>
                  <Box className="return-link-box">
                    <Link to="/cart" className="return-link">
                      ← Return to Cart
                    </Link>
                  </Box>
                </CardContent>
              </Card>

              {/* Payment */}
              <Card elevation={4} className="checkout-card payment-card">
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" className="card-title">
                    Payment Method
                  </Typography>
                  <FormControlLabel
                    control={<Radio checked />}
                    label="Credit / Debit Card"
                    className="radio-label"
                  />
                  <Typography variant="caption" color="text.secondary" display="block" className="payment-caption">
                    You’ll be securely redirected by Stripe. We never store your card details.
                  </Typography>

                  <Box className="payment-button-box">
                    {clientSecret ? (
                      <Elements options={{ clientSecret }} stripe={stripePromise}>
                        <CheckoutForm
                          amount={checkoutData.total}
                          shippingAddress={formData}
                        />
                      </Elements>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="proceed-button"
                        onClick={getClientSecret}
                        disabled={checkoutData.products.length === 0}
                      >
                        Confirm Details & Proceed to Payment
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CheckoutPage;