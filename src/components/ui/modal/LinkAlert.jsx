import React, { useEffect } from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const LinkAlert = ({ url, onClose }) => {
  const { t } = useTranslation();
  const handleCopyUrl = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log('클립보드에 복사되었습니다');
      })
      .catch((error) => {
        console.error('클립보드 복사 실패!');
      });
  };

  useEffect(() => {
    if (url) handleCopyUrl(url);
  }, [url]);

  return (
    <div className="alertPop" style={{ display: 'block' }}>
      <h1 className="pt">{t('disigner.copy_link')}</h1>
      <div className="pBack">{t('version2_3.text52')}</div>
      <div className="pBtn">
        <BaseButton label={t('base.confirm')} className={'btnB'} onClick={() => onClose()} />
      </div>
    </div>
  );
};

export default LinkAlert;
