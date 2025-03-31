import React, { useEffect, useState } from 'react';
import { getBoard } from '@api/Help';
const useNotices = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const fetchNoticeBoard = async () => {
    const r = await getBoard({ params });
    const dt = r?.data;
    if (dt) {
      const { cnt, list } = dt;
      setItems(list);
      setTotal(cnt);
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
    fetchNoticeBoard();
  }, [params]);

  return { params, items, total, perPage, currentPage, setCurrentPage };
};

export default useNotices;
