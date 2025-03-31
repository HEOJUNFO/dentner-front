import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SwiperImage, SwiperImageThumbs } from '@components/common';
import { useTranslation } from 'react-i18next';

const ImageThumbs = ({ items, imgName = 'file_path', onSelected }) => {
  const { t } = useTranslation();
  const [swiper, setSwiper] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    if (onSelected) {
      onSelected(items[activeIndex]);
    }
  }, [activeIndex]);

  return (
    <div className="portfolioImg">
      <div className="pfMainSwiper">
        {items?.length > 0 && (
          <SwiperImage
            items={items.map((el, idx) => {
              return <img key={`${idx}pimgSet`} src={el[imgName]} />;
            })}
            onSlideChange={handleSlideChange}
            thumbsSwiper={swiper}
            pagination={true}
          />
        )}
        {items?.length === 0 && <p className="noList image">{t('version2_3.text120')}</p>}
      </div>

      {items?.length > 0 && (
        <div className="pfThumbsSwiper">
          <SwiperImageThumbs
            space={10}
            items={items.map((el, idx) => {
              return (
                <span key={`${idx}SwiperImageThumbs`}>
                  <img src={el[imgName]} />
                </span>
              );
            })}
            perview={'auto'}
            setThumbsSwiper={setSwiper}
          />
        </div>
      )}
    </div>
  );
};

export default ImageThumbs;
