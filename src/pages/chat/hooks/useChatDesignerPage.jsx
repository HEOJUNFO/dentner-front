import { getChatRoom } from '@api/Chat';
import UserStore from '@store/UserStore';
import { useEffect, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';

const useChatDesignerPage = () => {
  const { user, setMessage } = UserStore();
  const { handleNav, state } = useNav();

  const [isLoading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  useEffect(() => {
    if (user?.multiProfileCnt === 2) {
      handleNav('/centerchat');
    }

    setMessage(false);
  }, []);

  const fetchChatRoom = async () => {
    try {
      const r = await getChatRoom({ targetSe: 'A', memberSe: user?.memberSe, params });
      const { data, statusCode, message } = r;

      if (data) {
        setItems(data?.list);
        setTotal(data?.cnt);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatRoom();
  }, [state?.targetSe]);

  return { items, handleNav };
};

export default useChatDesignerPage;
