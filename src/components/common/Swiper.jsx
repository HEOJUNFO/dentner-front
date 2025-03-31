import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Thumbs, FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const SwiperBase = ({ items, customButton, navigation, setSwiper, perview, space, breakpoints, autoplay, pagination, paginationRef, onChangeActiveIndex, onPauseOnMouseEnter }) => {
  const swiperRef = useRef(null);
  const handleMouseEnter = () => {
    swiperRef?.current?.swiper?.autoplay?.stop();
  };

  const handleMouseLeave = () => {
    swiperRef?.current?.swiper?.autoplay?.start();
  };
  const swiper = (
    <Swiper
      ref={swiperRef}
      modules={[...(navigation ? [Navigation] : []), ...(pagination ? [Pagination] : []), ...(autoplay ? [Autoplay] : [])]}
      navigation={true}
      spaceBetween={space || 0}
      slidesPerView={perview || 1}
      breakpoints={breakpoints}
      autoplay={{ ...autoplay }}
      onSlideChange={onChangeActiveIndex && onChangeActiveIndex}
      onSwiper={(e) => {
        if (setSwiper) setSwiper(e);
        swiperRef.current = swiper;
      }}
      pagination={{
        enabled: true,
        clickable: true,
        // ...(paginationRef ? { el: `.${paginationRef?.current?.className}` } : {}),
      }}
    >
      {items?.map((el, idx) => (
        <SwiperSlide key={idx}>{el}</SwiperSlide>
      ))}
    </Swiper>
  );

  if (onPauseOnMouseEnter) {
    return (
      <div className="addDiv" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {swiper}
      </div>
    );
  }
  return swiper;
};

const SwiperImage = ({ items, space, perview, thumbsSwiper, setThumbsSwiper, breakpoints, onSlideChange }) => {
  return (
    <Swiper
      spaceBetween={space || 0}
      slidesPerView={perview || 1}
      // breakpoints={breakpoints}
      // pagination={true}
      onSlideChange={onSlideChange}
      pagination={{
        clickable: true,
      }}
      thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
      modules={[FreeMode, Pagination, Thumbs]}
    >
      {items?.map((el, idx) => (
        <SwiperSlide key={`${idx}SwiperImage`}>{el}</SwiperSlide>
      ))}
    </Swiper>
  );
};

const SwiperImageThumbs = ({ items, space, perview, setThumbsSwiper }) => {
  return (
    <>
      <Swiper
        onSwiper={(e) => {
          if (setThumbsSwiper) setThumbsSwiper(e);
        }}
        spaceBetween={space || 10}
        slidesPerView={perview || 4}
        freeMode={true}
        watchSlidesProgress={true}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {items?.map((el, idx) => (
          <em key={`${idx}SwiperImageThumbs`}>
            <SwiperSlide key={`${idx}SwiperImageThumbs SwiperSlide`}>{el}</SwiperSlide>
          </em>
        ))}
      </Swiper>
    </>
  );
};

export { SwiperBase as default, SwiperImage, SwiperImageThumbs };
