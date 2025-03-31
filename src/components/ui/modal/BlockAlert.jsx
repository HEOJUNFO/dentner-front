import { BaseButton } from '@components/common';
import React from 'react';
import { useTranslation } from 'react-i18next';

const BlockAlert = ({ onClose, onBlock, type }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="alertPop" style={{ display: 'block' }}>
        {/* 차단하기 */}
        <h1 className="pt">{t('disigner.block')}</h1>
        {/* 해당 회원을 차단하시겠습니까? */}
        <div className="pBack">{t('version2_1.text2')}</div>
        <div className="pBtn">
          {/* 취소 */}
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
          {/* 확인 */}
          <BaseButton label={t('base.confirm')} className={'btnB'} onClick={onBlock} />
        </div>
      </div>
    </>
  );
};

export default BlockAlert;
