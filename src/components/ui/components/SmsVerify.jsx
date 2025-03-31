import React, { useEffect } from 'react';
import useSmsVerify from '@components/hooks/useSmsVerify';
import { Timer } from '@components/common';
import { BaseInput, BaseButton, BaseSelect } from '@components/common';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

/**
 * 휴대폰 인증
 * 전화번호가 db에 등록되어있는지 확인 필요할 경우 "certification": "A" (아이디 찾기)
 * 전화번호와 이메일이 db에 등록되어는지 확인 필요할 경우 "certification": "B" (비밀번호 찾기)
 * 전화번호가 db에 등록되어있지 않아도 될 경우 "certification": "C" (회원가입)
 * @param {*} param
 * @returns
 */
const SmsVerify = ({ certification, type, email, seconds, title, sendPlaceholder, sendButtonName, reSendButtonName, verifyPlaceholder, onVerifyClick, err, onChange, onSendClick }) => {
  const { isVerify, params, secondsLeft, setSecondsLeft, countryPhoneCodes, timerEnd, setTimerEnd, handleSendClick, handleVerifyClick, handleChange, handleFocus, handleBlur, isSend } = useSmsVerify({
    seconds,
    onVerifyClick,
    certification,
    type,
    email,
    err,
    onChange,
    onSendClick,
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {}, [i18n.language]);

  const defaultTitle = t('certify.phone');
  const defaultPlaceholder = t('placeholder.enter_phone');
  const defaultSendButtonName = t('version2_4.text55');
  const defaultReSendButtonName = t('version2_4.text56');
  const defaultVerifyPlaceholder = t('version2_4.text57');

  return (
    <dl>
      <dt>
        {defaultTitle}
        <sup>필수항목</sup>
      </dt>
      <dd className="phoneCertify">
        {type === 2 && <BaseSelect items={countryPhoneCodes} placeholder={t('version2_1.text101')} titleName={'codeName'} valueName={'codeNo'} onChange={(e) => handleChange('nation', e.codeNo)} />}
        <span className="certifySet">
          <BaseInput
            type="text"
            id="phone"
            placeholder={defaultPlaceholder}
            value={params.phone.value}
            error={params.phone.error}
            maxLength={params.phone.maxLength}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={isVerify || isSend}
          />
          {!isVerify && isSend && <Timer secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} timerEnd={timerEnd} setTimerEnd={setTimerEnd} />}
        </span>
        {params.nation.error && <p className="errorP">{params.nation.error}</p>}
        <BaseButton type="button" className={'btnB sm'} label={isSend ? defaultReSendButtonName : defaultSendButtonName} onClick={handleSendClick} disabled={isVerify || !params.phone.value} />

        {isSend && (
          <>
            {/* <p className="notiP">인증 번호를 전송하였습니다.</p> */}
            <p className="notiP">{t('notify.sent_cert')}</p>
            <BaseInput
              type="text"
              id="verify"
              placeholder={defaultVerifyPlaceholder}
              value={params.verify.value}
              error={params.verify.error}
              maxLength={params.verify.maxLength}
              onChange={(e) => handleChange(e.target.id, e.target.value)}
              onFocus={handleFocus}
              readOnly={isVerify}
            />
            <BaseButton type="button" className={'btnB sm'} label={t('version2_3.text82')} onClick={handleVerifyClick} disabled={isVerify || !params.verify.value} />

            {/* {params.verify.error && <p className="errorP">인증번호가 일치하지 않습니다.</p>} */}
          </>
        )}
      </dd>
    </dl>
  );
};

SmsVerify.displayName = 'SmsVerify';

SmsVerify.propTypes = {
  className: PropTypes.string,
  type: PropTypes.number, // 내국인:1, 외국인:2
  seconds: PropTypes.number,
  title: PropTypes.string,
  sendPlaceholder: PropTypes.string,
  sendButtonName: PropTypes.string,
  reSendButtonName: PropTypes.string,
  verifyPlaceholder: PropTypes.string,
  onVerifyClick: PropTypes.func,
};

SmsVerify.defaultProps = {
  type: 1,
  seconds: 300,
  title: '휴대폰 인증',
  sendPlaceholder: '휴대전화번호를 입력하세요.',
  sendButtonName: '인증번호 전송',
  reSendButtonName: '인증번호 재전송',
  verifyPlaceholder: '인증번호를 입력하세요.',
};

export default SmsVerify;
