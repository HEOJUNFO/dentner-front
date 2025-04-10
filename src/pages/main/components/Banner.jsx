import React from 'react';
import { useBanner } from '../hooks/useMain';
import Swiper from '@components/common/Swiper';
import BannerItem from './BannerItem';

const Banner = ({ type = 'A', className }) => {
  const { paginationRef, swiper, setSwiper, items, handleLinkUrl } = useBanner();

  const mainBanners = items.filter((e) => e?.bannerSe === type);
  
  const reversedBanners = mainBanners.slice().reverse();
  
  return (
    <div className={className}>
      <Swiper
        items={reversedBanners?.map((el) => (
          <BannerItem element={el} onClick={handleLinkUrl} />
        ))}
        navigation={true}
        pagination={true}
        paginationRef={paginationRef}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        setSwiper={setSwiper}
        onPauseOnMouseEnter={false}
      />
    </div>
  );
};

export default Banner;