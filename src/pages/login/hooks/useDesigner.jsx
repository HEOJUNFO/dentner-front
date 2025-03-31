import React, { useEffect, useRef, useState } from 'react';
import { postJoinLocalMember } from '@api/Login';
import { postAccCheck } from '@api/Common';
import { useNav, useSnack } from '@components/hooks';
import CodeStore from '@store/CodeStore';
import ModalStore from '@store/ModalStore';
import { useTranslation } from 'react-i18next';

const useDesigner = () => {
  const { t, i18n } = useTranslation();
  const { actions } = ModalStore();
  const { getters } = CodeStore();
  const { handleNav, state } = useNav();
  const { showWarnSnackbar, showSnackbar } = useSnack();

  // console.log(state)
  // const { user, login } = UserStore();
  const [isPostModal, setIsPostModal] = useState(false);
  const [licenseFileList, setLicenseFileList] = useState([]);
  const [businessFileList, setBusinessFileList] = useState([]);

  const [alarmType, setAlarmType] = useState([])

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
    memberName: { value: '', isRequired: true, error: '', maxLength: 50, placeholder: '이름을 입력하세요.' },
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
    memberAccountBankNo: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '은행을 선택해주세요.' },
    memberAccountName: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '예금주를 입력하세요.' },
    memberAccountNumber: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '계좌번호를 입력하세요.' },
    tos: { value: false, type: 'boolean', isRequired: true, error: '', maxLength: 50, emptyMessage: '이용약관 동의 확인해주세요.' },
    privacy: { value: false, type: 'boolean', isRequired: true, error: '', maxLength: 50, emptyMessage: '개인정보처리방침 확인해주세요.' },
    // 24.10.30 NOTION: QA0809-296 개인정보 처리위탁 계약 동의 주석 요청
    // consign: { value: false, type: 'boolean', isRequired: true, error: '', maxLength: 50, emptyMessage: '개인정보처리위탁계약 확인해주세요.' },
    marketing: { value: false, isRequired: false, error: '', maxLength: 50 },
    isConfirm: { value: false, type: 'boolean', isRequired: true, error: '', check: 1, success: 0, emptyMessage: '전자계산서 발행은 필수입니다.' },

    socialSe: { value: state?.socialSe || '', isRequired: false, error: '', maxLength: 50 },
    socialUniqueKey: { value: state?.socialUniqueKey || '', isRequired: false, error: '', maxLength: 50 },
  });

  const [bankCode, setBankCode] = useState([]);
  const [isAccount, setAccount] = useState(false);

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
    // 24.10.30 NOTION: QA0809-296 개인정보 처리위탁 계약 동의 주석 요청
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

  const handleChange = (name, value, success = 0) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error: '' },
    }));
  };

  const handleAgreeCheck = (e) => {
    const { id, checked } = e.target;
    handleChange(id, checked, checked ? 1 : 0);
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
    let errorMsg = '';
    const p = { ...params };
    const formData = new FormData();
    for (const key in p) {
      if (p[key].error) {
        // console.log('p[key].error', p[key])
        inProgress = false;
      }

      if (p[key].check === 1 && p[key].success !== 1) {
        // console.log('p[key].check === 1 && p[key].success !== 1)', p, key, p[key])
        inProgress = false;
        handleValidChange(key, p[key].placeholder);
      }

      if (p[key].isRequired) {
        if (p[key]?.type === 'boolean') {
          if (!p[key].value) {
            // console.log('p[key]?.type === boolean', key, p[key]);
            inProgress = false;
            if (!errorMsg) errorMsg = p[key].emptyMessage;
          }
        } else {
          if (p[key].value === '') {
            // console.log('p[key].value ===', key, p[key]);
            inProgress = false;

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
    formData.append('memberSe', 'C');

    if(alarmType?.length === 0) {
      inProgress = false;
    }

    // formData.append('licenseFile', licenseFileList);
    // formData.append('businessFile', businessFileList);
    if (!inProgress) {
      // console.log('inProgress====================>', inProgress)
      if (errorMsg) showWarnSnackbar(errorMsg);
      else showWarnSnackbar(t('version2_1.text82')); //'필수입력항목 확인해주세요.'

      return;
    }

    if (licenseFileList.length === 0) {
      showWarnSnackbar(t('version2_1.text88')); //치과기공사 면허증 확인해주세요
      return;
    }
    if (businessFileList.length === 0) {
      showWarnSnackbar(t('version2_1.text87')); //'사업자 등록증 확인해주세요.'
      return;
    }

    if (!isAccount) {
      showWarnSnackbar(t('version2_1.text83')); //예금주 조회해주세요.
      return;
    }

    licenseFileList.forEach((f) => {
      formData.append('licenseFile', f.file);
    });
    businessFileList.forEach((f) => {
      formData.append('businessFile', f.file);
    });

    const alarmResult = alarmType.reduce((acc,cur) => {
      return acc + Number(cur)
    },0)

    formData.append('memberAlarmAt', 'Y');
    formData.append('memberAlarmSe', alarmResult);

    // console.log('End')
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

  // 계좌인증
  const handleAccCheck = async () => {
    let inProgress = true;

    if (params['memberRepresentativeName'].value !== params['memberAccountName'].value) {
      showWarnSnackbar(t('version2_1.text84')); //'등록한 사업자등록증의 대표자와 예금주가 다를 경우, 서비스 이용이 불가능합니다.'
      return;
    }

    if (params['memberBankNo'].value === '') {
      handleValidChange('memberBankNo', params['memberBankNo'].placeholder);
      inProgress = false;
    }

    if (params['memberAccountNumber'].value === '') {
      handleValidChange('memberAccountNumber', params['memberAccountNumber'].placeholder);
      inProgress = false;
    }

    if (params['memberAccountName'].value === '') {
      handleValidChange('memberAccountName', params['memberAccountName'].placeholder);
      inProgress = false;
    }

    if (!inProgress) {
      return;
    }
    actions.setLoading(true);
    try {
      const accountNumber = params['memberAccountNumber'].value;
      // 숫자만 남기기 (숫자가 아닌 문자 제거)
      const numericAccountNumber = accountNumber.replace(/\D/g, '');
      const r = await postAccCheck({
        memberAccountNumber: numericAccountNumber,
        memberAccountName: params['memberAccountName'].value,
        memberAccountBankNo: params['memberAccountBankNo'].value,
      });

      const { data } = r;
      if (Boolean(Number(data))) {
        setAccount(true);
      } else {
        setAccount(false);
        showWarnSnackbar(t('version2_1.text85')); //계좌정보를 확인해주세요.
      }
    } catch (e) {
      // console.log(e);
      showWarnSnackbar(t('version2_1.text86')); //네트워크 오류
    } finally {
      actions.setLoading(false);
    }
  };

  useEffect(() => {
    const bank = getters.getFilterCode(945);
    setBankCode(bank);
  }, []);

  useEffect(() => {
    setParams((prev) => ({
      ...prev,
      memberEmail: { ...prev['memberEmail'], placeholder: t('version2_1.text59') },
      memberPassword: { ...prev['memberPassword'], placeholder: t('version2_1.text60') },
      memberName: { ...prev['memberName'], placeholder: t('version2_1.text98') },
      memberHp: { ...prev['memberHp'], placeholder: t('version2_1.text61') },
      memberNickName: { ...prev['memberNickName'], placeholder: t('version2_1.text62') },
      memberLicenseNumber: { ...prev['memberLicenseNumber'], placeholder: t('version2_1.text63') },
      memberBusinessNumber: { ...prev['memberBusinessNumber'], placeholder: t('version2_1.text64') },
      memberDentistryName: { ...prev['memberDentistryName'], placeholder: t('version2_1.text99') },
      memberRepresentativeName: { ...prev['memberRepresentativeName'], placeholder: t('version2_1.text66') },
      memberAddress: { ...prev['memberAddress'], placeholder: t('version2_1.text67') },
      memberDetailAddress: { ...prev['memberDetailAddress'], placeholder: t('version2_1.text68') },
      memberBankNo: { ...prev['memberBankNo'], placeholder: t('version2_1.text69') },
      memberAccountBankNo: { ...prev['memberAccountBankNo'], placeholder: t('version2_1.text69') },
      memberAccountName: { ...prev['memberAccountName'], placeholder: t('version2_1.text70') },
      memberAccountNumber: { ...prev['memberAccountNumber'], placeholder: t('version2_1.text71') },
      tos: { ...prev['tos'], emptyMessage: t('version2_1.text72') },
      privacy: { ...prev['privacy'], emptyMessage: t('version2_1.text73') },
      isConfirm: { ...prev['isConfirm'], emptyMessage: t('version2_1.text74') },
    }));
  }, [i18n.language]);

  const handleAlarmSet = (type) => {
    let list = [...alarmType]
    if(!list.includes( type)){
      list.push(type)
      setAlarmType(list)
    } else {
      setAlarmType(list.filter((e) => e !== type))
    }
  }


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
    handleAccCheck,
    handleAgreeCheck,
    isAccount,
    setAccount,
    alarmType, setAlarmType ,
    handleAlarmSet
  };
};

export default useDesigner;
