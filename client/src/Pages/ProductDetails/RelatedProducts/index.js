import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "../../../Components/ProductItem";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import React from "react";

const RelatedProducts = (props) => {
    if (!props.relatedProducts || props.relatedProducts.length === 0) {
        return null;
    }

    return (
        <>
            <div className="d-flex align-items-center mt-4">
                <div className="info w-75">
                    <h3 className="mb-0 hd ">{props.title}</h3>
                </div>
            </div>

            <div className="product_row w-100 mt-2">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={24}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                            slidesPerGroup: 1,
                        },
                        481: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                            slidesPerGroup: 2,
                        },
                        769: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                            slidesPerGroup: 3,
                        },
                        1025: {
                            slidesPerView: 5,
                            spaceBetween: 24,
                            slidesPerGroup: 5,
                        },
                    }}
                    className="mySwiper"
                >
                    {props.relatedProducts.map((product) => (
                        // Add a conditional check to ensure 'product' is valid
                        product && (
                            <SwiperSlide key={product._id}>
                                {/* Change the prop name from 'data' to 'product' */}
                                <ProductItem product={product} />
                            </SwiperSlide>
                        )
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default RelatedProducts;
