// src/components/Navigation/Navigation.js

import React, { useState, useEffect, useRef } from "react";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineComputer, MdOutlineLocalGroceryStore, MdOutlineElectricalServices, MdOutlineHome } from "react-icons/md";
import { GiManualMeatGrinder, GiTeapot, GiSodaCan, GiSnackBag } from "react-icons/gi";
import { RiMickeyLine } from "react-icons/ri";
import axios from 'axios';
import { FaLaptop, FaTshirt, FaMobileAlt, FaTools, FaHome, FaDog, FaSeedling, FaUtensils, FaStar } from "react-icons/fa";

// Add the slugify function here
const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/,/g, "")
        .replace(/&/g, "and")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

// Map Platzi API category names to icons
const categoryIcons = {
    'Electronics': <FaLaptop size={24} />,
    'Clothes': <FaTshirt size={24} />,
    'Shoes': <RiMickeyLine size={24} />,
    'Miscellaneous': <FaStar size={24} />,
    'Furniture': <FaHome size={24} />,
    'Toys': <RiMickeyLine size={24} />,
    'Other': <FaStar size={24} />,
};

const Navigation = ({ mobileNavOpen, closeMobileNav }) => {
    const sidebarRef = useRef(null);
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [openSubMenu, setOpenSubMenu] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://api.escuelajs.co/api/v1/categories");
                // The API can return duplicate categories, so we filter them by ID
                const uniqueCategories = response.data.filter((category, index, self) =>
                    index === self.findIndex((c) => (
                        c.id === category.id
                    ))
                );
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const toggleSubMenu = (index) => {
        setOpenSubMenu(openSubMenu === index ? null : index);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                const isHamburgerButton = event.target.closest('.mobile-hamburger-btn');
                if (!isHamburgerButton) {
                    closeMobileNav();
                }
            }
        };

        if (mobileNavOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.removeEventListener("touchstart", handleClickOutside);
            };
        }
    }, [mobileNavOpen, closeMobileNav]);

    return (
        <nav className="hidden lg:block bg-gray-900 text-gray-200 py-3">
            <div className="container mx-auto px-8">
                <ul className="flex items-center justify-start space-x-8 font-medium">
                    {categories.map((category) => (
                        <li key={category.id} className="relative group">
                            {/* Corrected Link to use slugified name */}
                            <Link
                                to={`/products/${slugify(category.name)}`}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                            >
                                <div className="text-yellow-400">
                                    {categoryIcons[category.name] || <FaStar size={24} />}
                                </div>
                                <span>{category.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;