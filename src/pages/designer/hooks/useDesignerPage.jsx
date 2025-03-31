import React, { useEffect, useRef, useState } from 'react';
import { getDentalDesigners, postDesignerInterest, deleteDesignerInterest, postDesignerBlock } from '@api/Designer';
import ModalStore from '@store/ModalStore';
import CodeStore from '@store/CodeStore';
import UserStore from '@store/UserStore';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useNav } from '@components/hooks';

const useDesignerPage = () => {
  const { t, i18n } = useTranslation();

  const { actions } = ModalStore();
  const { actions: codeAction, getters } = CodeStore();
  const { handleNav, pathname, navigationType, navigate } = useNav();
  const { user } = UserStore();

  const store = getters.getFilterPageItem(pathname);

  const [sortType, setSortType] = useState('');
  const [keyword, setKeyword] = useState('');
  const [randomSe, setRandomSe] = useState();
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentPage, setCurrentPage] = useState(store?.currentPage || 1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    prostheticsFilter: [], //보철종료
    latestFilter: '', //최신순
    reviewFilter: '', //리뷰순
    ratingFilter: '', //평점순
    priceFilter: '', //거래 총 금액순
    interestFilter: '', //관심
    keyword: '',
    startRow: 0,
    // startRow: store?.startRow || 0,
    pageCnt: perPage,
  });

  const [isModal, setIsModal] = useState({ visible: false, value: '' });
  const [isModal2, setIsModal2] = useState({ visible: false, value: '' });
  const [isModal3, setIsModal3] = useState({ visible: false, value: '' });

  const sortingItems = [
    { name: t('sort.by_newest'), value: 0 },
    { name: t('sort.by_review'), value: 1 },
    { name: t('sort.by_rate'), value: 2 },
    { name: t('sort.total_amount'), value: 3 },
    ...(user.memberSe === 'A' ? [{ name: t('designer.interest'), value: 4 }] : []),
  ];

  const moreItems = (item) => {
    return [
      // ...(user.memberSe === 'A'
      //   ? [
      //       {
      //         name: t('disigner.copy_link'),
      //         onClick: () => {
      //           const baseUrl = `${window.location.protocol}//${window.location.host}/centerView/${item.memberNo}`;
      //           setIsModal({ visible: true, value: { url: baseUrl } });
      //         },
      //       },
      //     ]
      //   : []),
      {
        name: t('disigner.block'),
        onClick: () => {
          setIsModal2({ visible: true, value: item });
        },
      },
      {
        name: t('disigner.report'),
        onClick: () => {
          setIsModal3({ visible: true, value: { target: { memberNo: item.memberNo, profileImage: item.memberProfileImage, memberName: item.memberNickName } } });
        },
      },
    ];
  };

  const handleAddBlock = async (e) => {
    if (isModal2.value.memberNo) {
      const r = await postDesignerBlock(isModal2.value.memberNo);

      const { data } = r;
      if (Boolean(Number(data))) {
        setIsModal2({ visible: false, value: '' });
        actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') }); //알림 차단되었습니다. 확인
        fetchDentalDesigners();
      }

      // actions.setBlockDoneAlert(true);
    }
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = (e) => {
    //const startRow = (currentPage - 1) * perPage;
    setParams((prev) => ({
      ...prev,
      keyword: keyword,
      startRow: 0,
    }));
    setCurrentPage(1)
  };

  const handleAddInterest = async (memberNo) => {
    const r = await postDesignerInterest(memberNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setItems((prevItems) => prevItems.map((el) => (el.memberNo === memberNo ? { ...el, interest: true } : el)));
    }
  };

  const handleRemoveInterest = async (memberNo) => {
    const r = await deleteDesignerInterest(memberNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setItems((prevItems) => prevItems.map((el) => (el.memberNo === memberNo ? { ...el, interest: false } : el)));
    }
  };

  const handleInterest = (e, memberNo) => {
    if (e.target.checked) handleAddInterest(memberNo);
    else handleRemoveInterest(memberNo);
  };

  const convertItem = (item) => {
    const types = item.prostheticsName?.split(',') || [];
    let cads = [];
    if (item.swNoName) cads = item.swNoName.split(',');
    if (item.swEtc) cads.push(item.swEtc);

    return {
      memberNo: item.memberNo,
      title: item.memberNickName || item.memberDentistryName,
      contents: item.oneIntroduction,
      img: item.memberProfileImage,
      reviewAvg: item.reviewAvg,
      reviewCnt: item.reviewCnt,
      wonPrice: item.wonPrice,
      dollarPrice: item.dollarPrice,
      types: types?.map((el) => ({ name: el })),
      cads: cads?.map((el) => ({ name: el })),
      detailUrl: `/designer/view/${item.memberNo}`,
      moreItems: moreItems(item),
      onInterest: (e) => handleInterest(e, item.memberNo),
      interest: item.interestYn === 'Y' ? true : false,
      menu: 'designer',
    };
  };

  const fetchDentalDesigners = async (uid) => {
    const r = await getDentalDesigners({ ...params, randomSe: uid || randomSe, prostheticsFilter: params.prostheticsFilter.join(',') });
    const { data, statusCode } = r;
    if (statusCode == 200) {
      const { cnt, list } = data;
      setItems(list.map((el) => convertItem(el)));
      setTotal(cnt);
    }
  };

  // useEffect(() => {
  //   const startRow = (currentPage - 1) * perPage;
  //   setParams((prevParams) => {
  //     if (prevParams.startRow !== startRow || prevParams.pageCnt !== perPage) {
  //       return {
  //         ...prevParams,
  //         startRow,
  //         pageCnt: perPage,
  //       };
  //     }
  //     return prevParams;
  //   });
  // }, [currentPage, perPage]);

  useEffect(() => {
    let uid = uuidv4();

    if (navigationType === 'POP') {
      const store = getters.getFilterPageItem(pathname);
      if (store?.uuid) {
        uid = store?.uuid;
      }

      // if (store?.currentPage) setCurrentPage(store?.currentPage);

      setRandomSe(store?.uuid || uid);
    } else {
      if (randomSe) {
        uid = randomSe;
      } else {
        setRandomSe(uid);
      }
    }

    // 변경시 store에 저장
    codeAction.setPageItems(pathname, { uuid: uid, ...params, currentPage });

    fetchDentalDesigners(uid);
  }, [params, i18n.language]);

  const handleFilterChange = (e) => {
    if (e.target.checked) {
      if (!params.prostheticsFilter.includes(e.target.value)) {
        const p = [...params.prostheticsFilter, e.target.value];
        setParams((prev) => ({
          ...prev,
          prostheticsFilter: p,
          startRow: 0,
        }));
        setCurrentPage(1)
      }
    } else {
      const p = params.prostheticsFilter.filter((el) => el != e.target.value);
      setParams((prev) => ({
        ...prev,
        prostheticsFilter: p,
        startRow: 0,
      }));
      setCurrentPage(1)
    }
  };

  const handleSortingChange = (value) => {
    let latestFilter = ''; //최신순
    let reviewFilter = ''; //리뷰순
    let ratingFilter = ''; //평점순
    let priceFilter = ''; //거래 총 금액순
    let interestFilter = ''; //관심

    if (sortType === value) {
      setSortType('');
    } else {
      setSortType(value);
      switch (value) {
        case 0:
          latestFilter = 'Y';
          break;
        case 1:
          reviewFilter = 'Y';
          break;
        case 2:
          ratingFilter = 'Y';
          break;
        case 3:
          priceFilter = 'Y';
          break;
        case 4:
          interestFilter = 'Y';
          break;
      }
    }

    setParams((prev) => ({
      ...prev,
      latestFilter,
      reviewFilter,
      ratingFilter,
      priceFilter,
      interestFilter,
    }));
  };

  return {
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    sortType,
    sortingItems,
    items,
    params,
    keyword,
    setKeyword,
    handleEnter,
    handleSearchClick,
    handleFilterChange,
    handleSortingChange,
    handleAddBlock,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    setParams
  };
};

export default useDesignerPage;
