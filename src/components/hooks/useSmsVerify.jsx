import React, { useEffect, useRef, useState } from 'react';
import { postAuthPhone, getAuthPhone, getCommonCode } from '@api/Common';
import { isValidatePhone } from '@utils/common';
import { useTranslation } from 'react-i18next';

const useSmsVerify = ({ seconds, onVerifyClick, certification, type, email, err, onChange, onSendClick }) => {
  const [isVerify, setVerify] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [timerEnd, setTimerEnd] = useState(false);
  const [countryPhoneCodes, setCountryPhoneCodes] = useState([]);
  const [isSend, setIsSend] = useState(false);
  const [tokenValue, setTokenValue] = useState(null);
  const { t, i18n } = useTranslation();
  const [params, setParams] = useState({
    phone: { value: '', error: '', maxLength: 15 },
    verify: { value: '', error: '', maxLength: 6 },
    nation: { value: '', error: '' },
  });

  const handleErrorChange = (name, error) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], error },
    }));
  };

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, error: '' },
    }));
  };

  const handleFocus = (e) => {
    handleErrorChange(e.target.id, '');
  };

  const handleBlur = (e) => {
    const v = e.target.value.replace(/[^0-9]/g, '');
    handleChange('phone', v);
  };

  const handleSendClick = async () => {
    handleErrorChange('phone', '');
    // 9.19 재전송 로직 변경
    // if (isSend) {
    //   setSecondsLeft(seconds);
    //   setIsSend(false);
    //   if (onSendClick) onSendClick(false);
    //   return;
    // }
    const isPhone = isValidatePhone(params.phone.value, type);
    if (!isPhone) {
      handleErrorChange('phone', t('error.phone_type'));
      return;
    }
    if (!params.nation.value && type === 2) {
      handleErrorChange('nation', t('error.select_nation'));
      return;
    }

    const body = {
      phone: params.phone.value,
      memberContactNation: type === 1 ? '208' : params.nation.value,
      certification: certification,
      email: email,
      memberTp: type === 2 ? 'B' : 'A',
    };

    try {
      const r = await postAuthPhone(body);
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

  const handleVerifyClick = async (e) => {
    try {
      const r = await getAuthPhone({ authCode: params.verify.value, token: tokenValue, certification });
      const { data, statusCode } = r;

      if (Boolean(Number(data))) {
        setVerify(true);
        if (onVerifyClick) {
          onVerifyClick({ ...params, token: tokenValue });
        }
      } else {
        setVerify(false);
        handleErrorChange('verify', t('error.unmatch_credential'));
      }
    } catch (e) {
      const { message } = e;
      setVerify(false);
      handleErrorChange('verify', message);
    }
  };

  const fetchCode = async () => {
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

  useEffect(() => {
    if (params.phone.value) {
      if (onChange) onChange(params.phone);
    }
  }, [params.phone.value]);

  useEffect(() => {
    if (err) {
      handleErrorChange('phone', err);
    }
  }, [err]);

  useEffect(() => {
    fetchCode();
  }, [i18n.language]);

  return { isVerify, params, secondsLeft, setSecondsLeft, timerEnd, setTimerEnd, isSend, countryPhoneCodes, handleSendClick, handleChange, handleFocus, handleBlur, handleVerifyClick };
};

export default useSmsVerify;
