import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNav, useSnack } from '@components/hooks';
import UserStore from '@store/UserStore';
import { getMyPageinfo, putMyPageInfo, putMemberOut } from '../../../api/Mypage';
import { useNavigate } from 'react-router-dom';
import { getCommonCode } from '@api/Common';
import CodeStore from '@store/CodeStore';
import { postAccCheck } from '@api/Common';
import ModalStore from '@store/ModalStore';

const useMyPageInfo = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user, logout } = UserStore();
  const { getters } = CodeStore();
  const { actions } = ModalStore();

  const { showWarnSnackbar, showSnackbar } = useSnack();

  const [licenseFileList, setLicenseFileList] = useState({});
  const [businessFileList, setBusinessFileList] = useState([]);
  const [delFiles, setDelFiles] = useState([]); // 삭제된 파일
  const [isLoading, setLoading] = useState(true);

  const [isPostModal, setIsPostModal] = useState(false);

  const [gmtCodes, setGmtCodes] = useState([]);
  const [bankCode, setBankCode] = useState([]);
  const [currentBankName, setCurrentBankName] = useState('');
  const [isAccount, setAccount] = useState(false);

  //탈퇴모달
  const [isConModal, setConModal] = useState({
    visible: false,
    value: '',
  });

  const [params, setParams] = useState({
    memberDentistryName: { value: '', isRequired: true, error: '', success: 0, maxLength: 50, placeholder: '상호명(치과명)을 입력하세요.' },
    memberJobSe: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 50, placeholder: '선택하세요.' },
    memberAlarmAt: { value: 'Y' },
    memberAlarmSe: { value: '', error: '', check: 0, placeholder: '알림톡 방식을 선택해 주세요.' },
    memberBusinessName: { value: '', isRequired: true, error: '', success: 0, maxLength: 50, placeholder: '사업자 명을 입력하세요.' },
    memberBusinessNumber: { value: '', isRequired: true, error: '', success: 0, maxLength: 10, placeholder: '사업자등록번호을 입력하세요.' },
    memberAddress: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '주소를 입력하세요.' },
    memberDetailAddress: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '상세주소를 입력하세요.' },
    memberTimezoneNo: { value: '', isRequired: true, error: '', check: 0, success: 0, maxLength: 200, placeholder: '선택하세요.' },
    memberRepresentativeName: { value: '', isRequired: true, error: '', success: 0, maxLength: 50, placeholder: '대표자명을 입력하세요.' },
    memberBankNo: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '은행을 선택해주세요.' },
    memberAccountBankNo: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '은행을 선택해주세요.' },
    memberAccountName: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '예금주를 입력하세요.' },
    memberAccountNumber: { value: '', isRequired: true, error: '', success: 0, maxLength: 200, placeholder: '계좌번호를 입력하세요.' },
    isConfirm: {
      value: false,
      type: 'boolean',
      isRequired: user?.memberSe === 'A' ? false : true,
      error: '',
      check: user?.memberSe === 'A' ? 0 : 1,
      success: 0,
      emptyMessage: '전자계산서 발행은 필수입니다.',
    },
  });

  useEffect(() => {
    setParams((prev) => {
      const memberDentistryName = prev.memberDentistryName;
      memberDentistryName['placeholder'] = t('version2_5.text1');
      memberDentistryName['error'] = '';

      const memberJobSe = prev.memberJobSe;
      memberJobSe['placeholder'] = t('version2_1.text101');
      memberJobSe['error'] = '';

      const memberAlarmSe = prev.memberAlarmSe;
      memberAlarmSe['placeholder'] = t('mypage.talk_type');
      memberAlarmSe['error'] = '';

      const memberBusinessName = prev.memberBusinessName;
      memberBusinessName['placeholder'] = t('placeholder.business_name');
      memberBusinessName['error'] = '';

      const memberBusinessNumber = prev.memberBusinessNumber;
      memberBusinessNumber['placeholder'] = t('placeholder.business_number');
      memberBusinessNumber['error'] = '';

      const memberAddress = prev.memberAddress;
      memberAddress['placeholder'] = t('placeholder.address');
      memberAddress['error'] = '';

      const memberDetailAddress = prev.memberDetailAddress;
      memberDetailAddress['placeholder'] = t('placeholder.detail_address');
      memberDetailAddress['error'] = '';

      const memberTimezoneNo = prev.memberTimezoneNo;
      memberTimezoneNo['placeholder'] = t('version2_1.text101');
      memberTimezoneNo['error'] = '';

      const memberRepresentativeName = prev.memberRepresentativeName;
      memberRepresentativeName['placeholder'] = t('version2_1.text66');
      memberRepresentativeName['error'] = '';

      const memberBankNo = prev.memberBankNo;
      memberBankNo['placeholder'] = t('version2_1.text69');
      memberBankNo['error'] = '';

      const memberAccountBankNo = prev.memberAccountBankNo;
      memberAccountBankNo['placeholder'] = t('version2_1.text69');
      memberAccountBankNo['error'] = '';

      const memberAccountName = prev.memberAccountName;
      memberAccountName['placeholder'] = t('version2_1.text70');
      memberAccountName['error'] = '';

      const memberAccountNumber = prev.memberAccountNumber;
      memberAccountNumber['placeholder'] = t('version2_1.text71');
      memberAccountNumber['error'] = '';

      const isConfirm = prev.isConfirm;
      isConfirm['emptyMessage'] = t('version2_1.text74');
      isConfirm['error'] = '';

      return {
        ...prev,
        memberDentistryName,
        memberJobSe,
        memberAlarmSe,
        memberBusinessName,
        memberBusinessNumber,
        memberAddress,
        memberDetailAddress,
        memberTimezoneNo,
        memberRepresentativeName,
        memberBankNo,
        memberAccountBankNo,
        memberAccountName,
        memberAccountNumber,
        isConfirm,
      };
    });
  }, [i18n.language]);

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success: 1, error: '' },
    }));
  };

  const fetchMyinfo = async () => {
    const r = await getMyPageinfo();

    const { data } = r;
    if (data) {
      const files = [
        {
          fileName: data?.memberBusinessRealName,
          fileSize: data?.memberBusinessFileSize,
          fileNo: data.memberBusinessFileNo,
        },
      ];

      setParams((prev) => ({
        ...prev,
        memberAddress: { ...prev['memberAddress'], value: data.memberAddress, success: 1, error: '' },
        memberDetailAddress: { ...prev['memberDetailAddress'], value: data.memberDetailAddress, success: 1, error: '' },
        memberJobSe: { ...prev['memberJobSe'], value: data.memberJobSe, success: 1, error: '' },
        memberBusinessName: { ...prev['memberBusinessName'], value: data.memberBusinessName, success: 1, error: '' },
        memberBusinessNumber: { ...prev['memberBusinessNumber'], value: data.memberBusinessNumber, success: 1, error: '' },
        memberDentistryName: { ...prev['memberDentistryName'], value: data.memberDentistryName, success: 1, error: '' },
        memberTimezoneNo: { ...prev['memberTimezoneNo'], value: data.memberTimezoneNo, success: 1, error: '' },
        memberAlarmAt: { ...prev['memberAlarmAt'], value: data.memberAlarmAt, success: 1, error: '' },
        memberAlarmSe: { ...prev['memberAlarmSe'], value: data.memberAlarmSe, success: 1, error: '' },
        memberRepresentativeName: { ...prev['memberRepresentativeName'], value: data.memberRepresentativeName, success: 1, error: '' },
        memberBankNo: { ...prev['memberBankNo'], value: data.memberBankNo, success: 1, error: '' },
        memberAccountBankNo: { ...prev['memberAccountBankNo'], value: data.memberAccountBankNo, success: 1, error: '' },
        memberAccountName: { ...prev['memberAccountName'], value: data.memberAccountName, success: 1, error: '' },
        memberAccountNumber: { ...prev['memberAccountNumber'], value: data.memberAccountNumber, success: 1, error: '' },
      }));

      setLicenseFileList({
        fileUrl: data?.memberLicenseFile,
        fileName: data?.memberLicenseRealName,
        fileSize: data?.memberLicenseFileSize,
        fileNo: data.memberLicenseFileNo,
      });
      setBusinessFileList(files);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   console.log(params)
  // }, [params])

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
    // console.log(files);
    let inProgress = true;
    // let msg = '필수항목 확인해주세요.';
    let msg = t('version2_1.text82');
    const p = { ...params };
    const formData = new FormData();
    for (const key in p) {
      if (p[key].error) {
        // console.log(1, p, key, p[key])
        showWarnSnackbar(p[key]?.error);
        inProgress = false;
        return;
      }

      if (p[key].check === 1 && p[key].success !== 1) {
        // console.log(2, p, key, p[key])
        inProgress = false;
        showWarnSnackbar(`${p[key].error}`);
        handleValidChange(key, p[key].placeholder);
      }

      if (p[key].isRequired) {
        if (user.memberSe !== 'A' && p[key]?.type === 'boolean') {
          if (!p[key].value) {
            // console.log(3, p, key, p[key])

            if (p[key]?.emptyMessage) msg = p[key]?.emptyMessage;

            inProgress = false;
          }
        } else {
          if (p[key].value === '') {
            // console.log(4, p, key, p[key])
            inProgress = false;
            if (p[key].placeholder) {
              handleValidChange(key, p[key].placeholder);
            }
          }
        }
      }

      formData.append(key, p[key].value);
    }

    if (delFiles.length > 0) formData.append('fileDel', delFiles.join(','));

    if (businessFileList.length === 0) {
      inProgress = false;
      // showWarnSnackbar('첨부파일을 올려주세요.');
      showWarnSnackbar(t('version2_3.text111'));
      return;
    }

    businessFileList.forEach((f) => {
      formData.append('businessFile', f.file);
    });

    if (user.memberSe !== 'A' && !isAccount) {
      // showWarnSnackbar('예금주 조회해주세요.');
      showWarnSnackbar(t('version2_1.text83'));
      return;
    }

    if (!inProgress) {
      showWarnSnackbar(msg);
      return;
    }

    try {
      const r = await putMyPageInfo({ formData });
      const { data, statusCode, message } = r;

      if (statusCode === 200) {
        // showSnackbar('수정에 성공하였습니다.');
        showSnackbar(t('version2_4.text68'));
        // navigate(-1);
      } else {
        showWarnSnackbar(message);
      }
    } catch (e) {
      const { data, statusCode, message } = e;
      showWarnSnackbar(message);
    }
  };

  const [outType, setOutType] = useState();
  const fetchMemberOut = async () => {
    try {
      const r = await putMemberOut();
      const { data, statusCode, message } = r;

      if (statusCode === 200 && Boolean(Number(data))) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  /** 탈퇴하기 */
  const handleSecession = () => {
    /**
     * TODO: 탈퇴 상태에 따라서
     * 모달 내용이 달라질수있으므로
     * 모달을 새로 생성해야한다.
     *
     * doneTitle
     * 탈퇴완료, 탈퇴대기
     * doneContents
     * 탈퇴 처리되었습니다.
     * 관리자가 등록된 의뢰서를 메일로 전달드린 후,\n탈퇴가 완료됩니다.
     * 현재 거래중 상태 또는 보유 마일리지가 있어\n관리자에게 문의 후 탈퇴가 완료됩니다.
     */
    setConModal({
      visible: true,
      value: {
        title: t('base.withdrawal'), //'탈퇴하기',
        contents: t('version2_5.text2'), //'탈퇴 하시겠습니까?',
        doneTitle: t('version2_5.text3'), //'탈퇴완료',
        doneContents: t('version2_5.text4'), //'탈퇴 처리되었습니다.',
        failModalTitle: t('version2_5.text5'), //'탈퇴대기',
        failModalContetns: t('version2_5.text6'), //`관리자가 등록된 의뢰서를 메일로 전달드린 후,\n탈퇴가 완료됩니다.`,
        btnCancel: t('version2_1.text3'), //'취소',
        btnConfirm: t('base.withdrawal'), //'탈퇴하기',
        onConfirm: () => fetchMemberOut(),
        onClose: () => setConModal({ visible: false, value: '' }),
        onDone: () => logout(),
      },
    });
  };

  // 계좌인증
  const handleAccCheck = async () => {
    let inProgress = true;

    if (params['memberRepresentativeName'].value !== params['memberAccountName'].value) {
      // showWarnSnackbar('등록한 사업자등록증의 대표자와 예금주가 다를 경우, 서비스 이용이 불가능합니다.');
      showWarnSnackbar(t('version2_5.text7'));
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
        // showWarnSnackbar('계좌정보를 확인해주세요.');
        showWarnSnackbar(t('version2_1.text85'));
      }
    } catch (e) {
      // console.log(e);
      showWarnSnackbar(t('version2_1.text86'));
    } finally {
      actions.setLoading(false);
    }
  };

  const handleAgreeCheck = (e) => {
    const { id, checked } = e.target;
    handleChange(id, checked, checked ? 1 : 0);
  };

  useEffect(() => {
    if (user) {
      fetchCode();
      //fetchMyinfo();
    }
  }, [user]);

  useEffect(() => {
    const bank = getters.getFilterCode(945);
    setBankCode(bank);
  }, []);

  useEffect(() => {
    if (bankCode?.value?.length > 0 && params.memberBankNo?.value) {
      let currentBankNo;

      bankCode.value.forEach((el) => {
        if (el?.codeNo === params.memberBankNo?.value) currentBankNo = el?.codeName;
      });

      setCurrentBankName(currentBankNo);
    }
  }, [bankCode, params.memberBankNo?.value]);

  const fetchCode = async () => {
    // GMT 코드조회
    const r = await getCommonCode('249');
    const dt = r?.data;
    if (dt) {
      setGmtCodes(dt);
    }
    fetchMyinfo();
    // console.log('r', r);
  };

  return {
    t,
    i18n,
    isLoading,
    user,
    logout,
    params,
    isPostModal,
    setIsPostModal,
    handleChange,
    handleSubmit,
    licenseFileList,
    setLicenseFileList,
    businessFileList,
    setBusinessFileList,
    delFiles,
    setDelFiles,
    handleSecession,
    isConModal,
    gmtCodes,
    bankCode,
    handleAccCheck,
    isAccount,
    setAccount,
    handleAgreeCheck,
    currentBankName,
  };
};

export default useMyPageInfo;
