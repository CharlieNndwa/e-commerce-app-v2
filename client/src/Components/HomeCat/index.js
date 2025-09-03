// src/Components/HomeCat.js

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MyContext } from "../../App";
import "swiper/css";
import "swiper/css/navigation";

// Add the slugify function here for consistent routing
const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/,/g, "")
        .replace(/&/g, "and")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();

// Placeholder images for Platzi API categories
const categoryImages = {
    'Clothes': 'https://png.pngtree.com/png-clipart/20220911/original/pngtree-3d-clothes-icon-design-vector-png-image_8537378.png',
    'Electronics': 'https://www.makro.co.za/asset/rukmini/fccp/128/128/ng-fkpublic-aegeus-fbbe/neo/b2af6560e4a3d7f6.png?q=100',
    'Furniture': 'https://www.makro.co.za/asset/rukmini/fccp/612/612/ng-fkpublic-ui-user-fbbe/sofa-sectional/b/t/d/right-facing-green-box-6-no-green-85-1-93-70-0-cotton-generic-original-imah3zw3fzxpdga8.jpeg?q=70',
    'Shoes': 'https://cdn3.iconfinder.com/data/icons/other-icons/48/nike_shoes-512.png',
    'Miscellaneous': 'https://cdn4.iconfinder.com/data/icons/miscellaneous-icons-2-1/200/misc_store-512.png',
};

// Fix the getCategoryPath function to only return the slugified name
const getCategoryPath = (name) => {
    return slugify(name);
};

const HomeCat = () => {
    const context = useContext(MyContext);
    const { categoryList, isReady } = context;

    if (!isReady || !categoryList) {
        return <div className="text-center py-8">Loading categories...</div>;
    }

    return (
        <div className="py-8 bg-gray-50 md:py-12">
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-500 uppercase tracking-wide font-medium">Shop Our</p>
                <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-8">Popular Categories</h2>
            </div>

            <div className="relative mx-auto max-w-7xl px-4">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {categoryList.map((category) => (
                        <SwiperSlide key={category.id}>
                            <Link to={`/products/${getCategoryPath(category.name)}`}>
                                <div className="flex flex-col items-center justify-center p-2 sm:p-4 transition-transform duration-300 transform hover:scale-105">
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-2 sm:mb-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <img
                                            src={categoryImages[category.name] || category.image || 'https://via.placeholder.com/150'}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h6 className="text-sm sm:text-base font-semibold text-gray-700 text-center">{category.name}</h6>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeCat;