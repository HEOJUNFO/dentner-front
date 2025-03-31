import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getContractDoc, putDocReceive } from '@api/Payment';
import { useNav } from '@components/hooks';

const useRequestReceivePage = (requestType) => {
  const { handleNav, params: pathValue } = useNav();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [items, setItems] = useState([]);

  const fetchContractDoc = async () => {
    try {
      const r = await getContractDoc(pathValue.id);
      console.log('getContractDoc==============>', r)
      const { data } = r;

      // if (data) {
      //   setItems(data);
      // }
      if (data?.length > 0) {
        setItems(data);
      } else {
        alert('잘못된 진입입니다.');
        handleNav(-1);
      }
      // console.log(r);
    } catch (e) {
      // console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const docReceiveSubmit = async () => {
    const r = await putDocReceive(pathValue.id, requestType);
    // console.log(r);
  };

  useEffect(() => {
    if (pathValue?.id) {
      docReceiveSubmit();
    }
  }, []);

  useEffect(() => {
    if (pathValue?.id) fetchContractDoc();
  }, [pathValue]);

  return { isLoading, error, items };
};

export default useRequestReceivePage;
