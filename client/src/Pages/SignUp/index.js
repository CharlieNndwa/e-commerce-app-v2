// src/components/SignUpPage.js

import React, { useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Divider,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/signup", {
                firstName,
                lastName,
                email,
                password,
            });
            alert("Account created successfully! Please sign in.");
            navigate("/sign-in"); // Redirect to the sign-in page
        } catch (error) {
            console.error("Sign up failed:", error.response.data.message);
            alert("Sign up failed: " + error.response.data.message);
        }
    };

    const handleGoogleSignUp = () => {
        window.location.href = 'http://localhost:8080/auth/google';
    };

    return (
        <div className="auth-page">
            <Card className="auth-card">
                <CardContent className="auth-card-content">
                    <Typography
                        variant="h5"
                        align="center"
                        className="auth-title"
                    >
                        Create an Account
                    </Typography>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <TextField
                            label="First Name"
                            type="text"
                            fullWidth
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            label="Last Name"
                            type="text"
                            fullWidth
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            className="auth-button"
                        >
                            Sign Up
                        </Button>
                    </form>

                    <Divider sx={{ my: 3 }}>OR</Divider>

                    {/* Google Auth */}
                    <Button
                        onClick={handleGoogleSignUp}
                        fullWidth
                        variant="outlined"
                        className="google-button"
                        startIcon={<FcGoogle size={28} />}
                    >
                        Sign Up with Google
                    </Button>

                    <div className="auth-link-container">
                        <Typography variant="body2" className="auth-link-text">
                            Already have an account?
                        </Typography>
                        <Button component={Link} to="/sign-in" className="auth-link-button">
                            Sign In
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpPage;