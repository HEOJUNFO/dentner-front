import React, { useEffect, useRef, useState } from 'react';
import { postRemaking } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import CodeStore from '@store/CodeStore';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import { useTranslation } from 'react-i18next';
import {getCommonCode} from "@api/Common.js";

const useReworkRequestWritePage = () => {
  const { t, i18n } = useTranslation();
  const { actions } = ModalStore();
  const { getters } = CodeStore();
  const { user } = UserStore();
  const { handleNav, params: pathValue } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [id, setId] = useState();
  const [code, setCode] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [params, setParams] = useState({
    remakingSe: { value: '', isRequired: true, error: '', check: 1, success: 0 },
    remakingDc: { value: '', isRequired: true, error: '', check: 0, success: 0, placeholder: '요청/수정사항을 작성해주세요. (최대 300자)', maxLength: 300 },
  });
  const [files, setFiles] = useState([]);
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    setParams((prev) => {
      const remakingDc = prev.remakingDc;
      remakingDc['placeholder'] = t('version2_4.text122');
      remakingDc['error'] = '';

      return { ...prev, remakingDc };
    });
  }, [i18n.language]);

  const handleChange = (name, value, success = 0, error = '') => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  const fileProgress = (p) => {
    actions.setReceived(p);
  };

  const handleSumbit = async () => {
    const formData = new FormData();
    let inProgress = true;

    const p = { ...params };
    for (const key in p) {
      const parameter = p[key];
      let isCaught = false;

      if (parameter.error) {
        isCaught = true;
      }

      if (parameter.check === 1 && parameter.success !== 1) {
        isCaught = true;
      }

      if (parameter.isRequired && !isCaught) {
        if (parameter.value === '') {
          isCaught = true;
        }
      }

      if (isCaught) inProgress = false;
      else {
        formData.append(key, parameter.value);
      }
    }

    if (files.length === 0) {
      inProgress = false;
    } else {
      files.forEach((f) => {
        formData.append('files', f.file);
      });
    }

    if (!inProgress) return;
    actions.setLoading(true);
    try {
      const r = await postRemaking({ requestFormNo: id, formData, fileProgress });

      const { data } = r;
      if (Number(data) > 0) {
        showSnackbar('재제작 요청했습니다.');
        handleNav('/payment');
      } else {
        showWarnSnackbar('네트워크 오류');
      }
    } catch (e) {
      showWarnSnackbar('네트워크 오류');
    } finally {
      actions.setLoading(false);
    }
  };

  useEffect(() => {
    let inProgress = true;

    const p = { ...params };
    for (const key in p) {
      const parameter = p[key];
      let isCaught = false;

      if (parameter.error) {
        isCaught = true;
      }

      if (parameter.check === 1 && parameter.success !== 1) {
        isCaught = true;
      }

      if (parameter.isRequired && !isCaught) {
        if (parameter.value === '') {
          isCaught = true;
        }
      }

      if (isCaught) inProgress = false;
    }

    if (files.length === 0) {
      inProgress = false;
    }

    setValid(inProgress);
  }, [params, files]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  useEffect(() => {
    // 재제작 요청사유
    // const c = getters.getFilterCode(821);
    // console.log('qqqq->>' , c)
    // setCode(c?.value);
    const codeList = async () => {
      const r = await getCommonCode(821, i18n.language);
      const { data } = r;
      setCode(data);
    }
    codeList();
  }, [i18n.language]);

  return { isLoading, error, code, params, files, setFiles, isValid, handleChange, handleSumbit };
};

export default useReworkRequestWritePage;
