import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTodayFormat, getTodaySubstract } from '../../../utils/DateUtil';
import { mileageSettleStatusFilter } from '../../../constants/code';
import { getSettleList } from '../../../api/Mileage';

const useSettleDetail = () => {
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
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
    statusFilter: "",
    fromDateFilter: "",
    toDatefilter: ""
  });

  const [items, setItems] = useState([]);
  const [selectedDateType, setSelectedDateType] = useState({});
  const [filter, setFilter] = useState();

  const [table, setTable] = useState({});
  const charging = {
    ko: {
      colgroup: (
        <colgroup>
            <col width={65} />
            <col width={242} />
            <col width={183} />
            <col />
            <col width={108} />
        </colgroup>
      ),
      head: (
        <tr>
            <th>구분</th>
            <th>마일리지</th>
            <th>정산금액</th>
            <th>상세 내용</th>
            <th>요청일자</th>
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

  const fetchSettleList = async () => {
    const r = await getSettleList(params);
    const { data, statusCode } = r;
    // console.log(r);
    if (statusCode == 200) {
      const { cnt, list } = data;
      setItems(list);
      setTotal(cnt);
    }
  };

  const sumCalculateAmountsByType = (items) => {
    // A와 B 타입별 합계 초기화
    const sums = {
      A: 0,
      B: 0
    };
    
    console.log(items)
    items.forEach(item => {
      if (item.mileageUnit === 'A') {
        console.log('item')
        sums.A += item.calculateAmount;
      } else if (item.mileageUnit === 'B') {
        sums.B += item.calculateAmount;
      }
    });
    
    return sums;
  };
  
  // fetchSettleList 함수 내에서 사용하는 예시
  const fetchSettleList2 = async () => {
    console.log(params);
    const initialParams = params;
    const r = await getSettleList(initialParams);
    const { data, statusCode } = r;
    
    if (statusCode == 200) {
      const { cnt, list } = data;
      // cnt를 이용해 모든 항목을 가져오기
      const allItemsParams = { ...params, pageCnt: cnt };
      const fullResponse = await getSettleList(allItemsParams);
      
      if (fullResponse.statusCode == 200) {
        const fullList = fullResponse.data.list;
        
        // 타입별 calculateAmount 합계 계산
        const amountSums = sumCalculateAmountsByType(fullList);
        console.log('A 타입 합계:', amountSums.A);
        console.log('B 타입 합계:', amountSums.B);
        console.log('전체 합계:', amountSums.A + amountSums.B);
      }
    }
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
    const code = mileageSettleStatusFilter[i18n.language];
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
    fetchSettleList();
    fetchSettleList2();
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
  };
};

export default useSettleDetail;
