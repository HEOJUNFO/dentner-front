import { getMyinfo } from '@api/Mypage';
import { getDentalLaboratory } from '@api/Center';
import { useEffect, useState } from 'react';

const useMypageTopCenter = () => {
  const [data, setData] = useState();
  const [centerInfo, setCenterInfo] = useState();

  const [profileImg, setProfileImg] = useState();
  const [files, setFiles] = useState([]);

  const [items, setItems] = useState([]);

  const fetchMyInfo = async () => {
    const r = await getMyinfo();
    const { data } = r;
    console.log('getMyinfo=============> data', data);

    if (data) {
      setData(data);
      const files = data?.imageList?.map((el) => {
        return {
          fileName: el.fileRealName,
          fileSize: el.fileSize,
          type: 'server',
          fileNo: el.fileNo,
          fileUrl: el.fileUrl,
        };
      });
      setFiles(files);
      setProfileImg(data?.memberProfileImage);

      // let cad = [];
      // if (data.swNoName) cad = data.swNoName.split(',').map((el) => ({ name: el }));
      // if (data.swEtc) cad.push({ name: '기타:' + data.swEtc });
      // if (cad.length > 0) setCads(cad);

      fetchDentalLaboratory(data?.memberNo);
    }
  };

  const fetchDentalLaboratory = async (id) => {
    const r = await getDentalLaboratory(id);

    const { data, statusCode } = r;
    if (data) {
      setCenterInfo(data);

      const i = [];
      i.push(data?.allOnName);
      i.push(data?.correctName);
      i.push(data?.fixProstheticsName);
      i.push(data?.removableProstheticsName);

      setItems(
        i
          .join(',')
          .split(',')
          ?.filter((el) => el !== '')
          ?.map((el) => ({ name: el }))
      );
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return { data, files, profileImg, centerInfo, items };
};

export default useMypageTopCenter;
