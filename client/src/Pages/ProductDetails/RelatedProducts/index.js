// src/Components/RelatedProducts.js
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../../../Components/ProductItem";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RelatedProducts = ({ title, categoryId, currentProductId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (!categoryId) return;
            try {
                const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
                // Filter out the current product from the list
                const filteredProducts = response.data.filter(p => p.id !== currentProductId);
                setRelatedProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching related products:", error);
                setRelatedProducts([]); // Clear products on error
            }
        };

        fetchRelatedProducts();
    }, [categoryId, currentProductId]);

    if (!relatedProducts || relatedProducts.length === 0) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">{title}</h2>
                <Link to="/products" className="text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors duration-200 hidden md:block">
                    View All &rarr;
                </Link>
            </div>

            <div className="w-full">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={16}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 24,
                        },
                    }}
                    className="mySwiper"
                >
                    {relatedProducts.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductItem product={product} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default RelatedProducts;