import React, { useEffect, useRef, useState } from 'react';
import { getTeethType } from '@api/Common';
import { useTranslation } from 'react-i18next';

const useFieldSelection = () => {
  const { t, i18n } = useTranslation();
  const [filterOpt, setFillterOpt] = useState([]);
  const [items, setItems] = useState([]);

  const fetchCode = async () => {
    const r = await getTeethType(i18n.language);
    const { data, statusCode, message } = r;

    if (data) {
      const upperCode = data.filter((el) => el.parentTypeNo === 0);
      setFillterOpt(upperCode);
    }
  };

  useEffect(() => {
    fetchCode();
  }, [i18n.language]);

  return { filterOpt, items };
};

export default useFieldSelection;
