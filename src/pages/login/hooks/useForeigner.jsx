import React, { useEffect, useRef, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import UserStore from '@store/UserStore';
import { postJoinCountryMember } from '@api/Login';
import { getCommonCode } from '@api/Common';
import { useTranslation } from 'react-i18next';

const useForeigner = () => {
  const { t, i18n } = useTranslation();
  const { handleNav, state } = useNav();
  // console.log(state)
  const [isPostModal, setIsPostModal] = useState(false);
  const [gmtCodes, setGmtCodes] = useState([]);
  const { showWarnSnackbar, showSnackbar } = useSnack();

  const [businessFileList, setBusinessFileList] = useState([]);

  const [alarmType, setAlarmType] = useState()

  const [params, setParams] = useState({
    memberEmail: {
      value: state?.memberEmail || '',
      isRequired: state?.socialUniqueKey ? false : true,
      error: '',
      check: state?.socialUniqueKey ? 0 : 1,
      success: 0,
      maxLength: 50,
      placeholder: '이메일 주소를 입력하세요.',
      disabled: state?.socialUniqueKey ? true : false,
    },
    memberPassword: {
      value: '',
      isRequired: state?.socialUniqueKey ? false : true,
      error: '',
      check: state?.socialUniqueKey ? 0 : 1,
      success: 0,
      maxLength: 50,
      placeholder: '비밀번호를 입력하세요.',
      visible: state?.socialUniqueKey ? false : true,
    },
    memberHpNation: { value: '208', isRequired: false, error: '', maxLength: 50 },
    memberHp: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '전화번호를 입력하세요.' },
    memberFirstName: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 50, placeholder: '이름을 입력하세요.' },
    memberLastName: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 50, placeholder: '이름을 입력하세요.' },
    memberNickName: { value: '', isRequired: true, error: '', check: 1, success: 0, maxLength: 50, placeholder: '닉네임을 입력하세요.' },
    memberJobSe: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 50, placeholder: '선택하세요.' },
    memberAlarmAt: { value: 'Y' },
    memberAlarmSe: { value: [], error: '', check: 1, placeholder: '알림톡 방식을 선택해 주세요.' },
    memberBusinessName: { value: '', isRequired: true, error: '', success: 0, maxLength: 50, placeholder: '사업자 명을 입력하세요.' },
    memberBusinessNumber: { value: '', isRequired: true, error: '', success: 0, maxLength: 10, placeholder: '사업자등록번호을 입력하세요.' },

    memberAddress: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '주소를 입력하세요.' },
    memberDetailAddress: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '상세주소를 입력하세요.' },
    memberTimezoneNo: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '선택하세요.' },
    tos: { value: false, type: 'boolean', isRequired: true, error: '', maxLength: 50, emptyMessage: '이용약관 동의 확인해주세요.' },
    privacy: { value: false, type: 'boolean', isRequired: true, error: '', maxLength: 50, emptyMessage: '개인정보처리방침 확인해주세요.' },
    marketing: { value: false, type: 'boolean', isRequired: false, error: '', maxLength: 50 },

    socialSe: { value: state?.socialSe || '', isRequired: false, error: '', maxLength: 50 },
    socialUniqueKey: { value: state?.socialUniqueKey || '', isRequired: false, error: '', maxLength: 50 },
  });

  const agreeSet = [
    {
      isRequired: true,
      title: t('version2_1.text79'), //'이용약관 동의',
      keyName: 'tos',
      onChange: (keyName, e) => {
        handleChange(keyName, e.target.checked);
      },
    },
    {
      isRequired: true,
      title: t('version2_1.text80'), //'개인정보처리방침 동의',
      keyName: 'privacy',
      onChange: (keyName, e) => {
        handleChange(keyName, e.target.checked);
      },
    },
    // {
    //   isRequired: true,
    //   title: '개인정보 처리위탁 계약 동의',
    //   keyName: 'consign',
    //   onChange: (keyName, e) => {
    //     handleChange(keyName, e.target.checked);
    //   },
    // },
    {
      isRequired: false,
      title: t('version2_1.text81'), //'마케팅 수신 동의',
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

  const handleNotiTalk = (p) => {
    let memberAlarmSe = { ...params.memberAlarmSe };
    if (p.memberAlarmAt.value === 'Y') {
      if (p.memberAlarmSe.value.length === 0) {
        memberAlarmSe = { ...params.memberAlarmSe, value: [], success: 0, error: '' };
      } else {
        memberAlarmSe = { ...params.memberAlarmSe, value: p.memberAlarmSe.value, success: 1, error: '' };
      }
    } else {
      memberAlarmSe = { ...params.memberAlarmSe, value: [], success: 1, error: '' };
    }
    setParams((prev) => ({
      ...prev,
      memberAlarmAt: { value: p.memberAlarmAt.value, success: 1, error: '' },
      memberAlarmSe: memberAlarmSe,
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

  const handleSubmit = async (e) => {

    console.log(params)

    let errorMsg = '';
    let inProgress = true;
    const p = { ...params };
    // console.log(p);

    const formData = new FormData();
    for (const key in p) {
      if (p[key].error) {
        // console.log(key, p[key]);
        inProgress = false;
      }

      if (p[key].check === 1 && p[key].success !== 1) {
        // console.log(key, p[key]);
        inProgress = false;
        handleValidChange(key, p[key].placeholder);
      }

      if (p[key].isRequired) {
        if (p[key]?.type === 'boolean') {
          if (!p[key].value) {
            //console.log(key, p[key]);
            inProgress = false;
            if (!errorMsg) errorMsg = p[key].emptyMessage;
          }
        } else {
          if (p[key].value === '') {
            inProgress = false;
            // console.log(key, p[key]);
            if (p[key].placeholder) {
              handleValidChange(key, p[key].placeholder);
            }
          }
        }
      }

      if (key === 'marketing') {
        formData.append('memberMarketingAt', p[key].value ? 'Y' : 'N');
      }else if(key === 'memberAlarmSe') {
        const alarmResult = p[key]?.value?.reduce((acc,cur) => {
          return acc + Number(cur)
        },0)
        formData.append(key, alarmResult);
      } else {
        formData.append(key, p[key].value);
      }
    }

    formData.append('memberSe', 'A');
    //알림설정 변경
    if (p?.memberAlarmAt?.value === 'Y' && p?.memberAlarmSe?.value?.length === 0 ) {
       inProgress= false;
    }

    // 사업자등록증, 면허증 필수 추가
    if (businessFileList.length === 0) {
      if (!errorMsg) errorMsg = t('login.business_registration');
      inProgress = false;
    }
    businessFileList.forEach((f) => {
      formData.append('businessFile', f.file);
    });

    if (!inProgress) {
      if (errorMsg) showWarnSnackbar(errorMsg);
      else showWarnSnackbar(t('version2_1.text82')); //'필수입력항목 확인해주세요.'
      return;
    }

    try {
      const r = await postJoinCountryMember(formData);
      const { data, statusCode, message } = r;
      if (statusCode === 200) {
        handleNav('/login/JoinEnd', { memberApprovalSe: 'A' });
      } else {
        // console.log('error');
        showWarnSnackbar(message);
      }
    } catch (e) {
      const { data, statusCode, message } = e;
      // console.log(e);
      showWarnSnackbar(message);
    }
  };

  const fetchCode = async () => {
    // GMT 코드조회
    const r = await getCommonCode('249', i18n.language);
    const dt = r?.data;
    if (dt) {
      setGmtCodes(dt);
    }
    // console.log('r', r);
  };

  useEffect(() => {
    fetchCode();
  }, [i18n.language]);

  useEffect(() => {
    setParams((prev) => {
      return {
        ...prev,
        memberEmail: { ...prev['memberEmail'], placeholder: t('version2_1.text59') },
        memberPassword: { ...prev['memberPassword'], placeholder: t('version2_1.text60') },
        memberFirstName: { ...prev['memberFirstName'], placeholder: t('version2_1.text98') },
        memberLastName: { ...prev['memberLastName'], placeholder: t('version2_1.text98') },
        memberHp: { ...prev['memberHp'], placeholder: t('version2_1.text61') },
        memberNickName: { ...prev['memberNickName'], placeholder: t('version2_1.text62') },
        memberJobSe: { ...prev['memberJobSe'], placeholder: t('version2_1.text101') },
        memberBusinessName: { ...prev['memberBusinessName'], placeholder: t('placeholder.business_name') },
        memberBusinessNumber: { ...prev['memberBusinessNumber'], placeholder: t('version2_1.text64') },
        memberAddress: { ...prev['memberAddress'], placeholder: t('version2_1.text67') },
        memberDetailAddress: { ...prev['memberDetailAddress'], placeholder: t('version2_1.text68') },
        memberTimezoneNo: { ...prev['memberTimezoneNo'], placeholder: t('version2_1.text101') },
        tos: { ...prev['tos'], placeholder: t('version2_1.text72') },
        privacy: { ...prev['privacy'], placeholder: t('version2_1.text73') },
      };
    });
  }, [i18n.language]);

  return {alarmType, setAlarmType,  params, setParams, agreeSet, gmtCodes, isPostModal, setIsPostModal, businessFileList, setBusinessFileList, handleCheck, handleChange, handleSmsVerify, handleNotiTalk, handleSubmit };
};

export default useForeigner;
