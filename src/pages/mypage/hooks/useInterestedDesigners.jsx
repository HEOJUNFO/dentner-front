import React, { useEffect, useState } from 'react';
import { deleteDesignerInterest, postDesignerBlock } from '@api/Designer';
import { getMypageInterest } from '@api/Mypage';
import ModalStore from '@store/ModalStore';
import { useTranslation } from 'react-i18next';

const useInterestedDesigners = () => {
  const { t, i18n } = useTranslation();
  const { actions } = ModalStore();

  const [isLoading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [list, setList] = useState([]);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const [isModal2, setIsModal2] = useState({ visible: false, value: '' });
  const [isModal3, setIsModal3] = useState({ visible: false, value: '' });

  const moreItems = (item) => {
    return [
      {
        name: t('disigner.block'), //'차단하기',
        onClick: () => {
          setIsModal2({ visible: true, value: item });
        },
      },
      {
        name: t('disigner.report'), //'신고하기',
        onClick: () => {
          setIsModal3({ visible: true, value: { target: { memberNo: item.targetNo, profileImage: item.memberProfileImage, memberName: item.memberNickName || item.memberDentistryName } } });
        },
      },
    ];
  };

  const handleAddBlock = async (e) => {
    if (isModal2.value.memberNo) {
      const r = await postDesignerBlock(isModal2.value.targetNo);

      const { data } = r;
      if (Boolean(Number(data))) {
        setIsModal2({ visible: false, value: '' });
        actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') });
        fetchDentalDesigners();
      }

      // actions.setBlockDoneAlert(true);
    }
  };

  const handleRemoveInterest = async (memberNo) => {
    const r = await deleteDesignerInterest(memberNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      fetchDentalDesigners();
    }
  };

  const convertItem = (item) => {
    const types = item.prostheticsName?.split(',') || [];
    let cads = [];
    if (item.swNoName) cads = item.swNoName.split(',');
    if (item.swEtc) cads.push(item.swEtc);

    return {
      memberNo: item.targetNo,
      title: item.memberNickName,
      contents: item.oneIntroduction,
      img: item.memberProfileImage,
      reviewAvg: item.reviewAvg,
      reviewCnt: item.reviewCnt,
      wonPrice: item.wonPrice,
      dollarPrice: item.dollarPrice,
      types: types?.map((el) => ({ name: el })),
      cads: cads?.map((el) => ({ name: el })),
      detailUrl: `/designer/view/${item.targetNo}`,
      moreItems: moreItems(item),
      onRemoveInterest: (e) => handleRemoveInterest(item.targetNo),
      interest: item.interestYn === 'Y' ? true : false,
      menu: 'mypage',
    };
  };

  const fetchDentalDesigners = async () => {
    const r = await getMypageInterest({ pathValue: 'B', params });
    const { data, statusCode } = r;
    if (statusCode == 200) {
      const { cnt, list } = data;
      setList(list);
      setItems(list.map((el) => convertItem(el)));
      setTotal(cnt);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (list.length > 0) {
      setItems(list.map((el) => convertItem(el)));
    }
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
    fetchDentalDesigners();
  }, [params]);

  return { isLoading, isModal2, setIsModal2, isModal3, setIsModal3, items, total, perPage, currentPage, setCurrentPage, handleAddBlock };
};

export default useInterestedDesigners;
