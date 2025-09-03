import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MyContext } from "../../App";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const ProfilePage = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            if (error.response && error.response.status === 401) {
                context.signOut();
                navigate('/login');
            }
        }
    };

    const handleDeactivateAccount = async () => {
        if (window.confirm("Are you sure you want to deactivate your account? This action cannot be undone.")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${backendUrl}/api/profile/deactivate`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success("Account deactivated successfully. You are now logged out.");
                context.signOut();
                navigate('/');
            } catch (error) {
                console.error("Error deactivating account:", error);
                toast.error("Failed to deactivate account.");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h2 className="text-xl font-semibold text-gray-700">Loading Profile...</h2>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <h2 className="text-xl font-semibold text-gray-700">Profile Not Found</h2>
            </div>
        );
    }

    return (
        <div className="flex items-start justify-center min-h-screen bg-gray-100 p-8">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 transition-shadow duration-300 hover:shadow-2xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-indigo-500 pb-2">My Profile</h2>
                
                <div className="space-y-4 text-lg text-gray-700">
                    <div>
                        <strong className="block text-sm font-semibold text-gray-500 uppercase tracking-wide">First Name:</strong> 
                        <span className="font-medium text-gray-900">{userData.firstName}</span>
                    </div>
                    <div>
                        <strong className="block text-sm font-semibold text-gray-500 uppercase tracking-wide">Last Name:</strong> 
                        <span className="font-medium text-gray-900">{userData.lastName}</span>
                    </div>
                    <div>
                        <strong className="block text-sm font-semibold text-gray-500 uppercase tracking-wide">Email:</strong> 
                        <span className="font-medium text-gray-900">{userData.email}</span>
                    </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-indigo-600 rounded-lg text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors duration-300 w-full sm:w-auto"
                        onClick={() => navigate('/edit-profile')} // Assuming you have an edit profile page
                    >
                        <BsPencilSquare className="text-lg" />
                        Edit Profile
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 px-6 py-3 border border-transparent rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition-colors duration-300 w-full sm:w-auto"
                        onClick={handleDeactivateAccount}
                    >
                        <BsTrash className="text-lg" />
                        Deactivate Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;