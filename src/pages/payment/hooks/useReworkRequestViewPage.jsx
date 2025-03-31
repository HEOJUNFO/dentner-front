import React, { useEffect, useRef, useState } from 'react';
import { getRemaking } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import CodeStore from '@store/CodeStore';
import UserStore from '@store/UserStore';

const useReworkRequestViewPage = () => {
  const { getters } = CodeStore();
  const { user } = UserStore();
  const { handleNav, params: pathValue } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [id, setId] = useState();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const [files, setFiles] = useState([]);

  const fetchRemaking = async () => {
    try {
      const r = await getRemaking(id);
      const { data: dt } = r;
      if (dt) {
        setData(dt);
      }
      console.log(r);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchRemaking();
  }, [id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  return { isLoading, error, data, pathValue };
};

export default useReworkRequestViewPage;
