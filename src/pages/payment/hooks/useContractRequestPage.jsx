import React, { useEffect, useRef, useState } from 'react';
import { getContract, putContract } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import ModalStore from '@store/ModalStore';
import { useTranslation } from 'react-i18next';

const useContractRequestPage = () => {
  const { t, i18n } = useTranslation();
  const { actions, callback } = ModalStore();

  const { handleNav, params: pathValue } = useNav();
  const { showSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [id, setId] = useState();
  const [data, setData] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState({ visible: false, value: '' });
  const [rejectContent, setRejectContent] = useState('');

  // 수락하기
  const handleSubmit = async () => {
    // requestContactSe A:수락, B:거절
    const p = {
      requestRefuseCn: '',
      requestContactSe: 'A',
    };

    try {
      const r = await putContract({ requestFormNo: id, body: p });
      const { data } = r;
      if (Number(data) > 0) {
        // handleNav('/payment');
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // 거절하기
  const handleReject = async () => {
    try {
      const p = {
        requestRefuseCn: rejectContent,
        requestContactSe: 'B',
      };

      const r = await putContract({ requestFormNo: id, body: p });
      const { data } = r;
      if (Number(data) > 0) {
        setIsModal(false);
        // actions.setDoneAlert({ isVisible: true, title: '알림', contents: '거래가 취소 되었습니다.', btnName: '확인', callback: () => handleNav('/payment') });
        actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text25'), btnName: t('base.confirm'), callback: () => handleNav('/payment') });
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 요청서정보 조회
  const fetchContract = async () => {
    try {
      const r = await getContract(pathValue?.id);
      const { data: dt } = r;

      setData(dt);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // 수락 모달
  const handleRequestConfirmModal = () => {
    setIsConfirmModal({
      visible: true,
      value: {
        title: t('version2_1.text20'), //'계약요청 수락',
        doneContents: t('version2_1.text21'), //'계약이 완료 되었습니다!\n다음단계를 진행해 주세요!.',
        failContents: t('version2_1.text22'), //'계약 오류',
        contents: t('version2_1.text23'), //'의뢰인의 계약요청을 수락 하시겠습니까?',
        btnCancel: t('version2_1.text3'), //'취소',
        btnConfirm: t('version2_2.text107'), //'수락하기',
        onConfirm: async () => await handleSubmit(),
        onDone: () => handleNav('/payment'),
      },
    });
  };

  useEffect(() => {
    if (id) fetchContract();
  }, [id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  return { isLoading, error, id, data, isModal, setIsModal, handleReject, handleSubmit, setRejectContent, handleRequestConfirmModal, isConfirmModal, setIsConfirmModal };
};

export default useContractRequestPage;
