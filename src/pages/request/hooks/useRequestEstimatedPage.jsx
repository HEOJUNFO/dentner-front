import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { useNav, useSnack } from '@components/hooks';
import { getRequestBeforeEstimated, postRequestBeforeEstimated, getEstimatedStatus } from '@api/Request';
import UserStore from '@store/UserStore';
import { strToLength } from '@utils/common';
import { useTranslation } from 'react-i18next';

export const useRequestEstimatedPage = () => {
  const { t, i18n } = useTranslation();
  const { user } = UserStore();

  const { handleNav, state } = useNav();
  const { showSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [id, setId] = useState();

  // "estimateCn":"상세견적이요",
  //   "estimateAmount":"3000",
  //   "estimateDate":"2024.07.18",
  //   "estimateTime":"1800",
  const [params, setParams] = useState({
    typeList: { value: [], type: 'array', isRequired: true, error: '' },
    estimateCn: { value: '', isRequired: false, error: '', check: 0, success: 0, placeholder: '의뢰인이 참고해야할 내용을 작성해주세요 (최대 1,000자)' },
    estimateAmount: { value: '', isRequired: true, error: '' },
    typeUnit: { value: '', isRequired: false, error: '' },
    estimateDate: { value: new Date(), type: 'date', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '견적요청 만료날짜를 선택하세요.' },
    estimateTime: { value: '23:30', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '견적요청 만료날짜를 선택하세요.' },
  });
  const [data, setData] = useState();

  useEffect(() => {
    setParams((prev) => {
      const estimateCn = prev.estimateCn;
      estimateCn['placeholder'] = t('version2_4.text91');
      estimateCn['error'] = '';

      return { ...prev };
    });
  }, [i18n.language]);

  const handleChange = (name, value, success = 0, error = '') => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  const convertItme = (item) => {
    return {
      title: item?.requestFormSj || '',
      desc: item?.requestDocDesc || '',
      sw: item.requestSwName?.split(',')?.map((el) => ({ name: el })),
      registerDt: item.registerDt,
      typeUnit: item?.prostheticsList[0]?.memberTp === 'B' ? 'B' : 'A',
    };
  };

  const fetchEstimatedStatus = async () => {
    const r = await getEstimatedStatus(state?.id);
    if (Boolean(Number(r.data))) {
      // 이미 견적 작성한 경우
      handleNav(`/request/estimated/view/${id}`);
    } else {
      fetchRequestInfo();
    }
  };

  const fetchRequestInfo = async () => {
    try {
      const r = await getRequestBeforeEstimated(state?.id);
      const { data: dt } = r;
      // A원화 B달러
      if (dt) {
        if (dt?.prostheticsList) {
          setParams((prev) => ({
            ...prev,
            typeList: { ...prev['typeList'], value: dt?.prostheticsList, success: dt?.prostheticsList.length > 0 ? 1 : 0, error: '' },
          }));
        }
        setData(convertItme(dt));
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAmountChange = (idx, newValue) => {
    setParams((prevParams) => {
      const updatedTypeListValue = [...prevParams.typeList.value];
      updatedTypeListValue[idx] = { ...updatedTypeListValue[idx], amount: Number(newValue) };

      return {
        ...prevParams,
        typeList: {
          ...prevParams.typeList,
          value: updatedTypeListValue,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    let inProgress = true;
    const parameters = {};
    const p = { ...params };
    for (const key in p) {
      const parameter = p[key];
      let isCaught = false;

      if (parameter.error) {
        isCaught = true;
      }

      if (parameter.isRequired && !isCaught) {
        if (parameter?.type === 'array') {
          if (parameter?.value.length === 0) {
            isCaught = true;
          }

          for (const k in parameter.value) {
            if (parameter.value[k].amount === '') {
              showSnackbar('금액을 입력하세요.');
              isCaught = true;
            }
          }
        } else {
          if (strToLength(parameter.value) === 0) {
            isCaught = true;

            if (parameter.placeholder || parameter.emptyMessage) {
              // handleValidChange(key, parameter.emptyMessage || parameter.placeholder);
            }
          }
        }
      }

      if (isCaught) inProgress = false;
      else {
        if (key === 'estimateDate') {
          parameters[key] = format(parameter.value, 'yyyy.MM.dd');
        } else if (key === 'estimateTime') {
          parameters[key] = parameter.value.replace(':', '');
        } else if (key === 'typeList') {
          parameters[key] = parameter.value.map((el) => ({ typeName: el.requestTypeName, typeAmount: el.amount, typeCnt: el.count, typeUnit: el?.memberTp === 'B' ? 'B' : 'A' }));
        } else {
          parameters[key] = parameter.value;
        }
      }
    }

    if (inProgress) {
      const r = await postRequestBeforeEstimated({ pathValue: state?.id, body: parameters });
      const { data, statusCode } = r;
      if (Number(data) > 0) {
        showSnackbar('견적서 작성했습니다.');
        handleNav(`/request/estimated/view/${id}`);
      }
      // console.log(r, parameters);
    }
  };

  useEffect(() => {
    const sum = params.typeList.value.reduce((acc, item) => {
      const { count, amount } = item;
      const sum = Number(count) * Number(amount);
      return acc + sum;
    }, 0);

    handleChange('estimateAmount', sum);
  }, [params.typeList.value]);

  useEffect(() => {
    if (user?.memberSe !== 'C') {
      handleNav(-1);
      return;
    }

    if (!state?.id) {
      handleNav(-1);
      return;
    } else {
      setId(state?.id);
    }
    fetchEstimatedStatus();
  }, []);

  return { isLoading, user, params, data, handleAmountChange, handleChange, handleSubmit, id };
};
