import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTransactions, deleteAddPay, deleteRemaking } from '@api/Payment';
import { usePrevious } from '@components/hooks';
import UserStore from '@store/UserStore';
import sampleProfile from '@assets/images/no_user.png';
import { getDate } from 'date-fns';
import dayjs from 'dayjs';
import { getTodayFormat, getTodaySubstract } from '../../../utils/DateUtil';

const usePaymentPage = () => {
  const { t } = useTranslation();
  const { user } = UserStore();

  const menus = [
    { title: t('request.all'), desc: '전체', value: '' },
    { title: t('request.public'), desc: '공개요청', value: 'A' },
    { title: t('request.target'), desc: '지정요청', value: 'B' },
  ];

  // const stss = [
  //   { name: t('status.all'), value: '' },
  //   { name: t('status.quote_ing'), value: 'A' },
  //   { name: t('status.select_dental_designer'), value: 'B' },
  //   { name: t('status.trade'), value: 'C' },
  //   { name: t('status.complete'), value: 'D' },
  //   { name: t('status.cancel'), value: 'E' },
  //   { name: t('status.cancel_wait'), value: 'F' },
  //   { name: t('status.request_closed'), value: 'G' },
  // ];

  const [stss, setStss] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [tab, setTab] = useState('');
  const prevTab = usePrevious(tab);

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    statusFilter: '',
    fromDateFilter: '',
    toDateFilter: '',
    memberSe: user?.memberSe,
    startRow: 0,
    pageCnt: perPage,
  });
  const [filter, setFilter] = useState();
  const [selectedDateType, setSelectedDateType] = useState({});

  // 확인모달
  const [isConModal, setConModal] = useState({
    visible: false,
    value: '',
  });

  // 신고하기 모달
  const [isReport, setReport] = useState({
    visible: false,
    value: '',
  });

  // 거래취소 모달
  const [isCancelModal, setCancelModal] = useState({
    visible: false,
    value: '',
  });
  // 거래취소요청 모달
  const [isCancelCallModal, setCancelCallModal] = useState({
    visible: false,
    value: '',
  });

  const removeCancelPay = async (requestFormNo) => {
    try {
      const r = await deleteAddPay(requestFormNo);
      const { data } = r;
      if (Number(data) > 0) {
        fetchTransactions();
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const removeCancelRework = async (requestFormNo) => {
    try {
      const r = await deleteRemaking(requestFormNo);
      const { data } = r;
      if (Number(data) > 0) {
        fetchTransactions();
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // 신고하기
  const handleReport = (item) => {
    setReport({
      visible: true,
      value: {
        type: 'C',
        target: { memberNo: item.memberNo, memberName: item.memberNickName, profileImage: item.memberProfileImage || sampleProfile },
        onClose: () => {
          setReport({ visible: false, value: null });
        },
      },
    });
  };

  /** 거래 취소 모달 호출 */
  const handleCancel = (item) => {
    // 취소모달
    setCancelModal({
      visible: true,
      value: {
        target: {
          memberNo: item.memberNo,
          memberName: item.memberNickName,
          profileImage: item.memberProfileImage || sampleProfile,
          requestFormNo: item?.requestFormNo,
          status: item?.requestStatus,
          dealStatus: item?.requestDealStatus,
        },
        onClose: () => {
          setCancelModal({ visible: false, value: null });
        },
      },
    });
  };

  /** 거래 취소 요청 모달 호출 */
  const handleCancelReq = (item) => {
    setCancelCallModal({
      visible: true,
      value: {
        target: {
          memberNo: item.memberNo,
          memberName: item.memberNickName,
          profileImage: item.memberProfileImage || sampleProfile,
          requestFormNo: item?.requestFormNo,
          status: item?.requestStatus,
          dealStatus: item?.requestDealStatus,
        },
        onClose: () => {
          setCancelCallModal({ visible: false, value: null });
        },
      },
    });
  };

  const handleCancelPay = (requestFormNo) => {
    setConModal({
      visible: true,
      value: {
        title: t('version2_2.text155'), //'추가금 요청철회',
        doneContents: t('version2_4.text98'), //'추가금 요청 철회되었습니다.',
        failContetns: t('version2_4.text99'), //'추가금 철회요청 오류',
        contents: t('version2_4.text100'), //'추가금 요청 철회하시겠습니까?',
        btnCancel: t('version2_1.text3'), //'취소',
        btnConfirm: t('base.confirm'), //'확인',
        onConfirm: () => removeCancelPay(requestFormNo),
        onClose: () => setConModal({ visible: false, value: '' }),
      },
    });
    // console.log(requestFormNo);
  };

  const handleCancelRework = (requestFormNo) => {
    setConModal({
      visible: true,
      value: {
        title: t('transaction.cancel_remake'), //'재제작 요청철회',
        doneContents: t('version2_4.text85'), //'재제작 요청 철회되었습니다.',
        failContetns: t('version2_4.text86'), //'재제작 철회요청 오류',
        contents: t('version2_4.text87'), //'재제작 요청 철회하시겠습니까?',
        btnCancel: t('version2_1.text3'), //'취소',
        btnConfirm: t('base.confirm'),
        onConfirm: () => removeCancelRework(requestFormNo),
        onClose: () => setConModal({ visible: false, value: '' }),
      },
    });
  };

  const convertItem = (item) => {
    console.log(item);
    //진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청수락(치자이너), I: 치자이너 수락대기)
    return {
      requestFormNo: item.requestFormNo,
      title: item.requestFormSj,
      name: item.memberNickName,
      docCnt: item.requestDocCnt,
      deadlineDate: item.requestDeadlineDate,
      deadlineTime: item.requestDeadlineTimeHour + ':' + item.requestDeadlineTimeMin,
      expireDate: item.requestExpireDate,
      expireTime: item.requestExpireTimeHour + ':' + item.requestExpireTimeMin,
      registerDate: item.registerDt.split(' ')[0],
      registerTime: item.registerDt.split(' ')[1]?.substring(0, 5),
      payStatus: item.payStatus, // 의뢰서 결제여부
      estimateReceiveYn: item.estimateReceiveYn, // 의뢰서 수령여부
      estimate3dYn: item.estimate3dYn, // 3d 뷰어 소통여부
      addPayStatus: item.addPayStatus, // 추가금 요청여부
      reviewYn: item.reviewYn, // 리뷰작성여부
      estimateAmount: item.estimateAmount, // 예상결제마일리지
      totalAmount: item.totalAmount, // 결제마일리지
      addAmount: item.addAmount, // 추가결제마일리지
      statusName: item.requestStatusName,
      status: item.requestStatus,
      isMyRequest: item.cancelRequestYn === 'Y' ? true : false,
      dealStatusName: item.requestDealStatusName,
      dealStatus: item.requestDealStatus,
      detailUrl: `/request/view/${item.requestFormNo}`,
      requestType: item.requestFormSe,
      designer: item.memberNo ? { designerNo: item.memberNo, profileImage: item.memberProfileImage || sampleProfile, nickName: item.memberNickName } : null, // 치자이너정보
      member: item.memberNo ? { memberNo: item.memberNo, profileImage: item.memberProfileImage || sampleProfile, nickName: item.memberNickName } : null, // 의뢰인정보
      requestPayCn: item.requestPayCn, // 추가금 요청사유
      requestPayDt: item.requestPayDt, // 추가금 요청일자
      requestRemakingDate: item.requestRemakingDt ? item.requestRemakingDt.split(' ')[0] : '', // 재제작요청일자
      requestRemakingTime: item.requestRemakingDt ? item.requestRemakingDt.split(' ')[1]?.substring(0, 5) : '',
      requestRemakingNo: item.requestRemakingNo, // 재제작의뢰번호
      requestRemakingDeletedAt: item.requestRemakingDeletedAt, // 재제작요청철회
      requestRemakingSeName: item.requestRemakingSeName, // 재제작사유
      requestPayDeletedAt: item.requestPayDeletedAt, // 추가금요청 철회여부
      targetAmount: item?.targetAmount, // 지정요청 결제 예상 마일리지
      requestEstimateNo: item?.requestEstimateNo, // 공개요청 선택된 견적서
      remakingAddYn: item?.remakingAddYn, // 재제작 추가금 요청여부
      memberTp: item?.memberTp, // 의뢰인 회원 타입
      onCancelPay: () => handleCancelPay(item.requestFormNo), // 추가금철회
      onCancelRework: () => handleCancelRework(item.requestFormNo), // 재제작철회
      onReport: () => handleReport(item), // 신고하기
      onCancel: () => handleCancel(item), // 거래취소
      onCancelReq: () => handleCancelReq(item), //거래취소요청
      onFetch: () => fetchTransactions(),
      memberOutAt: item.memberOutAt
      // onModalOpen: (e) => {
      //   fetchProsthetics(item.requestFormNo);
      // },
    };
  };

  // 거래내역 목록 조회
  const fetchTransactions = async () => {
    try {
      const r = await getTransactions({ requestFormSe: tab, params });
      // console.log(r);
      const { data, statusCode } = r;
      if (statusCode == 200) {
        const { cnt, list } = data;
        setItems(list.map((item) => convertItem(item)));
        setTotal(cnt);
      }
      // console.log(r);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (name, value) => {
    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setCurrentPage(1);
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
    fetchTransactions();
  }, [params]);

  useEffect(() => {
    if (prevTab !== undefined && prevTab !== tab) {
      setParams((prev) => ({
        ...prev,
        memberSe: user?.memberSe,
        startRow: 0,
        pageCnt: perPage,
      }));
      setCurrentPage(1);
      // fetchTransactions();
    }

    if (user?.memberSe === 'A') {
      if (tab === '') {
        setStss([
          { name: t('status.all'), value: '' },
          { name: t('version2_4.text93'), value: 'CB' },
          { name: t('status.quote_ing'), value: 'A' },
          { name: t('status.select_dental_designer'), value: 'B' },
          { name: t('status.trade'), value: 'C' },
          { name: t('version2_4.text94'), value: 'EB' },
          { name: t('version2_4.text95'), value: 'CE' },
          { name: t('status.complete'), value: 'D' },
          { name: t('status.cancel'), value: 'E' },
          { name: t('status.cancel_wait'), value: 'F' },
          { name: t('status.request_closed'), value: 'G' },
        ]);
      } else if (tab === 'A') {
        setStss([
          { name: t('status.all'), value: '' },
          { name: t('status.quote_ing'), value: 'A' },
          { name: t('status.select_dental_designer'), value: 'B' },
          { name: t('status.trade'), value: 'C' },
          { name: t('status.complete'), value: 'D' },
          { name: t('status.cancel'), value: 'E' },
          { name: t('status.cancel_wait'), value: 'F' },
          { name: t('status.request_closed'), value: 'G' },
        ]);
      } else if (tab === 'B') {
        setStss([
          { name: t('status.all'), value: '' },
          { name: t('version2_4.text93'), value: 'CB' },
          { name: t('version2_4.text94'), value: 'EB' },
          { name: t('status.trade'), value: 'C' },
          { name: t('version2_4.text95'), value: 'CE' },
          { name: t('status.complete'), value: 'D' },
          { name: t('status.cancel'), value: 'E' },
          { name: t('status.cancel_wait'), value: 'F' },
        ]);
      }
    } else if (user?.memberSe === 'C') {
      if (tab === '') {
        setStss([
          { name: t('status.all'), value: '' },
          { name: t('version2_4.text96'), value: 'B' },
          { name: t('version2_4.text97'), value: 'CB' },
          { name: t('status.trade'), value: 'C' },
          { name: t('version2_4.text95'), value: 'CG' },
          { name: t('status.complete'), value: 'D' },
          { name: t('status.cancel'), value: 'E' },
          { name: t('status.cancel_wait'), value: 'F' },
        ]);
      } else if (tab === 'A') {
        setStss([
          { name: t('status.all'), value: '' },
          { name: t('version2_4.text96'), value: 'B' },
          { name: t('status.trade'), value: 'C' },
          { name: t('status.complete'), value: 'D' },
          { name: t('status.cancel'), value: 'E' },
          { name: t('status.cancel_wait'), value: 'F' },
        ]);
      } else if (tab === 'B') {
        setStss([
          { name: t('status.all'), value: '' },
          { name: t('version2_4.text97'), value: 'CB' },
          { name: t('status.trade'), value: 'C' },
          { name: t('version2_4.text95'), value: 'CG' },
          { name: t('status.complete'), value: 'D' },
          { name: t('status.cancel'), value: 'E' },
          { name: t('status.cancel_wait'), value: 'F' },
        ]);
      }
    }
  }, [tab]);

  return {
    isLoading,
    error,
    user,
    menus,
    stss,
    tab,
    setTab,
    items,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    isConModal,
    isCancelModal,
    isCancelCallModal,
    handleSearch,
    fetchTransactions,
    handleChangeDate,
    onClickSearch,
    filter,
    handleSelectDate,
    selectedDateType,
    setSelectedDateType,
    isReport,
    onKeyDown,
  };
};

export default usePaymentPage;
