import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { FcGoogle } from "react-icons/fc";

const AuthPage = ({ handleSignUp, handleSignIn, handleGoogleSignIn }) => {
  const [tab, setTab] = useState(0); // 0 = Sign In, 1 = Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // used for sign up

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === 0) {
      handleSignIn(email, password); // 🔥 sign in backend intact
    } else {
      handleSignUp(name, email, password); // 🔥 sign up backend intact
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card
          className="rounded-2xl shadow-2xl"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <CardContent className="p-6 sm:p-8">
            {/* Switchable Tabs */}
            <Tabs
              value={tab}
              onChange={(e, newValue) => setTab(newValue)}
              centered
              textColor="primary"
              indicatorColor="primary"
              sx={{
                mb: 4,
                "& .MuiTab-root": {
                  fontWeight: "600",
                  textTransform: "none",
                },
              }}
            >
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>

            {/* Title */}
            <Typography
              variant="h5"
              component="h1"
              className="text-center font-bold mb-6"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {tab === 0 ? "Welcome Back 👋" : "Create Your Account 🚀"}
            </Typography>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 1 && (
                <TextField
                  label="Full Name"
                  type="text"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                />
              )}
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
                  },
                }}
              >
                {tab === 0 ? "Sign In" : "Sign Up"}
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>OR</Divider>

            {/* Google Auth */}
            <Button
              onClick={handleGoogleSignIn}
              fullWidth
              variant="outlined"
              sx={{
                py: 1.2,
                borderRadius: "12px",
                borderColor: "#ccc",
                "&:hover": { borderColor: "#888" },
              }}
              startIcon={
                <FcGoogle
                  size={28}
                  className="drop-shadow-lg"
                  style={{
                    filter: "drop-shadow(0px 0px 6px rgba(66, 133, 244, 0.6))",
                  }}
                />
              }
            >
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;