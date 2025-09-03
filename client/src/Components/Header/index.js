// src/Components/Header.js

import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { BsCart4 } from 'react-icons/bs';
import { IoIosHeartEmpty } from 'react-icons/io';
import { FaRegUserCircle, FaBars } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { FiSearch } from 'react-icons/fi';
import logo from '../../assets/images/logo.jpg';
import toast from 'react-hot-toast';
import axios from 'axios';

// Add the slugify function here
const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/,/g, "")
        .replace(/&/g, "and")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

const Header = () => {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const desktopSearchRef = useRef(null);

    const backendUrl = "http://localhost:8080";

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    const handleSearch = async (query) => {
        if (query.length > 2) {
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/products?title=${query}`);
                setSearchResults(response.data.slice(0, 5)); // Limit to top 5 results
            } catch (error) {
                console.error("Search error:", error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/allproducts?q=${searchQuery}`);
            setIsSearchActive(false);
        }
    };

    const handleResultClick = (productId) => {
        navigate(`/product/${productId}`);
        setIsSearchActive(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${backendUrl}/api/logout`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                localStorage.removeItem('token');
                context.setIsLogin(false);
                context.setUserWishlist(null);
                context.setCartItems([]);
                toast.success("Logged out successfully!");
                navigate('/sign-in');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            toast.error("Logout failed. Please try again.");
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (desktopSearchRef.current && !desktopSearchRef.current.contains(e.target)) {
                setIsSearchActive(false);
                setSearchQuery('');
                setSearchResults([]);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    // Unused static links, can be removed if not needed.
    const navLinks = [
        { title: "Home", path: "/" },
        { title: "All Products", path: "/allproducts" },
        { title: "About Us", path: "/about-us" },
        { title: "Contact Us", path: "/contact-us" },
    ];
    
    return (
        <header className="fixed w-full top-0 left-0 z-40 bg-white shadow-md">
            {/* Top Bar - Hidden on Mobile */}
            <div className="hidden lg:flex justify-end items-center px-8 py-2 text-xs bg-gray-100 text-gray-600">
                <Link to="/about-us" className="hover:text-gray-900 transition-colors duration-200">About Us</Link>
                <span className="mx-4">|</span>
                <Link to="/contact-us" className="hover:text-gray-900 transition-colors duration-200">Contact</Link>
                <span className="mx-4">|</span>
                <Link to="/profile" className="hover:text-gray-900 transition-colors duration-200">My Account</Link>
            </div>

            {/* Main Header */}
            <div className="flex justify-between items-center px-4 md:px-8 py-4">
                {/* Mobile Menu Toggle & Logo */}
                <div className="flex items-center space-x-4">
                    <button
                        className="lg:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <FaBars size={24} />
                    </button>
                    <Link to="/">
                        <img src={logo} alt="Logo" className="h-10 md:h-12" />
                    </Link>
                </div>

                {/* Search Bar - Hidden on Mobile */}
                <div className="hidden lg:block flex-grow max-w-lg mx-8 search-container" ref={desktopSearchRef}>
                    <form className="relative" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search for products, brands & more..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onFocus={() => setIsSearchActive(true)}
                            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                        />
                        <button type="submit" className="absolute left-0 top-0 mt-3 ml-4 text-gray-400">
                            <FiSearch size={20} />
                        </button>
                    </form>
                    {isSearchActive && searchResults.length > 0 && (
                        <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                            {searchResults.map(product => (
                                <li
                                    key={product.id}
                                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3"
                                    onClick={() => handleResultClick(product.id)}
                                >
                                    <img src={product.images[0]} alt={product.title} className="w-10 h-10 object-cover rounded" />
                                    <span>{product.title}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Action Icons */}
                <div className="flex items-center space-x-4">
                    {context.isLogin ? (
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="hidden md:inline-block px-4 py-2 text-sm text-white font-semibold rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                            >
                                Log Out
                            </button>
                            <Link to="/profile" className="ml-4 p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200">
                                <FaRegUserCircle size={24} />
                            </Link>
                        </div>
                    ) : (
                        <Link to="/sign-in" className="hidden md:inline-block px-4 py-2 text-sm text-gray-700 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200">
                            Sign In
                        </Link>
                    )}
                    <Link to="/wishlist" className="relative p-2 text-gray-700 hover:text-gray-900 transition-colors duration-200">
                        <IoIosHeartEmpty size={24} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{context.userWishlist?.length || 0}</span>
                    </Link>
                    <div className="relative cursor-pointer" onClick={() => context.setIsSidebarOpen(true)}>
                        <BsCart4 size={24} />
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{context.cartItems?.length || 0}</span>
                    </div>
                </div>
            </div>

            {/* Category Navigation Bar - Updated to use dynamic categories */}
            <nav className="hidden lg:block bg-gray-900 text-gray-200 py-3">
                <div className="container mx-auto px-8">
                    <ul className="flex justify-start space-x-12 font-medium">
                        <li key="all-products">
                            <Link to="/allproducts" className="hover:text-yellow-400 transition-colors duration-200">
                                All Products
                            </Link>
                        </li>
                        {context.categoryList.map((cat) => (
                            <li key={cat.id}>
                                <Link
                                    to={`/products/${slugify(cat.name)}`} // Corrected link
                                    className="hover:text-yellow-400 transition-colors duration-200"
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <div
                ref={mobileMenuRef}
                className={`fixed inset-y-0 left-0 bg-stone-900 text-gray-200 transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64 md:w-80`}
            >
                <div className="p-6">
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
                        onClick={closeMobileMenu}
                    >
                        <IoMdClose size={24} />
                    </button>
                    <div className="flex items-center space-x-2 mb-6 border-b border-gray-700 pb-4">
                        <FaRegUserCircle size={24} />
                        <span className="font-semibold">{context.isLogin ? `Hello, ${context.userFirstName}` : 'Guest'}</span>
                    </div>
                    
                    <ul className="space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    onClick={closeMobileMenu}
                                    className="block p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8">
                        <h4 className="font-bold text-gray-400 uppercase tracking-wide mb-2">Shop by Category</h4>
                        <ul className="space-y-2">
                            <li key="all-products-mobile">
                                <Link
                                    to="/allproducts"
                                    onClick={closeMobileMenu}
                                    className="block p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                                >
                                    All Products
                                </Link>
                            </li>
                            {context.categoryList.map((cat) => (
                                <li key={cat.id}>
                                    <Link
                                        to={`/products/${slugify(cat.name)}`} // Corrected link
                                        onClick={closeMobileMenu}
                                        className="block p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={closeMobileMenu}></div>
            )}
        </header>
    );
};

export default Header;