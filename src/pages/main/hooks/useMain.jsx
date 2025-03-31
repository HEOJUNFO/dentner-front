import React, { useEffect, useRef, useState } from 'react';
import { getMainBanner, getStatCnt } from '@api/Main';
import CodeStore from '@store/CodeStore';

export const useMain = () => {
  return {};
};

export const useMap = () => {
  const { codeList, actions, getters } = CodeStore();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const gettersCode = getters.getFilterCode('704');
    // console.log(gettersCode);
    setItems(gettersCode);
  }, []);

  return { items };
};

export const useUsed = () => {
  const [items, setItems] = useState();

  const fetchStatCnt = async () => {
    const r = await getStatCnt();
    const dt = r?.data;
    if (dt) {
      setItems(dt);
    }
  };

  useEffect(() => {
    fetchStatCnt();
  }, []);

  return { items };
};

export const useBanner = () => {
  const paginationRef = useRef(null);
  const [swiper, setSwiper] = useState();
  const [items, setItems] = useState([
    // {
    //   bannerNo: 1,
    //   bannerDesc: '배너설명',
    //   bannerTitle: '타이틀',
    //   bannerUrl: 'http://naver.com',
    //   bannerImage: 'https://s3.ap-northeast-2.amazonaws.com/dentner-bucket/db1be137-c83a-4bdb-9b22-002556ba358c.png',
    //   bannerOrdr: 1,
    //   showAt: 'N',
    //   registerDt: '2024-06-19 15:00:12',
    // },
    // {
    //   bannerNo: 2,
    //   bannerDesc: '배너설명2',
    //   bannerTitle: '타이틀1',
    //   bannerUrl: 'http://sports.naver.com',
    //   bannerImage: 'https://s3.ap-northeast-2.amazonaws.com/dentner-bucket/bcb1ab3a-32ed-40f3-affb-8be827401298.png',
    //   bannerOrdr: 2,
    //   showAt: 'N',
    //   registerDt: '2024-06-19 15:00:12',
    // },
  ]);

  const fetchBanner = async () => {
    const r = await getMainBanner();
    const dt = r?.data;
    if (dt) {
      setItems(dt);
    }
  };

  const handleLinkUrl = (bannerUrl) => {
    let url = '';
    if (!bannerUrl.includes('https') && !bannerUrl.includes('http')) {
      url = `#/${bannerUrl}`;
    } else {
      url = bannerUrl;
    }

    window.open(url, '_blank');
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  return { paginationRef, swiper, setSwiper, items, handleLinkUrl };
};
