import React, { useEffect, useState } from 'react';
import { getTeethType } from '@api/Common';
import { putMyteethType, getMyteethType } from '@api/Mypage';
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';

const useProstheticsPrice = () => {
  const { t, i18n } = useTranslation();
  const { showWarnSnackbar, showSnackbar } = useSnack();

  const [teethTypeCode, setTeethTypeCode] = useState([]);
  const [upperCode, setUpperCode] = useState([]);
  const [middleCode, setMiddleCode] = useState([]);

  const [isEnd, setIsEnd] = useState(false);
  const [prices, setPrices] = useState([]);
  const [selectedCode, setSelectedCode] = useState({
    upperCode: { value: '', name: '' },
    middleCode: { value: '', name: '' },
  });

  const [modal, setModal] = useState(false)
  const [addAmountParams, setAddAmountParams] = useState()

  // placeholder사용안함
  const [params, setParams] = useState({
    typeAmount: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '단가를 입력하세요.' },
    typeDollarAmount: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '단가를 입력하세요.' },
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
    e?.stopPropagation();
    if (selectedCode.middleCode.value === mcode.teethTypeNo) return;
    setIsEnd(true);
    setSelectedCode((prev) => ({
      ...prev,
      middleCode: {
        value: mcode.teethTypeNo,
        placeholder: mcode.typeEditYn ? mcode.typeName : '',
        name: mcode.typeName,
        success: mcode.typeEditYn ? 0 : 1,
        error: '',
        edit: mcode.typeEditYn,
        baseCnt : mcode?.baseCnt || 0
      },
    }));
    //console.log('2222222----->' , mcode)
    //console.log(prices)
    const price = prices.find((el) => el.memberMiddleValue === mcode.teethTypeNo)?.typeAmount;
    const DollarPrice = prices.find((el) => el.memberMiddleValue === mcode.teethTypeNo)?.typeDollarAmount;
    const typeAddAmount = prices.find((el) => el.memberMiddleValue === mcode.teethTypeNo)?.typeAddAmount;
    const typeAddDollarAmount = prices.find((el) => el.memberMiddleValue === mcode.teethTypeNo)?.typeAddDollarAmount;
    if (price) {
      handleChange('typeAmount', price);
    } else {
      handleChange('typeAmount', '');
    }

    if (DollarPrice) {
      handleChange('typeDollarAmount', DollarPrice);
    } else {
      handleChange('typeDollarAmount', '');
    }

    if(typeAddAmount) {
      handleChange('typeAddAmount', typeAddAmount)
    } else {
      handleChange('typeAddAmount', '')
    }

    if(typeAddDollarAmount) {
      handleChange('typeAddDollarAmount', typeAddDollarAmount)
    } else {
      handleChange('typeAddDollarAmount', '')
    }

  };

  const fetchMyteethType = async () => {
    const r = await getMyteethType();
    const { data } = r;
    if (data) {
      setPrices(data);
    }
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
    console.log('11111--->' , r)
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

  const handleSubmit = async (type) => {
    if (!isEnd) return;

    let inProgress = true;
    const p = { ...params };
    const body = {};
    const amt = type === 'typeDollarAmount' ? 'B' : 'A';
    for (const key in p) {
      if (p[type].error) {
        inProgress = false;
      }

      if (p[type].isRequired) {
        if (p[type].value === '') {
          inProgress = false;
          if (p[type].placeholder || p[type].emptyMessage) {
            handleValidChange(type, p[type].emptyMessage || p[type].placeholder);
          }
        }
      }

      if (type === key) {
        body['typeAmount'] = p[key].value;
        body['amountType'] = amt;
      }
    }

    if (inProgress) {
      body['memberFirstValue'] = selectedCode.upperCode.value;
      body['memberMiddleValue'] = selectedCode.middleCode.value;
      const r = await putMyteethType(body);
      if (r.statusCode === 200) {
        showSnackbar(t('version2_4.text4'));
        fetchMyteethType();
      }
    }
  };

  useEffect(() => {
    if (teethTypeCode.length === 0) return;
    setUpperCode(convertTeethTypeCode(0));

    setSelectedCode({
      upperCode: { value: '', name: '' },
      middleCode: { value: '', name: '' },
    });
    setMiddleCode([]);
  }, [teethTypeCode, i18n.language]);

  useEffect(() => {
    fetchTeethTypeCode();
    fetchMyteethType();
  }, [i18n.language]);

  useEffect(() => {
    if(addAmountParams) {
      setModal(true)
    } else {
      setModal(false)
    }
  },[addAmountParams])

  const handleRefetch = () => {
    showSnackbar(t('version2_4.text4'));
    fetchTeethTypeCode()
    fetchMyteethType();
  }

  return {handleRefetch,  modal, setModal, addAmountParams, setAddAmountParams ,params, selectedCode, isEnd, upperCode, middleCode, handleUpperClick, handleMiddleClick, handleChange, handleSubmit };
};

export default useProstheticsPrice;
