import React from 'react';
import { useTranslation } from 'react-i18next';

const Error500 = () => {
  const { t } = useTranslation();
  return (
    <div id="errorWrap">
      <div className="back">
        <strong>
          {/* 홈페이지 점검중 */}
          {t('version2_1.text53')}
        </strong>
        <p>
          {/* 현재 덴트너 점검중입니다. : ) */}
          {t('version2_1.text54')}
        </p>
        {/* <a href="" className="btnL">
          홈으로 이동
        </a> */}
      </div>
    </div>
  );
};

export default Error500;
