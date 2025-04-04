import { useEffect, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import { getRequestMyInfo, deleteRequestDoc, getRequestJson } from '@api/Request';
import UserStore from '@store/UserStore';

/**
 * pathValue.id : requestDocGroupNo
 * @returns
 */
export const useRequestMyInfoPage = () => {
  const { user } = UserStore();

  const { handleNav, params: pathValue } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [cads, setCads] = useState([]);
  const [typeCountData, setTypeCountData] = useState(null);

  const [isMine, setIsMine] = useState(false);

  // 의뢰서정보 조회
  const fetchRequest = async () => {
    try {
      // pathValue.id : requestDocGroupNo
      const r = await getRequestMyInfo(pathValue?.id);

      const { data } = r;
      // console.log(data);
      if (data?.length > 0) {
        const dt = data[0];

        if (dt.registerNo === user.memberNo) setIsMine(true);

        if (dt) {
          let cad = [];
          if (dt.swName) cad = dt.swName.split(',').map((el) => ({ name: el }));
          if (dt.swEtc) cad.push({ name: '기타:' + dt.swEtc });
          if (cad.length > 0) setCads(cad);

          setData(dt);
          
          // 상세 JSON 데이터 가져오기
          fetchTypeCountData(pathValue?.id);
        }
      } else {
        alert('잘못된 진입입니다.');
        handleNav(-1);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  
  // typeCount 데이터 가져오기
  const fetchTypeCountData = async (requestDocGroupNo) => {
    try {
      const response = await getRequestJson(requestDocGroupNo);
      if (response?.data?.requestJsonDc) {
        const jsonData = JSON.parse(response.data.requestJsonDc);
        
        // typeCount 데이터 추출
        if (jsonData[0]?.typeList?.value?.length > 0) {
          const typeCounts = jsonData[0].typeList.value.map(item => item.typeCount);
          setTypeCountData(typeCounts);
        }
      }
    } catch (e) {
      console.error('typeCount 데이터 가져오기 실패:', e);
    }
  };

  // 의뢰서 수정화면
  const handleModify = (e) => {
    if (data?.requestSe === 'A') {
      handleNav('/request/easymode', { requestDocGroupNo: pathValue?.id });
    } else if (data?.requestSe === 'B') {
      handleNav('/request/detailmode', { requestDocGroupNo: pathValue?.id });
    }
  };

  // 의뢰서 삭제
  const handleRemove = async (e) => {
    try {
      const r = await deleteRequestDoc(pathValue?.id);

      if (r.data) {
        showSnackbar('의뢰서 삭제 완료');
        handleNav('/request/basket');
        // handleNav('request/basket', { requestDocGroupNo: pathValue?.id });
      }
    } catch (e) {
      showWarnSnackbar('네트워크 오류입니다.');
    }
  };

  useEffect(() => {
    if (pathValue?.id) fetchRequest();
  }, [pathValue]);

  return { isLoading, error, data, user, cads, isMine, handleModify, handleRemove, pathValue, typeCountData };
};