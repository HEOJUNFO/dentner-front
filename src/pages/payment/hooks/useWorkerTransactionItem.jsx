import React, { useEffect, useRef, useState } from 'react';
import { putViewer3d, deleteAddPay, putTransactionCancelConfirm, deleteTransactionHistory, putDeal } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';

const useWorkerTransactionItem = ({ onFetch }) => {
  const { t } = useTranslation();

  const { handleNav } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const [isModal, setIsModal] = useState({ visible: false, value: '' });
  const [isRemoveModal, setIsRemoveModal] = useState(false);
  const [isCancelModal, setCancelModal] = useState({
    visible: false,
    value: '',
  });

  // 거래취소 모달
  const [isCancelCallModal, setCancelCallModal] = useState({
    visible: false,
    value: '',
  });

  // 진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청거절(치자이너), I: 치자이너 수락대기) */
  // '거래 상태 (A:견적서, B:전자계약/결제, C:의뢰서 수령, D:3D뷰어소통, E:CAD파일 업로드, F:추가금 결제, G:CAD파일 수령, H:리뷰작성)',
  const requestDealStatus = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const isDeal = ({ status, step, maxStep, payStatus, estimateReceiveYn, estimate3dYn, addPayStatus, reviewYn }) => {
    const newRequestDealStatus = [];
    for (const el of requestDealStatus) {
      if (el >= step) {
        // break;
        newRequestDealStatus.push(el);
      }
    }
    //estimateReceiveYn
    try {
      const stepIndex = newRequestDealStatus.findIndex((el) => el === maxStep);

      // console.log(newRequestDealStatus, maxStep, step, stepIndex);

      if (stepIndex === 0) {
        if (status === 'E') {
          return 'cancel';
        }
        if (step === 'B' && payStatus === 'Y') return 'end';
        if (step === 'C' && estimateReceiveYn === 'Y') return 'end';
        if (step === 'H' && reviewYn === 'Y') return 'end';
        return 'ing';
      } else if (stepIndex === -1) {
        if (status === 'E') {
          return 'cancel';
        }
        if (maxStep === 'D') {
          if (estimate3dYn === 'N') {
            return 'jump';
          }
        } else if (maxStep === 'F') {
          if (addPayStatus === 'N') {
            return 'jump';
          }
        }
        return 'end';
      } else {
        return '';
      }
    } catch (e) {
      console.log(e);
      return '';
    }
  };

  const handleDetail = (stat, step, targetId, state) => {
    if (stat !== 'end' && stat !== 'ing' && stat !== 'cancel') {
      return;
    }
    if (step === 'A') {
      handleNav(`/payment/estimate/${targetId}`);
    } else if (step === 'B') {
      handleNav(`/payment/contract/${targetId}`);
    } else if (step === 'C') {
      handleNav(`/payment/receive/${targetId}`, state);
    } else if (step === 'D') {
      handleNav(`/payment/comms/${targetId}/cad`, state);
    } else if (step === 'F') {
      handleNav(`/payment/reqeust/charges/view/${targetId}`, state);
    } else if (step === 'E') {
      if (stat === 'ing') {
        handleNav(`/payment/reqeust/${targetId}/cad`);
      } else {
        handleNav(`/payment/cad/${targetId}`);
      }
    }

    // } else if (step === 'G') {
    //   handleNav(`/payment/cad/${targetId}`);
  };

  const handle3dCommunication = async (requestFormNo, requestType) => {
    // state : B 3D 뷰어소통하기
    const r = await putViewer3d({ requestFormNo, state: 'B', requestType });
    const { data } = r;
    // if (Number(data) === 1) {
    if (Number(data) > 0) {
      onFetch();
    }
  };

  const handleSkip = async (requestFormNo) => {
    // state : A 건너뛰기
    const r = await putViewer3d({ requestFormNo, state: 'A' });
    const { data } = r;
    if (Number(data) === 1) {
      // showSnackbar('건너뛰고 다음단계로 선택했습니다.');
      onFetch();
    }
  };

  const handleCancel = (item) => {
    // console.log(item)
    // 취소모달
    setCancelModal({
      visible: true,
      value: {
        target: {
          memberNo: item.memberNo,
          memberName: item.nickName,
          profileImage: item.profileImage || sampleProfile,
          requestFormNo: item?.requestFormNo,
          status: item?.status,
          dealStatus: item?.dealStatus,
        },
        onClose: () => {
          setCancelModal({ visible: false, value: null });
        },
      },
    });
  };

  const handleConfirmCancelReq = async (requestFormNo) => {
    try {
      const r = await putTransactionCancelConfirm({ requestFormNo });

      const { data } = r;
      if (Boolean(Number(data))) {
        onFetch();
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleCancelReq = (item) => {
    // console.log(item)
    // 취소요청모달
    setCancelCallModal({
      visible: true,
      value: {
        target: {
          memberNo: item.memberNo,
          memberName: item.nickName,
          profileImage: item.profileImage || sampleProfile,
          requestFormNo: item?.requestFormNo,
          status: item?.status,
          dealStatus: item?.dealStatus,
        },
        onClose: () => {
          setCancelCallModal({ visible: false, value: null });
        },
      },
    });
  };

  // 거래내역 삭제
  const handleRemove = async (requestFormNo) => {
    try {
      const r = await deleteTransactionHistory(requestFormNo);
      const { data } = r;
      if (Boolean(Number(data))) {
        setIsRemoveModal(false);
        onFetch();
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [isConfirmModal, setIsConfirmModal] = useState({ visible: false, value: '' });
  const handleConfirmModal = (requestFormNo) => {
    setIsConfirmModal({
      visible: true,
      value: {
        title: t('version2_4.text7'),
        doneContents: t('version2_4.text8'),
        failContents: t('version2_4.text9'),
        contents: t('version2_4.text10'),
        btnCancel: t('version2_1.text3'),
        btnConfirm: t('base.confirm'),
        onConfirm: async () => await handleNext(requestFormNo),
        onDone: () => onFetch(),
        // onDone: () => handleNav(`/payment/reqeust/${requestFormNo}/cad`),
      },
    });
  };

  // 3D 소통 종료
  const handleNext = async (requestFormNo) => {
    try {
      const r = await putDeal({ requestFormNo, state: 'E' });
      const { data } = r;
      if (Number(data) === 1) {
        setIsConfirmModal({ visible: false, value: '' });
        onFetch();
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  return {
    isDeal,
    handle3dCommunication,
    handleSkip,
    handleDetail,
    handleNav,
    handleCancel,
    handleCancelReq,
    handleConfirmCancelReq,
    isCancelModal,
    isCancelCallModal,
    isModal,
    setIsModal,
    handleRemove,
    isRemoveModal,
    setIsRemoveModal,
    isConfirmModal,
    setIsConfirmModal,
    handleConfirmModal,
  };
};

export default useWorkerTransactionItem;
