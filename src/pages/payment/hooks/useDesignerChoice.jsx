import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getEstimateds, postTransaction } from '@api/Payment';
import { useNav } from '@components/hooks';

/**
 * 삭제예정
 * @returns
 */
const useDesignerChoice = () => {
  const { handleNav, params: pathValue } = useNav();
  const [isLoading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const [isModal, setIsModal] = useState({ visible: false, value: '' });

  const convertItem = (item) => {
    const types = item.prostheticsName?.split(',') || [];
    let cads = [];
    if (item.swNoName) cads = item.swNoName.split(',');
    if (item.swEtc) cads.push(item.swEtc);

    return {
      memberNo: item.memberNo,
      requestFormNo: item.requestFormNo,
      requestEstimateNo: item.requestEstimateNo,
      title: item.memberNickName || item.memberDentistryName,
      contents: item.oneIntroduction,
      img: item.memberProfileImage,
      reviewAvg: item.reviewAvg,
      reviewCnt: item.reviewCnt,
      wonPrice: item.wonPrice,
      dollarPrice: item.dollarPrice,
      types: types?.map((el) => ({ name: el })),
      cads: cads?.map((el) => ({ name: el })),
      menu: 'payment',
      onSelectedDesigner: (e) => {
        setIsModal({ visible: true, value: item });
      },
      state: item.requestDesignerNo ? 'end' : 'ing',
    };
  };

  // state: B 비선택, A 선택
  const fetchEstimateds = async () => {
    try {
      const r = await getEstimateds({ pathValue: id, state: 'A', params });
      const { data, statusCode } = r;
      if (statusCode == 200) {
        const { cnt, list } = data;

        setItems(list.map((el) => convertItem(el)));
        setTotal(cnt);
      }
      // console.log(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) fetchEstimateds();
  }, [params, id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, []);

  return { isLoading, isModal, setIsModal, items, total, perPage, currentPage, setCurrentPage };
};

export default useDesignerChoice;
