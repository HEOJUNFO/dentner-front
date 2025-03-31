import React from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { replaceToBr } from '@utils/common';

const RequestNote = ({ requestFormDc }) => {
  const { t } = useTranslation();
  return (
    <>
      <h4>
        <strong>{t('base.request')}</strong>
      </h4>
      <div className="paragraph" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(requestFormDc)) }}></div>
    </>
  );
};

export default RequestNote;
