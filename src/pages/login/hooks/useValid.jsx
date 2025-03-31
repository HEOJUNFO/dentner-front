import React, { useEffect, useRef, useState } from 'react';
import { isValidateEmail, isValidNickName } from '@utils/common';
import { getDupEmail, getDupNickname } from '@api/Login';
import { useTranslation } from 'react-i18next';

const useValid = ({ params, setParams }) => {
  const { t, i18n } = useTranslation();
  const handleValidErrorChange = (name, error, value) => {
    let success = 0;
    if (!error) {
      success = 1;
    }

    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], error, value: value || prev[name].value, success },
    }));
  };

  const handleValidSuccessChange = (name, success, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], success, value: value || prev[name].value, error: '' },
    }));
  };

  const handleEmailFocus = (e) => {
    handleValidErrorChange('memberEmail', '');
  };

  const handlePassword = (value, bool) => {
    if (Boolean(bool)) {
      handleValidSuccessChange('memberPassword', 1, value);
    } else {
      handleValidSuccessChange('memberPassword', 0, value);
    }
  };

  const handleModalPassword = (value, bool) => {
    if (Boolean(bool)) {
      handleValidSuccessChange('password', 1, value);
    } else {
      handleValidSuccessChange('password', 0, value);
    }
  };

  const handleVerifyClick = (p) => {
    const { phone, verify } = p;
    handleValidSuccessChange('memberHp', 1, phone.value);
  };

  const handleModalPhone = (p) => {
    const { phone } = p;
    handleValidSuccessChange('phone', 1, phone.value);
  };

  const handleEmailBlur = async (e, isChecked = true) => {
    try {
      if (params.memberEmail.value === '') {
        handleValidErrorChange('memberEmail', '');
        return;
      }

      if (!isValidateEmail(params.memberEmail.value)) {
        handleValidErrorChange('memberEmail', t('version2_1.text89'));
        return;
      }

      if (!isChecked) return;

      const r = await getDupEmail({ memberEmail: params.memberEmail.value });
      const dt = r?.data;
      if (Boolean(Number(dt))) {
        handleValidErrorChange('memberEmail', t('version2_1.text90'));
      } else {
        handleValidSuccessChange('memberEmail', 1);
      }
    } catch ({ data, message, statusCode }) {
      handleValidErrorChange('memberEmail', message);
    }
  };

  const handleDupClick = async (e) => {
    try {
      if (params.memberNickName.value.length <= 1 || params.memberNickName.value.length > 10) {
        handleValidErrorChange('memberNickName', t('version2_1.text91')); //'닉네임은 2~10자리 영문/숫자/한글 로 입력하세요'
        return;
      }
      const re = isValidNickName(params.memberNickName.value);
      if (!re) {
        handleValidErrorChange('memberNickName', t('version2_1.text91')); //'닉네임은 2~10자리 영문/숫자/한글 로 입력하세요'
        return;
      }

      const r = await getDupNickname({ memberNickName: params.memberNickName.value });
      const dt = r?.data;
      if (Boolean(Number(dt))) {
        handleValidErrorChange('memberNickName', t('version2_1.text92')); //'중복된 닉네임 입니다.'
      } else {
        handleValidSuccessChange('memberNickName', 1);
      }
    } catch ({ data, message, statusCode }) {
      handleValidErrorChange('memberNickName', message);
    }
  };

  const handleNameBlur = (e) => {
    if (e.target.id === 'memberAccountName') {
      if (params.memberRepresentativeName.value && params.memberRepresentativeName.value !== e.target.value) handleValidErrorChange('memberAccountName', t('version2_1.text93')); //'대표자 성명과 일치하지않습니다.'
    }

    if (e.target.id === 'memberRepresentativeName') {
      if (params.memberAccountName.value && params.memberAccountName.value !== e.target.value) handleValidErrorChange('memberRepresentativeName', t('version2_1.text94')); //'예금주 성명과 일치하지않습니다.'
    }
  };

  return { handleEmailFocus, handlePassword, handleModalPassword, handleVerifyClick, handleModalPhone, handleEmailBlur, handleDupClick, handleNameBlur };
};
export default useValid;
// export const useAgreeSet = ({ items, onChange }) => {
//   const onChangeRefs = useRef(items.map(() => () => {})); // onChange 핸들러들을 저장
//   const [checkedItems, setCheckedItems] = useState(items.map(() => false));

//   const handleAllCheck = (e) => {
//     const { checked } = e.target;
//     if (checked) {
//       console.log(items.map(() => true));
//       setCheckedItems(items.map(() => true));
//     }

//     onChangeRefs.current.forEach((ref) => ref(e));
//   };

//   const handleCheck = (e, idx) => {
//     const { checked } = e.target;
//     setCheckedItems((prev) => prev.map((value, idxx) => (idx === idxx ? checked : value)));
//   };

//   return { onChangeRefs, checkedItems, handleAllCheck, handleCheck };
// };
