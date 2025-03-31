import React, { useEffect, useState } from 'react';
import { getTeethType } from '@api/Common';
import { putMyteethType } from '@api/Mypage';
import { useTranslation } from 'react-i18next';

const useProstheticsPrice = () => {
  const { t, i18n } = useTranslation();

  const [teethTypeCode, setTeethTypeCode] = useState([]);
  const [upperCode, setUpperCode] = useState([]);
  const [middleCode, setMiddleCode] = useState([]);

  const [isEnd, setIsEnd] = useState(false);
  const [selectedCode, setSelectedCode] = useState({
    upperCode: { value: '', name: '' },
    middleCode: { value: '', name: '' },
  });
  const [params, setParams] = useState({
    typeAmount: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '단가를 입력하세요.' },
  });

  // 대분류 선택
  const handleUpperClick = (ucode) => {
    if (selectedCode.upperCode.value === ucode.teethTypeNo) {
      setSelectedCode({
        upperCode: { value: '', name: '' },
        middleCode: { value: '', name: '' },
      });
      setMiddleCode([]);
    } else {
      if (ucode.childCnt === 0) setIsEnd(true);
      else setIsEnd(false);

      setMiddleCode(convertTeethTypeCode(ucode.teethTypeNo));
      setSelectedCode({
        upperCode: { value: ucode.teethTypeNo, name: ucode.typeName, success: 1, error: '' },
        middleCode: { value: '', name: '' },
      });
    }
  };

  // 중분류 선택
  const handleMiddleClick = (e, mcode) => {
    e.stopPropagation();
    if (selectedCode.middleCode.value === mcode.teethTypeNo) return;
    setIsEnd(true);
    setSelectedCode((prev) => ({
      ...prev,
      middleCode: {
        value: mcode.teethTypeNo,
        placeholder: mcode.typeEditYn ? mcode.typeName : '',
        name: mcode.typeEditYn ? '' : mcode.typeName,
        success: mcode.typeEditYn ? 0 : 1,
        error: '',
        edit: mcode.typeEditYn,
      },
    }));
  };

  const fetchTeethTypeCode = async () => {
    const r = await getTeethType(i18n.language);
    const { data, statusCode, message } = r;

    if (data) {
      setTeethTypeCode(data);
    }
  };

  const convertTeethTypeCode = (teethTypeNo) => {
    const current = teethTypeCode.filter((el) => el.parentTypeNo === teethTypeNo);
    const r = current.map((el) => {
      const sub = teethTypeCode.filter((els) => els.parentTypeNo === el.teethTypeNo);
      return { ...el, childCnt: sub.length };
    });
    console.log(r);
    return r;
  };

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success: 0, error: '' },
    }));
  };

  const handleValidChange = (name, error) => {
    let success = 0;
    if (!error) {
      success = 1;
    }

    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], error, success },
    }));
  };

  const handleSubmit = async () => {
    if (!isEnd) return;

    let inProgress = true;
    const p = { ...params };
    const body = {};
    for (const key in p) {
      if (p[key].error) {
        inProgress = false;
      }

      if (p[key].isRequired) {
        if (p[key].value === '') {
          inProgress = false;
          if (p[key].placeholder || p[key].emptyMessage) {
            handleValidChange(key, p[key].emptyMessage || p[key].placeholder);
          }
        }
      }

      body['typeAmount'] = p[key].value;
    }

    if (inProgress) {
      body['memberMiddleValue'] = selectedCode.middleCode.value;
      const r = await putMyteethType(body);
      console.log(r);
    }
  };

  useEffect(() => {
    if (teethTypeCode.length === 0) return;
    setUpperCode(convertTeethTypeCode(0));
  }, [teethTypeCode]);

  useEffect(() => {
    fetchTeethTypeCode();
  }, [i18n.language]);

  return { params, selectedCode, isEnd, upperCode, middleCode, handleUpperClick, handleMiddleClick, handleChange, handleSubmit };
};

export default useProstheticsPrice;
