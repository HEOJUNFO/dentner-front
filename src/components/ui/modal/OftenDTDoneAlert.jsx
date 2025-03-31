import React, { useState } from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const OftenDTDoneAlert = ({ onClose, onDelete }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="alertPop" style={{ display: 'block' }}>
        <div className='alertMTit'>
          <BaseButton label={'닫기'} className={'btnPClose'} onClick={onClose} />
          <h1 className="pt">자주쓰는 말 삭제</h1>
        </div>
        <div className="pBack pt0">{t('version2_3.text57')}</div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={onClose} />
          <BaseButton label={t('version2_3.text55')} className={'btnB'} onClick={onDelete} />
        </div>
      </div>
    </>
  );
};

export default OftenDTDoneAlert;
