import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

// Your banner imports
import HomeBanner from "../../Components/HomeBanner";
import HomeCat from "../../Components/HomeCat";
import ProductItem from "../../Components/ProductItem";
import bannerStrip1 from "../../assets/images/s.jpg";
import bannerStrip2 from "../../assets/images/slider.png";
import bannerStrip3 from "../../assets/images/z.png";
import staticBanner from "../../assets/images/Shoprite-SubsidyPromise2025-Homepagebanner-Hero-CTA-1920x400-1.png";

const Home = () => {
    const context = useContext(MyContext);
    const { productList, categoryList, isReady } = context;

    // Filter products for different sections
    const trendingProducts = productList.slice(0, 10); // A simple way to get trending products
    const weeklyDeals = productList.filter((product) => product.price < 500);
    const recentlyViewed = productList.slice(10, 20);

    const dynamicBanners = [
        bannerStrip1,
        bannerStrip2,
        bannerStrip3,
    ];

    if (!isReady || !productList || productList.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-600">Loading products...</p>
            </div>
        );
    }

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const categoryLinkVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: i => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5
            }
        })
    };

    const productCarouselVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <HomeBanner />
            <HomeCat />

        
            {/* <motion.section
                className="py-12 bg-white"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Shop by Category</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {categoryList.slice(0, 6).map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                custom={i}
                                initial="hidden"
                                animate="visible"
                                variants={categoryLinkVariants}
                            >
                                <Link to={`/products/${cat.id}`}>
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-40 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 group-hover:bg-opacity-60">
                                        <h4 className="text-white text-lg font-semibold text-center p-2">{cat.name}</h4>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section> */}

            <hr className="my-10 border-gray-200" />

            {/* "Weekly Deals" Section with a sleek carousel */}
            <motion.section
                className="py-12 bg-gray-50"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Weekly Deals</h2>
                        <Link to="/allproducts" className="text-blue-600 font-semibold hover:underline transition-colors">
                            View All &rarr;
                        </Link>
                    </div>
                    <motion.div variants={productCarouselVariants}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={24}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper"
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {weeklyDeals.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductItem product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </motion.section>

            <hr className="my-10 border-gray-200" />

            {/* Dynamic Banner Strip Section */}
            <section className="dynamic-banner-strip mb-10">
                <div className="container mx-auto px-4">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        effect={"fade"}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        loop={true}
                        modules={[EffectFade, Autoplay]}
                        className="myBannerSwiper rounded-xl shadow-lg"
                    >
                        {dynamicBanners.map((imgSrc, index) => (
                            <SwiperSlide key={index}>
                                <img src={imgSrc} alt={`Dynamic Banner ${index + 1}`} className="w-full h-auto object-cover rounded-xl" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <hr className="my-10 border-gray-200" />

            {/* "Featured Products" Section (All products from API) */}
            <motion.section
                className="py-12 bg-white"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
                        <Link to="/allproducts" className="text-blue-600 font-semibold hover:underline transition-colors">
                            View All &rarr;
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {productList.slice(0, 12).map((product, i) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <ProductItem product={product} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <hr className="my-10 border-gray-200" />

            {/* Static Banner Section */}
            <section className="static-banner-section mb-10">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="static-banner-img-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img src={staticBanner} alt="Static Promotional Banner" className="w-full h-auto object-cover rounded-xl shadow-lg" />
                    </motion.div>
                </div>
            </section>

            <hr className="my-10 border-gray-200" />
            
            {/* "Recently Viewed" Section (Simulated) */}
            <motion.section
                className="py-12 bg-gray-50"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Recently Viewed Products</h2>
                    <motion.div variants={productCarouselVariants}>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={24}
                            navigation={true}
                            modules={[Navigation]}
                            className="mySwiper"
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {recentlyViewed.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <ProductItem product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Home;