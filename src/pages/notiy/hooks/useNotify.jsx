import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserStore from '@store/UserStore';
import { getNotiList } from '@api/Mypage';
import { getNotiCnt, putAlarmRead, putAlarmReadAll } from '../../../api/Mypage';
import { useNav } from '@components/hooks';
import { NotiContext } from '../../../components/ui/layout/hooks/useContext';

export const useNotify = () => {
  const { user,  } = UserStore();
  const { handleNav } = useNav();
  const { setNotiCnt } = useContext(NotiContext);
  const [tab, setTab] = useState(1);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: 8,
    readAt: null,
    alarmSe: null,
  });
  const [sorting, setSorting] = useState(null);
  const [notiList, setNotiList] = useState([]);
  const [newsList, setNewsList] = useState([]);

  const fetchNotiCnt = async () => {
    let res = await getNotiCnt();
    if (res?.statusCode) {
      setNotiCnt(res.data);
    }
  };

  const fetchNotiList = async () => {
    let res = await getNotiList(params);
    if (res?.statusCode === 200) {
      // console.log("notiList",res?.data)
      setNotiList(res?.data);
    }
  };

  const fetchNewsList = async () => {
    let res = await getNotiList({
      ...params,
      alarmSe: 'C',
    });
    if (res?.statusCode === 200) {
      // console.log("newsList",res?.data)
      setNewsList(res?.data);
    }
  };

  useEffect(() => {
    console.log(params);
    fetchNewsList();
    fetchNotiList();
  }, [params, tab]);

  useEffect(() => {
    console.log(sorting);
    //if (!sorting ) return;

    switch (sorting) {
      case 0:
        setParams({ ...params, alarmSe: null });
        break;
      case 1:
        setParams({ ...params, alarmSe: 'A' });
        break;
      case 2:
        setParams({ ...params, alarmSe: 'B' });
        break;
      case 3:
        setParams({ ...params, alarmSe: 'D' });
        break;
      case 4:
        setParams({ ...params, alarmSe: 'E' });
        break;
      case 5:
        setParams({ ...params, alarmSe: 'F' });
        break;
    }
  }, [sorting]);

  const handleSingleRead = async (alarm) => {
    // 알림 구분 (A:채팅, B:받은견적, C:소식, D:거래적용, E:가입승인/거절, F:마일리지)
    // 댓글 추가 필요 -> 댓글이 등록된 해당 요청서 페이지


    const { alarmNo, alarmSe, alarmUrl } = alarm;
    let res = await putAlarmRead(alarmNo);
    if (res?.statusCode === 200) {
      fetchNotiList();
      fetchNewsList();
      fetchNotiCnt();
      //TODO: alarmSe, alarmUrl 해당 화면으로 이동해야함
      // handleNav(alarm?.alarmUrl);

      switch (alarmSe) {
        case 'A':
          // 해당 채팅 내역으로 이동
          if(user?.memberSe === 'A') {
            handleNav(`/chat`)
          } else {
            handleNav(`/centerchat`)
          }

          break;
        case 'B':
          // 치자이너가 보낸 견적 페이지
          break;
        case 'C':
          handleNav('/help/notice')
          break;
        case 'D':
          // 거래 상세내역 페이지 이동
          break;
        case 'E':

          break;
        case 'F': 
          handleNav('/mileage')
          break;
        default:
          console.log('handleSingleRead')
      }
    }
  };

  const handleRead = async (type) => {
    let res = await putAlarmReadAll(type);

    if (res?.statusCode === 200) {
      fetchNotiList();
      fetchNewsList();
      fetchNotiCnt();
    }
  };

  return { notiList, newsList, params, setParams, sorting, setSorting, tab, setTab, handleSingleRead, handleRead };
};
