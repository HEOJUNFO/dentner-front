import React, { useEffect, useRef, useState } from 'react';
import { getRequestForms, getRequestProsthetics } from '@api/Request';
import { useNav } from '@components/hooks';
import sampleProfile from '@assets/images/no_user.png';
import UserStore from '@store/UserStore';
import { useTranslation } from 'react-i18next';

export const useRequestTarget = () => {
  const { t } = useTranslation();

  const { handleNav } = useNav();
  const { user } = UserStore();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [sortType, setSortType] = useState(0);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [params, setParams] = useState({
    keyword: '',
    prostheticsFilter: '',
    statusFilter: '',
    myFilter: 'Y',
    latestFilter: sortType === 0 ? 'Y' : '',
    oldFilter: sortType === 1 ? 'Y' : '',
    startRow: 0,
    pageCnt: perPage,
  });

  const [keyword, setKeyword] = useState('');

  const [items, setItems] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const [request, setRequest] = useState([]);
  const [prosthetics, setProsthetics] = useState([]);

  const stss =
    user?.memberSe === 'A'
      ? [
          { name: t('status.all'), value: '' },
          { name: t('status.wait_request'), value: 'I' },
          { name: t('status.trade'), value: 'C' },
          { name: t('status.complete'), value: 'D' },
        ]
      : [
          { name: t('status.all'), value: '' },
          { name: t('status.reviewing_request'), value: 'I' },
          { name: t('status.trade'), value: 'C' },
          { name: t('status.complete'), value: 'D' },
        ];

  const sortingItems = [
    { name: t('sort.by_newest'), value: 0 },
    { name: t('sort.by_oldest'), value: 1 },
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
    let latestFilter = ''; //최신순
    let oldFilter = ''; //견적만료순

    setSortType(value);

    switch (value) {
      case 0:
        latestFilter = 'Y';
        break;
      case 1:
        oldFilter = 'Y';
        break;
    }
    setCurrentPage(1);
    setParams((prev) => ({
      ...prev,
      startRow: 0,
      pageCnt: perPage,
      latestFilter,
      oldFilter,
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
    // console.log(item);
    const cad = item.memberSwName?.split(',') ?? [];
    //진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청수락(치자이너))
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
      designerProfileImage: item.designerProfileImage || sampleProfile,
      designerNickName: item.designerNickName,
      designerNo: item.designerNo,
      onMemberDetail: (e) => {
        handleNav(`/profile/view/${item.memberNo}`);
      },
      onDesignerDetail: (e) => {
        handleNav(`/profile/view/${item.designerNo}`);
      },
    };
  };

  const fetchReqeustForms = async () => {
    if (user?.memberSe === 'B') return;

    const r = await getRequestForms({ pathValue: 'B', params });
    const { data, statusCode } = r;

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
    params,
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
