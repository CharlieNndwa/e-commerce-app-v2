// src/Components/ProductItem.js

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsCart4 } from "react-icons/bs";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import toast from 'react-hot-toast';
import { MyContext } from "../../App";
import axios from 'axios';
import Rating from "@mui/material/Rating"; 

const ProductItem = (props) => {
    const context = useContext(MyContext);
    const { product, itemView } = props;
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Placeholder rating since Platzi API doesn't provide one
    const placeholderRating = 4.5; 

    // Sync wishlist state with context
    useEffect(() => {
        if (context.isLogin && context.userWishlist) {
            const isItemInWishlist = context.userWishlist.some(item => item.productId === product.id);
            setIsWishlisted(isItemInWishlist);
        }
    }, [context.userWishlist, context.isLogin, product.id]);

    const handleWishlistClick = async (productId) => {
        if (!context.isLogin) {
            toast.error("Please sign in to add to your wishlist.");
            return;
        }
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                `http://localhost:8080/api/wishlist/add`,
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data.message);
            context.fetchUserWishlist();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error("Product already in wishlist.");
            } else {
                console.error("Error adding to wishlist:", error);
                toast.error("Failed to add to wishlist.");
            }
        }
    };
    
    const removeFromWishlist = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/wishlist/remove/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(response.data.message);
            context.fetchUserWishlist();
        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove from wishlist.");
        }
    };

    if (!product) {
        return null;
    }

    return (
        <article className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative group
            ${itemView === 'list' ? 'flex flex-col sm:flex-row items-center p-4' : 'flex flex-col'}`}>

            {/* Wishlist Button - Always visible */}
            <button
                onClick={(e) => { e.stopPropagation(); isWishlisted ? removeFromWishlist(product.id) : handleWishlistClick(product.id); }}
                className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors duration-200"
                aria-label="Toggle Wishlist"
            >
                {isWishlisted ? (
                    <IoMdHeart className="text-red-500" size={24} />
                ) : (
                    <IoMdHeartEmpty className="text-gray-500 hover:text-red-500" size={24} />
                )}
            </button>

            {/* Product Image and link to details */}
            <Link to={`/product/${product.id}`} className="block w-full">
                <div className={`relative overflow-hidden ${itemView === 'list' ? 'w-full sm:w-1/3 flex-shrink-0' : 'w-full h-52'}`}>
                    <img
                        src={product.images[0]}
                        className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105
                            ${itemView === 'list' ? 'p-2' : ''}`}
                        alt={product.title}
                    />
                </div>
            </Link>

            <div className={`p-4 ${itemView === 'list' ? 'flex-grow sm:ml-4' : ''}`}>
                {/* Product Name (Title) */}
                <h4 className="text-base font-semibold text-gray-800 mb-1 leading-tight">{product.title}</h4>

                {/* Rating (Placeholder) */}
                <div className="flex items-center space-x-2 mb-2">
                    <Rating
                        name="read-only"
                        value={placeholderRating}
                        readOnly
                        size="small"
                        precision={0.5}
                    />
                    <span className="text-xs text-gray-500">({placeholderRating})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline mb-2">
                    <span className="text-xl font-bold text-gray-900">R{product.price.toFixed(2)}</span>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={() => context.addToCart(product)}
                    className={`flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                        bg-purple-600 text-white hover:bg-purple-700 mt-2`}
                >
                    <BsCart4 size={18} className="mr-2" /> ADD TO CART
                </button>
            </div>
        </article>
    );
};

export default ProductItem;