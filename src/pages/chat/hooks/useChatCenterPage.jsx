import { getChatRoom } from '@api/Chat';
import UserStore from '@store/UserStore';
import { useEffect, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';

const useChatCenterPage = () => {
  const { user, setMessage } = UserStore();

  const { handleNav } = useNav();

  const [chatDetail, setChatDetail] = useState(false);
  const [type, setType] = useState(true);

  const handleChange = (bool) => {
    handleNav('/centerchat');
    setType(bool);
  };

  useEffect(() => {
    if (user?.memberSe === 'C') {
      setType(false);
    }
    setMessage(false);
  }, []);

  // useEffect(() => {
  //   handleNav('/centerchat');
  // }, [type]);

  return { chatDetail, type, setType, handleChange };
};

export default useChatCenterPage;
