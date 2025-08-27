// src/Components/ProductDetailsPage.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../../App';
import QuantityBox from '../../Components/QuantityBox';
import ProductZoom from '../../Components/ProductZoom';
import { IoCartSharp } from 'react-icons/io5';
import { IoIosHeartEmpty } from 'react-icons/io';
import { MdOutlineCompareArrows } from 'react-icons/md';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import toast from 'react-hot-toast';

// 1. Import the local product data
import { PRODUCTS } from '../../Components/data/productsData';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const context = useContext(MyContext);
    const { addToCart } = context;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // 2. Find the product in the local PRODUCTS array
        const foundProduct = PRODUCTS.find(p => p._id === productId);

        // 3. Update the state with the found product and set loading to false
        setProduct(foundProduct);
        setLoading(false);
    }, [productId]);

    const onQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`${product.name} has been added to cart!`);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <Typography variant="h6">Product not found.</Typography>
            </Box>
        );
    }

    const { name, brand, rating, oldPrice, price, description, images } = product;
    const totalPrice = price * quantity;

    return (
        <div className="product-details-page-container">
            <div className="product-details-content-wrapper">
                <div className="row product-details-section">
                    <div className="col-md-5">
                        <ProductZoom images={images} />
                    </div>
                    <div className="col-md-7 product-info-section">
                        <h4 className="product-name">{name}</h4>
                        <div className="brand-rating-row">
                            <span>Brands:</span>
                            <span className="brand-name"><b>{brand}</b></span>
                            <Rating
                                name="read-only"
                                value={rating}
                                size="small"
                                precision={0.5}
                                readOnly
                            />
                        </div>
                        <Divider className="details-divider" />
                        <div className="price-info">
                            <span className="old-price">R{oldPrice.toFixed(2)}</span>
                            <span className="net-price">R{totalPrice.toFixed(2)}</span>
                        </div>
                        <span className="in-stock-badge">IN STOCK</span>
                        <p className="product-description">{description}</p>
                        <div className="quantity-cart-actions">
                            <QuantityBox quantity={quantity} onQuantityChange={onQuantityChange} />
                            <Button
                                variant="contained"
                                className="add-to-cart-button"
                                onClick={handleAddToCart}
                            >
                                <IoCartSharp /> ADD TO CART
                            </Button>
                        </div>
                        <div className="wishlist-compare-actions">
                            <Button className="btn-round" variant="outlined">
                                <IoIosHeartEmpty /> &nbsp; ADD TO WISHLIST
                            </Button>
                            <Button className="btn-round" variant="outlined">
                                <MdOutlineCompareArrows /> &nbsp; COMPARE
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;