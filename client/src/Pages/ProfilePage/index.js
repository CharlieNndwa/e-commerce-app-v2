// src/pages/ProfilePage.js
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MyContext } from "../../App";
import Button from "@mui/material/Button";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const ProfilePage = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use your live server's IP address and port
 const backendUrl = "http://localhost:8080";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please log in to view your profile.");
        navigate('/login');
        return;
      }

      const response = await axios.get(`${backendUrl}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to load profile data.");
      setIsLoading(false);
      // If the token is invalid, log the user out
      if (error.response && error.response.status === 401) {
          context.signOut();
          navigate('/login');
      }
    }
  };

  const handleDeactivateAccount = async () => {
    // Confirm with the user before deactivating
    if (window.confirm("Are you sure you want to deactivate your account? This action cannot be undone.")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${backendUrl}/api/profile/deactivate`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success("Account deactivated successfully. You are now logged out.");
        context.signOut(); // This function should clear the user's data and token
        navigate('/'); // Redirect to the homepage
      } catch (error) {
        console.error("Error deactivating account:", error);
        toast.error("Failed to deactivate account.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "50px 0" }}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "50px 0" }}>
        <h2>Profile Not Found</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        {/* Assumes you have a Sidebar component */}
        {/* <div className="col-md-3">
          <Sidebar />
        </div> */}
        <div className="col-md-9">
          <div className="card p-4">
            <h2 className="mb-4">My Profile</h2>
            <div className="mb-3">
              <strong>First Name:</strong> {userData.firstName}
            </div>
            <div className="mb-3">
              <strong>Last Name:</strong> {userData.lastName}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {userData.email}
            </div>
            <div className="mt-4">
              <Button 
                variant="outlined" 
                color="primary" 
                className="mr-3"
              >
                <BsPencilSquare /> &nbsp; Edit Profile
              </Button>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleDeactivateAccount}
              >
                <BsTrash /> &nbsp; Deactivate Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;