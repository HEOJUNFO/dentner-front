import React, { useEffect, useRef, useState } from 'react';
import { isBefore, format } from 'date-fns';
import { useNav, useSnack } from '@components/hooks';
import { postRequestPublicForm, getRequestForm, putRequestPublicForm } from '@api/Request';
import UserStore from '@store/UserStore';
import { getMyinfo } from '@api/Mypage';
import { useTranslation } from 'react-i18next';
// import { getRequestForm } from '@api/Request';

export const usePublicRequestWritePage = () => {
  const { t, i18n } = useTranslation();
  const { handleNav, state } = useNav();
  const { showWarnSnackbar, showSnackbar } = useSnack();

  const dc = '치자이너가 작업 시 참고해야할 요청사항을 작성해주세요. (최대 1,000자)';
  const seType = 'A'; //A 지정요청
  const { user } = UserStore();
  const [isModal, setIsModal] = useState(false);
  const [isError, setIsError] = useState(true);
  const [deadlineT, setDeadlineT] = useState('');
  const [deadlineM, setDeadlineM] = useState('');
  const [deadlineObj, setDeadlineObj] = useState({ error: false, msg: '' });
  const [expireT, setExpireT] = useState('');
  const [expireM, setExpireM] = useState('');
  const [expireObj, setExpireObj] = useState({ error: false, msg: '' });
  const [visibleM, setVisibleM] = useState(false);
  const [visibleM2, setVisibleM2] = useState(false);
  const [cads, setCads] = useState([]);
  const [params, setParams] = useState({
    requestDocGroupsNo: { value: [], type: 'array', isRequired: true, error: '', check: 1, success: 0, maxLength: 10, placeholder: '의뢰서를 추가하세요.' },
    requestFormSj: { value: '', type: 'string', isRequired: true, error: '', check: 0, success: 0, maxLength: 60, placeholder: '요청하는 보철물 종류와 개수를 작성하세요 (공백 미포함 30자)' },
    requestFormType: { value: [], type: 'array', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '보철종류를 선택하세요.' },
    requestExpireDate: { value: new Date(), type: 'date', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '견적요청 만료날짜를 선택하세요.' },
    requestExpireTime: { value: '23:30', type: 'string', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '견적요청 만료날짜를 선택하세요.' },
    requestDeadlineDate: { value: new Date(), type: 'date', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '견적요청 만료날짜를 선택하세요.' },
    requestDeadlineTime: { value: '23:30', type: 'string', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '견적요청 만료날짜를 선택하세요.' },
    requestFormDc: { value: '', type: 'string', isRequired: true, error: '', check: 0, success: 0, placeholder: dc, maxLength: 1300, emptyMessage: '요청사항을 작성해주세요.' },
    requestSw: { value: '', type: 'string', isRequired: true, error: '', check: 0, success: 0 },
    requestSwName: { value: '', type: 'string', isRequired: true, error: '', check: 0, success: 0 },
  });

  const [docList, setDocList] = useState([]); // 의뢰서 목록

  useEffect(() => {
    setParams((prev) => {
      const requestDocGroupsNo = prev.requestDocGroupsNo;
      requestDocGroupsNo['placeholder'] = t('version2_4.text71');
      requestDocGroupsNo['error'] = '';

      const requestFormSj = prev.requestFormSj;
      requestFormSj['placeholder'] = t('version2_4.text72');
      requestFormSj['error'] = '';

      const requestFormType = prev.requestFormType;
      requestFormType['placeholder'] = t('version2_4.text73');
      requestFormType['error'] = '';

      const requestFormDc = prev.requestFormDc;
      requestFormDc['emptyMessage'] = t('version2_4.text74');
      requestFormDc['error'] = '';
      requestFormDc['placeholder'] = i18n.language === 'ko' ? dc : 'Please fill out the requests that T-esigner should refer to when working. (Max. 1,000 characters)';

      return { ...prev, requestDocGroupsNo, requestFormSj };
    });
  }, [i18n.language]);

  const handleChange = (name, value, success = 0, error = '') => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
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

  //보철종류선택
  const handleTypeChange = (e) => {
    if (e.target.checked) {
      const v = [...params.requestFormType.value, e.target.value];
      handleChange('requestFormType', v);
    } else {
      const v = params.requestFormType.value.filter((el) => el !== e.target.value);
      handleChange('requestFormType', v);
    }
  };

  //의뢰서추가
  const handleReqAdd = (reqs = []) => {
    // console.log(reqs);
    handleChange('requestDocGroupsNo', reqs, reqs.length > 0 ? 1 : 0);
    setIsModal(false);
  };

  useEffect(() => {
    if (state?.selectedItems) {
      setParams({ ...state?.params, requestDocGroupsNo: { ...state?.params?.requestDocGroupsNo, value: state?.selectedItems, success: state?.selectedItems?.length > 0 ? 1 : 0, error: '' } });
    }
  }, [state]);

  const handleDeadLineMobile = () => {
    if (deadlineT === '' || deadlineM === '') {
      // setDeadlineObj({ error: true, msg: '마감시간을 선택해주세요.' });
      setDeadlineObj({ error: true, msg: t('version2_4.text76') });
      return;
    }
    handleChange('requestDeadlineTime', deadlineT + ':' + deadlineM);
    setVisibleM2(false);
  };

  const handleExpireMobile = () => {
    if (expireT === '' || expireM === '') {
      // setExpireObj({ error: true, msg: '만료시간을 선택해주세요.' });
      setExpireObj({ error: true, msg: t('version2_4.text75') });
      return;
    }
    handleChange('requestExpireTime', expireT + ':' + expireM);
    setVisibleM(false);
  };

  useEffect(() => {
    setDeadlineObj({ error: false, msg: '' });
  }, [visibleM2]);

  useEffect(() => {
    setExpireObj({ error: false, msg: '' });
  }, [visibleM]);

  const handleReqDel = (req) => {
    const doc = params.requestDocGroupsNo.value;
    const item = doc.filter((el) => el.requestDocGroupNo !== req.requestDocGroupNo);
    handleChange('requestDocGroupsNo', item, item.length > 0 ? 1 : 0);
  };

  const handleSumbit = async () => {
    const parameters = { requestFormSe: seType };
    let inProgress = true;

    const now = new Date();
    const requestExpireDate = format(params['requestExpireDate'].value, 'yyyy-MM-dd') + ' ' + params['requestExpireTime'].value;
    if (new Date(requestExpireDate) < now) {
      showWarnSnackbar('견적요청 만료시간을 확인해주세요.');
      return;
    }

    const requestDeadlineDate = format(params['requestDeadlineDate'].value, 'yyyy-MM-dd') + ' ' + params['requestDeadlineTime'].value;
    if (new Date(requestDeadlineDate) < now) {
      showWarnSnackbar('납품 마감시간을 확인해주세요.');
      return;
    }

    const p = { ...params };
    for (const key in p) {
      const parameter = p[key];
      let isCaught = false;

      if (parameter.error) {
        isCaught = true;
      }

      if (parameter.check === 1 && parameter.success !== 1) {
        // console.log(key, parameter);
        isCaught = true;
        handleValidChange(key, parameter.placeholder);
      }

      if (parameter.isRequired && !isCaught) {
        if (parameter?.type === 'array') {
          if (parameter?.value.length === 0) {
            isCaught = true;
            handleValidChange(key, parameter.emptyMessage || parameter.placeholder);
          }

          for (const k in parameter.value) {
            if (parameter.value[k].typeCount === '') {
              // handleTypeCountChange(k, { ...parameter.value[k], error: '1' });
              isCaught = true;
            }
          }
        } else {
          if (parameter.value === '') {
            isCaught = true;
            // console.log(key, parameter);
            if (parameter.placeholder || parameter.emptyMessage) {
              handleValidChange(key, parameter.emptyMessage || parameter.placeholder);
            }
          }
        }
      }
      if (isCaught) inProgress = false;
      else {
        if (key === 'requestDocGroupsNo') {
          parameters[key] = parameter.value.map((el) => el.requestDocGroupNo).join(',');
        } else if (key === 'requestFormType') {
          parameters[key] = parameter.value.join(',');
        } else if (key === 'requestExpireDate' || key === 'requestDeadlineDate') {
          parameters[key] = format(parameter.value, 'yyyy.MM.dd');
        } else if (key === 'requestExpireTime' || key === 'requestDeadlineTime') {
          parameters[key] = parameter.value.replace(':', '');
        } else {
          parameters[key] = parameter.value;
        }
      }
    }

    if (cads.length === 0) {
      // showWarnSnackbar('선호 CAD S/W는 프로필에서 수정해주세요.');
      showWarnSnackbar(t('version2_4.text77'));
      inProgress = false;
    }

    // console.log('inProgress ==>', inProgress, parameters, state);
    if (inProgress) {
      if (state?.id) {
        parameters['requestFormNo'] = state?.id;
        const r = await putRequestPublicForm(parameters);
        // console.log(r)
        if (r.data) {
          // showSnackbar('공개 요청서가 수정되었습니다.');
          showSnackbar(t('version2_4.text78'));
          handleNav(`/request/view/${state?.id}`);
        }
      } else {
        const r = await postRequestPublicForm(parameters);
        // console.log('r==>>', r);
        if (r.data) {
          // showSnackbar('공개 요청서가 등록되었습니다.');
          showSnackbar(t('version2_4.text79'));
          handleNav(`/request/view/${r.data}`);
        }
      }
    }
  };

  const convertData = (item) => {
    setParams((prev) => ({
      ...prev,
      requestDocGroupsNo: { ...prev['requestDocGroupsNo'], value: item.requestList, success: item.requestList.length > 0 ? 1 : 0 },
      requestFormSj: { ...prev['requestFormSj'], value: item.requestFormSj },
      requestFormType: { ...prev['requestFormType'], value: item.requestFormType.split(',') },
      requestExpireDate: { ...prev['requestExpireDate'], value: new Date(item.requestExpireDate) },
      requestExpireTime: { ...prev['requestExpireTime'], value: item.requestExpireTimeHour + ':' + item.requestExpireTimeMin },
      requestDeadlineDate: { ...prev['requestDeadlineDate'], value: new Date(item.requestDeadlineDate) },
      requestDeadlineTime: { ...prev['requestDeadlineTime'], value: item.requestDeadlineTimeHour + ':' + item.requestDeadlineTimeMin },
      requestFormDc: { ...prev['requestFormDc'], value: item.requestFormDc },
    }));
  };

  useEffect(() => {
    const p = { ...params };
    let arr = [];
    for (const key in p) {
      let error = true;
      const parameter = p[key];

      if (parameter?.type === 'array') {
        if (parameter?.value?.length > 0) {
          error = false;
        } else {
          error = true;
        }
      } else {
        if (parameter?.value !== '') {
          error = false;
        } else {
          error = true;
        }
      }
      arr.push(error);
    }
    let error = arr?.some((el) => el);
    setIsError(error);
  }, [params]);

  // 수정데이터 조회
  const fetchRequestForm = async () => {
    const r = await getRequestForm(state?.id);
    const { data } = r;

    // console.log('getRequestForm========>', data)
    if (data) {
      convertData(data);
    }
  };

  useEffect(() => {
    if (isBefore(params.requestDeadlineDate.value, params.requestExpireDate.value)) {
      handleChange('requestDeadlineDate', params.requestExpireDate.value);
    }
  }, [params.requestExpireDate.value]);

  useEffect(() => {
    fetchMyInfo();
  }, [user]);

  const fetchMyInfo = async () => {
    if (!user) {
      handleNav('/login');
      return;
    }

    const r = await getMyinfo();
    const { data } = r;
    // console.log('getMyinfo=============> data11', data);

    if (data) {
      let cad = [];
      if (data?.swNoName) cad = data.swNoName.split(',');
      //if (data?.swEtc) cad.push({ name: '기타:' + data.swEtc });
      if (data?.swEtc) cad.push(data.swEtc);
      if (cad.length > 0) {
        setCads(cad.map((el) => ({ name: el })));
      }

      handleChange('requestSw', data?.swNo);
      handleChange('requestSwName', cad.join(','));
    }
  };

  useEffect(() => {
    if (user) {
      if (state?.id) {
        fetchRequestForm();
      }

      if (state?.checkedItems) {
        // fetchRequestDoc();
        handleChange('requestDocGroupsNo', state?.checkedItems, state?.checkedItems.length > 0 ? 1 : 0);
      }
    } else {
      //login 화면이동 처리
    }
  }, [user]);

  return {
    params,
    cads,
    isModal,
    setIsModal,
    handleChange,
    handleTypeChange,
    handleReqAdd,
    handleReqDel,
    handleSumbit,
    isError,
    setIsError,
    handleExpireMobile,
    expireM,
    setExpireM,
    expireT,
    setExpireT,
    expireObj,
    setExpireObj,
    deadlineT,
    setDeadlineT,
    deadlineM,
    setDeadlineM,
    handleDeadLineMobile,
    deadlineObj,
    setDeadlineObj,
    visibleM,
    setVisibleM,
    visibleM2,
    setVisibleM2,
  };
};
