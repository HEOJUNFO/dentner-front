import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTodayFormat, getTodaySubstract } from '../../../utils/DateUtil';
import { mileageDepositStatusFilter } from '../../../constants/code';
import { getDepositList, postDesignerMileage } from '../../../api/Mileage';

const useDepositDetail = () => {
  const { t, i18n } = useTranslation();
  const [statusCode, setStatusCode] = useState([]);

  const dateItem = [
    { name: '전체', value: 0 },
    { name: '1개월', value: 1 },
    { name: '3개월', value: 3 },
    { name: '6개월', value: 6 },
    { name: '1년', value: 12 },
    { name: '기간 지정', value: 'set' },
  ];

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
    amountFilter: '',
    fromDateFilter: '',
    toDatefilter: '',
  });

  const [body, setBody] = useState({
    mileageNo: '',
    calculateAmount: '',
    calculateSe: '',
  });
  const [settleItem, setSettleItem] = useState({});
  const [items, setItems] = useState([]);
  const [selectedDateType, setSelectedDateType] = useState({});
  const [filter, setFilter] = useState();

  const [table, setTable] = useState({});
  const charging = {
    ko: {
      colgroup: (
        <colgroup>
          <col width={60} />
          <col width={180} />
          <col width={190} />
          <col />
          <col width={100} />
          <col width={100} />
        </colgroup>
      ),
      head: (
        <tr>
          <th>구분</th>
          <th>마일리지</th>
          <th>실 예정 정산금액</th>
          <th>상세 내용</th>
          <th>이체일자</th>
          <th>정산요청</th>
        </tr>
      ),
    },
    en: {},
  };

  const handleChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const fetchDepositList = async () => {
    const r = await getDepositList(params);
    const { data, statusCode } = r;
    // console.log(r);
    if (statusCode == 200) {
      const { cnt, list } = data;
      setItems(list);
      setTotal(cnt);
    }
  };

  //마일리지 정산
  const handleSettleType = async (item) => {
    setSettleItem(item);
    setIsModal(true);
  };

  //마일리지 정산
  const handleSettleMileage = async (item, success) => {
    const r = await postDesignerMileage({ mileageNo: item?.mileageNo, calculateAmount: item?.expectedAmount, calculateSe: 'B' });
    // console.log(r)
    if (r.statusCode === 200) {
      success(true);
    }
    // success(true);
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
    // console.log(e);
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
    // 코드명
    const code = mileageDepositStatusFilter[i18n.language];
    setStatusCode(code);

    // 테이블
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
    fetchDepositList();
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
    handleSettleMileage,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    handleSettleType,
    settleItem,
    body,
    setBody,
    fetchDepositList
  };
};

export default useDepositDetail;
