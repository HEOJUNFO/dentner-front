import React, { useEffect, useRef, useState } from 'react';
import { getRequestFormBasket, deleteRequestFormBasket } from '@api/Basket';
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

  const fetchRequestBasket = async () => {
    setCheckAll(false);
    setCheckedItems([]);
    const r = await getRequestFormBasket({ pathValue: tab, params });
    console.log(r);
    const { data, statusCode } = r;
    if (statusCode == 200) {
      const { cnt, list } = data;
      setItems(list);
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

  return { handleNav, tab, setTab, tabItem, items, checkAll, handleCheckAll, handleCheck, checkedItems, handleRemove, total, perPage, currentPage, setCurrentPage };
};

export default useRequestBasket;
