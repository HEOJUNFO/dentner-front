import React, { useEffect, useRef, useState } from 'react';
import { getContractDoc, postCad, getTransactions } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import { payUnit, paySe } from '@constants/code';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import { useTranslation } from 'react-i18next';

const useCADUploadPage = () => {
  const { t, i18n } = useTranslation();
  const { actions } = ModalStore();
  const { user } = UserStore();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const { handleNav, params: pathValue } = useNav();

  // const requestPaySe = [...paySe];
  const [requestPaySe, setRequestPaySe] = useState([]);

  // const requestPayUnit = [...payUnit];
  const [requestPayUnit, setRequestPayUnit] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [items, setItems] = useState([]);
  const [id, setId] = useState();
  const [params, setParams] = useState({
    requestPaySe: { value: 'N', isRequired: true, error: '', check: 0, success: 0 }, // 추가금 여부
    requestPayUnit: { value: 'A', isRequired: true, error: '', check: 0, success: 0 }, // A 원화, B 달러
    requestPayAmount: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 10, placeholder: '0' },
    requestPayCn: {
      value: '',
      isRequired: true,
      error: '',
      check: 0,
      success: 0,
      maxLength: 300,
      placeholder: '추가금 요청사유를 작성해주세요 (최대 300자)',
      emptyMessage: '요청사유을 작성해주세요.',
    },
  });

  useEffect(() => {
    setRequestPaySe(paySe[i18n.language]);
    setRequestPayUnit(payUnit[i18n.language]);
    setParams((prev) => {
      const requestPayCn = prev.requestPayCn;
      requestPayCn['placeholder'] = t('version2_4.text102');
      requestPayCn['emptyMessage'] = t('version2_4.text103');
      requestPayCn['error'] = '';

      return { ...prev, requestPayCn };
    });
  }, [i18n.language]);

  const [cadFiles, setCadFiles] = useState([]);
  const [docFiles, setDocFiles] = useState([]);

  const [isRework, setRework] = useState(false);
  const [isClick, setClick] = useState(false);

  const handleChange = (name, value, success = 0, error = '') => {
    if (name === 'requestPayUnit') return;
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

  const handleCADFileUpload = (idx, files) => {
    const newCadFiles = [...cadFiles];
    newCadFiles[idx] = files;
    setCadFiles(newCadFiles);
  };

  // 업로드 progress 처리
  const fileProgress = (p) => {
    actions.setReceived(p);
  };

  const handleSubmit = async () => {
    let inProgress = true;
    const p = { ...params };
    const formData = new FormData();

    // 캐드파일
    const cadFilesArray = cadFiles.flat().map((el) => el.newFile);
    if (cadFilesArray.length !== items.length) {
      showWarnSnackbar(t('version2_4.text13'));
      return;
    }

    for (const key in p) {
      const parameter = p[key];

      if (p['requestPaySe'].value === 'Y') {
        if (parameter.isRequired) {
          if (parameter.value === '') {
            console.log(key, parameter);
            inProgress = false;
            if (parameter.placeholder || parameter.emptyMessage) {
              handleValidChange(key, parameter.emptyMessage || parameter.placeholder);
            }
          } else {
            if (key === 'requestPayAmount') {
              if (Number(parameter.value) === 0) {
                inProgress = false;
              }
            }
          }
        }
      }
      formData.append(key, p[key].value);
    }

    if (!inProgress) return;

    if (p['requestPaySe'].value === 'Y') {
      if (docFiles.length === 0) {
        showWarnSnackbar(t('version2_4.text14'));
        return;
      }
    }
    docFiles.forEach((doc) => {
      formData.append('files', doc.file);
    });

    cadFilesArray.forEach((file, idx) => {
      formData.append(`cadFiles`, file);
    });

    const cadDocList = cadFiles.flat().map((el, idx) => {
      return {
        requestDocGroupNo: items[idx].requestDocgroupNo,
        fileName: el.maskingName,
        fileOrgName: el.fileName,
      };
    });

    formData.append('docList', JSON.stringify(cadDocList));

    formData.append('isRework', isRework ? 'Y' : 'N');
    // 로딩
    actions.setLoading(true);

    try {
      const r = await postCad({ requestFormNo: id, formData, fileProgress });

      const { data, statusCode, message } = r;
      if (Number(data) > 0) {
        showSnackbar(t('version2_4.text15'));
        handleNav('/payment');
      } else {
        showWarnSnackbar(t('version2_4.text16'));
      }
    } catch (e) {
      showWarnSnackbar(t('version2_4.text16'));
    } finally {
      // 로딩
      actions.setLoading(false);
    }
  };

  const fetchContractDoc = async () => {
    try {
      const r = await getContractDoc(id);
      const { data } = r;
      if (data) {
        setItems(data);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransaction = async () => {
    const r = await getTransactions({ params: { requestFormNo: id, memberSe: user.memberSe } });
    const { data: dt } = r;

    if (dt.list.length === 0) {
      showWarnSnackbar(t('version2_4.text17'));
      handleNav(-1);
    } else {
      const { requestStatus, requestRemakingNo, requestDealStatus, memberTp } = dt?.list[0];
      if (requestRemakingNo) {
        setRework(true);
      }

      if (requestStatus === 'C' && requestDealStatus === 'E') {
        // 버튼 활성화
        setClick(true);
      }

      if (memberTp === 'A') {
        setParams((prev) => ({ ...prev, requestPayUnit: { value: 'A', isRequired: true, error: '', check: 0, success: 0 } }));
      } else {
        setParams((prev) => ({ ...prev, requestPayUnit: { value: 'B', isRequired: true, error: '', check: 0, success: 0 } }));
      }

      fetchContractDoc();
    }
  };

  useEffect(() => {
    if (params.requestPaySe.value === 'N') {
      setParams((prev) => ({
        ...prev,
        requestPayAmount: { ...prev['requestPayAmount'], error: '' },
        requestPayCn: { ...prev['requestPayCn'], error: '' },
      }));
    }
  }, [params.requestPaySe]);

  useEffect(() => {
    if (!id) return;
    // fetchContractDoc();
    fetchTransaction();
  }, [id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  return { isLoading, error, isRework, isClick, items, params, handleChange, handleCADFileUpload, handleSubmit, cadFiles, setCadFiles, docFiles, setDocFiles, requestPaySe, requestPayUnit };
};

export default useCADUploadPage;
