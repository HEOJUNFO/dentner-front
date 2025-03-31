import React from 'react';
import { useTranslation } from 'react-i18next';

const Error404 = () => {
  const { t } = useTranslation();
  return (
    <div id="errorWrap">
      <div className="back">
        <strong>
          404
          <br />
          PAGE NOT FOUND
        </strong>
        <p>
          {t('version2_1.text49')} <br />
          {t('version2_1.text50')} <br />
          {t('version2_1.text51')}
        </p>
        <a href="" className="btnL">
          {/* 홈으로 이동 */}
          {t('version2_1.text52')}
        </a>
      </div>
    </div>
  );
};

export default Error404;
