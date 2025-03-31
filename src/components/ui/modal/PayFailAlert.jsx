import React from 'react';
import { BaseButton } from '@components/common';
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';

const PayFailAlert = ({ onClose }) => {
  const { t } = useTranslation();
  const { handleNav, params: pathValue } = useNav();

  return (
    <div className="alertPop" style={{ display: 'block' }}>
      <h1 className="pt">{t('base.noti')}</h1>
      <div className="pBack">
        {t('version2_3.text68')}
        <br />
        {t('version2_3.text69')}
      </div>
      <div className="pBtn">
        <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
        <BaseButton label={t('version2_3.text70')} className={'btnB'} onClick={() => handleNav('/mileage')} />
      </div>
    </div>
  );
};

export default PayFailAlert;
