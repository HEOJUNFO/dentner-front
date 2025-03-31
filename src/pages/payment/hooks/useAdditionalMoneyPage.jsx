import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAddPay, putAddPay } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import UserStore from '@store/UserStore';
import { payUnit, paySe } from '@constants/code';

const useAdditionalMoneyPage = () => {
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const { handleNav, params: pathValue, state } = useNav();
  const { user } = UserStore();

  const requestPaySe = [...paySe];

  const requestPayUnit = [...payUnit];

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [items, setItems] = useState([]);
  const [id, setId] = useState();
  const [requestFormPayNo, setRequestFormPayNo] = useState();

  const [params, setParams] = useState({
    requestPaySe: { value: 'Y', isRequired: true, error: '', check: 0, success: 0 }, // 추가금 여부
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

  const [files, setFiles] = useState([]);
  const [delFiles, setDelFiles] = useState([]);

  const [rework, setRework] = useState(false); // 재제작 여부

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

  const handleSubmit = async () => {
    let inProgress = true;
    const p = { ...params };
    const formData = new FormData();

    for (const key in p) {
      const parameter = p[key];

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

      formData.append(key, p[key].value);
    }

    if (files.length === 0) {
      showWarnSnackbar('추가금 요청 파일을 첨부해주세요.');
      return;
    }

    files.forEach((doc) => {
      if (doc.type === 'local') formData.append('files', doc.file);
    });

    if (delFiles.length > 0) {
      formData.append('fileDel', delFiles.join(','));
    }

    try {
      const r = await putAddPay({ requestFormPayNo: requestFormPayNo, formData });
      const { data, statusCode, message } = r;

      if (Number(data) === 1) {
        showSnackbar('추가금 수정');
        handleNav('/payment');
      } else {
        showWarnSnackbar('추가금 수정 실패 관리자에 문의해주세요.');
      }
    } catch (e) {
      showWarnSnackbar('네트워크 오류');
      console.log(e);
    }
  };

  const fetchPayInfo = async () => {
    try {
      const r = await getAddPay({ requestFormNo: id, memberSe: user?.memberSe });
      console.log(r);
      const { data: dt } = r;
      if (dt) {
        setRequestFormPayNo(dt?.requestFormPayNo);
        setParams((prev) => ({
          ...prev,
          requestPaySe: { ...prev['requestPaySe'], value: dt.requestPaySe, error: '' },
          requestPayCn: { ...prev['requestPayCn'], value: dt.requestPayCn, error: '' },
          requestPayAmount: { ...prev['requestPayAmount'], value: dt.requestPayAmount, error: '' },
          requestPayUnit: { ...prev['requestPayUnit'], value: dt.requestPayUnit, error: '' },
        }));

        if (dt.fileList?.length > 0) {
          setFiles(
            dt.fileList.map((el) => {
              return {
                type: 'server',
                fileName: el.fileRealName,
                fileNo: el.fileNo,
                fileSize: el.fileSize,
              };
            })
          );
        }
        // console.log(dt);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchPayInfo();

    console.log(state);
  }, [id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
    if (state?.requestRemakingNo) setRework(true);
  }, [pathValue]);

  return { isLoading, error, rework, items, params, files, setFiles, delFiles, setDelFiles, handleChange, handleSubmit, requestPaySe, requestPayUnit };
};

export default useAdditionalMoneyPage;
