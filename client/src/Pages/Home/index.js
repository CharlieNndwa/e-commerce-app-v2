import HomeBanner from "../../Components/HomeBanner";
import HomeCat from "../../Components/HomeCat";
import ProductItem from "../../Components/ProductItem";
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import { MyContext } from "../../App";

// Import your banner images
import bannerStrip1 from "../../assets/images/s.jpg";
import bannerStrip2 from "../../assets/images/slider.png";
import bannerStrip3 from "../../assets/images/z.png";
import staticBanner from "../../assets/images/Shoprite-SubsidyPromise2025-Homepagebanner-Hero-CTA-1920x400-1.png";

const Home = () => {
  const context = useContext(MyContext);
  const { productList, isReady } = context;

  if (!isReady || !productList || productList.length === 0) {
    return <div>Loading products...</div>;
  }

  const bestSellers = productList.filter((product) => product.isFeatured);
  const newProducts = productList.filter((product) => !product.isFeatured);
  const appliances = productList.filter((product) => product.category === 'Appliances');

  const dynamicBanners = [
    bannerStrip1,
    bannerStrip2,
    bannerStrip3,
  ];

  return (
    <>
      <HomeBanner />
      <HomeCat />

      {/* BEST SELLERS Section with Carousel */}
      <section className="home-products-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">BEST SELLERS</h3>
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={24}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {bestSellers.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      ---

      {/* Dynamic Banner Strip Section */}
      <section className="dynamic-banner-strip">
        <div className="container">
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            effect={"fade"}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            modules={[EffectFade, Autoplay]}
            className="myBannerSwiper"
          >
            {dynamicBanners.map((imgSrc, index) => (
              <SwiperSlide key={index}>
                <img src={imgSrc} alt={`Dynamic Banner ${index + 1}`} className="w-100 banner-strip-img" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      ---

      {/* NEW PRODUCTS Section with Carousel */}
      <section className="home-products-section">
        <div className="container">
          <div className="section-header">
            <h3 className="section-title">NEW PRODUCTS</h3>
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={24}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {newProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      ---

      {/* Static Banner Section */}
      <section className="static-banner-section">
        <div className="container">
          <div className="static-banner-img-container">
            <img src={staticBanner} alt="Static Promotional Banner" className="img-fluid" />
          </div>
        </div>
      </section>

      ---

      {/* Appliances Section with Carousel and Custom Header */}
      <section className="home-products-section">
        <div className="container">
          <div className="section-header-carousel">
            <h3 className="section-title">APPLIANCES</h3>
          </div>
          <Swiper
            slidesPerView={4}
            spaceBetween={24}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {appliances.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Home;