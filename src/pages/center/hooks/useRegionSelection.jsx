import React, { useEffect, useRef, useState } from 'react';
import { getCommonCode } from '@api/Common';
import CodeStore from '@store/CodeStore';
import { useTranslation } from 'react-i18next';

// 704	지역
const useRegionSelection = () => {
  const { codeList, actions, getters } = CodeStore();
  const [items, setItems] = useState([]);
  const { t, i18n } = useTranslation();

  const fetchCode = async (code) => {
    const r = await getCommonCode(code, i18n.language);
    const dt = r?.data;
    if (dt) {
      setItems(dt);

      actions.setCodeList({ name: code, value: dt });
    }
  };

  useEffect(() => {
    fetchCode('704');
  }, [i18n.language]);

  return { items };
};

export default useRegionSelection;
