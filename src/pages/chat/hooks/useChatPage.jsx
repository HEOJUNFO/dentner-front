import UserStore from '@store/UserStore';
import { useNav, useSnack } from '@components/hooks';
import { useEffect, useState } from 'react';

const useChatPage = () => {
  const { user, setMessage } = UserStore();
  const { handleNav, state } = useNav();

  useEffect(() => {
    setMessage(false);
  }, []);

  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    if (tab === 1) {
      handleNav(`/chat`, { targetSe: 'B' });
    } else if (tab === 2) {
      handleNav(`/chat/designer`, { targetSe: 'C' });
    }
    setTab(tab);
  };

  useEffect(() => {
    if (user?.memberSe === 'C') {
      handleNav('/designerchat');
    } else if (user?.memberSe === 'B') {
      handleNav('/centerchat');
    }
  }, [user]);

  useEffect(() => {
    if (state?.targetSe === 'C') setTab(2);
    else setTab(1);
  }, [state?.targetSe]);

  return { handleNav, tab, handleTab };
};

export default useChatPage;
