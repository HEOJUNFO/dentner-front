import React from 'react';
import sampleProfile from '@assets/images/sample/sample8.png';
import { useTranslation } from 'react-i18next';

const BannerItem = ({ element, onClick }) => {
  const { t } = useTranslation();

  return (
    <>
     
      <div
        className="img"
        style={{ cursor: element?.bannerUrl ? 'pointer' : '' }}
        onClick={() => {
          element?.bannerUrl && onClick(element?.bannerUrl);
        }}
      >
        <img
          src={element?.bannerImage}
          width={'100%'}
          height={'100%'}
          style={{ objectFit: 'contain', width: '100%' }}
          onError={(e) => {
            e.target.src = sampleProfile;
          }}
        />
      </div>
    </>
  );
};

export default BannerItem;
