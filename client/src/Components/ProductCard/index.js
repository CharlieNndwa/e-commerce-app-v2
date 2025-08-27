// src/Components/ProductCard/ProductCard.js

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { MyContext } from '../../App';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ProductCard = ({ data, onRemoveFromWishlist }) => {
    const context = useContext(MyContext);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        if (context.isLogin && context.userWishlist) {
            setIsWishlisted(context.userWishlist.some(item => item._id === data._id));
        }
    }, [context.userWishlist, context.isLogin, data._id]);

    const handleWishlistToggle = async () => {
        if (!context.isLogin) {
            toast.error("Please sign in to add to your wishlist.");
            return;
        }

        const token = localStorage.getItem('token');
        try {
            if (isWishlisted) {
                await axios.delete(`http://localhost:8080/api/user/wishlist/${data._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Removed from wishlist!");
            } else {
                await axios.post("http://localhost:8080/api/user/wishlist", { productId: data._id }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Added to wishlist!");
            }
            context.fetchUserWishlist(); // Re-fetch the updated list
        } catch (error) {
            console.error("Wishlist operation failed:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handleAddToCart = () => {
        context.addToCart(data);
    };

    return (
        <div className="product-card">
            <Button className="wishlist-btn" onClick={handleWishlistToggle}>
                {isWishlisted ? <IoHeart color="red" /> : <IoHeartOutline />}
            </Button>
            <Link to={`/product/${data._id}`}>
                <img src={data.images[0]} alt={data.name} className="product-image" />
            </Link>
            <div className="product-info">
                <Link to={`/product/${data._id}`}>
                    <h5 className="product-name">{data.name}</h5>
                </Link>
                <p className="product-price">R{data.price.toFixed(2)}</p>
                <div className="product-actions">
                    <Button onClick={handleAddToCart} variant="contained" className="add-to-cart-btn">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;