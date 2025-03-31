import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ModalPresent } from '@components/common';
import PolicyModal from '@components/ui/modal/PolicyModal';
import { useTranslation } from 'react-i18next';

/**
 * 약관
 */
const Agree = forwardRef(({ isRequired, id, title, keyName, onChange, checked }, ref) => {
  const { t } = useTranslation();
  useImperativeHandle(ref, () => ({
    onChange,
  }));
  const [isPolicyModal, setIsPolicyModal] = useState(false);

  const moreHandler = () => {
    // 'tos' '이용약관 동의'
    // 'privacy' '개인정보처리방침 동의'
    // 'consign' '개인정보 처리위탁 계약 동의'
    // 'marketing' '마케팅 수신 동의'

    let targetUrl;

    if (keyName === 'tos') {
      targetUrl = `${window.location.protocol}//${window.location.host}/service1`;
    } else if (keyName === 'privacy') {
      targetUrl = `${window.location.protocol}//${window.location.host}/service2`;
    } else if (keyName === 'consign') {
      targetUrl = `${window.location.protocol}//${window.location.host}/service3`;
    } else if (keyName === 'marketing') {
      targetUrl = `${window.location.protocol}//${window.location.host}/service4`;
    }

    window.open(targetUrl, '_blank');
  };

  return (
    <>
      <li>
        <span className="checkSet">
          <input type="checkbox" id={id || keyName} onChange={onChange} checked={checked} />
          <label htmlFor={id || keyName}>
            {isRequired ? <em>&#91;{t('version2_1.text55')}&#93;</em> : <>&#91;{t('base.select')}&#93;</>} {title}
          </label>
        </span>
        {/* <input type="button" value="more" className="more" onClick={() => setIsPolicyModal(true)} /> */}
        <input type="button" value="more" className="more" onClick={() => moreHandler()} />
      </li>

      {isPolicyModal && (
        <ModalPresent>
          <PolicyModal onClose={() => setIsPolicyModal(false)} keyName={keyName} />
        </ModalPresent>
      )}
    </>
  );
});

export default Agree;
