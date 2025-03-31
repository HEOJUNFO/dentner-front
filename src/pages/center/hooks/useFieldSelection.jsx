import React, { useEffect, useRef, useState } from 'react';
import { getCommonCode } from '@api/Common';
import CodeStore from '@store/CodeStore';
import { useTranslation } from 'react-i18next';

// 705	고정성 보철물
// 706	가철성 보철물
// 707	교정
// 708	ALL ON x
const useFieldSelection = () => {
  const { t, i18n } = useTranslation();
  const { codeList, actions, getters } = CodeStore();

  const codeParentNo = [
    { id: 'fixProstheticsFilter', value: '705' },
    { id: 'removableProstheticsFilter', value: '706' },
    { id: 'correctFilter', value: '707' },
    { id: 'allOnFilter', value: '708' },
  ];

  const [items, setItems] = useState({
    // 고정성 보철물
    705: { name: t('version2_1.text4'), value: [] },
    706: { name: t('version2_1.text5'), value: [] },
    707: { name: t('version2_1.text6'), value: [] },
    708: { name: 'All on X', value: [] },
  });

  const handleChange = (name, value) => {
    setItems((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));
  };

  const fetchCode = async (code) => {
    const gettersCode = getters.getFilterCode(code);
    //console.log('fetch ---> ' , code, )
    //console.log('gettersCode --> ' , gettersCode)
    if (gettersCode && !flag) {
      handleChange(code, gettersCode.value);
    } else {
      const r = await getCommonCode(code, i18n.language);
      //console.log('getCommonCode ---> ' , r)
      const dt = r?.data;
      if (dt) {

        handleChange(code, dt);

        actions.setCodeList({ name: code, value: dt });
      }
    }
    setFlag(false)
  };

  useEffect(() => {
    for (let i in codeParentNo) {
      fetchCode(codeParentNo[i].value);
    }
  },[])

  const [flag , setFlag] = useState(true)

  useEffect(() => {
    if(!flag) {
      for (let i in codeParentNo) {
        fetchCode(codeParentNo[i].value);
      }
    }

  }, [i18n.language]);

  useEffect(() => {
    // setItems((prev) => {
    //   return {
    //     705: { name: t('version2_1.text4'), value: prev[705].value },
    //     706: { name: t('version2_1.text5'), value: prev[706].value },
    //     707: { name: t('version2_1.text6'), value: prev[707].value },
    //     708: { name: 'All on X', value: prev[708].value },
    //   };
    // });
  }, [i18n.language]);

  const [sortType, setSortType] = useState(1);
  return { codeParentNo, items };
};

export default useFieldSelection;
