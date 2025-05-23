import React, { useState } from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const NumValueDoneAlert = ({ onRemove, onClose }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="alertPop" style={{ display: 'block' }}>
        <div className="pBack pt0">{t('version2_3.text54')}</div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={onClose} />
          <BaseButton label={t('version2_3.text55')} className={'btnB'} onClick={onRemove} />
        </div>
      </div>
    </>
  );
};

export default NumValueDoneAlert;
