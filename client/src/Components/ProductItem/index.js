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
    
    // Fallback function for broken images
    const imgFallback = (e) => {
      e.target.onerror = null; // prevents infinite loop
      e.target.src = "https://via.placeholder.com/200?text=No+Image";
    };

    return (
        <article className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative group
            ${itemView === 'list' ? 'flex flex-col sm:flex-row items-center p-4 gap-4' : 'flex flex-col'}`}>

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
            <Link to={`/product/${product.id}`} className={`block ${itemView === 'list' ? 'w-full sm:w-1/3 flex-shrink-0' : 'w-full'}`}>
                <div className={`relative overflow-hidden h-48 sm:h-52`}>
                    <img
                        src={product.images[0]}
                        className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105`}
                        alt={product.title}
                        onError={imgFallback}
                    />
                </div>
            </Link>

            <div className={`p-4 flex-grow flex flex-col justify-between ${itemView === 'list' ? 'sm:ml-4' : ''}`}>
                <div>
                    {/* Product Name (Title) */}
                    <h4 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">{product.title}</h4>

                    {/* Rating (Placeholder) */}
                    <div className="flex items-center space-x-2 my-2">
                        <Rating
                            name="read-only"
                            value={placeholderRating}
                            readOnly
                            size="small"
                            precision={0.5}
                        />
                        <span className="text-xs text-gray-500">({placeholderRating})</span>
                    </div>
                </div>

                {/* Price and Add to Cart Button */}
                <div className="flex flex-col items-start mt-auto">
                    <span className="text-lg font-bold text-gray-900">R{product.price.toFixed(2)}</span>
                    <button
                        onClick={() => context.addToCart(product)}
                        className={`mt-2 w-full flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                        bg-purple-600 text-white hover:bg-purple-700`}
                    >
                        <BsCart4 size={18} className="mr-2" /> ADD TO CART
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductItem;