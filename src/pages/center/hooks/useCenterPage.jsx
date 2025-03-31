import React, { useEffect, useRef, useState } from 'react';
import { getDentallaboratories, postLaboratoryInterest, deleteLaboratoryInterest, postLaboratoryBlock } from '@api/Center';
import ModalStore from '@store/ModalStore';
import CodeStore from '@store/CodeStore';
import UserStore from '@store/UserStore';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
import { useNav } from '@components/hooks';

const useCenterPage = () => {
  const { user } = UserStore();
  const { actions } = ModalStore();
  const { actions: codeAction, getters } = CodeStore();
  const { handleNav, pathname, navigationType, navigate } = useNav();

  const { t, i18n } = useTranslation();
  const store = getters.getFilterPageItem(pathname);

  const location = useLocation();

  const [sortType, setSortType] = useState('');
  const [searchType, setSearchType] = useState(() => {
    // console.log(location)
    return location.pathname === '/center' ? location?.state?.searchType || 1 : 1;
  });
  const [keyword, setKeyword] = useState('');

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [randomSe, setRandomSe] = useState();
  const [params, setParams] = useState({
    memberAreaFilter: location.pathname === '/center' ? location?.state?.memberAreaFilter || '' : '',
    fixProstheticsFilter: '',
    removableProstheticsFilter: '',
    correctFilter: '',
    allOnFilter: '',
    interestFilter: '',
    latestFilter: '',
    keyword: '',
    startRow: 0,
    pageCnt: perPage,
    randomSe: randomSe,
  });

  console.log(params)

  const [isModal, setIsModal] = useState({ visible: false, value: '' });
  const [isModal2, setIsModal2] = useState({ visible: false, value: '' });
  const [isModal3, setIsModal3] = useState({ visible: false, value: '' });

  const sortingItems = [
    ...(user?.memberSe === 'A'
      ? [
          {
            name: t('sort.by_newest'),
            value: 0,
            onChange: (value) => {
              if (sortType === value) {
                setSortType('');
                setParams((prev) => ({
                  ...prev,
                  interestFilter: '',
                  latestFilter: '',
                }));
              } else {
                setSortType(value);
                setParams((prev) => ({
                  ...prev,
                  interestFilter: '',
                  latestFilter: 'Y',
                }));
              }
            },
          },
          {
            name: t('sort.like'),
            value: 1,
            onChange: (value) => {
              if (sortType === value) {
                setSortType('');
                setParams((prev) => ({
                  ...prev,
                  interestFilter: '',
                  latestFilter: '',
                }));
              } else {
                setSortType(value);
                setParams((prev) => ({
                  ...prev,
                  interestFilter: 'Y',
                  latestFilter: '',
                }));
              }
            },
          },
        ]
      : [
          {
            name: t('sort.by_newest'), //최신순
            value: 0,
            onChange: (value) => {
              if (sortType === value) {
                setSortType('');
                setParams((prev) => ({
                  ...prev,
                  interestFilter: '',
                  latestFilter: '',
                }));
              } else {
                setSortType(value);
                setParams((prev) => ({
                  ...prev,
                  interestFilter: '',
                  latestFilter: 'Y',
                }));
              }
            },
          },
        ]),
  ];

  const moreItems = (item) => {
    return [
      {
        // 링크복사
        name: t('disigner.copy_link'),
        onClick: () => {
          const baseUrl = `${window.location.protocol}//${window.location.host}/centerView/${item.memberNo}`;
          setIsModal({ visible: true, value: { url: baseUrl } });
        },
      },
      {
        // 차단하기
        name: t('disigner.block'),
        onClick: () => {
          setIsModal2({ visible: true, value: { onBlock: () => handleAddBlock(item.memberNo) } });
        },
      },
      {
        // 신고하기
        name: t('disigner.report'),
        onClick: () => {
          setIsModal3({ visible: true, value: { target: { memberNo: item.memberNo, profileImage: item.memberProfileImage, memberName: item.memberDentistryName } } });
        },
      },
    ];
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = (e) => {
    setParams((prev) => ({
      ...prev,
      keyword: keyword,
      startRow: 0
    }));
    setCurrentPage(1)
  };

  const handleFilterChange = (name, value) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
      startRow: 0,
    }));
    setCurrentPage(1)
  };

  const handleSearchTypeChange = (type) => {
    setParams({
      memberAreaFilter: '',
      fixProstheticsFilter: '',
      removableProstheticsFilter: '',
      correctFilter: '',
      allOnFilter: '',
      interestFilter: '',
      latestFilter: '',
      startRow: 0,
      pageCnt: perPage,
    });
    setKeyword('');
    setSortType('');
    setSearchType(type);
  };

  const handleAddInterest = async (memberNo) => {
    const r = await postLaboratoryInterest(memberNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setItems((prevItems) => prevItems.map((el) => (el.memberNo === memberNo ? { ...el, interest: true } : el)));
    }
  };

  const handleRemoveInterest = async (memberNo) => {
    const r = await deleteLaboratoryInterest(memberNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setItems((prevItems) => prevItems.map((el) => (el.memberNo === memberNo ? { ...el, interest: false } : el)));
    }
  };

  const handleInterest = (e, memberNo) => {
    if (e.target.checked) handleAddInterest(memberNo);
    else handleRemoveInterest(memberNo);
  };

  // 치기공소 차단
  const handleAddBlock = async (memberNo) => {
    const r = await postLaboratoryBlock(memberNo);

    const { data: dt } = r;
    if (Boolean(Number(dt))) {
      setIsModal2({ visible: false, value: null });
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') }); // 알림, 차단되었습니다., 확인
      fetchDentalLaboratories();
    }
  };

  const convertItem = (item, idx) => {
    // {
    //   title: 'Apple 치카푸카',
    //   contents:
    //     'Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게 소중한 치아를          믿고 맡겨보세요!',
    //   img: sampleProfile,
    //   local: [{ name: '대전' }, { name: '충남' }, { name: '세종' }],
    //   skill: items,
    //   detailUrl: '/centerView',
    //   moreItems: moreItems,
    // },
    const local = [item.memberAreaName] || [];
    let skill = [];
    if (item.fixProstheticsName) skill.push(item.fixProstheticsName);
    if (item.removableProstheticsName) skill.push(item.removableProstheticsName);
    if (item.correctName) skill.push(item.correctName);
    if (item.allOnName) skill.push(item.allOnName);

    if (skill.length > 0) {
      skill = skill
        .join(',')
        ?.split(',')
        .map((el) => ({ name: el }));
    }

    return {
      memberNo: item.memberNo,
      title: item.memberDentistryName,
      contents: item.oneIntroduction,
      img: item.memberProfileImage,
      local: local?.map((el) => ({ name: el })),
      skill: skill,
      detailUrl: `/centerView/${item.memberNo}`,
      moreItems: moreItems(item),
      onInterest: (e) => handleInterest(e, item.memberNo),
      interest: item.interestYn === 'Y' ? true : false,
    };
  };

  // 치기공소 조회
  const fetchDentalLaboratories = async (uid) => {
    const r = await getDentallaboratories({ ...params, randomSe: uid || randomSe });
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

      //if (store?.currentPage) setCurrentPage(store?.currentPage);

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

    fetchDentalLaboratories(uid);
  }, [params, i18n.language]);

  return {
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    sortType,
    sortingItems,
    searchType,
    keyword,
    setKeyword,
    handleEnter,
    handleSearchClick,
    handleSearchTypeChange,
    params,
    items,
    handleFilterChange,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    setParams
  };
};

export default useCenterPage;
