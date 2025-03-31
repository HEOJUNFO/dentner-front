import React, { useEffect, useRef, useState } from 'react';
import { useNav } from '@components/hooks';
import { getTeethType } from '@api/Common';
import UserStore from '@store/UserStore';
import { useNavigationType } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const useRequest = () => {
  const { user } = UserStore();
  const { t, i18n } = useTranslation();
  const navigationType = useNavigationType();

  const [isLoading, setLoading] = useState(true);
  const [tab, setTab] = useState(1);
  const [filterOpt, setFillterOpt] = useState([]);

  const handleTab = (tab) => {
    setTab(tab);
  };

  const fetchCode = async () => {
    const r = await getTeethType(i18n.language);
    const { data, statusCode, message } = r;

    if (data) {
      const upperCode = data.filter((el) => el.parentTypeNo === 0);
      setFillterOpt(upperCode);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCode();
  }, [i18n.language]);

  useEffect(() => {
    if (navigationType === 'POP') {
      const prev = sessionStorage.getItem('useRequest');

      setTab(Number(prev));
    }
  }, [navigationType]);

  useEffect(() => {
    return () => {
      sessionStorage.setItem('useRequest', tab);
    };
  }, [tab]);

  return { isLoading, tab, handleTab, filterOpt, user };
};
