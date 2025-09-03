import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Import your banner images
import SlideBanner from "../../assets/images/slideBanner0.jpg";
import SlideBanner1 from "../../assets/images/slidebanner07.jpg";

const HomeBanner = () => {
    return (
        <div className="flex justify-center items-center mt-3 p-4 md:p-8">
            <div className="w-full max-w-7xl relative">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300 hover:shadow-3xl"
                    style={{ border: '2px solid transparent', boxShadow: '0 0 15px 5px rgba(59, 130, 246, 0.5)' }}
                >
                    <SwiperSlide>
                        <img src={SlideBanner} alt="Banner" className="w-full object-cover rounded-3xl" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={SlideBanner1} alt="Banner" className="w-full object-cover rounded-3xl" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://superbhyper.co.za/wp-content/uploads/2025/04/SH-Web-Header-No-Min_Max-Order-Value-scaled.webp"
                            alt="Superb Hyper Web Header"
                            className="w-full object-cover rounded-3xl"
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://ik.imagekit.io/v7zehsakul/Content/Images/carousel/5c2a706d-850b-4596-8759-1041aae58b40.jpg"
                            alt="Banner"
                            className="w-full object-cover rounded-3xl"
                        />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default HomeBanner;