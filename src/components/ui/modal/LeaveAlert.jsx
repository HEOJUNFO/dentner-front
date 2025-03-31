import { deleteChatRoom } from '@api/Chat';
import React, { useState } from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const LeaveAlert = ({ onFetch, onClose, roomNo }) => {
  console.log(roomNo);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      const r = await deleteChatRoom(roomNo);
      if (r?.data) {
        if (onFetch) onFetch();
        if (onClose) onClose();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="alertPop" style={{ display: 'block' }}>
        <h1 className="pt">{t('base.exit')}</h1>
        <div className="pBack">
          {t('version2_3.text50')}
          <br />
          {t('version2_3.text51')}
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={t('base.confirm')} className={'btnB'} onClick={() => handleSubmit()} />
        </div>
      </div>
    </>
  );
};

export default LeaveAlert;
