import React, { useEffect, useState } from 'react';
import CodeStore from '@store/CodeStore';
import { useTranslation } from 'react-i18next';
import { getCommonCode } from '@api/Common';

const useSwCheck = () => {
  const { t, i18n } = useTranslation();
  const { codeList, actions, getters } = CodeStore();
  const [code, setCode] = useState([]);

  const fetchCode = async (code) => {
    // const gettersCode = getters.getFilterCode(code);
    // if (gettersCode) {
    //   handleItemChange(code, gettersCode.value);
    // } else {
    // }
    const r = await getCommonCode(code, i18n.language);

    const dt = r?.data;
    console.log(dt);
    if (dt) {
      const sort = ['EXOCAD', '3Shape', t('version2_1.text31')];

      const groupedData = dt.reduce((acc, item) => {
        const key = item.codeName;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});

      const groupedSortData = sort.map((el) => ({ name: el, value: groupedData[el] }));

      setCode(groupedSortData);

      return { value: dt };
    }
    return '';
  };

  useEffect(() => {
    const data = fetchCode(710);
    // if (data?.value) {
    //   console.log(data?.value);
    //   const sort = ['EXOCAD', '3Shape', t('version2_1.text31')];

    //   const groupedData = data.value.reduce((acc, item) => {
    //     const key = item.codeName;
    //     if (!acc[key]) {
    //       acc[key] = [];
    //     }
    //     acc[key].push(item);
    //     return acc;
    //   }, {});

    //   const groupedSortData = sort.map((el) => ({ name: el, value: groupedData[el] }));

    //   setCode(groupedSortData);
    // }
  }, [i18n.language]);

  return { code };
};

export default useSwCheck;
