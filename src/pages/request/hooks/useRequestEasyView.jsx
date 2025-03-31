import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNav, useSnack } from '@components/hooks';
import { getTeethType, getCommonCode } from '@api/Common';
import ModalStore from '@store/ModalStore';
import {postRequestSimple, putRequestSimple, postRequestOften, getRequestJson, getRequestJsonView} from '@api/Request';
import useWindowSize from '../../../components/hooks/useWindowSize';
import { useTranslation } from 'react-i18next';

/**
 * 의뢰서 간편모드
 * @returns
 */
export const useRequestEasyView = () => {
  const isMobile = useWindowSize();
  const { t, i18n } = useTranslation();
  const { actions } = ModalStore();
  const { handleNav, state } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [mode, setMode] = useState('write');
  const [apiResponse, setApiResponse] = useState(); //수정인 경우 받아온 데이터

  const maxFile = 10;
  let dc = '의뢰에 대한 상세설명을 입력해주세요 (최대 1,300자)\n\n' + '[상세 내용 작성예시]\n' + 'Implant Scan body library 등 작성';
  let edc = 'Please enter a detailed description of the request (up to 1,300 characters)\n\n' + '[Example of writing details]\n' + 'Create implant scan body library, etc';
  const [params, setParams] = useState({
    requestUuidKey: uuidv4(),
    isConfirm: { value: false, type: 'boolean', isRequired: true, error: '', check: 1, success: 0, checkMessage: '필수항목 동의 후 저장이 가능합니다.' },
    isTemp: { value: true, type: 'boolean', isRequired: true, error: '', check: 1, success: 1, checkMessage: '필수항목 동의 후 저장이 가능합니다.' },
    requestNumber: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 20, placeholder: '의뢰번호를 입력하세요. (숫자/기호 최대 20자)' },
    requestProcessNo: { value: '', isRequired: false, error: '', check: 0, success: 0, placeholder: '가공방법을 선택하세요.' },
    requestProcessEtcName: { value: '', isRequired: false, error: '', check: 0, success: 0 },
    requestDc: { value: '', isRequired: false, error: '', check: 0, success: 0, placeholder: dc, maxLength: 1300, emptyMessage: '상세설명을 입력하세요.' },
    typeList: { value: [], type: 'array', isRequired: true, error: '', check: 0, success: 0, placeholder: '보철종류를 선택하세요.' },
  });

  useEffect(() => {
    setParams((prev) => {
      const isConfirm = prev.isConfirm;
      isConfirm['placeholder'] = t('version2_4.text21');

      const isTemp = prev.isTemp;
      isTemp['placeholder'] = t('version2_4.text21');

      const requestNumber = prev.requestNumber;
      requestNumber['placeholder'] = t('version2_4.text22');
      requestNumber['error'] = '';

      const requestProcessNo = prev.requestProcessNo;
      requestProcessNo['placeholder'] = t('version2_4.text23');

      const typeList = prev.typeList;
      typeList['placeholder'] = t('version2_4.text25');
      typeList['error'] = '';

      const requestDc = prev.requestDc;
      requestDc['emptyMessage'] = t('version2_4.text24');
      requestDc['placeholder'] = i18n.language === 'ko' ? dc : edc;

      return { ...prev, isConfirm, isTemp, requestNumber, requestProcessNo, requestDc, typeList };
    });
  }, [i18n.language]);

  const [files, setFiles] = useState([]);
  const [delFiles, setDelFiles] = useState([]); // 삭제된 파일

  const [teethTypeCode, setTeethTypeCode] = useState([]);
  const [millingTypeCode, setMillingTypeCode] = useState([]);

  const handleChange = (name, value, success = 0, error = '') => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  const handleTypeCountChange = (idx, newValue) => {
    setParams((prevParams) => {
      const updatedTypeListValue = [...prevParams.typeList.value];
      updatedTypeListValue[idx] = newValue;

      return {
        ...prevParams,
        typeList: {
          ...prevParams.typeList,
          value: updatedTypeListValue,
        },
      };
    });
  };

  const handleRemoveType = (idx) => {
    setParams((prevParams) => {
      const updatedTypeListValue = [...prevParams.typeList.value];
      updatedTypeListValue.splice(idx, 1);

      return {
        ...prevParams,
        typeList: {
          ...prevParams.typeList,
          value: updatedTypeListValue,
        },
      };
    });
  };

  const handleAddTeethType = (p) => {
    const { dept, code, lowerCode, middleCode, upperCode } = p;

    let v = {};
    if (dept === 'code') {
      const tempName = lowerCode.direct ? lowerCode.name + '(' + lowerCode.direct + ')' : lowerCode.name;
      const name = upperCode.name + (middleCode.name ? ' > ' + middleCode.name : '') + (tempName ? ' > ' + tempName : '') + ' > ' + code.name.join(' / ');
      v = {
        requestTypeValue: p[dept].value.join(','),
        typeCount: '',
        requestTypeName: name,
        requestMiddleValue: middleCode.value,
        //calcMethod: upperCode.calcMethod,
      };
    } else {
      const name = upperCode.name + (middleCode.name ? ' > ' + middleCode.name : '') + (lowerCode.name ? ' > ' + lowerCode.name : '');

      v = {
        requestTypeValue: p[dept].value,
        typeCount: '',
        requestTypeName: name,
        requestMiddleValue: middleCode.value,
        //calcMethod: upperCode.calcMethod,
      };
    }

    setParams((prev) => ({
      ...prev,
      typeList: { ...prev['typeList'], value: [...prev['typeList'].value, v], success: 1, error: '' },
    }));
  };

  const handleChangeMillingType = (e) => {
    if (isMobile) {
      if (e.codeEditYn === 'Y') {
        handleChange('requestProcessNo', e.codeNo, 0);
      } else {
        handleChange('requestProcessNo', e.codeNo, 1);
      }
    } else {
      if (e.target.dataset.edit === 'Y') {
        handleChange('requestProcessNo', e.target.value, 0);
      } else {
        handleChange('requestProcessNo', e.target.value, 1);
        handleChange('requestProcessEtcName', '');
      }
    }
  };

  const fetchCommonCode = async (pathValue) => {
    const r = await getCommonCode(pathValue, i18n.language);
    const { data, statusCode, message } = r;

    if (data) {
      setMillingTypeCode(data);
    }
  };

  const fetchTeethTypeCode = async () => {
    const r = await getTeethType(i18n.language);
    const { data, statusCode, message } = r;

    if (data) {
      setTeethTypeCode(data);
    }
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    handleChange(id, checked, checked ? 1 : 0);
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

  // 자주쓰는말 저장
  const handleOftenSubmit = async () => {
    if (!params.requestDc.value) {
      // showWarnSnackbar('상세설명 내용을 입력하세요.');
      showWarnSnackbar(t('version2_4.text26'));
      return;
    }
    const r = await postRequestOften({ oftenCn: params.requestDc.value });
    if (Boolean(Number(r.data))) {
      // showSnackbar('자주쓰는 말로 저장되었습니다.');
      showSnackbar(t('version2_4.text27'));
    }
  };

  const fileProgress = (p) => {
    actions.setReceived(p);
  };

  // 의뢰서 저장
  const handleSubmit = async (e) => {
    let errorMsg = '';
    let inProgress = true;
    const p = { ...params };

    const formData = new FormData();
    for (const key in p) {
      if (p[key].error) {
        inProgress = false;
      }

      if (p[key].check === 1 && p[key].success !== 1) {
        inProgress = false;
        if (!errorMsg) errorMsg = p[key].checkMessage;
      }

      if (p[key].isRequired) {
        if (p[key]?.type === 'array') {
          // console.log(p[key]?.value);
          if (p[key]?.value.length === 0) {
            inProgress = false;
            handleValidChange(key, p[key].emptyMessage || p[key].placeholder);
          }

          for (const k in p[key].value) {
            if (p[key].value[k].typeCount === '') {
              handleTypeCountChange(k, { ...p[key].value[k], error: '1' });
              inProgress = false;
            }
          }
        } else {
          if (p[key].value === '') {
            inProgress = false;
            // console.log(key, p[key]);
            if (p[key].placeholder || p[key].emptyMessage) {
              handleValidChange(key, p[key].emptyMessage || p[key].placeholder);
            }
          }
        }
      }

      // if (key === 'marketing') {
      //   formData.append('memberMarketingAt', p[key].value ? 'Y' : 'N');
      // } else {
      // }
      if (key === 'typeList') {
        formData.append(key, JSON.stringify(p[key].value));
      } else {
        formData.append(key, p[key].value);
      }
    }
    if (!inProgress) {
      if (errorMsg) showWarnSnackbar(errorMsg);
      else {
        // showWarnSnackbar('의뢰서 필수항목을 확인해주세요.');
        showWarnSnackbar(t('version2_4.text28'));
      }

      return;
    }

    if (files.length === 0) {
      inProgress = false;
    }

    if (files.length === 0) {
      // showWarnSnackbar('첨부파일을 올려주세요.');
      showWarnSnackbar(t('version2_3.text111'));
      return;
    }
    files.forEach((f) => {
      formData.append('files', f.file);
    });

    //9.2 삭제 파일 추가
    if (delFiles.length > 0) {
      formData.append('fileDel', delFiles.join(','));
    }

    formData.append('requestJsonDc', JSON.stringify(p));
    formData.append('saveAt', 'N');
    if (!inProgress) return;

    // 로딩
    actions.setLoading(true);

    try {
      if (mode === 'modify') {
        if (!apiResponse.keyList[0].requestDocNo) {
          showWarnSnackbar(t('version2_4.text29'));
          return;
        }
        formData.append('requestDocNo', apiResponse.keyList[0].requestDocNo);

        const r = await putRequestSimple({ requestDocGroupNo: apiResponse?.requestDocGroupNo, formData, fileProgress });

        if (r.data) {
          // showSnackbar('의뢰서 수정 완료');
          showSnackbar(t('version2_4.text30'));
          handleNav('/request/end', { requestDocGroupNo: r.data, requestMode: 'easy' });
        }
      }

      if (mode === 'write') {
        const r = await postRequestSimple(formData, fileProgress);
        if (r.data) {
          // showSnackbar('의뢰서 저장 완료');
          showSnackbar(t('version2_4.text31'));
          handleNav('/request/end', { requestDocGroupNo: r.data, requestMode: 'easy' });
        }
      }
    } catch (e) {
      // showWarnSnackbar('네트워크 오류입니다.');
      showWarnSnackbar(t('version2_1.text86'));
    } finally {
      actions.setLoading(false);
    }
  };

  // 임시저장
  const handleSubmitDraft = async (e) => {
    const p = { ...params };

    const formData = new FormData();
    for (const key in p) {
      if (key === 'typeList') {
        formData.append(key, JSON.stringify(p[key].value));
      } else {
        formData.append(key, p[key].value);
      }
    }
    // 9.2 추가
    files.forEach((f) => {
      formData.append('files', f.file);
    });
    if (delFiles.length > 0) formData.append('fileDel', delFiles.join(','));

    formData.append('requestJsonDc', JSON.stringify(p));
    formData.append('saveAt', 'Y');
    formData.append('files', files);

    // console.log(apiResponse?.requestDocGroupNo);
    // console.log(apiResponse?.keyList[0]);

    // 로딩
    actions.setLoading(true);

    try {
      if (mode === 'modify') {
        if (!apiResponse.keyList[0].requestDocNo) {
          // showWarnSnackbar('데이터 오류입니다.');
          showWarnSnackbar(t('version2_4.text29'));
          return;
        }
        formData.append('requestDocNo', apiResponse.keyList[0].requestDocNo);

        const r = await putRequestSimple({ requestDocGroupNo: apiResponse?.requestDocGroupNo, formData, fileProgress });

        if (r.data) {
          // showSnackbar('의뢰서 수정 완료');
          showSnackbar(t('version2_4.text30'));
          handleNav(`/request/view/doc/${r.data}`);
        }
      }

      if (mode === 'write') {
        const r = await postRequestSimple(formData, fileProgress);

        if (r.data) {
          // showSnackbar('의뢰서 임시저장 완료');
          showSnackbar(t('version2_4.text32'));
          handleNav(`/request/view/doc/${r.data}`);
        }
      }
    } catch (e) {
      // showWarnSnackbar('네트워크 오류입니다.');
      showWarnSnackbar(t('version2_1.text86'));
    } finally {
      actions.setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommonCode('766');
    fetchTeethTypeCode();

    if (state?.requestDocGroupNo && state?.requestFormNo) {
      fetchData(state?.requestDocGroupNo, state?.requestFormNo);
    }

    if (state?.requestDc) {
      // handleChange('requestDc', state?.requestDc);
      setParams((prev) => ({
        ...prev,
        ...state?.params,
        requestDc: { ...prev['requestDc'], value: state?.requestDc, success: 0, error: '' },
      }));
    }
  }, [state, i18n.language]);

  const fetchData = async (requestDocGroupNo,requestFormNo) => {
    const r = await getRequestJsonView(requestDocGroupNo, requestFormNo);
    const dt = r.data;
    // console.log('dt', dt);

    const files = dt?.fileList?.map((el) => {
      return {
        fileName: el.fileRealName,
        fileSize: el.fileSize,
        type: 'server',
        fileNo: el.fileNo,
        fileUrl: el.fileUrl,
      };
    });
    setFiles(files);
    setApiResponse(dt);
    setParams(JSON.parse(dt.requestJsonDc));

    setMode('modify');
  };

  return {
    params,
    maxFile,
    files,
    setFiles,
    delFiles,
    setDelFiles,
    handleChange,
    handleCheck,
    teethTypeCode,
    millingTypeCode,
    handleChangeMillingType,
    handleAddTeethType,
    handleTypeCountChange,
    handleRemoveType,
    handleSubmit,
    handleSubmitDraft,
    handleOftenSubmit,
    mode,
    fetchData,
    isMobile,
  };
};
