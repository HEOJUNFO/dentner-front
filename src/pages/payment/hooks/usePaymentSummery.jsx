import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getTransactionStat } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import UserStore from '@store/UserStore';
import useWindowSize from '../../../components/hooks/useWindowSize';

const usePaymentSummery = () => {
  const isMobile = useWindowSize();
  const { user } = UserStore();
  const { showWarnSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [item, setItem] = useState();
  const [visible, setVisible] = useState(false);
  const fetchTransactionStat = async () => {
    try {
      const r = await getTransactionStat();
      const { data } = r;
      setItem(data);
      console.log(r.data);
    } catch (e) {
      setError('데이터 오류');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionStat();
  }, []);

  return { isLoading, error, item, isMobile, visible, setVisible };
};

export default usePaymentSummery;
