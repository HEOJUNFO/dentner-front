import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPayment, putDeal, deleteAddPay, putTransactionCancelConfirm, deleteTransactionHistory } from '@api/Payment';
import { useNav } from '@components/hooks';
import UserStore from '@store/UserStore';

const useTransactionItem = ({ onFetch }) => {
  const { user } = UserStore();

  const { handleNav, params: pathValue } = useNav();
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

  // 진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청수락(치자이너), I: 치자이너 수락대기) */
  // 거래 상태 (A:견적서, B:전자계약/결제, C:의뢰서 수령, D:3D뷰어소통, E:CAD파일 업로드, F:추가금 결제, G:CAD파일 수령, H:리뷰작성)',
  const requestDealStatus = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  const isDeal = ({ status, step, maxStep, payStatus, estimateReceiveYn, estimate3dYn, addPayStatus, reviewYn }) => {
    const newRequestDealStatus = [];
    for (const el of requestDealStatus) {
      if (el >= step) {
        // break;
        newRequestDealStatus.push(el);
      }
    }

    try {
      const stepIndex = newRequestDealStatus.findIndex((el) => el === maxStep);

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

  const handleCancelPay = async () => {
    // const r = await deleteAddPay();
    // console.log(r);
  };

  // 거래 상태 (A:견적서, B:전자계약/결제, C:의뢰서 수령, D:3D뷰어소통, E:CAD파일 업로드, F:추가금 결제, G:CAD파일 수령, H:리뷰작성)',
  const handleDetail = (stat, step, targetId, state) => {
    if (stat !== 'end' && stat !== 'ing' && stat !== 'cancel') {
      return;
    }
    if (step === 'A') {
      handleNav(`/payment/estimate/${targetId}`);
    } else if (step === 'B') {
      handleNav(`/payment/reqeust/${targetId}`);
    } else if (step === 'G') {
      handleNav(`/payment/cad/${targetId}`);
    } else if (step === 'C') {
      handleNav(`/request/group/doc/${targetId}`);
    } else if (step === 'D') {
      handleNav(`/payment/comms/${targetId}/cad`, state);
      // if (user.memberSe === 'A') {
      // } else {
      //   handleNav(`/request/view/${targetId}`, state);
      // }
    } else if (step === 'F') {
      handleNav(`/payment/reqeust/charges/view/${targetId}`, state);
    }
  };

  const handleCancel = (item) => {
    // 취소모달
    setCancelModal({
      visible: true,
      value: {
        target: {
          memberNo: item.memberNo,
          memberName: item.nickName,
          profileImage: item.profileImage,
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

  const handleCancelReq = (item) => {
    // console.log(item)
    // 취소요청모달
    setCancelCallModal({
      visible: true,
      value: {
        target: {
          memberNo: item.memberNo,
          memberName: item.nickName,
          profileImage: item.profileImage,
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

  return {
    isDeal,
    handleNav,
    handleCancelPay,
    handleDetail,
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
    user,
  };
};

export default useTransactionItem;
