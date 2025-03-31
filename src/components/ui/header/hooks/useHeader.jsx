import { useEffect, useRef, useState } from 'react';
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
  const [socketConnected, setSocketConnected] = useState(false);

  const toggleDrawer = () => {
    setisOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (user) setLogin(true);
    else setLogin(false);
  }, [user]);

  const [input, setInput] = useState('');
  const client = useRef(null);
  const reconnectTimer = useRef(null);

  // 서버 URL을 설정하세요 (WebSocket 서버 URL로 대체)
  const SOCKET_URL = import.meta.env.VITE_WS_URL;

  let reconnectAttempts = 0;
  const MAX_RECONNECT_ATTEMPTS = 5; // 재연결 시도 횟수 감소
  const RECONNECT_DELAY = 5000; // 5초

  // 연결 성공 시 호출되는 함수
  const onConnected = () => {
    console.log('WebSocket 연결 성공');
    reconnectAttempts = 0; // 연결 성공 시 카운터 초기화
    setSocketConnected(true);
    
    if (user && user.memberNo) {
      client.current.subscribe(`/topic/updates/${user.memberNo}`, onMessageReceived);
    }
  };

  // 연결 오류 시 호출되는 함수
  const onError = (error) => {
    console.error('WebSocket 연결 실패:', error);
    setSocketConnected(false);
    
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      console.log(`재연결 시도 ${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS}`);
      
      // 이전 타이머 정리
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      
      reconnectTimer.current = setTimeout(() => {
        reconnectAttempts += 1;
        connectWebSocket();
      }, RECONNECT_DELAY);
    } else {
      console.log('최대 재연결 시도 횟수에 도달했습니다.');
    }
  };

  // 메시지 수신 시 호출되는 함수
  const onMessageReceived = (message) => {
    setMessage(true);
  };

  const connectWebSocket = () => {
    if (!user || !user.memberNo) return;
    
    try {
      // 기존 연결 정리
      if (client.current && client.current.connected) {
        client.current.disconnect();
      }
      
      console.log('WebSocket 연결 시도:', SOCKET_URL);
      
      // SockJS 옵션 설정
      // 웹소켓 팩토리 함수 생성 (자동 재연결 지원을 위해)
      const socketFactory = () => {
        const sockOptions = {
          transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
          timeout: 10000 // 연결 타임아웃 10초로 설정
        };
        return new SockJS(SOCKET_URL, null, sockOptions);
      };
      
      // 최신 Stomp.js API를 사용하여 클라이언트 생성
      client.current = Stomp.over(socketFactory);
      
      // 디버깅 로그 비활성화 (빈 함수 사용)
      client.current.debug = () => {};
      
      // 연결 설정
      const connectHeaders = {};
      client.current.connect(connectHeaders, onConnected, onError);
    } catch (e) {
      console.error('WebSocket 초기화 오류:', e);
      onError(e);
    }
  };

  // STOMP 클라이언트 설정
  useEffect(() => {
    if (!user) return;
    
    connectWebSocket();
    
    // 컴포넌트 언마운트 시 정리
    return () => {
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      
      if (client.current) {
        client.current.disconnect();
      }
      
      setSocketConnected(false);
    };
  }, [user]);

  return { 
    location, 
    navigate, 
    login, 
    isOpen, 
    setisOpen, 
    toggleDrawer, 
    user, 
    mileage, 
    designerMileage,
    socketConnected // 소켓 연결 상태 추가
  };
};