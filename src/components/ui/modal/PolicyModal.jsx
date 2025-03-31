import React, { useEffect, useRef, useState } from 'react';
import { BaseButton } from '@components/common';
import { getTerms } from '../../../api/Login';
import { useTranslation } from 'react-i18next';

const PolicyModal = ({ onClose, keyName }) => {
  const { t } = useTranslation();
  const [term, setTerm] = useState();

  const fetchTerms = async () => {
    const r = await getTerms();
    let data = r?.data;

    if (keyName !== '' && data) {
      if (keyName === 'tos') {
        setTerm({ termsTitle: t('footer.links.terms_of_service'), ...data?.useTerms });
      } else if (keyName === 'privacy') {
        setTerm({ termsTitle: t('footer.links.privacy_policy'), ...data?.privateTerms });
      } else if (keyName === 'consign') {
        setTerm({ termsTitle: t('version2_3.text83'), ...data?.privateConsignmentTerms });
      } else if (keyName === 'marketing') {
        setTerm({ termsTitle: t('version2_3.text84'), ...data?.marketingTerms });
      }
    }
  };

  useEffect(() => {
    fetchTerms();
  }, [keyName]);

  return (
    <>
      <div className="basicPop policyePop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{term?.termsTitle}</h1>
        <div className="pBack">
          <div className="agreeDtBack">{term?.termsCn}</div>
        </div>
        <div className="pBtn">
          <BaseButton label={t('base.confirm')} className={'btnB'} onClick={() => onClose()} />
        </div>
      </div>
    </>
  );
};

export default PolicyModal;
