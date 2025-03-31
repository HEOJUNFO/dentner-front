import React, { useEffect, useRef, useState } from 'react';
import { getTeethType } from '@api/Common';
import { useTranslation } from 'react-i18next';

export const useSelectProstheticsType = () => {
  const { t, i18n } = useTranslation();
  const [code, setCode] = useState([]);

  const fetchCode = async () => {
    const r = await getTeethType(i18n.language);
    const { data, statusCode, message } = r;
    if (data) {
      const upperCode = data.filter((el) => el.parentTypeNo === 0);
      setCode(upperCode);
    }
  };

  useEffect(() => {
    fetchCode();
  }, [i18n.language]);

  return { code };
};
