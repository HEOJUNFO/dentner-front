import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getEstimateds, postTransaction } from '@api/Payment';
import { useNav } from '@components/hooks';
import ModalStore from '@store/ModalStore';

/**
 * 치자이너 선택
 * @returns
 */
const useRequestDesignerPage = () => {
  const { handleNav, params: pathValue } = useNav();
  const { actions, callback } = ModalStore();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [id, setId] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [choiceItem, setChoiceItem] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const [isModal, setIsModal] = useState({ visible: false, value: '' });

  const handleDesigner = async () => {
    const { requestFormNo, memberNo } = isModal.value;

    if (requestFormNo && memberNo) {
      const r = await postTransaction({ requestFormNo, memberNo });
      const { data } = r;
      if (Boolean(Number(data))) {
        setIsModal({ visible: false, value: '' });
        actions.setDoneAlert({
          isVisible: true,
          title: '알림',
          contents: '치자이너 선택이 완료되었습니다.',
          btnName: '확인',
          callback: () => {
            fetchData();
            handleNav(`/payment/reqeust/${isModal?.value?.requestFormNo}`);
          },
        });
        return true;
      } else {
        actions.setDoneAlert({ isVisible: true, title: '알림', contents: '치자이너 선택 오류.', btnName: '확인', callback: () => fetchData() });
        return true;
      }
    }
    return false;
  };

  const convertItem = (item) => {
    console.log(item);
    const types = item.prostheticsName?.split(',') || [];
    let cads = [];
    if (item.memberSwName) cads = item.memberSwName?.split(',');
    if (item.swEtc) cads.push(item.swEtc);

    return {
      memberNo: item.memberNo,
      requestFormNo: item?.requestFormNo,
      requestEstimateNo: item?.requestEstimateNo,
      title: item?.memberNickName || item?.memberDentistryName,
      contents: item?.oneIntroduction,
      img: item?.designerProfileImage,
      reviewAvg: item?.reviewAvg,
      reviewCnt: item?.reviewCnt,
      wonPrice: item?.wonPrice,
      dollarPrice: item?.dollarPrice,
      types: types?.map((el) => ({ name: el })),
      cads: cads?.map((el) => ({ name: el })),
      menu: 'payment',
      onSelectedDesigner: (e) => {
        setIsModal({ visible: true, value: item });
      },
      state: item?.requestDesignerNo ? 'end' : 'ing',
    };
  };

  // state: B 비선택, A 선택
  // 견적 보낸 치자이너
  const fetchEstimateds = async () => {
    const r = await getEstimateds({ pathValue: id, state: 'B', params });
    const { data, statusCode } = r;
    if (statusCode == 200) {
      const { cnt, list } = data;
      setItems(list.map((el) => convertItem(el)));
      setTotal(cnt);
    }
  };

  // 선택한 치자이너
  const fetchChoiceEstimated = async () => {
    const r = await getEstimateds({ pathValue: id, state: 'A', params });
    const { data, statusCode } = r;
    if (statusCode == 200) {
      const { cnt, list } = data;
      setChoiceItem(list.map((el) => convertItem(el)));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const r = await Promise.all([fetchChoiceEstimated(), fetchEstimateds()]);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [params, id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  return { isLoading, isModal, setIsModal, items, choiceItem, total, perPage, currentPage, setCurrentPage, handleDesigner };
};

export default useRequestDesignerPage;
