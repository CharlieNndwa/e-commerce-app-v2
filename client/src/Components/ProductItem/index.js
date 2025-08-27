// src/Components/ProductItem.js

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Rating } from "@mui/material";
import { BsArrowsFullscreen, BsCart4 } from "react-icons/bs";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import toast from 'react-hot-toast';
import { MyContext } from "../../App";
import axios from 'axios';

const ProductItem = (props) => {
    const context = useContext(MyContext);
    const { product, itemView } = props;
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (context.isLogin && context.userWishlist) {
            const isItemInWishlist = context.userWishlist.some(item => item.productId?._id === product._id);
            setIsWishlisted(isItemInWishlist);
        }
    }, [context.userWishlist, context.isLogin, product._id]);

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

    const viewProductDetails = (e) => {
        e.preventDefault();
        e.stopPropagation();
        context.setisOpenProductModal(true);
        context.setProductModalData(product);
    };

   

    return (
        <article className={`customProductCard ${itemView === 'one' ? 'list-view' : ''}`}>
            <Link to={`/product/${product._id}`} className="card-link">
                <div className="productImageContainer">
                    <img
                        src={product.images[0]}
                        className="w-100"
                        alt={product.name}
                    />
                    <span className="saleBadge">28% OFF</span>
                    <div className="card-actions-top">
                        <Button onClick={viewProductDetails}>
                            <BsArrowsFullscreen />
                        </Button>
                        <Button onClick={(e) => { e.stopPropagation(); isWishlisted ? removeFromWishlist(product._id) : handleWishlistClick(product._id); }}>
                            {isWishlisted ? <IoMdHeart /> : <IoMdHeartEmpty />}
                        </Button>
                    </div>
                </div>
                <div className="productDetails">
                    <h4 className="productTitle">{product.name}</h4>
                    <span className={`text-sm font-semibold ${product.inStock ? 'text-success' : 'text-danger'}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    <div className="productRating">
                        <Rating
                            name="read-only"
                            value={product.rating}
                            readOnly
                            size="small"
                            precision={0.5}
                        />
                    </div>
                    <div className="productPricing">
                        <span className="oldPrice">R{product.oldPrice.toFixed(2)}</span>
                        <span className="netPrice">R{product.price.toFixed(2)}</span>
                    </div>
                </div>
            </Link>
            <div className="addToCartContainer">
                <Button
                    className={`addToCartButton ${!product.inStock && 'opacity-50 cursor-not-allowed'}`}
                    
                    disabled={!product.inStock}
                >
                    <BsCart4 /> ADD TO CART
                </Button>
            </div>
        </article>
    );
};

export default ProductItem;