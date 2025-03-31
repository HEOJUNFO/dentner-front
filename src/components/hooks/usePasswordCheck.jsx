import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const usePasswordCheck = ({ onPassword }) => {
  const { t, i18n } = useTranslation();
  const [pwVisible, setPwVisible] = useState(false);
  const [pwVisible2, setPwVisible2] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useState({
    password: { value: '', isRequired: true, error: '', maxLength: 50, placeholder: '비밀번호를 입력하세요.' },
    checkPassword: { value: '', isRequired: true, error: '', maxLength: 50, placeholder: '비밀번호를 입력하세요.' },
  });

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success: 0 },
    }));
  };

  useEffect(() => {
    if (params.password.value && params.checkPassword.value) {
      if (params.password.value !== params.checkPassword.value) {
        onPassword(params.password.value, 0);
        setError(true);
      } else {
        onPassword(params.password.value, 1);
        setError(false);
      }
    }
  }, [params]);

  useEffect(() => {
    setParams((prev) => {
      return {
        ...prev,
        checkPassword: { ...prev['checkPassword'], placeholder: t('version2_1.text60') },
        password: { ...prev['password'], placeholder: t('version2_1.text60') },
      };
    });
  }, [i18n.language]);

  return { pwVisible, setPwVisible, pwVisible2, setPwVisible2, params, handleChange, error };
};

export default usePasswordCheck;
