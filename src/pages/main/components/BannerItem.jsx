import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import sampleProfile from '@assets/images/sample/sample8.png';
import { useTranslation } from 'react-i18next';

const BannerItem = ({ element, onClick }) => {
  const { t } = useTranslation();

  return (
    <>
      {/* <div className="txt">
        <div>
          {element?.bannerTitle}
          <strong>{element?.bannerDesc}</strong>
          {element?.bannerUrl && (
            <Link to="" onClick={() => onClick(element?.bannerUrl)}>
              {t('base.view_detail')}
            </Link>
          )}
        </div>
      </div> */}

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
