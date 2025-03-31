import React, { useEffect, useRef, useState } from 'react';
import { useNav } from '@components/hooks';
import { getRequestDesignerEstimated } from '@api/Request';
import UserStore from '@store/UserStore';

export const useRequestMyEstimatePage = () => {
  const { user } = UserStore();

  const { handleNav, params: pathValue } = useNav();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [file, setFile] = useState();
  const [isModal4, setModal4] = useState({ isVisible: false });

  const handleDetail = () => {
    handleNav(`/request/view/${pathValue?.id}`);
  };

  const convertItme = (item) => {
    return {
      title: item?.requestFormSj || '',
      desc: item?.requestDocDesc || '',
      sw: item.requestSwName?.split(',')?.map((el) => ({ name: el })),
      registerDt: item.registerDt,
      typeList: item.prostheticsList,
      estimateAmount: item.estimateAmount,
      estimateCn: item.estimateCn,
      imageList: item.imageList,
      estimateDate: item.estimateDate,
      estimateTimeHour: item.estimateTimeHour,
      estimateTimeMin: item.estimateTimeMin,
      fileList: item?.fileList || [],
    };
  };

  const fetchRequestAfterEstimated = async () => {
    try {
      const r = await getRequestDesignerEstimated(pathValue?.id);

      const { data: dt } = r;
      if (dt) {
        setData(convertItme(dt));
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const handleThreeDView = () => {
    setModal4({ isVisible: true, fileList: file?.cadList });
  };

  useEffect(() => {
    if (pathValue?.id) {
      fetchRequestAfterEstimated();
    }
  }, [pathValue]);

  return { isLoading, data, handleDetail, setFile, handleThreeDView, isModal4, setModal4 };
};
