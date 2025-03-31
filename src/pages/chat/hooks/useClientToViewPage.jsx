import { getChatRoomDetail } from '@api/Chat';
import { fileUpload } from '@api/Common';
import { postLaboratoryBlock, deleteLaboratoryInterest, postLaboratoryInterest } from '@api/Center';
import { deleteDesignerInterest, postDesignerBlock, postDesignerInterest } from '@api/Designer';

import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import { useEffect, useRef, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { format } from 'date-fns';

import { useTranslation } from 'react-i18next';

const useClientToPage = () => {
  const { t } = useTranslation();
  const [roomMember, setRoomMember] = useState([]);
  const [isConn, setConn] = useState(false);

  const { actions } = ModalStore();
  const { user } = UserStore();
  const { handleNav, state, params: p } = useNav();

  const [isLoading, setLoading] = useState(false);
  const [target, setTarget] = useState();
  const fileInput = useRef();

  const messageEndRef = useRef();

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const [isModal, setIsModal] = useState({ visible: false });
  const [isModal2, setIsModal2] = useState({ visible: false });
  const [isModal3, setIsModal3] = useState({ visible: false });

  const moreItems = (item) => {
    return [
      {
        name: t('base.exit'),
        onClick: () => {
          setIsModal({ visible: true, roomNo: item.roomNo });
        },
      },
      {
        name: t('disigner.block'),
        onClick: () => {
          setIsModal2({
            visible: true,
            onBlock: () => {
              if (state?.targetSe === 'C') {
                handleAddBlockD(item.targetNo);
              } else {
                handleAddBlockC(item.targetNo);
              }
            },
          });
        },
      },
      {
        name: t('disigner.report'),
        onClick: () => {
          setIsModal3({ visible: true, target: { memberNo: item?.targetNo, memberName: item?.memberNickName, profileImage: item?.memberProfileImage, memberSe: state?.targetSe || 'B' } });
        },
      },
    ];
  };

  const handleInterest = (checked) => {
    if (checked) {
      if (state?.targetSe === 'C') {
        handleAddInterestD();
      } else {
        handleAddInterestC();
      }
    } else {
      if (state?.targetSe === 'C') {
        handleRemoveInterestD();
      } else {
        handleRemoveInterestC();
      }
    }
  };

  // B 치기공소, C 치자이너
  const handleDetailProfile = (target) => {
    if (target?.targetSe === 'B') {
      handleNav(`/centerView/${target?.targetNo}`);
    } else if (target?.targetSe === 'C') {
      handleNav(`/designer/view/${target?.targetNo}`);
    }
  };

  // 치기공소 관심등록
  const handleAddInterestC = async () => {
    const r = await postLaboratoryInterest(target.targetNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setTarget((prev) => ({ ...prev, interestYn: 'Y' }));
    }
  };

  // 치기공소 관심해제
  const handleRemoveInterestC = async () => {
    const r = await deleteLaboratoryInterest(target.targetNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setTarget((prev) => ({ ...prev, interestYn: 'N' }));
    }
  };

  // 치자이너 관심등록
  const handleAddInterestD = async () => {
    const r = await postDesignerInterest(target.targetNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setTarget((prev) => ({ ...prev, interestYn: 'Y' }));
    }
  };

  // 치자이너  관심삭제
  const handleRemoveInterestD = async () => {
    const r = await deleteDesignerInterest(target.targetNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setTarget((prev) => ({ ...prev, interestYn: 'N' }));
    }
  };

  // 치기공소 차단
  const handleAddBlockC = async (memberNo) => {
    const r = await postLaboratoryBlock(memberNo);

    const { data: dt } = r;
    if (Boolean(Number(dt))) {
      setIsModal2({ visible: false, value: null });
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') }); //알림 차단되었습니다. 확인
    }
  };

  // 치자이너 차단
  const handleAddBlockD = async (memberNo) => {
    const r = await postDesignerBlock(memberNo);

    const { data } = r;
    if (Boolean(Number(data))) {
      setIsModal2({ visible: false, value: '' });
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') }); //알림 차단되었습니다. 확인
    }
  };

  const fetchChatRoomDetail = async () => {
    try {
      const r = await getChatRoomDetail({ roomId: p?.roomId, params });
      const { data, statusCode, message } = r;

      if (data) {
        setItems(data?.list);
        setTotal(data?.cnt);

        // setTimeout(() => {
        //   messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
        // }, 1000);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatRoomDetail();
  }, []);

  useEffect(() => {
    if (state) setTarget({ ...state, moreItems: moreItems(state) });
  }, [state]);

  const [input, setInput] = useState('');
  const client = useRef(null);

  // 서버 URL을 설정하세요 (WebSocket 서버 URL로 대체)
  // const SOCKET_URL = 'http://115.144.235.93:4140/ws';
  const SOCKET_URL = import.meta.env.VITE_WS_URL;

  // STOMP 클라이언트 설정
  useEffect(() => {
    try {
      const socket = new SockJS(SOCKET_URL); // WebSocket 연결
      client.current = Stomp.over(socket);

      client.current.connect({}, onConnected, onError);
      // 컴포넌트가 언마운트될 때 연결 해제
      return () => {
        if (client.current) {
          setConn(false);
          initMessage('Unconnected');

          client.current.disconnect();
        }
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  let reconnectAttempts = 0;
  const MAX_RECONNECT_ATTEMPTS = 10;

  const reconnect = () => {
    if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      setTimeout(() => {
        reconnectAttempts += 1;
        client.current.connect({}, onConnected, onError); // 재연결 시도
      }, 5000); // 5초 후에 재연결 시도
    } else {
      console.log('Max reconnect attempts reached. Stopping...');
    }
  };

  // 연결 성공 시 호출되는 함수
  const onConnected = () => {
    client.current.subscribe(`/topic/chat/${p?.roomId}`, onMessageReceived); // 채팅방 구독

    initMessage('Connected');
  };

  // 연결 오류 시 호출되는 함수
  const onError = (error) => {
    console.error('Could not connect to WebSocket server. Please refresh this page to try again!', error);
    reconnect();
  };

  // 메시지 수신 시 호출되는 함수
  const onMessageReceived = (message) => {
    const receivedMessage = JSON.parse(message.body);

    if (receivedMessage?.msgType === '0') {
      if (receivedMessage?.msg === 'Connected') {
        setRoomMember((prev) => {
          if (prev.includes(receivedMessage.fromNo)) return [...prev];
          else return [...prev, receivedMessage.fromNo];
        });
      } else {
        setRoomMember((prev) => {
          const p = prev.filter((p) => p != receivedMessage.fromNo);
          return [...p];
        });
      }
    }

    setItems((prev) => [...prev, { ...receivedMessage, postType: receivedMessage.fromNo == user.memberNo ? 'me' : '' }]);

    // setTimeout(() => {
    //   messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight;
    // }, 1000);
  };

  // 오전/오후를 한글로 변환하는 함수
  const formatWithKoreanAMPM = (date) => {
    const hours = format(date, 'HH'); // 24시간 형식의 시간
    const timePeriod = Number(hours) < 12 ? t('version2_1.text29') : t('version2_1.text30'); //오전:오후
    const formattedTime = format(date, 'hh:mm'); // 12시간 형식의 시간
    return `${timePeriod} ${formattedTime}`;
  };

  const initMessage = (msg) => {
    if (!isConn) {
      const message = {
        messageTime: formatWithKoreanAMPM(new Date()),
        fromNo: user.memberNo,
        toNo: '',
        memberSe: user.memberSe,
        memberNickName: user?.memberNickName,
        msg,
        msgType: '0',
      };
      if (client.current && client.current.connected) {
        client.current.send(`/app/chat/${p?.roomId}`, {}, JSON.stringify(message)); // 서버로 메시지 전송
      }
    }
  };

  // 메시지 전송 함수
  const sendMessage = async () => {
    if ((input.trim() !== '' || selectedFile) && client.current.connected) {
      let _fileUrl = null;
      let _fileRealName = null;
      let fileType = null;
      let msgType = 1;

      if (selectedFile) {
        // 파일 타입 (확장자 또는 MIME 타입 추출)
        fileType = selectedFile.type;

        const { fileUrl, fileName } = await uploadFile(selectedFile);
        if (!fileUrl) {
          console.error('파일 업로드에 실패했습니다.');
          return; // 파일 업로드 실패 시 메시지 전송 중단
        }
        _fileUrl = fileUrl;
        _fileRealName = fileName;
        if (fileType.startsWith('image/')) {
          msgType = '3'; // 이미지
        } else {
          msgType = '2'; // 일반 파일
        }
      }

      const message = {
        messageTime: formatWithKoreanAMPM(new Date()),
        fromNo: user.memberNo,
        toNo: target.targetNo,
        memberSe: user.memberSe,
        memberNickName: user?.memberNickName,
        msg: input,
        msgType: msgType,
        fileUrl: _fileUrl,
        readYn: roomMember.length === 2 ? 'Y' : 'N',
        fileSize: selectedFile?.size,
        fileName: _fileRealName,
        fileRealName: selectedFile?.name,
      };

      client.current.send(`/app/chat/${p?.roomId}`, {}, JSON.stringify(message)); // 서버로 메시지 전송
      setInput(''); // 입력창 초기화
      if (selectedFile) {
        if (fileInput.current) fileInput.current.value = '';
        setSelectedFile(null);
      }
    }
  };

  const [selectedFile, setSelectedFile] = useState(null); // 파일 상태 추가

  // 파일 선택 처리
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file); // 파일 상태 업데이트
  };

  const fileProgress = (p) => {
    actions.setReceived(p);
  };

  // 파일 업로드 처리 함수
  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      actions.setLoading(true);
      const r = await fileUpload(formData, fileProgress);

      if (r.statusCode === 200) {
        return r.data;
      } else {
        throw new Error('파일 업로드 실패');
      }
      // if (response.ok) {
      //   return ''; // 서버에서 반환하는 파일 URL
      // }
    } catch (error) {
      console.error('파일 업로드 중 오류 발생:', error);
      return null;
    } finally {
      actions.setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      if (fileInput.current) fileInput.current.value = '';
    }
  }, [selectedFile]);

  useEffect(() => {
    if (roomMember.length === 2) {
      initMessage('Connected');
      setConn(true);
    }
  }, [roomMember]);

  return {
    items,
    target,
    handleNav,
    input,
    setInput,
    sendMessage,
    messageEndRef,
    handleFileChange,
    selectedFile,
    setSelectedFile,
    fileInput,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    handleInterest,
    roomMember,
    fetchChatRoomDetail,
    handleDetailProfile,
  };
};

export default useClientToPage;
