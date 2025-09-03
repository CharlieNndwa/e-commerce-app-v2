// src/components/Header/SearchBox.js

import React, { useState, useEffect, useRef } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchTimeoutRef = useRef(null);

    // Debounce function to delay API calls
    useEffect(() => {
        // Clear previous timeout on every new keystroke
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (searchTerm.trim() === "") {
            setSearchResults([]);
            return;
        }

        // Set a new timeout to fetch products after 500ms of inactivity
        setLoading(true);
        searchTimeoutRef.current = setTimeout(async () => {
            try {
                const response = await axios.get(
                    `https://api.escuelajs.co/api/v1/products/?title=${searchTerm}`
                );
                setSearchResults(response.data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        }, 500); // 500ms debounce delay
    }, [searchTerm]);

    const handleClearSearch = () => {
        setSearchTerm("");
        setSearchResults([]);
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }
    };

    const handleProductClick = () => {
        setSearchTerm("");
        setSearchResults([]);
    };

    return (
        <div className="relative w-full max-w-xl">
            <div className="flex items-center w-full px-4 py-3 rounded-full border border-gray-300 focus-within:ring-2 focus-within:ring-purple-500 transition-shadow">
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="flex-grow bg-transparent text-gray-700 placeholder-gray-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {loading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-600 mr-2"></div>
                )}
                {searchTerm && !loading && (
                    <button
                        className="p-1 rounded-full text-gray-500 hover:text-gray-900 transition-colors duration-200"
                        onClick={handleClearSearch}
                        aria-label="Clear search"
                    >
                        <IoMdClose size={20} />
                    </button>
                )}
                <button
                    className="ml-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 transition-colors text-white rounded-full flex items-center justify-center"
                    aria-label="Search"
                >
                    <IoIosSearch size={20} />
                </button>
            </div>

            <AnimatePresence>
                {searchResults.length > 0 && searchTerm.length > 0 && (
                    <motion.div
                        className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl overflow-hidden max-h-80 overflow-y-auto"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {searchResults.map((product) => (
                            <Link
                                to={`/product/${product.id}`}
                                key={product.id}
                                onClick={handleProductClick}
                                className="flex items-center p-3 hover:bg-gray-100 transition-colors duration-200 border-b border-gray-200 last:border-b-0"
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-12 h-12 object-cover rounded-md mr-4"
                                />
                                <div className="flex-grow">
                                    <p className="text-gray-800 font-medium line-clamp-1">{product.title}</p>
                                    <span className="text-sm font-semibold text-purple-600">
                                        R{product.price.toFixed(2)}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBox;