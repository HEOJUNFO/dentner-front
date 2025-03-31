import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getPayment, postPayment, getTransactionStatus } from '@api/Payment';
import { getMileage } from '@api/Mileage';
import { useNav, useSnack } from '@components/hooks';

const useRequestOrderPaymentPage = () => {
  const { t, i18n } = useTranslation();

  const { handleNav, params: pathValue } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState();
  const kop = `치자이너에게 요청할 사항을 작성해주세요. (최대 200자)

요청사항 선택 작성 후 결제를 진행해주세요.
치자이너가 수락하면, 계약이 완료되어 거래를 진행할 수 있어요!
치자이너의 요청 수락 대기 중일 시, 본인이 거래 요청을 취소할 수도 있어요.

❗️거래 파기 시 (치자이너가 거절할 경우/본인이 취소할 경우)
: 결제한 마일리지는 전액 환불되고, 취소된 의뢰서는 의뢰서 바구니에 저장됩니다.`;

  const enp = `Please write down what you would like to request from T-esigner. (Maximum 200 characters)

Please fill out the request selection and proceed with the payment.
If T-esigner accepts, the contract is complete and we can proceed with the transaction!
If you are waiting to accept your request, you may cancel your transaction request.

❗️ When the transaction is canceled (in case the governor refuses/in case he/she cancels it)
: 'Mileage paid will be refunded in full, and the cancelled request will be stored in the request basket. `;

  const [params, setParams] = useState({
    requestFormPayDc: {
      value: '',
      isRequired: false,
      error: '',
      check: 0,
      success: 0,
      maxLength: 200,
      placeholder: `치자이너에게 요청할 사항을 작성해주세요. (최대 200자)

요청사항 선택 작성 후 결제를 진행해주세요.
치자이너가 수락하면, 계약이 완료되어 거래를 진행할 수 있어요!
치자이너의 요청 수락 대기 중일 시, 본인이 거래 요청을 취소할 수도 있어요.

❗️거래 파기 시 (치자이너가 거절할 경우/본인이 취소할 경우)
: 결제한 마일리지는 전액 환불되고, 취소된 의뢰서는 의뢰서 바구니에 저장됩니다.`,
    },
    isConfirm: { value: false, type: 'boolean', isRequired: true, error: '', check: 1, success: 0, send: false },
  });

  useEffect(() => {
    setParams((prev) => {
      const requestFormPayDc = prev.requestFormPayDc;
      requestFormPayDc['placeholder'] = i18n.language === 'ko' ? kop : enp;
      return { ...prev };
    });
  }, [i18n.language]);

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);

  // 진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청수락(치자이너), I: 치자이너 수락대기) */
  // 거래 상태 (A:견적서, B:전자계약/결제, C:의뢰서 수령, D:3D뷰어소통, E:CAD파일 업로드, F:추가금 결제, G:CAD파일 수령, H:리뷰작성)',
  const [isActive, setActive] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleValid = () => {
    const parameters = {};
    let inProgress = true;

    const p = { ...params };
    for (const key in p) {
      const parameter = p[key];
      let isCaught = false;

      if (parameter.error) {
        isCaught = true;
      }

      if (parameter.check === 1 && parameter.success !== 1) {
        isCaught = true;
      }

      if (parameter.isRequired && !isCaught) {
        if (parameter?.type === 'boolean') {
          if (!parameter?.value) {
            isCaught = true;
          }
        }
      }

      if (isCaught) inProgress = false;
      else {
        if (parameter.send !== false) {
          parameters[key] = parameter.value;
        }
      }
    }
    if (!inProgress) {
      // showWarnSnackbar('유의 사항을 확인해주세요.');
      showWarnSnackbar(t('charge_modal.charge_modal'));
      return;
    }

    // 받아온 데이터에 디자이너명, 의뢰서 제목이 없으면 안됨
    if (!data.designerName) {
      inProgress = false;
    }

    if (!data.title) {
      inProgress = false;
    }

    if (!inProgress) {
      // showWarnSnackbar('정보가 올바르지 않습니다.');
      showWarnSnackbar(t('version2_4.text92'));
      return;
    }

    setIsModal(true);
  };

  // 결제
  const handleSubmit = async (e) => {
    // 연속으로 눌리지 않도록 수정
    if (processing) return;
    setProcessing(true);

    const parameters = {};
    let inProgress = true;

    const p = { ...params };
    for (const key in p) {
      const parameter = p[key];
      let isCaught = false;

      if (parameter.error) {
        isCaught = true;
      }

      if (parameter.check === 1 && parameter.success !== 1) {
        isCaught = true;
      }

      if (parameter.isRequired && !isCaught) {
        if (parameter?.type === 'boolean') {
          if (!parameter?.value) {
            isCaught = true;
          }
        }
      }

      if (isCaught) inProgress = false;
      else {
        if (parameter.send !== false) {
          parameters[key] = parameter.value;
        }
      }
    }
    if (!inProgress) {
      // showWarnSnackbar('유의 사항을 확인해주세요.');
      showWarnSnackbar(t('charge_modal.check_note'));
      setProcessing(false);
      return;
    }

    // 받아온 데이터에 디자이너명, 의뢰서 제목이 없으면 안됨
    if (!data.designerName) {
      inProgress = false;
    }

    if (!data.title) {
      inProgress = false;
    }

    if (!inProgress) {
      // showWarnSnackbar('정보가 올바르지 않습니다.');
      showWarnSnackbar(t('version2_4.text92'));
      setProcessing(false);
      return;
    }
    parameters['mileageCn'] = data.designerName + '/' + data.title;
    parameters['mileageAmount'] = '-' + '' + data.estimateAmount;
    parameters['mileageUnit'] = data.typeList[0]?.memberTp === 'B' ? 'B' : 'A'; // 마일리지 단위(A:원화, B:달러)

    try {
      const m = await getMileage();

      if (m.statusCode === 200) {
        if (m.data >= data.estimateAmount) {
          const r = await postPayment({ requestFormNo: pathValue?.id, body: parameters });

          if (r.data > 0) {
            // showSnackbar('결제완료');
            // handleNav('/payment');
            fetchStatus();
            setIsModal(true);
          } else {
            // showWarnSnackbar('네트워크 오류');
            showWarnSnackbar(t('version2_1.text86'));
            setProcessing(false);
          }
        } else {
          // 마일리지 부족
          setIsModal2(true);
          setProcessing(false);
        }
      } else {
        // showWarnSnackbar('내 마일리지 오류');
        showWarnSnackbar(t('version2_4.text29'));
        setProcessing(false);
      }
    } catch (e) {
      // showWarnSnackbar('네트워크 오류');
      showWarnSnackbar(t('version2_1.text86'));
      setProcessing(false);
    }
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    handleChange(id, checked, checked ? 1 : 0);
  };

  const handleChange = (name, value, success = 0, error = '') => {
    setParams((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, success, error },
    }));
  };

  const convertItme = (item) => {
    let estimateAmount = 0;
    if (item?.requestFormSe === 'B') {

      estimateAmount = item.prostheticsList.reduce((acc, item) => {
        const total = Number(item.amount) * Number(item.count);
        if(item.baseCnt && item.baseCnt > 0) {
          return acc + item.totalAmount;
        } else {
          return acc + total;
        }

      }, 0);
    }

    return {
      title: item?.requestFormSj || '',
      desc: item?.requestDocDesc || '',
      sw: item.requestSwName.split(',')?.map((el) => ({ name: el })),
      registerDt: item.registerDt,
      typeList: item.prostheticsList,
      estimateAmount: item?.requestFormSe === 'B' ? estimateAmount : item.estimateAmount,
      designerName: item.memberName,
    };
  };

  const fetchStatus = async () => {
    const r = await getTransactionStatus(pathValue?.id);
    const { data } = r;
    if (data) {
      if (data?.requestDealStatus === 'B' && data?.requestStatus === 'C' && data?.payStatus === 'N') setActive(true);
      else setActive(false);
    }
  };

  const fetchPayment = async () => {
    try {
      const r = await getPayment(pathValue?.id);
      const { data: dt } = r;
      if (dt) {
        setData(convertItme(dt));

        setParams((prev) => ({
          ...prev,
          requestFormPayDc: { ...prev['requestFormPayDc'], value: dt?.requestFormPayDc },
        }));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathValue?.id) {
      fetchPayment();
      fetchStatus();
    }
  }, [pathValue]);

  return { isLoading, data, params, isActive, handleNav, isModal, setIsModal, isModal2, setIsModal2, handleChange, handleCheck, handleValid, handleSubmit, id: pathValue?.id };
};

export default useRequestOrderPaymentPage;
