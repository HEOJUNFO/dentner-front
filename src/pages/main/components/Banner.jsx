import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useBanner } from '../hooks/useMain';
import sampleProfile from '@assets/images/sample/sample8.png';
import Swiper from '@components/common/Swiper';
import BannerItem from './BannerItem';

const Banner = ({ type = 'A', className }) => {
  const { paginationRef, swiper, setSwiper, items, handleLinkUrl } = useBanner();

  const mainBanners = items.filter((e) => e?.bannerSe === type);
  return (
    <div className={className}>
      <Swiper
        items={mainBanners?.map((el) => (
          <BannerItem element={el} onClick={handleLinkUrl} />
        ))}
        navigation={true}
        pagination={true}
        paginationRef={paginationRef}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        setSwiper={setSwiper}
        // onChangeActiveIndex={onChangeActiveIndex}
        onPauseOnMouseEnter={false}
      />
    </div>
  );
};

export default Banner;
