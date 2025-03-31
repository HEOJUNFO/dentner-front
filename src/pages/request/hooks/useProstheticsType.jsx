import React, { useEffect, useRef, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../../components/hooks/useWindowSize';

export const useProstheticsType = ({ code, onClick, maxCnt, currCnt, activeIndex, params }) => {
  const { t } = useTranslation();
  const isMobile = useWindowSize();
  const initialSelectedCode = {
    upperCode: { value: '', name: '' },
    middleCode: { value: '', name: '' },
    lowerCode: { value: '', name: '' },
    code: { value: [], name: [] },
    dept: '',
  };

  const [codeDirectInputError, setCodeDirectInputError] = useState(false);
  const [lowerDirectInputError, setLowerDirectInputError] = useState(false);

  const { showSnackbar, showWarnSnackbar } = useSnack();
  const [selectedCode, setSelectedCode] = useState(initialSelectedCode);
  const [upperCode, setUpperCode] = useState([]);
  const [middleCode, setMiddleCode] = useState([]);
  const [lowerCode, setLowerCode] = useState([]);
  const [checkCode, setCheckCode] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [init, setInit] = useState(false);
  const [btiveIndex, setBtiveIndex] = useState(activeIndex);

  const refCodeDirectInput = useRef();
  const refLowerDirectInput = useRef();

  const handleChange = (name, value, error) => {
    // console.log(name, value)
    // if(name === 'code') {
    //   setSelectedCode((prev) => ({
    //     ...prev,
    //     [name]: { ...prev[name], name: [value], success: value ? 1 : 0, error: error || '' },
    //   }));
    // }else {
    setSelectedCode((prev) => ({
      ...prev,
      [name]: { ...prev[name], name: value, success: value ? 1 : 0, error: error || '' },
    }));
    // }
  };

  const handleDirectInputChange = (e, idx, name, type) => {
    if (type === 'lowerCode') {
      setSelectedCode((prev) => {
        return {
          ...prev,
          lowerCode: { ...prev['lowerCode'], name, direct: e.target.value },
        };
      });
    } else {
      setSelectedCode((prev) => {
        const _codeName = prev?.code?.name;
        _codeName[idx] = name + '(' + e.target.value + ')';
        return {
          ...prev,
          code: { ...prev['code'], name: _codeName, direct: e.target.value },
        };
      });
    }
  };

  const handleAdd = (e) => {
    let inProgress = true;
    for (const key in selectedCode) {
      if (selectedCode[key]?.edit) {
        if (!selectedCode[key].name) {
          inProgress = false;
          handleChange(key, '', '1');
          break;
        }
      }
    }

    if (refCodeDirectInput.current) {
      if (!refCodeDirectInput.current.value) {
        // refCodeDirectInput.current.setError('This is an error');
        // refCodeDirectInput.current.focus();

        showWarnSnackbar(t('version2_4.text123'));
        setCodeDirectInputError(true);
        return;
      }
    }

    if (!inProgress) {
      if (refLowerDirectInput.current) {
        setLowerDirectInputError(true);
      }
      showWarnSnackbar(t('version2_4.text123'));
      return;
    } else {
      if (refLowerDirectInput.current) {
        if (!refLowerDirectInput.current.value) {
          setLowerDirectInputError(true);
          showWarnSnackbar(t('version2_4.text123'));
          return;
        }
      }
    }

    if (maxCnt <= currCnt) {
      showWarnSnackbar(t('version2_4.text125', { maxCnt: maxCnt }));
      return;
    }
    if (!isEnd) {
      showWarnSnackbar(t('version2_4.text124'));
      return;
    }

    if (onClick) {
      setCodeDirectInputError(false);
      setLowerDirectInputError(false);
      onClick(selectedCode, upperCode, middleCode, lowerCode, checkCode);
    }
  };

  // 대분류 선택
  const handleUpperClick = (ucode) => {
    // console.log('ucode', ucode);
    if (selectedCode.upperCode.value === ucode.teethTypeNo) {
      setSelectedCode({
        upperCode: { value: '', name: '' },
        middleCode: { value: '', name: '' },
        lowerCode: { value: '', name: '' },
        code: { value: [], name: [] },
      });
      setMiddleCode([]);
      setLowerCode([]);
      setCheckCode([]);
      setIsEnd(false);
    } else {
      if (ucode.childCnt === 0) setIsEnd(true);
      else setIsEnd(false);

      setMiddleCode(convertTeethTypeCode(ucode.teethTypeNo));
      setSelectedCode({
        dept: ucode.childCnt === 0 ? 'upperCode' : '',
        upperCode: { value: ucode.teethTypeNo, name: ucode.typeName, success: 1, error: '', calcMethod: ucode.calcMethod },
        middleCode: { value: '', name: '' },
        lowerCode: { value: '', name: '' },
        code: { value: [], name: [] },
      });
      setLowerCode([]);
      setCheckCode([]);
    }
  };

  // 중분류 선택
  const handleMiddleClick = (e, mcode) => {
    e?.stopPropagation();
    if (selectedCode.middleCode.value === mcode.teethTypeNo) return;
    if (mcode.childCnt === 0) setIsEnd(true);
    else setIsEnd(false);
    setLowerCode(convertTeethTypeCode(mcode.teethTypeNo));
    setSelectedCode((prev) => ({
      ...prev,
      dept: mcode.childCnt === 0 ? 'middleCode' : '',
      middleCode: {
        value: mcode.teethTypeNo,
        placeholder: mcode.typeEditYn ? mcode.typeName : '',
        name: mcode.typeEditYn ? (isMobile ? selectedCode?.middleCode?.name : '') : mcode.typeName,
        success: mcode.typeEditYn ? 0 : 1,
        error: '',
        edit: mcode.typeEditYn,
      },
      lowerCode: { value: '', name: '' },
      code: { value: [], name: [] },
    }));
    setCheckCode([]);
  };

  // 소분류 선택
  const handleLowerClick = (e, lcode) => {
    e?.stopPropagation();
    if (selectedCode.lowerCode.value === lcode.teethTypeNo) return;
    if (lcode.childCnt === 0) setIsEnd(true);
    else setIsEnd(false);

    setCheckCode(convertTeethTypeCode(lcode.teethTypeNo));
    setSelectedCode((prev) => ({
      ...prev,
      dept: lcode.childCnt === 0 ? 'lowerCode' : '',
      lowerCode: {
        value: lcode.teethTypeNo,
        placeholder: lcode.typeEditYn ? lcode.typeName : '',
        name: lcode.typeEditYn ? (isMobile ? selectedCode?.lowerCode?.name : '') : lcode.typeName,
        success: lcode.typeEditYn ? 0 : 1,
        error: '',
        edit: lcode.typeEditYn,
      },
      code: { value: [], name: [] },
    }));
  };

  const handleChecked = (e, ccode) => {
    // e?.preventDefault();

    const value = ccode.teethTypeNo;
    const name = ccode.typeName;
    const typeEditYn = ccode.typeEditYn;
    let val = [];
    let nm = [];
    let edit = [];
    let success = 0;

    /**
     * 24.9.3
     * parentTypeNo: 91 (Splint&Surgical Guide> Surgical Guide > Partial) 예외처리
     * 하나만 선택되도록 수정
     * 24.9.4
     * Crown, Cap만 다중선택
     */
    // if (ccode.parentTypeNo === 91) {
    if (![1, 2].includes(selectedCode.upperCode.value)) {
      val = [value];
      nm = [name];
      edit = [typeEditYn];
    } else {
      //기존소스
      if (!selectedCode.code.value.includes(value)) {
        val = [...selectedCode.code.value, value];
        nm = [...selectedCode.code.name, name];
      } else {
        val = selectedCode.code.value.filter((el) => el !== value);
        nm = selectedCode.code.name.filter((el) => el !== name);
      }

      // 2024.08.09 화상미팅시 덴트너대표님 3까지만하기로 함
      if (val.length > 3) {
        showWarnSnackbar('하위 선택은 3개까지만 가능합니다.');
        return;
      }
    }

    if (val.length > 0) {
      success = 1;
      setIsEnd(true);
    } else {
      setIsEnd(false);
    }

    setSelectedCode((prev) => ({
      ...prev,
      code: { value: val, name: nm, edit, success, error: '' },
      dept: 'code',
    }));
  };

  useEffect(() => {
    if (btiveIndex !== activeIndex) {
      setBtiveIndex(activeIndex);
    } else {
      if (selectedCode?.dept !== '' && isMobile) {
        handleAdd();
        setInit(true);
      }
    }
  }, [selectedCode]);

  useEffect(() => {
    if (init) {
      setSelectedCode(initialSelectedCode);
      setUpperCode(convertTeethTypeCode(0));
      setMiddleCode([]);
      setLowerCode([]);
      setCheckCode([]);
      setInit(false);
    }
  }, [init]);

  const convertTeethTypeCode = (teethTypeNo) => {
    if (!code) return;
    const current = code.filter((el) => el.parentTypeNo === teethTypeNo);
    const r = current.map((el) => {
      const sub = code.filter((els) => els.parentTypeNo === el.teethTypeNo);
      return { ...el, childCnt: sub.length };
    });

    return r;
  };

  useEffect(() => {
    if (!code) return;
    setUpperCode(convertTeethTypeCode(0));
  }, [code]);

  useEffect(() => {
    if (activeIndex !== undefined) {
      // console.log(params[activeIndex].teethType);

      if (params[activeIndex].teethType) {
        if (params[activeIndex].teethType) setSelectedCode(params[activeIndex].teethType);
        if (params[activeIndex].teethUpperCode) setUpperCode(params[activeIndex].teethUpperCode);
        if (params[activeIndex].teethMiddleCode) setMiddleCode(params[activeIndex].teethMiddleCode);
        if (params[activeIndex].teethLowerCode) setLowerCode(params[activeIndex].teethLowerCode);
        if (params[activeIndex].teethCheckCode) setCheckCode(params[activeIndex].teethCheckCode);
      } else {
        setSelectedCode(initialSelectedCode);
        setUpperCode(convertTeethTypeCode(0));
        setMiddleCode([]);
        setLowerCode([]);
        setCheckCode([]);
        setIsEnd(false);
      }

      // console.log(selectedCode);
    }
  }, [activeIndex]);

  return {
    selectedCode,
    upperCode,
    handleUpperClick,
    middleCode,
    handleMiddleClick,
    lowerCode,
    handleLowerClick,
    checkCode,
    handleChecked,
    handleChange,
    handleAdd,
    handleDirectInputChange,
    refCodeDirectInput,
    refLowerDirectInput,
    codeDirectInputError,
    lowerDirectInputError,
    init,
    setInit,
  };
};
