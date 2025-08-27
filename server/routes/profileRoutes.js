// server/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const verifyToken = require("../middleware/authMiddleware");

// Route to get a user's profile information
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v"); // Exclude password and version key
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("GET /profile: Error fetching user profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to update a user's profile information
router.put("/", verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if they exist in the request body
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("PUT /profile: Error updating user profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Route to deactivate a user account
router.delete("/deactivate", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Deactivate the user by setting an 'isActive' flag to false
    // Note: It is safer to deactivate than to delete the entire record
    user.isActive = false;
    await user.save();

    // Clear the JWT token from the client or log them out
    res.status(200).json({ message: "Account deactivated successfully" });
  } catch (error) {
    console.error("DELETE /profile/deactivate: Error deactivating account:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;