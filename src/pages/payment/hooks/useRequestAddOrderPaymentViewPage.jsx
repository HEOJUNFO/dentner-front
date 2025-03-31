import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAddPay } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import UserStore from '@store/UserStore';

const useRequestAddOrderPaymentViewPage = () => {
  const { handleNav, params: pathValue } = useNav();
  const { showSnackbar } = useSnack();
  const { user } = UserStore();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [id, setId] = useState();

  const fetchPayInfo = async () => {
    try {
      const r = await getAddPay({ requestFormNo: id, memberSe: user?.memberSe });
      const { data: dt } = r;
      setData(dt);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchPayInfo();
  }, [id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  return { isLoading, error, data, id };
};

export default useRequestAddOrderPaymentViewPage;
