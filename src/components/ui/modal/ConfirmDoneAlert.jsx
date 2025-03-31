import React from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const ConfirmDoneAlert = ({ onClose, doneTitle, doneContents }) => {
  const { t } = useTranslation();
  return (
    <div className="alertPop" style={{ display: 'block' }}>
      <h1 className="pt">{doneTitle || t('base.noti')}</h1>
      <div className="pBack" style={{whiteSpace: 'pre-wrap'}}>{doneContents}</div>
      <div className="pBtn">
        <BaseButton label={t('base.confirm')}  className={'btnB'} onClick={() => onClose()} />
      </div>
    </div>
  );
};

export default ConfirmDoneAlert;
