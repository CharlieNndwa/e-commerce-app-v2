// src/components/SignInPage.js

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
import { Link } from "react-router-dom"; // Import Link for navigation

const SignInPage = ({ handleLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/signin", {
                email,
                password,
            });

            const { token, firstName, email: userEmail } = response.data.data;
            
            handleLogin({ token, firstName, email: userEmail });
            
        } catch (error) {
            console.error("Login failed:", error.response.data.message);
            alert("Login failed: " + error.response.data.message);
        }
    };

    const handleGoogleSignIn = () => {
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
                        Welcome Back 👋
                    </Typography>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
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
                            Sign In
                        </Button>
                    </form>

                    <Divider sx={{ my: 3 }}>OR</Divider>

                    {/* Google Auth */}
                    <Button
                        onClick={handleGoogleSignIn}
                        fullWidth
                        variant="outlined"
                        className="google-button"
                        startIcon={<FcGoogle size={28} />}
                    >
                        Continue with Google
                    </Button>

                    <div className="auth-link-container">
                        <Typography variant="body2" className="auth-link-text">
                            Don't have an account?
                        </Typography>
                        <Button component={Link} to="/sign-up" className="auth-link-button">
                            Sign Up
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SignInPage;