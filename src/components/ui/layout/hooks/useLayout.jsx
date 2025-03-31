import React, { useEffect, useState, useCallback } from 'react';
import ModalStore from '@store/ModalStore';
import UserStore from '@store/UserStore';
import { getNotiCnt } from '../../../../api/Mypage';
import { useLocation } from 'react-router-dom';

const useLayout = () => {
  const { pathname } = useLocation();
  const { user } = UserStore();
  const { isAlertPresent, doneAlert, callback, actions, isLoading } = ModalStore();
  const [notiCnt, setNotiCnt] = useState(0);

  const handleClose = () => {
    actions.resetDoneAlert();
    if (callback) {
      const fn = callback;
      actions.resetCallback();
      fn();
    }
  };

  const fetchNotiCnt = async () => {
    let res = await getNotiCnt();
    if (res?.statusCode) {
      setNotiCnt(res.data);
    }
  };

  useEffect(() => {
    if (user) fetchNotiCnt();
  }, [pathname]);

  return { isAlertPresent, doneAlert, handleClose, notiCnt, setNotiCnt, isLoading };
};

export default useLayout;
