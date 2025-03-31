import React, { useEffect, useRef, useState } from 'react';
import { postJoinLocalMember } from '@api/Login';
import { useNav, useSnack } from '@components/hooks';
import CodeStore from '@store/CodeStore';

// 삭제예정
const useOffice = () => {
  const { getters } = CodeStore();
  const { handleNav } = useNav();
  const { showWarnSnackbar, showSnackbar } = useSnack();

  // const { user, login } = UserStore();
  const [isPostModal, setIsPostModal] = useState(false);
  const [licenseFileList, setLicenseFileList] = useState([]);
  const [businessFileList, setBusinessFileList] = useState([]);
  const [params, setParams] = useState({
    memberEmail: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '이메일 주소를 입력하세요.' },
    memberPassword: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '비밀번호를 입력하세요.' },
    memberHpNation: { value: '208', isRequired: false, error: '', maxLength: 50 },
    memberHp: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '전화번호를 입력하세요.' },
    memberNickName: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '닉네임을 입력하세요.' },
    memberLicenseNumber: { value: '', isRequired: true, error: '', success: 0, maxLength: 50, placeholder: '면허번호을 입력하세요.' },
    memberBusinessNumber: { value: '', isRequired: true, error: '', success: 0, maxLength: 10, placeholder: '사업자등록번호을 입력하세요.' },
    memberDentistryName: { value: '', isRequired: true, error: '', success: 0, maxLength: 50, placeholder: '상호명을 입력하세요.' },
    memberRepresentativeName: { value: '', isRequired: true, error: '', success: 0, maxLength: 50, placeholder: '대표자명을 입력하세요.' },
    memberAddress: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '주소를 입력하세요.' },
    memberDetailAddress: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '상세주소를 입력하세요.' },
    memberBankNo: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '은행을 선택해주세요.' },
    memberAccountName: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '예금주를 입력하세요.' },
    memberAccountNumber: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '계좌번호를 입력하세요.' },
    tos: { value: false, type: 'boolean', isRequired: true, error: '', maxLength: 50 },
    privacy: { value: false, type: 'boolean', isRequired: true, error: '', maxLength: 50 },
    marketing: { value: false, isRequired: false, error: '', maxLength: 50 },
  });

  const [bankCode, setBankCode] = useState([]);

  const agreeSet = [
    {
      isRequired: true,
      title: '이용약관 동의',
      keyName: 'tos',
      onChange: (keyName, e) => {
        handleChange(keyName, e.target.checked);
      },
    },
    {
      isRequired: true,
      title: '개인정보처리방침 동의',
      keyName: 'privacy',
      onChange: (keyName, e) => {
        handleChange(keyName, e.target.checked);
      },
    },
    {
      isRequired: false,
      title: '마케팅 수신 동의',
      keyName: 'marketing',
      onChange: (keyName, e) => {
        handleChange(keyName, e.target.checked);
      },
    },
  ];

  const handleCheck = (k, v) => {
    console.log('임시');
  };

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success: 0, error: '' },
    }));
  };

  const handleSmsVerify = (p) => {
    handleChange('memberHp', p.value);
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

  const handleSubmit = async (e) => {
    let inProgress = true;
    const p = { ...params };
    const formData = new FormData();
    for (const key in p) {
      if (p[key].error) {
        console.log(key, p[key]);
        inProgress = false;
      }

      if (p[key].check === 1 && p[key].success !== 1) {
        console.log(key, p[key]);
        inProgress = false;
        handleValidChange(key, p[key].placeholder);
      }

      if (p[key].isRequired) {
        if (p[key]?.type === 'boolean') {
          if (!p[key].value) {
            //console.log(key, p[key]);
            inProgress = false;
          }
        } else {
          if (p[key].value === '') {
            inProgress = false;
            console.log(key, p[key]);
            if (p[key].placeholder) {
              handleValidChange(key, p[key].placeholder);
            }
          }
        }
      }

      if (key === 'marketing') {
        formData.append('memberMarketingAt', p[key].value ? 'Y' : 'N');
      } else {
        formData.append(key, p[key].value);
      }
    }
    formData.append('memberSe', 'B');
    formData.append('licenseFile', licenseFileList);
    formData.append('businessFile', businessFileList);

    if (!inProgress) {
      showWarnSnackbar('입력');
      return;
    }

    try {
      const r = await postJoinLocalMember(formData);
      const { data, statusCode, message } = r;

      if (statusCode === 200) {
        handleNav('/login/JoinEnd', { memberApprovalSe: 'A' });
      } else {
        showWarnSnackbar(message);
      }
    } catch (e) {
      const { data, statusCode, message } = e;
      showWarnSnackbar(message);
    }
  };

  useEffect(() => {
    const bank = getters.getFilterCode(641);
    setBankCode(bank);
  }, []);

  return {
    params,
    setParams,
    bankCode,
    agreeSet,
    isPostModal,
    setIsPostModal,
    licenseFileList,
    setLicenseFileList,
    businessFileList,
    setBusinessFileList,
    handleCheck,
    handleSmsVerify,
    handleChange,
    handleSubmit,
  };
};

export default useOffice;
