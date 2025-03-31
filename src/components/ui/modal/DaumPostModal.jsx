import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

/**
 * 다음 주소 모달
 * @param {*} param0
 * @returns
 */
const DaumPostModal = ({ onClose, onClick }) => {
  const { t } = useTranslation();
  const handleComplete = (data) => {
    if (onClick) onClick(data);
    if (onClose) onClose();
  };
  return (
    <div className="basicPop zipCodePop" style={{ display: 'block' }}>
      {/* <div style={{ height: 50 }}> */}
      <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
      {/* </div> */}
      <h1 className="pt">{t('daum.search_address')}</h1>
      <div className="pBack">
        <DaumPostcode onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default DaumPostModal;
