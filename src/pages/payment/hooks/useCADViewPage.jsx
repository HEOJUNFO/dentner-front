import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCad, getTransactions, putState, putDeal, getTransactionTransferStat, postTransactionTransfer } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import UserStore from '@store/UserStore';

/**
 * id: requestFormNo
 * @returns
 */
const useCADViewPage = () => {
  const { user } = UserStore();
  const { handleNav, params: pathValue } = useNav();
  const { showWarnSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [items, setItems] = useState([]);
  const [id, setId] = useState();

  const [isClick, setClick] = useState(false);
  const [isReceive, setReceive] = useState(false);
  const [transfer, setTransfer] = useState();

  // 캐드파일 조회
  const fetchCads = async () => {
    try {
      const r = await getCad({ requestFormNo: id, memberSe: user.memberSe });
      const { data } = r;
      setItems(data);

      if (data) {
        if (data?.length > 0) {
          const { cadFile, requestStatus, requestDealStatus, addPayStatus } = data[0];
          if (!cadFile) {
            showWarnSnackbar('CAD파일 업로드전입니다.');
            setReceive(false);
          } else {
            setReceive(true);
            fetchTransferStat();
          }

          if (requestStatus === 'C' && requestDealStatus === 'F' && addPayStatus === 'N' && user?.memberSe === 'A') {
            setReceive(false);
          }

          if (requestStatus === 'D') {
            setReceive(true);
          }
        }
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  // 거래내역 조회
  const fetchTransaction = async () => {
    const r = await getTransactions({ params: { requestFormNo: id, memberSe: user.memberSe } });

    const { data: dt } = r;
    if (dt.list.length === 0) {
      showWarnSnackbar('요청서 조회 실패');
      handleNav(-1);
    } else {
      const { requestStatus, requestRemakingNo, requestDealStatus } = dt?.list[0];

      if (requestDealStatus === 'G') {
        // 버튼 활성화
        setClick(true);
      }

      if (requestStatus === 'C' && requestDealStatus === 'G' && user?.memberSe === 'A') {
        try {
          // 거래완료로 상태 변경
          const res = await Promise.all([putState({ requestFormNo: id, state: 'D' }), putDeal({ requestFormNo: id, state: 'H' })]);
        } catch (e) {
          showWarnSnackbar('네트워크 오류입니다.');
        }
      }

      fetchCads();
    }
  };

  // 공전소 데이터 전송 여부 조회
  const fetchTransferStat = async () => {
    try {
      const r = await getTransactionTransferStat(id);
      if (r?.data) {
        setTransfer(r?.data?.dataTransferAt);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 공전소 전송
  const submitTransactionTransfer = async () => {
    try {
      const r = await postTransactionTransfer(id);
      console.log(r);
      if (Boolean(Number(r?.data))) {
        setTransfer('Y');
      }
    } catch (e) {}
  };

  const handleReworkWrite = () => {
    handleNav(`/payment/reqeust/rework/${id}`);
  };
  const handleReviewWrite = () => {
    handleNav(`/payment/review/${id}`);
  };

  useEffect(() => {
    if (!id) return;
    fetchTransaction();
  }, [id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  return { isLoading, error, items, isClick, handleReworkWrite, handleReviewWrite, user, isReceive, transfer, submitTransactionTransfer };
};

export default useCADViewPage;
