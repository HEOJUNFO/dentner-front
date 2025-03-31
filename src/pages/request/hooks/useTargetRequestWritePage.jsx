import { useEffect,useState } from 'react';
import {  format } from 'date-fns';
import { useNav, useSnack } from '@components/hooks';
import { getRequestTargetPrice, postRequestTargetForm } from '@api/Request';
import UserStore from '@store/UserStore';

import { getRequestForm } from '@api/Request';
import { getMyinfo } from '@api/Mypage';
import {useTranslation} from "react-i18next";

export const useTargetRequestWritePage = () => {
  const { handleNav, state } = useNav();
  const { showWarnSnackbar, showSnackbar } = useSnack();
  const { t, i18n } = useTranslation();
  const dc = '치자이너가 작업 시 참고해야할 요청사항을 작성해주세요. (최대 1,000자)';
  const seType = 'B'; //B 지정요청
  const { user } = UserStore();
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isError, setIsError] = useState(true);
  const [cads, setCads] = useState([]);
  const [price, setPrice] = useState(0);
  const [deadlineT, setDeadlineT] = useState('');
  const [deadlineM, setDeadlineM] = useState('');
  const [deadlineObj, setDeadlineObj] = useState({ error: false, msg: '' });
  const [visibleM, setVisibleM] = useState(false);
  const [params, setParams] = useState({
    requestDesignerNo: {
      value: '',
      type: 'string',
      maskingValue: '',
      isRequired: true,
      error: '',
      check: 1,
      success: 0,
      maxLength: 60,
      placeholder:  t('version2_17.target_request_write_holder1'),
      emptyMessage: t('version2_17.target_request_write_holder2'),
    },
    requestDocGroupsNo: { value: [], type: 'array', isRequired: true, error: '', check: 1, success: 0, maxLength: 10, placeholder: '의뢰서를 추가하세요.' },
    requestFormSj: { value: '', type: 'string', isRequired: true, error: '', check: 0, success: 0, maxLength: 60, placeholder: '요청하는 보철물 종류와 개수를 작성하세요 (공백 미포함 30자)' },
    requestFormType: { value: [], type: 'array', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '보철종류를 선택하세요.' },
    requestDeadlineDate: { value: new Date(), type: 'date', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '견적요청 만료날짜를 선택하세요.' },
    requestDeadlineTime: { value: '23:30', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '견적요청 만료날짜를 선택하세요.' },
    requestFormDc: { value: '', type: 'string', isRequired: true, error: '', check: 0, success: 0, placeholder: dc, maxLength: 1300, emptyMessage: '요청사항을 작성해주세요.' },
    requestSw: { value: '', type: 'string', isRequired: true, error: '', check: 0, success: 0 },
    requestSwName: { value: '', type: 'string', isRequired: true, error: '', check: 0, success: 0 },
  });

  // 폼 상태를 localStorage에 저장하는 함수
  const saveFormState = () => {
    try {
      const formState = {
        requestDesignerNo: {
          value: params.requestDesignerNo.value,
          maskingValue: params.requestDesignerNo.maskingValue,
        },
        requestDocGroupsNo: {
          value: params.requestDocGroupsNo.value,
        },
        requestFormSj: {
          value: params.requestFormSj.value,
        },
        requestFormType: {
          value: params.requestFormType.value,
        },
        requestDeadlineDate: {
          value: params.requestDeadlineDate.value ? format(params.requestDeadlineDate.value, 'yyyy-MM-dd') : null,
        },
        requestDeadlineTime: {
          value: params.requestDeadlineTime.value,
        },
        requestFormDc: {
          value: params.requestFormDc.value,
        },
        requestSw: {
          value: params.requestSw.value,
        },
        requestSwName: {
          value: params.requestSwName.value,
        },
      };
      
      localStorage.setItem('targetRequestFormData', JSON.stringify(formState));
    } catch (error) {
      console.error('폼 상태 저장 중 오류 발생:', error);
    }
  };

  // localStorage에서 폼 상태를 불러오는 함수
  const loadFormState = () => {
    try {
      const savedState = localStorage.getItem('targetRequestFormData');
      
      if (savedState) {
        const formState = JSON.parse(savedState);
        
        const newParams = { ...params };
        
        if (formState.requestDesignerNo?.value) {
          newParams.requestDesignerNo = { 
            ...newParams.requestDesignerNo, 
            value: formState.requestDesignerNo.value,
            maskingValue: formState.requestDesignerNo.maskingValue,
            success: 1,
            error: '',
          };
        }
        
        if (formState.requestDocGroupsNo?.value?.length > 0) {
          newParams.requestDocGroupsNo = { 
            ...newParams.requestDocGroupsNo, 
            value: formState.requestDocGroupsNo.value,
            success: 1,
            error: '',
          };
        }
        
        if (formState.requestFormSj?.value) {
          newParams.requestFormSj = { 
            ...newParams.requestFormSj, 
            value: formState.requestFormSj.value,
            success: 1,
            error: '',
          };
        }
        
        if (formState.requestFormType?.value?.length > 0) {
          newParams.requestFormType = { 
            ...newParams.requestFormType, 
            value: formState.requestFormType.value,
            success: 1,
            error: '',
          };
        }
        
        if (formState.requestDeadlineDate?.value) {
          newParams.requestDeadlineDate = { 
            ...newParams.requestDeadlineDate, 
            value: new Date(formState.requestDeadlineDate.value),
            success: 1,
            error: '',
          };
        }
        
        if (formState.requestDeadlineTime?.value) {
          newParams.requestDeadlineTime = { 
            ...newParams.requestDeadlineTime, 
            value: formState.requestDeadlineTime.value,
            success: 1,
            error: '',
          };
        }
        
        if (formState.requestFormDc?.value) {
          newParams.requestFormDc = { 
            ...newParams.requestFormDc, 
            value: formState.requestFormDc.value,
            success: 1,
            error: '',
          };
        }
        
        if (formState.requestSw?.value) {
          newParams.requestSw = { 
            ...newParams.requestSw, 
            value: formState.requestSw.value,
            success: 1,
            error: '',
          };
        }
        
        if (formState.requestSwName?.value) {
          newParams.requestSwName = { 
            ...newParams.requestSwName, 
            value: formState.requestSwName.value,
            success: 1,
            error: '',
          };
        }
        
        setParams(newParams);
        
        // 불러온 데이터에 디자이너와 의뢰서 정보가 있다면 가격 정보도 불러옴
        if (newParams.requestDesignerNo.value && newParams.requestDocGroupsNo.value.length > 0) {
          fetchTargetPrice();
        }
      }
    } catch (error) {
      console.error('저장된 폼 상태 불러오기 오류:', error);
    }
  };

  const handleChange = (name, value, success = 0, error = '', maskingValue) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error, maskingValue: maskingValue || value },
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
    handleChange('requestDocGroupsNo', reqs, reqs.length > 0 ? 1 : 0);
    setIsModal(false);
  };

  useEffect(() => {
    if (state?.selectedItems) {
      setParams((prev) => ({
        ...prev,
        ...state?.params,
        requestDocGroupsNo: { ...state?.params?.requestDocGroupsNo, value: state?.selectedItems, success: state?.selectedItems?.length > 0 ? 1 : 0, error: '' },
      }));
    }
    if (state?.desi) {
      setParams((prev) => ({
        ...prev,
        ...state?.params,
        requestDesignerNo: { ...state?.params?.requestDesignerNo, value: state?.desi?.memberNo, success: 1, error: '', maskingValue: state?.desi?.memberNickName },
      }));
    }
  }, [state]);

  // 디자이너 선택
  const handleDesiAdd = (desi) => {
    handleChange('requestDesignerNo', desi.memberNo, 1, '', desi.memberNickName);
    setIsModal2(false);
  };

  const handleDeadLineMobile = () => {
    if (deadlineT === '' || deadlineM === '') {
      setDeadlineObj({ error: true, msg: '마감시간을 선택해주세요.' });
      return;
    }
    handleChange('requestDeadlineTime', deadlineT + ':' + deadlineM);
    setVisibleM(false);
  };

  useEffect(() => {
    setDeadlineObj({ error: false, msg: '' });
  }, [visibleM]);

  const fetchTargetPrice = async () => {
    if (params.requestDesignerNo.value && params.requestDocGroupsNo.value.length > 0) {
      const requestDocGroupsNo = params.requestDocGroupsNo.value.map((el) => el.requestDocGroupNo);
      const p = { targetNo: params.requestDesignerNo.value, requestDocGroupsNo: requestDocGroupsNo.join(',') };
      const r = await getRequestTargetPrice(p);
      const { data } = r;
      setPrice(data || 0);
    } else {
      setPrice(0);
    }
  };

  const handleReqDel = (req) => {
    const doc = params.requestDocGroupsNo.value;
    const item = doc.filter((el) => el.requestDocGroupNo !== req.requestDocGroupNo);
    handleChange('requestDocGroupsNo', item, item.length > 0 ? 1 : 0);
  };

  // 수정된 handleSumbit 함수
  const handleSumbit = async () => {
    // 폼 상태 저장
    saveFormState();
    
    const parameters = { requestFormSe: seType };
    let inProgress = true;

    const now = new Date();
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
              isCaught = true;
            }
          }
        } else {
          if (parameter.value === '' || !parameter.value) {
            isCaught = true;

            if (parameter.placeholder || parameter.emptyMessage) {
              handleValidChange(key, parameter.emptyMessage || parameter.placeholder);
            }
          }
        }
      }

      if (isCaught) {
        inProgress = false;
        showWarnSnackbar(parameter?.placeholder || parameter?.emptyMessage);
      } else {
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
      showWarnSnackbar('선호하는 CAD S/W 등록 해주세요.');
      inProgress = false;
    }

    //return;
    if (inProgress) {
      const r = await postRequestTargetForm(parameters);
      console.log(r)

      if (r.data) {
        showSnackbar('지정 요청서가 등록되었습니다.');
       handleNav(`/payment/reqeust/${r.data}`);
      }
    }
  
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

  useEffect(() => {
    fetchTargetPrice();
  }, [params.requestDesignerNo.value, params.requestDocGroupsNo.value]);

  const convertData = (item) => {
    setParams((prev) => ({
      ...prev,
      requestDesignerNo: { ...prev['requestDesignerNo'], value: item.requestDesignerNo, maskingValue: item.designerName },
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

  // 수정데이터 조회
  const fetchRequestForm = async () => {
    const r = await getRequestForm(state?.id);
    const { data } = r;

    if (data) {
      convertData(data);
    }
  };

  // 수정된 useEffect - 컴포넌트가 마운트될 때 폼 상태 불러오기
  useEffect(() => {
    if (user) {
      if (state?.id) {
        // ID가 있는 경우 API에서 데이터 불러오기
        fetchRequestForm();
      } else if (state?.checkedItems) {
        // state에서 checkedItems이 있는 경우 이를 사용
        handleChange('requestDocGroupsNo', state?.checkedItems, state?.checkedItems.length > 0 ? 1 : 0);
        // 나머지 데이터는 localStorage에서 불러오기
        loadFormState();
      } else {
        // 그 외의 경우 localStorage에서 불러오기
        loadFormState();
      }
    } else {
      // 로그인 화면이동 처리
      handleNav('/login');
    }
  }, [user]);

  const fetchMyInfo = async () => {
    if (!user) {
      handleNav('/login');
      return;
    }

    const r = await getMyinfo();
    const { data } = r;

    if (data) {
      let cad = [];
      if (data.swNoName) cad = data.swNoName.split(',');
      if (data?.swEtc) cad.push('기타:' + data.swEtc);
      if (cad.length > 0) {
        setCads(cad.map((el) => ({ name: el })));
      }

      handleChange('requestSw', data?.swNo);
      handleChange('requestSwName', cad.join(','));
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, [user]);

  return {
    params,
    cads,
    price,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    handleChange,
    handleTypeChange,
    handleReqAdd,
    handleDesiAdd,
    handleReqDel,
    handleSumbit,
    isError,
    setIsError,
    deadlineT,
    setDeadlineT,
    deadlineM,
    setDeadlineM,
    handleDeadLineMobile,
    deadlineObj,
    setDeadlineObj,
    visibleM,
    setVisibleM,
    saveFormState,  // 새 함수 추가
    loadFormState,  // 새 함수 추가
  };
};