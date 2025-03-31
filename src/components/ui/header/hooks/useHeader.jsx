import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserStore from '@store/UserStore';

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useHeader = () => {
  const { user, mileage, designerMileage, setMessage } = UserStore();

  const location = useLocation();
  const navigate = useNavigate();

  const [login, setLogin] = useState(false);
  const [isOpen, setisOpen] = useState(false);

  const toggleDrawer = () => {
    setisOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (user) setLogin(true);
    else setLogin(false);
  }, [user]);

  useEffect(() => {
    if (login) {
    }
  }, [login]);

  const [input, setInput] = useState('');
  const client = useRef(null);

  // 서버 URL을 설정하세요 (WebSocket 서버 URL로 대체)
  const SOCKET_URL = import.meta.env.VITE_WS_URL;

  // STOMP 클라이언트 설정
  useEffect(() => {
    if (!user) return;
    try {
      const socket = new SockJS(SOCKET_URL); // WebSocket 연결
      client.current = Stomp.over(socket);

      client.current.connect({}, onConnected, onError);
      // 컴포넌트가 언마운트될 때 연결 해제
      return () => {
        if (client.current) {
          client.current.disconnect();
        }
      };
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  let reconnectAttempts = 0;
  const MAX_RECONNECT_ATTEMPTS = 10;

  const reconnect = () => {
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      setTimeout(() => {
        // console.log(`Reconnecting... attempt ${reconnectAttempts + 1}`);
        reconnectAttempts += 1;
        client.current.connect({}, onConnected, onError); // 재연결 시도
      }, 5000); // 5초 후에 재연결 시도
    } else {
      console.log('Max reconnect attempts reached. Stopping...');
    }
  };

  // 연결 성공 시 호출되는 함수
  const onConnected = () => {
    // console.log('Connected');
    client.current.subscribe(`/topic/updates/${user.memberNo}`, onMessageReceived); // 채팅방 구독
  };

  // 연결 오류 시 호출되는 함수
  const onError = (error) => {
    console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
    reconnect();
  };

  // 메시지 수신 시 호출되는 함수
  const onMessageReceived = (message) => {
    // const receivedMessage = JSON.parse(message.body);
    // setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    setMessage(true);
  };

  return { location, navigate, login, isOpen, setisOpen, toggleDrawer, user, mileage, designerMileage };
};
