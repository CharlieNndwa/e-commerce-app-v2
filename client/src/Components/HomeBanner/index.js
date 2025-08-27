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
    <div className=" mt-3">
      <div className="homeBannerSection">
        <Swiper
          slidesPerView={"auto"} // Use "auto" to allow for partially visible slides
          spaceBetween={20}
          centeredSlides={true} // This is the key to having a centered active slide
          loop={true} // Loop the slides
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src={SlideBanner} alt="Banner" className="w-100" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={SlideBanner1} alt="Banner" className="w-100" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://superbhyper.co.za/wp-content/uploads/2025/04/SH-Web-Header-No-Min_Max-Order-Value-scaled.webp"
              alt="Superb Hyper Web Header"
              className="w-100"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://ik.imagekit.io/v7zehsakul/Content/Images/carousel/5c2a706d-850b-4596-8759-1041aae58b40.jpg"
              alt="Banner"
              className="w-100"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;
