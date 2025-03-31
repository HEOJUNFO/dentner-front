import React, { useEffect, useRef, useState } from 'react';
import { useNav } from '@components/hooks';
import UserStore from '@store/UserStore';
import { getEmail } from '@api/Login';
import { useTranslation } from 'react-i18next';

const useFindId = () => {
  const { t, i18n } = useTranslation();
  const { handleNav } = useNav();
  const { user } = UserStore();

  const [step, setStep] = useState(1);
  const [memberType, setMemberType] = useState(1);
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);
  const [params, setParams] = useState({
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

  const handleFindIdClick = async () => {
    const r = await getEmail({ t: token });
    const { email } = r?.data;
    if (email) {
      setEmail(email);
    }
  };

  useEffect(() => {
    if (!email) return;
    setStep(2);
  }, [email]);

  useEffect(() => {
    setParams((prev) => ({
      memberHp: { ...prev['memberHp'], placeholder: t('version2_1.text61') },
    }));
  }, [i18n.language]);

  return { user, step, setStep, memberType, setMemberType, params, handleVerifyClick, handleSmsVerify, handleFindIdClick, email };
};

export default useFindId;
