import React, { useEffect, useRef, useState } from 'react';
import { getRequestForms, getRequestProsthetics } from '@api/Request';
import UserStore from '@store/UserStore';
import { useNav } from '@components/hooks';
import { useTranslation } from 'react-i18next';
import { useNavigationType, useLocation } from 'react-router-dom';

export const useRequestPublic = () => {
  const { handleNav } = useNav();
  const { user } = UserStore();
  const { t } = useTranslation();

  const navigationType = useNavigationType();
  const location = useLocation();

  const [isLoading, setLoading] = useState(true);

  const [sortType, setSortType] = useState(1);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [params, setParams] = useState({
    keyword: '',
    prostheticsFilter: '',
    statusFilter: '',
    myFilter: sortType === 0 ? 'Y' : '',
    latestFilter: sortType === 1 ? 'Y' : '',
    dedLineFilter: sortType === 2 ? 'Y' : '',
    startRow: 0,
    pageCnt: perPage,
  });
  const [keyword, setKeyword] = useState('');

  const [items, setItems] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const [request, setRequest] = useState([]);
  const [prosthetics, setProsthetics] = useState([]);

  const stss = [
    { name: t('status.all'), value: '' },
    { name: t('status.quote_ing'), value: 'A' },
    { name: t('status.trade'), value: 'C' },
    { name: t('status.complete'), value: 'D' },
  ];

  const sortingItems = [
    ...(user?.memberSe === 'B' ? [] : [{ name: user?.memberSe === 'A' ? t('request.view_my_requests') : t('request.view_my_quote'), value: 0 }]),
    { name: t('sort.by_newest'), value: 1 },
    { name: t('sort.by_expiration'), value: 2 },
  ];

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleSearchClick = (e) => {
    setCurrentPage(1);
    setParams((prev) => ({
      ...prev,
      startRow: 0,
      pageCnt: perPage,
      keyword: keyword,
    }));
  };

  const sortringInput = {
    value: keyword,
    placeholder: t('request.search_related'),
    onChange: (e) => {
      setKeyword(e.target.value);
    },
    onClick: (e) => {
      handleSearchClick();
    },
    onKeyDown: (e) => {
      handleEnter(e);
    },
  };

  const handleChange = (name, value) => {
    setCurrentPage(1);
    setParams((prev) => ({
      ...prev,
      startRow: 0,
      pageCnt: perPage,
      [name]: value,
    }));
  };

  const handleProstheticsChange = (opt) => {
    handleChange('prostheticsFilter', opt);
  };

  const handleSortingChange = (value) => {
    let myFilter = ''; //내요청글
    let latestFilter = ''; //최신순
    let dedLineFilter = ''; //견적만료순

    setSortType(value);

    switch (value) {
      case 0:
        myFilter = 'Y';
        break;
      case 1:
        latestFilter = 'Y';
        break;
      case 2:
        dedLineFilter = 'Y';
        break;
    }
    setCurrentPage(1);
    setParams((prev) => ({
      ...prev,
      startRow: 0,
      pageCnt: perPage,
      myFilter,
      latestFilter,
      dedLineFilter,
    }));
  };

  const fetchProsthetics = async (requestFormNo, isMobile) => {
    const r = await getRequestProsthetics(requestFormNo);
    // console.log(r);
    const { data } = r;
    if (data?.requestList) setRequest(data.requestList);
    if (data?.prostheticsList) setProsthetics(data.prostheticsList);

    if (isMobile) {
      handleNav('/request/itemType', { request: data.requestList, prosthetics: data.prostheticsList });
    } else {
      setIsModal(true);
    }
  };

  const convertItem = (item) => {
    const cad = item.memberSwName?.split(',') ?? [];
    //진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청수락(치자이너)) -- 변경전
    //진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청거절(치자이너), I:치자이너 수락대기)
    return {
      requestFormNo: item.requestFormNo,
      title: item.requestFormSj,
      name: item.memberNickName,
      memberNo: item.memberNo,
      docCnt: item.requestDocCnt,
      deadlineDate: item.requestDeadlineDate,
      deadlineTime: item.requestDeadlineTimeHour + ':' + item.requestDeadlineTimeMin,
      expireDate: item.requestExpireDate,
      expireTime: item.requestExpireTimeHour + ':' + item.requestExpireTimeMin,
      registerDate: item.registerDt.split(' ')[0],
      registerTime: item.registerDt.split(' ')[1]?.substring(0, 5),
      statusName: item.requestStatusName,
      status: item.requestStatus,
      cads: cad.map((el) => ({ name: el })),
      detailUrl: `/request/view/${item.requestFormNo}`,
      onModalOpen: (isMobile) => {
        fetchProsthetics(item.requestFormNo, isMobile);
      },
      onMemberDetail: (e) => {
        handleNav(`/profile/view/${item.memberNo}`);
      },
      onDesignerDetail: (e) => {
        handleNav(`/profile/view/${item.designerNo}`);
      },
    };
  };

  const fetchReqeustForms = async () => {
    const r = await getRequestForms({ pathValue: 'A', params });
    const { data, statusCode } = r;
    // console.log(data);
    if (statusCode === 200) {
      setTotal(data?.cnt);
      setItems(data?.list.map((item) => convertItem(item)));
      setLoading(false);
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
    fetchReqeustForms();
  }, [params]);

  // useEffect(() => {
  //   if (navigationType === 'POP') {
  //     const prev = JSON.parse(sessionStorage.getItem(location.pathname));
  //     console.log(prev);
  //     const { sortType, total, currentPage, perPage, params, keyword } = prev;
  //     setSortType(sortType);
  //     setCurrentPage(currentPage);
  //     setParams(params);
  //     setKeyword(keyword);
  //   }
  // }, [navigationType]);

  // useEffect(() => {
  //   return () => {
  //     const prev = {
  //       sortType,
  //       total,
  //       currentPage,
  //       perPage,
  //       params,
  //       keyword,
  //       // items,
  //     };
  //     console.log('===>>', JSON.stringify(prev));
  //     sessionStorage.setItem(location.pathname, JSON.stringify(prev));
  //   };
  // }, [sortType, total, currentPage, perPage, params, keyword]);

  useEffect(() => {
    // console.log('navigationType', navigationType);
    // navigationType이 'POP'일 때만 동작하도록 설정
    if (navigationType === 'POP') {
      const prev = sessionStorage.getItem(location.pathname);
      // console.log('prev==>>>>', prev);
      if (prev) {
        const { sortType, total, currentPage, perPage, params, keyword } = JSON.parse(prev);

        setSortType(sortType || ''); // 기본값 제공
        setCurrentPage(currentPage || 1); // 기본 페이지
        setParams(params || {});
        setKeyword(keyword || '');
      }
    }
  }, [navigationType, location.pathname]); // location.pathname도 의존성에 추가

  useEffect(() => {
    // 컴포넌트가 언마운트되거나 값이 변경될 때 상태 저장
    return () => {
      const prev = {
        sortType: sortType || '', // 값이 없을 경우를 대비한 기본값
        total: total || 0, // 기본값 제공
        currentPage: currentPage || 1,
        perPage: perPage || 10, // 기본 페이지 크기
        params: params || {},
        keyword: keyword || '',
      };

      // console.log('Saving state to sessionStorage:', JSON.stringify(prev));
      sessionStorage.setItem(location.pathname, JSON.stringify(prev));
    };
  }, [sortType, total, currentPage, perPage, params, keyword, location.pathname]);

  return {
    isLoading,
    isModal,
    setIsModal,
    prosthetics,
    request,
    stss,
    sortingItems,
    sortringInput,
    sortType,
    handleSortingChange,
    items,
    handleProstheticsChange,
    handleChange,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    user,
  };
};
