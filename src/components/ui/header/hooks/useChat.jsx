import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserStore from '@store/UserStore';

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const client = useRef(null);

  // 서버 URL을 설정하세요 (WebSocket 서버 URL로 대체)
  const SOCKET_URL = 'ws://192.168.0.174:4140';

  // STOMP 클라이언트 설정
  useEffect(() => {
    console.log(111);
    // const socket = new SockJS(SOCKET_URL); // WebSocket 연결
    // client.current = Stomp.over(socket);

    // client.current.connect({}, onConnected, onError);

    // // 컴포넌트가 언마운트될 때 연결 해제
    // return () => {
    //   if (client.current) {
    //     client.current.disconnect();
    //   }
    // };
  }, []);

  // 연결 성공 시 호출되는 함수
  const onConnected = () => {
    console.log('Connected');
    client.current.subscribe('/topic/public', onMessageReceived); // 채팅방 구독
  };

  // 연결 오류 시 호출되는 함수
  const onError = (error) => {
    console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
  };

  // 메시지 수신 시 호출되는 함수
  const onMessageReceived = (message) => {
    const receivedMessage = JSON.parse(message.body);
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  // 메시지 전송 함수
  const sendMessage = () => {
    if (input.trim() !== '' && client.current.connected) {
      const message = {
        sender: 'User', // 사용자 정보 (예: 사용자 이름)
        content: input,
        timestamp: new Date(),
      };
      client.current.send('/app/chat.sendMessage', {}, JSON.stringify(message)); // 서버로 메시지 전송
      setInput(''); // 입력창 초기화
    }
  };

  return { client };
};
