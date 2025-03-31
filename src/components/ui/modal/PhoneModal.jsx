import { postMileageCard } from '@api/Mileage';
import { BaseButton, BaseInput, BaseSelect, ModalAlertPresent } from '@components/common';
import { postAuthPhone, getAuthPhone, getCommonCode } from '@api/Common';

import { useNav, useSnack } from '@components/hooks';
import { strToLength } from '@utils/common';
import React, { useEffect, useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import SmsVerify from '../components/SmsVerify';
import { useValid } from '../../../pages/login/hooks';
import { useTranslation } from 'react-i18next';
import { putPhoneNumber } from '../../../api/Mypage';
import PropTypes from 'prop-types';
import { isValidatePhone } from '@utils/common';
import { Timer } from '@components/common';
import UserStore from '@store/UserStore';

/**
 * 전화번호 변경
 * @param {*} param0
 * @returns
 */
const PhoneModal = ({
  certification,
  type,
  email,
  seconds,
  title,
  sendPlaceholder,
  sendButtonName,
  reSendButtonName,
  verifyPlaceholder,
  onVerifyClick,
  err,
  onChange,
  onSendClick,
  onClose,
  memberTp,
}) => {
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const { t, i18n } = useTranslation();
  const [isVerify, setVerify] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [tokenValue, setTokenValue] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [timerEnd, setTimerEnd] = useState(false);
  const [countryPhoneCodes, setCountryPhoneCodes] = useState([]);
  const { user, setPhone } = UserStore();

  const [body, setBody] = useState({
    phone: { value: user?.memberHp, isRequired: true, error: '', check: 0, success: 0, maxLength: 11, placeholder: t('version2_1.text61') },
    certification: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 11, placeholder: t('placeholder.enter_credential') },
  });

  const [selectedValue, setSelectedValue] = useState('');

  const { handleModalPhone } = useValid({ params: body, setParams: setBody });

  const handleSmsVerify = (p) => {
    handleChange('certification', p.value);
  };

  const handleFocus = (e) => {
    handleErrorChange(e.target.id, '');
  };

  const handleChange = (name, value, success = 0, error = '') => {
    setBody((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  const handleErrorChange = (name, error) => {
    setBody((prev) => ({
      ...prev,
      [name]: { ...prev[name], error },
    }));
  };
  const handleBlur = (e) => {
    const v = e.target.value.replace(/[^0-9]/g, '');
    handleChange('phone', v);
  };

  const handleVerifyClick = async () => {
    try {
      const r = await getAuthPhone({ authCode: body.certification.value, token: tokenValue });
      const { data, statusCode } = r;

      if (Boolean(Number(data))) {
        setVerify(true);
        if (onVerifyClick) {
          onVerifyClick({ ...params, token: tokenValue });
        }
      } else {
        setVerify(false);
        handleErrorChange('certification', t('error.unmatch_credential'));
      }
    } catch (e) {
      const { message } = e;
      setVerify(false);
      handleErrorChange('certification', message);
    }
  };

  const fetchCode = async () => {
    setSelectedValue(user?.memberHpNation);

    const r = await getCommonCode('1', i18n.language);
    const dt = r?.data;
    if (dt) {
      const udt = Array.from(new Set(dt.map((el) => el.codeName)))
        .map((codeName) => {
          return dt.find((el) => el.codeName === codeName);
        })
        .sort((a, b) => a.codeName.localeCompare(b.codeName));
      setCountryPhoneCodes(udt);
    }
  };

  const handleSubmit = async () => {
    let memberContactNation = '208';
    if (user?.memberTp === 'B') {
      memberContactNation = selectedValue;
    }

    const requestParam = { phone: body.phone.value, memberContactNation: memberContactNation, certification: body.certification.value };

    try {
      const r = await putPhoneNumber(requestParam);
      if (r.statusCode !== 200) return;
      setPhone(body.phone.value);
      showSnackbar(t('version2_3.text80'));
      onClose();
    } catch (e) {
      if (e?.message) {
        showWarnSnackbar(t('version2_5.text9'));
      } else {
        showWarnSnackbar(t('version2_3.text63'));
      }
    }
  };

  const handleSendClick = async () => {
    handleErrorChange('phone', '');
    if (isSend) {
      setSecondsLeft(seconds);
      setIsSend(false);
      if (onSendClick) onSendClick(false);
      return;
    }
    const isPhone = isValidatePhone(body.phone.value);
    if (!isPhone) {
      handleErrorChange('phone', t('error.phone_type'));
      return;
    }
    // if (!body.nation.value && type === 2) {
    //   handleErrorChange('nation', t('error.select_nation'));
    //   return;
    // }

    const certifyParam = {
      phone: body.phone.value,
      memberContactNation: user?.memberHpNation,
      certification: certification,
      email: email,
      memberTp: memberTp,
    };

    try {
      const r = await postAuthPhone(certifyParam);
      const dt = r.data;
      if (dt?.tokenValue) {
        if (isSend) {
          setSecondsLeft(seconds);
        }
        setTokenValue(dt?.tokenValue);
        setIsSend(true);
        if (onSendClick) onSendClick(true);
      }
    } catch (e) {
      const { message } = e;
      handleErrorChange('phone', message);
    }
  };

  useEffect(() => {
    fetchCode();
  }, [i18n.language]);

  return (
    <>
      <div className="basicPop cardPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('version2_3.text81')}</h1>
        <div className="pBack">
          <div className="tws">
            <dl>
              <dt>
                {t('certify.phone')}
                <sup>필수항목</sup>
              </dt>
              <dd className="phoneCertify">
                {user?.memberTp === 'B' && (
                  <BaseSelect
                    items={countryPhoneCodes}
                    selectedValue={selectedValue}
                    placeholder={'선택하세요.'}
                    titleName={'codeName'}
                    valueName={'codeNo'}
                    onChange={(e) => setSelectedValue(e.codeNo)}
                  />
                )}
                <span className="certifySet">
                  <BaseInput
                    type="text"
                    id="phone"
                    placeholder={body.phone.placeholder}
                    value={body.phone.value}
                    error={body.phone.error}
                    maxLength={body.phone.maxLength}
                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    readOnly={isVerify || isSend}
                  />
                  {!isVerify && isSend && <Timer secondsLeft={secondsLeft} setSecondsLeft={setSecondsLeft} timerEnd={timerEnd} setTimerEnd={setTimerEnd} />}
                </span>
                {/* {body.nation.error && <p className="errorP">{body.nation.error}</p>} */}
                <BaseButton type="button" className={'btnB sm'} label={isSend ? t('version2_4.text56') : t('version2_4.text55')} onClick={handleSendClick} disabled={isVerify || !body.phone.value} />

                {isSend && (
                  <>
                    <p className="notiP">{t('notify.sent_cert')}</p>
                    <BaseInput
                      type="text"
                      id={'certification'}
                      placeholder={t('version2_4.text57')}
                      value={body.certification.value}
                      error={body.certification.error}
                      maxLength={body.certification.maxLength}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                      onFocus={handleFocus}
                      readOnly={isVerify}
                    />
                    <BaseButton type="button" className={'btnB sm'} label={t('version2_3.text82')} onClick={handleVerifyClick} disabled={isVerify || !body.certification.value} />

                    {/* {body.verify.error && <p className="errorP">인증번호가 일치하지 않습니다.</p>} */}
                  </>
                )}
              </dd>
            </dl>
            {/* <SmsVerify certification="C" onVerifyClick={handleModalPhone} err={body.phone.error} onChange={handleSmsVerify} certId={'certification'} /> */}
          </div>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_3.text67')} className={'btnB'} onClick={handleSubmit} disabled={!body.certification.value || !body.phone.value || !isVerify} />
        </div>
      </div>
    </>
  );
};

PhoneModal.displayName = 'PhoneModal';

PhoneModal.propTypes = {
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

PhoneModal.defaultProps = {
  type: 1,
  seconds: 300,
  title: '휴대폰 인증',
  sendPlaceholder: '휴대전화번호를 입력하세요.',
  sendButtonName: '인증번호 전송',
  reSendButtonName: '인증번호 재전송',
  verifyPlaceholder: '인증번호를 입력하세요.',
};

export default PhoneModal;
