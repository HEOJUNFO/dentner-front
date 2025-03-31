import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAddPay, postAddPay, getTransactionStatus } from '@api/Payment';
import { getMileage } from '@api/Mileage';
import { useNav, useSnack } from '@components/hooks';
import UserStore from '@store/UserStore';

const useRequestAddOrderPaymentPage = () => {
  const { t, i18n } = useTranslation();
  const { handleNav, params: pathValue } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const { user } = UserStore();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [id, setId] = useState();

  const [isSuccess, setSuccess] = useState(false);
  const [isFail, setFail] = useState(false);

  // 진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청수락(치자이너), I: 치자이너 수락대기) */
  // 거래 상태 (A:견적서, B:전자계약/결제, C:의뢰서 수령, D:3D뷰어소통, E:CAD파일 업로드, F:추가금 결제, G:CAD파일 수령, H:리뷰작성)',
  const [isActive, setActive] = useState(false);

  const [params, setParams] = useState({
    isConfirm: { value: false, type: 'boolean', isRequired: true, error: '', check: 1, success: 0 },
  });

  const fetchStatus = async () => {
    const r = await getTransactionStatus(id);
    const { data } = r;
    if (data) {
      if (data?.requestDealStatus === 'F' && data?.requestStatus === 'C') setActive(true);
      else setActive(false);
    }
  };

  // 추가금 정보조회
  const fetchPayInfo = async () => {
    try {
      const r = await getAddPay({ requestFormNo: id, memberSe: user?.memberSe });
      const { data: dt } = r;

      setData(dt);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModal = () => {
    setSuccess(false);
  };

  const handleFailModal = () => {
    setFail(false);
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;

    setParams((prev) => ({ isConfirm: { ...prev['isConfirm'], value: checked ? true : false } }));
  };

  const handleSumbit = async () => {
    try {
      if (!params.isConfirm.value) {
        showWarnSnackbar(t('charge_modal.check_note'));
        return;
      }

      if (!data.requestPayAmount || !data.requestPayUnit) return;

      // 현재 마일리지 체크
      const m = await getMileage();
      const { data: currMileage } = m;
      if (Number(data.requestPayAmount) > Number(currMileage)) {
        setFail(true);
        return;
      }

      let contents = data.requestPayAmount + (data.requestPayUnit === 'A' ? 'P(￦)' : 'P($)') + '/' + data.nickNm;
      let toContents = data.requestPayAmount + (data.requestPayUnit === 'A' ? 'P(￦)' : 'P($)') + '/' + user.memberNickName;

      const p = {
        mileageAmount: -data.requestPayAmount,
        mileageUnit: data.requestPayUnit,
        mileageCn: data.nickNm + '/' + data.form.requestFormSj,
        contents,
        toContents,
      };
      const r = await postAddPay({ requestFormNo: id, body: p });
      const { data: dt } = r;
      if (Number(dt) > 0) {
        fetchStatus();
        setSuccess(true);
      } else {
        setFail(true);
      }
    } catch (e) {
      showSnackbar(t('version2_1.text86'));
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchPayInfo();
    fetchStatus();
  }, [id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  return { isLoading, error, data, id, isActive, handleSumbit, isSuccess, handleSuccessModal, isFail, handleFailModal, handleNav, handleCheck, params, pathValue };
};

export default useRequestAddOrderPaymentPage;
