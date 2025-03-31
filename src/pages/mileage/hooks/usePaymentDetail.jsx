import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMileagePayments } from '@api/Mileage';
import { mileagePaymentStatusFilter } from '@constants/code';
import { getTodayFormat, getTodaySubstract } from '../../../utils/DateUtil';

const usePaymentDetail = () => {
  const { t, i18n } = useTranslation();
  const [statusCode, setStatusCode] = useState([]);

  const dateItem = [
    { name: t('request.all'), value: 0 },
    { name: `1${t('payment.month')}`, value: 1 },
    { name: `3${t('payment.month')}`, value: 3 },
    { name: `6${t('payment.month')}`, value: 6 },
    { name: `1${t('payment.year')}`, value: 12 },
    { name: t('payment.specify_period'), value: 'set' },
  ];

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [params, setParams] = useState({
    statusFilter: '',
    fromDateFilter: '',
    toDateFilter: '',
    startRow: 0,
    pageCnt: perPage,
  });
  const [items, setItems] = useState([]);
  const [selectedDateType, setSelectedDateType] = useState({});
  const [filter, setFilter] = useState();
  const [isPayRefundModal, setPayRefundModal] = useState({
    visible: false,
    value: '',
  }); // 결제내역환불모달

  const [table, setTable] = useState({});
  const charging = {
    ko: {
      colgroup: (
        <colgroup>
          <col width={65} />
          <col width={238} />
          <col />
          <col width={100} />
          <col width={100} />
        </colgroup>
      ),
      head: (
        <tr>
          <th>구분</th>
          <th>마일리지</th>
          <th>상세 내용</th>
          <th>결제일자</th>
          <th>환불요청</th>
        </tr>
      ),
    },
    en: {
      colgroup: (
        <colgroup>
          <col width={65} />
          <col width={238} />
          <col />
          <col width={100} />
          <col width={100} />
        </colgroup>
      ),
      head: (
        <tr>
          <th>{t('mileage.type')}</th>
          <th>{t('mileage.title')}</th>
          <th>{t('mileage.pay')}</th>
          <th>{t('mileage.date')}</th>
          <th>{t('mileage.refund')}</th>
        </tr>
      ),
    },
  };

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const fetchMileageCharges = async () => {
    const r = await getMileagePayments(params);
    const { data, statusCode } = r;
    console.log(r);
    if (statusCode == 200) {
      const { cnt, list } = data;
      // setItems(list);
      setItems(list.map((item) => convertItem(item)));
      setTotal(cnt);
    }
  };

  const convertItem = (item) => {
    // console.log(item);
    //진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청수락(치자이너), I: 치자이너 수락대기)
    return {
      ...item,
      onRefund: () => handlePayRefund(item), // 거래취소
    };
  };

  //기간검색버튼
  const onClickSearch = () => {
    const [fromDateFilter, toDateFilter] = filter.split(' ~ ');

    setParams((prev) => ({ ...prev, fromDateFilter, toDateFilter }));
  };

  //기간 직접입력
  const handleChangeDate = (e) => {
    let value = e.target.value;

    value = value.replace(/[^\d]/g, '');

    if (value.length > 4) {
      value = value.slice(0, 4) + '-' + value.slice(4);
    }

    if (value.length > 7) {
      value = value.slice(0, 7) + '-' + value.slice(7);
    }

    if (value.length > 10) {
      value = value.slice(0, 10) + ' ~ ' + value.slice(10);
    }

    if (value.length > 17) {
      value = value.slice(0, 17) + '-' + value.slice(17);
    }

    if (value.length > 20) {
      value = value.slice(0, 20) + '-' + value.slice(20);
    }

    setFilter(value);
  };

  //기간 선택
  const handleSelectDate = (e) => {
    console.log(e);
    if (e.value !== 0 && typeof e.value === 'number') {
      const toDateFilter = getTodayFormat('YYYY-MM-DD');
      const fromDateFilter = getTodaySubstract(e.value, 'YYYY-MM-DD');
      // const settedDateFilter = `${fromDateFilter} ~ ${toDateFilter}`;
      setParams((prev) => ({ ...prev, fromDateFilter, toDateFilter }));
    }
    if (e.value === 0) {
      setParams((prev) => ({ ...prev, fromDateFilter: '', toDateFilter: '' }));
    }
  };

  //엔터키 입력
  const onKeyDown = (e) => {
    if (e.key === 'Enter') onClickSearch();
  };

    /** 결제 내역 환불 모달 */
  const handlePayRefund = (item) => {
    setPayRefundModal({
      visible: true,
      value: {
        target: {
          mileageNo: item.mileageNo,
          cardNo: item.cardNo,
          mileageSe: item.mileageSe,
          calculateSe: item?.calculateSe,
          mileageAmount: item?.mileageAmount,
          mileageCn: item?.mileageCn,
          mileageUnit: item?.mileageUnit,
          mileageStatus: item?.mileageStatus,
        },
        onClose: () => {
          setPayRefundModal({ visible: false, value: null });
          fetchMileageCharges();
        },
      },
    });
  };

  useEffect(() => {
    // 코드명
    const code = mileagePaymentStatusFilter[i18n.language];
    if (i18n.language === 'ko') setStatusCode(code);
    if (i18n.language === 'en') {
      const enCode = code.map((en) => ({ ...en, title: en.title === '전체' ? t('base.all') : en.title === '결제내역' ? t('mileage.pay') : t('base.refund_history') }));
      setStatusCode(enCode);
    }

    // 충전내역 테이블
    setTable(charging[i18n.language]);
  }, [i18n.language]);

  useEffect(() => {
    const startRow = (currentPage - 1) * perPage;
    setParams((prevParams) => {
      if (prevParams.startRow !== startRow || prevParams.pageCnt !== perPage) {
        return {
          ...prevParams,
          startRow,
          pageCnt: perPage,
        };
      }
      return prevParams;
    });
  }, [currentPage, perPage]);

  useEffect(() => {
    fetchMileageCharges();
  }, [params]);

  return {
    isLoading,
    error,
    statusCode,
    dateItem,
    params,
    table,
    handleChange,
    items,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    handleChangeDate,
    handleSelectDate,
    selectedDateType,
    setSelectedDateType,
    filter,
    onClickSearch,
    onKeyDown,
    isPayRefundModal
  };
};

export default usePaymentDetail;
