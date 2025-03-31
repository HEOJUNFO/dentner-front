import { useEffect, useState } from 'react';
import { getRequestFormBasket, deleteRequestFormBasket } from '@api/Basket';
import { getRequestJson } from '@api/Request'; // 추가: RequestJson API 가져오기
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';

const useRequestBasket = () => {
  const { handleNav, state } = useNav();
  const { t } = useTranslation();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  // A:요청전의뢰서, B:요청한 의뢰서, C:임시저장 의뢰서
  const [tab, setTab] = useState('A');

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [checkedItems, setCheckedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const tabItem = [
    { id: 'Basket_A', value: 'A', title: t('transaction.before_request') },
    { id: 'Basket_B', value: 'B', title: t('transaction.requested') },
    { id: 'Basket_C', value: 'C', title: t('transaction.temp_saved') },
  ];
  const [checkAll, setCheckAll] = useState(false);

  // typeCount 데이터를 가져오는 함수
  const fetchTypeCountData = async (requestDocGroupNo) => {
    try {
      const response = await getRequestJson(requestDocGroupNo);
      if (response?.data?.requestJsonDc) {
        const jsonData = JSON.parse(response.data.requestJsonDc);
        
        // typeCount 데이터 추출
        if (jsonData[0]?.typeList?.value?.length > 0) {
          return jsonData[0].typeList.value[0].typeCount;
        }
      }
      return null;
    } catch (e) {
      console.error('typeCount 데이터 가져오기 실패:', e);
      return null;
    }
  };

  const fetchRequestBasket = async () => {
    setCheckAll(false);
    setCheckedItems([]);
    const r = await getRequestFormBasket({ pathValue: tab, params });
    console.log(r);
    const { data, statusCode } = r;
    if (statusCode == 200) {
      const { cnt, list } = data;
      
      // 각 항목에 대해 typeCount 데이터 가져오기
      const updatedList = await Promise.all(
        list.map(async (item) => {
          const typeCount = await fetchTypeCountData(item.requestDocGroupNo);
          
          // 의뢰서별 typeCount 값이 있으면 추가
          if (typeCount !== null) {
            // requestDocDesc 값 수정 - 형식을 "Crown {typeCount}"로 변경
            let updatedRequestDocDesc = "";
            
            if (item.requestDocDesc) {
              // "Crown 2" -> "Crown {typeCount}"
              const parts = item.requestDocDesc.split(" ");
              if (parts.length > 0) {
                // 마지막 숫자 부분을 제외한 부분 + typeCount
                updatedRequestDocDesc = parts.slice(0, -1).join(" ") + " " + typeCount;
              } else {
                updatedRequestDocDesc = item.requestDocDesc + " " + typeCount;
              }
            }
            
            // prostheticsList가 있으면 첫 번째 항목의 count를 typeCount로 업데이트
            if (item.prostheticsList && item.prostheticsList.length > 0) {
              return {
                ...item,
                requestDocDesc: updatedRequestDocDesc,
                prostheticsList: item.prostheticsList.map((prosthetic, index) => 
                  index === 0 
                    ? { ...prosthetic, count: typeCount } 
                    : prosthetic
                )
              };
            } else {
              // prostheticsList가 없으면 typeCount 속성 추가
              return {
                ...item,
                requestDocDesc: updatedRequestDocDesc,
                typeCount: typeCount
              };
            }
          }
          return item;
        })
      );
      
      setItems(updatedList);
      setTotal(cnt);
    }
  };

  const handleCheckAll = (e) => {
    setCheckAll(e.target.checked);
    if (e.target.checked) {
      setCheckedItems(items);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheck = (checked, item, value) => {
    if (checked) {
      const arr = [...checkedItems, item];
      setCheckedItems(arr);
    } else {
      const arr = checkedItems.filter((el) => el.requestDocGroupNo != value);
      setCheckedItems(arr);
    }
  };

  const handleRemove = async () => {
    if (checkedItems.length === 0) {
      showWarnSnackbar(t('transaction.select_request'));
      return;
    }
    const groupNo = checkedItems.map((el) => el.requestDocGroupNo);
    const r = await deleteRequestFormBasket(groupNo.join(','));

    const { data } = r;
    if (Number(data) > 0) {
      showSnackbar(t('transaction.request_deleted'));
      fetchRequestBasket();
    }
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
    fetchRequestBasket();
  }, [tab, params]);

  return { 
    handleNav, 
    tab, 
    setTab, 
    tabItem, 
    items, 
    checkAll, 
    handleCheckAll, 
    handleCheck, 
    checkedItems, 
    handleRemove, 
    total, 
    perPage, 
    currentPage, 
    setCurrentPage 
  };
};

export default useRequestBasket;