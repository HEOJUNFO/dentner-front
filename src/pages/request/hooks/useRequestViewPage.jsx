import React, { useEffect, useRef, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import { getRequestForm, getEstimatedStatus, postRequestTargetFormAgree, postRequestTargetFormRefuse, deleteRequestForm } from '@api/Request';
import { deleteTransactionCancel } from '@api/Payment';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import sampleProfile from '@assets/images/no_user.png';

export const useRequestViewPage = () => {
  const { actions, callback } = ModalStore();
  const { user } = UserStore();

  const { handleNav, params } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [pathValue, setPathValue] = useState('');

  const [isEstimated, setEstimated] = useState(false);
  const [rejectContent, setRejectContent] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isMine, setIsMine] = useState(false);

  // 거래취소 모달
  const [isCancelModal, setCancelModal] = useState({
    visible: false,
    value: '',
  });

  // 거래취소 모달
  const [isCancelCallModal, setCancelCallModal] = useState({
    visible: false,
    value: '',
  });

  // 삭제 모달
  const [isRemoveModal, setRemoveModal] = useState({
    visible: false,
    value: '',
  });

  const handleEstimatedPage = () => {
    if (isEstimated) {
      handleNav(`/request/estimated/view/${pathValue}`);
    } else {
      handleNav('/request/estimated', { id: pathValue });
    }
  };

  // 의뢰서 수정
  const handleModify = () => {
    console.log(data);
    if (data?.requestFormSe === 'A') {
      handleNav('/request/public/write', { id: pathValue });
    } else if (data?.requestFormSe === 'B') {
      handleNav('/request/target/write', { id: pathValue });
    }
    //
  };

  const fetchRemove = async () => {
    try {
      const r = await deleteRequestForm(pathValue);
      const { data } = r;

      if (Boolean(Number(data))) {
        // showSnackbar('거래취소');
        showSnackbar('요청서가 삭제되었습니다.');
        handleNav(`/request`);
      } else {
        showWarnSnackbar('네트워크 오류');
      }
    } catch (error) {
      console.log(error);
      showWarnSnackbar('네트워크 오류');
    }
  };

  // 의뢰서 삭제
  const handleRemove = async () => {
    setRemoveModal({
      visible: true,
      value: {
        onConfirm: () => fetchRemove(),
        onClose: () => setRemoveModal({ visible: false, value: '' }),
      },
    });
  };

  /** 의뢰서 거래 취소 */
  const fetchCancel = async (item) => {
    console.log('fetchCancel======>', item);
    return true;
    // const requestFormNo = item?.requestFormNo;
    // const body = {
    //   "requestCancelNo": item.requestCancelNo,
    //   "requestCancelEtcCn": item.requestCancelEtcCn,
    //   "requestStatus": item.requestStatus
    // }

    // try {
    //   const r = await deleteTransactionCancel({ requestFormNo, body });
    //   const { data } = r;
    //   if (Boolean(Number(data))) {
    //     return true;
    //   }
    //   return false;
    // } catch (e) {
    //   console.log(e);
    //   return false;
    // }
  };

  const handleCancel = (item) => {
    // 취소모달
    setCancelModal({
      visible: true,
      value: {
        target: {
          memberNo: item.memberNo,
          memberName: item.memberNickName,
          profileImage: item.memberProfileImage || sampleProfile,
          requestFormNo: data?.requestFormNo,
          status: data?.requestStatus,
          dealStatus: data?.requestDealStatus,
        },
        onClose: () => {
          setCancelModal({ visible: false, value: null });
        },
      },
    });
  };

  const handleCancelReq = (item) => {
    // 취소모달
    setCancelCallModal({
      visible: true,
      value: {
        target: {
          memberNo: item.memberNo,
          memberName: item.memberNickName,
          profileImage: item.memberProfileImage || sampleProfile,
          requestFormNo: data?.requestFormNo,
          status: data?.requestStatus,
          dealStatus: data?.requestDealStatus,
        },
        onClose: () => {
          setCancelCallModal({ visible: false, value: null });
        },
      },
    });
  };

  //지정요청 거절
  const handleReject = async () => {
    try {
      const p = {
        requestRefuseCn: rejectContent,
      };

      const r = await postRequestTargetFormRefuse({ requestFormNo: pathValue, body: p });
      const { data } = r;
      if (Number(data) > 0) {
        setIsModal(false);
        actions.setDoneAlert({ isVisible: true, title: '알림', contents: '계약 요청 거절했습니다.', btnName: '확인', callback: () => handleNav(-1) });
      }
    } catch (e) {
      console.log(e);
    }
  };

  //지정요청 수락
  const handleAgree = async () => {
    const r = await postRequestTargetFormAgree(pathValue);
    const { data } = r;
    if (data) {
      if (Boolean(Number(data))) {
        showSnackbar('요청을 수락했습니다.');
        handleNav(-1);
      } else {
        showWarnSnackbar('네트워크 오류');
      }
    }
  };

  const fetchRequestForm = async () => {
    const r = await getRequestForm(pathValue);
    const { data } = r;

    if (data) {
      if (data?.registerNo === user?.memberNo) setIsMine(true);
      console.log(data);
      setData(data);
      setLoading(false);
    } else {
      // TODO 잘못된접근 화면 처리
      alert('잘못된 진입입니다.');
      handleNav(-1);
    }
  };

  const fetchEstimatedStatus = async () => {
    if (user?.memberSe === 'C') {
      const r = await getEstimatedStatus(pathValue);
      console.log(r);
      if (Boolean(Number(r.data))) {
        setEstimated(true);
      } else {
        setEstimated(false);
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchRequestForm(), fetchEstimatedStatus()]);
    } catch (err) {
      setError(err.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!pathValue) return;
    fetchData();
  }, [pathValue]);

  useEffect(() => {
    if (params?.id) {
      setPathValue(params?.id);
    }
  }, []);

  return {
    isLoading,
    isEstimated,
    error,
    user,
    data,
    handleAgree,
    handleModify,
    handleRemove,
    handleEstimatedPage,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    setRejectContent,
    handleReject,
    isMine,
    handleNav,
    handleCancel,
    handleCancelReq,
    isCancelModal,
    isCancelCallModal,
    isRemoveModal,
  };
};
