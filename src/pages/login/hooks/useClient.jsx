import React, { useEffect, useRef, useState } from 'react';
import { useNav } from '@components/hooks';
import UserStore from '@store/UserStore';
import { isValidateEmail } from '@utils/common';
import { getDupEmail, getDupNickname } from '@api/Login';

export const useClient = () => {
  const [joinTab, setJoinTab] = useState(1);
  const koreanRef = useRef(null);
  const foreignerRef = useRef(null);

  const handleSubmit = (e) => {
    if (joinTab === 1 && koreanRef.current) {
      koreanRef.current.handleSubmit();
    } else if (joinTab === 2 && foreignerRef.current) {
      foreignerRef.current.handleSubmit();
    }
  };

  return { joinTab, setJoinTab, koreanRef, foreignerRef, handleSubmit };
};

// useValid.jsx 이동
// export const useValid = ({ params, setParams }) => {
//   const handleValidErrorChange = (name, error, value) => {
//     let success = 0;
//     if (!error) {
//       success = 1;
//     }

//     setParams((prev) => ({
//       ...prev,
//       [name]: { ...prev[name], error, value: value || prev[name].value, success },
//     }));
//   };

//   const handleValidSuccessChange = (name, success, value) => {
//     setParams((prev) => ({
//       ...prev,
//       [name]: { ...prev[name], success, value: value || prev[name].value, error: '' },
//     }));
//   };

//   const handleEmailFocus = (e) => {
//     handleValidErrorChange('memberEmail', '');
//   };

//   const handlePassword = (value, bool) => {
//     if (Boolean(bool)) {
//       handleValidSuccessChange('memberPassword', 1, value);
//     } else {
//       handleValidSuccessChange('memberPassword', 0, value);
//     }
//   };

//   const handleVerifyClick = (p) => {
//     const { phone, verify } = p;
//     handleValidSuccessChange('memberHp', 1, phone.value);
//   };

//   const handleEmailBlur = async (e, isChecked = true) => {
//     try {
//       if (params.memberEmail.value === '') {
//         handleValidErrorChange('memberEmail', '');
//         return;
//       }

//       if (!isValidateEmail(params.memberEmail.value)) {
//         handleValidErrorChange('memberEmail', '이메일 형식이 올바르지 않습니다.');
//         return;
//       }

//       if (!isChecked) return;

//       const r = await getDupEmail({ memberEmail: params.memberEmail.value });
//       const dt = r?.data;
//       if (Boolean(Number(dt))) {
//         handleValidErrorChange('memberEmail', '중복된 이메일 입니다.');
//       } else {
//         handleValidSuccessChange('memberEmail', 1);
//       }
//     } catch ({ data, message, statusCode }) {
//       handleValidErrorChange('memberEmail', message);
//     }
//   };

//   const handleDupClick = async (e) => {
//     try {
//       const r = await getDupNickname({ memberNickName: params.memberNickName.value });
//       const dt = r?.data;
//       if (Boolean(Number(dt))) {
//         handleValidErrorChange('memberNickName', '중복된 닉네임 입니다.');
//       } else {
//         handleValidSuccessChange('memberNickName', 1);
//       }
//     } catch ({ data, message, statusCode }) {
//       handleValidErrorChange('memberNickName', message);
//     }
//   };

//   return { handleEmailFocus, handlePassword, handleVerifyClick, handleEmailBlur, handleDupClick };
// };

export const useAgreeSet = ({ items, onChange }) => {
  const onChangeRefs = useRef(items.map(() => () => {})); // onChange 핸들러들을 저장
  const [checkedItems, setCheckedItems] = useState(items.map(() => false));
  const [allchecked, setAllChecked] = useState(false);

  const handleAllCheck = (e) => {
    const { checked } = e.target;
    if (checked) {
      setCheckedItems(items.map(() => true));
    }

    onChangeRefs.current.forEach((ref) => ref(e));
  };

  const handleCheck = (e, idx) => {
    const { checked } = e.target;
    setCheckedItems((prev) => prev.map((value, idxx) => (idx === idxx ? checked : value)));
  };

  useEffect(() => {
    const checked = checkedItems.filter((el) => el);
    if (checked.length === items.length) setAllChecked(true);
    else setAllChecked(false);
  }, [checkedItems]);

  return { onChangeRefs, checkedItems, handleAllCheck, handleCheck, allchecked };
};
