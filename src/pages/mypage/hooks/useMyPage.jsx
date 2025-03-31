import React, { useEffect, useState } from 'react';
import axios from '@api/config/axios';
import { useTranslation } from 'react-i18next';
import { useNav } from '@components/hooks';
import UserStore from '@store/UserStore';
import sampleProfile from '@assets/images/no_user.png';
import { getMyinfo, getMyPageinfo, postDesignerProfile, putProfileType } from '@api/Mypage';
import { getDesignerMileage } from '@api/Mileage';
import { getDentalLaboratory } from '@api/Center';

const useMyPage = () => {
  const { user, login, permissions, setDesignerMileage } = UserStore();
  const { handleNav, pathname } = useNav();
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [centerInfo, setCenterInfo] = useState();

  // 개인정보 관리', '치과기공소 관리', '치자이너 관리', '거래이력 관리', '개인정보 업무위탁 계약 관리', '리뷰 관리', '알림 설정'
  const menus =
    user?.memberSe === 'B'
      ? [
          {
            id: 'mypage.tab1',
            value: 1,
            desc: t('mypage.personal_info'),
            url: '/mypage',
            onClick: () => {
              // setTab(1);
              handleNav('/mypage');
            },
          },
          {
            id: 'mypage.tab2',
            value: 2,
            desc: t('mypage.block_client'),
            url: '/mypage/client',
            onClick: () => {
              // setTab(2);
              handleNav('/mypage/client');
            },
          },
          {
            id: 'mypage.tab7',
            value: 3,
            desc: t('mypage.noti'),
            url: '/mypage/noti',
            onClick: () => {
              // setTab(5);
              handleNav('/mypage/noti');
            },
          },
        ]
      : user?.memberSe === 'C'
        ? [
            {
              id: 'mypage.tab1',
              value: 1,
              desc: t('mypage.personal_info'),
              url: '/mypage',
              onClick: () => {
                // setTab(1);
                handleNav('/mypage');
              },
            },
            {
              id: 'mypage.tab2',
              value: 2,
              desc: t('mypage.block_client'),
              url: '/mypage/client',
              onClick: () => {
                // setTab(2);
                handleNav('/mypage/client');
              },
            },
            {
              id: 'mypage.tab4',
              value: 3,
              desc: t('mypage.transaction_history'),
              url: '/mypage/payment',
              onClick: () => {
                // setTab(4);
                handleNav('/mypage/payment');
              },
            },
            {
              id: 'mypage.tab6',
              value: 4,
              desc: t('mypage.received_review'),
              url: '/mypage/review',
              onClick: () => {
                // setTab(5);
                handleNav('/mypage/review');
              },
            },
            {
              id: 'mypage.tab7',
              value: 5,
              desc: t('mypage.noti'),
              url: '/mypage/noti',
              onClick: () => {
                // setTab(5);
                handleNav('/mypage/noti');
              },
            },
          ]
        : [
            {
              id: 'mypage.tab1',
              value: 1,
              desc: t('mypage.personal_info'),
              url: '/mypage',
              onClick: () => {
                // setTab(1);
                handleNav('/mypage');
              },
            },
            {
              id: 'mypage.tab2',
              value: 2,
              desc: t('mypage.dentalLab'),
              url: '/mypage/center',
              onClick: () => {
                // setTab(2);
                handleNav('/mypage/center');
              },
            },
            {
              id: 'mypage.tab3',
              value: 3,
              desc: t('mypage.dental_designer'),
              url: '/mypage/designer',
              onClick: () => {
                // setTab(3);
                handleNav('/mypage/designer');
              },
            },
            {
              id: 'mypage.tab4',
              value: 4,
              desc: t('mypage.transaction_history'),
              url: '/mypage/payment',
              onClick: () => {
                // setTab(4);
                handleNav('/mypage/payment');
              },
            },
            {
              id: 'mypage.tab6',
              value: 5,
              desc: t('mypage.review'),
              url: '/mypage/review',
              onClick: () => {
                // setTab(5);
                handleNav('/mypage/review');
              },
            },
            // { id: 'mypage.tab5', value: 5, desc: '개인정보 업무위탁 계약 관리' },
            // { id: 'mypage.tab6', value: 6, desc: '리뷰 관리' },
            {
              id: 'mypage.tab7',
              value: 6,
              desc: t('mypage.noti'),
              url: '/mypage/noti',
              onClick: () => {
                // setTab(5);
                handleNav('/mypage/noti');
              },
            },
          ];

  useEffect(() => {
    const v = menus.filter((el) => el.url === pathname)[0]?.value;
    // console.log(v);
    setTab(v);
  }, [pathname]);

  useEffect(() => {
    if (userInfo) setLoading(false);
  }, [userInfo]);

  useEffect(() => {
    fetchMyInfo();
  }, []);

  const fetchMyInfo = async () => {
    if (!user) {
      handleNav('/login');
      return;
    }

    const r = await getMyinfo();
    const { data } = r;
    // console.log('getMyinfo=============> data11', data);

    if (data) {
      let cad = [];
      if (data.swNoName) cad = data.swNoName.split(',').map((el) => ({ name: el }));
      if (data.swEtc) cad.push({ name: '기타:' + data.swEtc });

      setUserInfo({ memberNickName: user.memberNickName, profileImg: user.memberProfileImage || sampleProfile, cad });
    }
  };

  useEffect(() => {
    if (user?.memberSe === 'B') {
      fetchDentalLaboratory(user?.memberNo);
    }
  }, [user]);

  // 치기공소 상세 조회
  const fetchDentalLaboratory = async (id) => {
    const r = await getDentalLaboratory(id);

    const { data, statusCode } = r;
    if (data) setCenterInfo({ ...data });
  };

  // 보유 마일리지 조회회
  const fetchDesignerMileage = async () => {
    const r = await getDesignerMileage();
    if (r?.data) {
      return r?.data?.mileageWon;
    } else {
      return 0;
    }
  };

  const handleProfileType = async (isCenter) => {
    try {
      const res = await putProfileType();
      const { data } = res;

      const { accessToken, grantType, refreshToken } = data;

      // 액세스 토큰을 로컬 스토리지에 저장
      sessionStorage.setItem('token', accessToken);

      // 리프레시 토큰을 쿠키에 저장
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; HttpOnly`;

      // 이후 요청에 사용할 수 있도록 Axios 인스턴스의 헤더에 설정
      axios.defaults.headers.common.Authorization = `${grantType} ${accessToken}`;

      const m = await fetchDesignerMileage();

      login({ userData: { ...data.userInfo, memberMileage: m }, userPermissions: permissions });

      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleAddDesigner = async () => {
    try {
      const res = await postDesignerProfile();
      const res2 = await getMyPageinfo();
      const { data } = res2;
      login({ userData: { ...user, multiProfileCnt: data?.multiProfileCnt }, userPermissions: permissions });
    } catch (error) {
      throw error;
    }
  };

  return { isLoading, userInfo, menus, tab, user, handleProfileType, handleAddDesigner, centerInfo };
};

export default useMyPage;
