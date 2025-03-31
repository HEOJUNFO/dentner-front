import React, { useEffect, useRef, useState } from 'react';
import { useNav } from '@components/hooks';
import UserStore from '@store/UserStore';
import { putPassword } from '@api/Login';
import { useTranslation } from 'react-i18next';

const useFindPw = () => {
  const { t, i18n } = useTranslation();
  const { handleNav } = useNav();
  const { user } = UserStore();

  const [memberType, setMemberType] = useState(1);
  const [step, setStep] = useState(1);
  const [isEmail, setIsEmail] = useState(false);
  const [token, setToken] = useState(null);
  const [params, setParams] = useState({
    memberEmail: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '이메일 주소를 입력하세요.' },
    memberPassword: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '비밀번호를 입력하세요.' },
    memberHp: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '전화번호를 입력하세요.' },
  });

  const handleChange = (name, value, success) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success: success || 0, error: '' },
    }));
  };

  const handleVerifyClick = (p) => {
    const { phone, verify, token: tokenval } = p;

    handleChange('memberHp', phone.value, 1);
    if (tokenval) setToken(tokenval);
  };

  const handleSmsVerify = (p) => {
    handleChange('memberHp', p.value);
  };

  const handleSendClick = (b) => {
    setIsEmail(b);
  };

  const fetchPassword = async () => {
    try {
      const r = await putPassword({ token, password: params.memberPassword.value });
      const dt = r?.data;
      if (Boolean(Number(dt))) {
        setStep(3);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handlePasswordChange = () => {
    if (Boolean(Number(params.memberPassword.success)) && token) {
      fetchPassword();
    }
  };

  const resetStates = () => {
    setStep(1);
    setIsEmail(false);
    setToken(null);
    setParams({
      memberEmail: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: t('version2_1.text59') },
      memberPassword: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: t('version2_1.text60') },
      memberHp: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: t('version2_1.text61') },
    });
  };

  useEffect(() => {
    resetStates();
  }, [memberType]);

  useEffect(() => {
    setParams((prev) => {
      return {
        memberEmail: { ...prev['memberEmail'], placeholder: t('version2_1.text59') },
        memberPassword: { ...prev['memberPassword'], placeholder: t('version2_1.text60') },
        memberHp: { ...prev['memberHp'], placeholder: t('version2_1.text61') },
      };
    });
  }, [i18n.language]);

  return { user, step, setStep, memberType, setMemberType, params, setParams, handleVerifyClick, handleSmsVerify, handleSendClick, handleChange, handlePasswordChange, isEmail };
};

export default useFindPw;
