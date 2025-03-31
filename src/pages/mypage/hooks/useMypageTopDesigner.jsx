import React, { useEffect, useState } from 'react';
import { getMyinfo } from '@api/Mypage';
import CodeStore from '@store/CodeStore';

const useMypageTopDesigner = () => {
  const [data, setData] = useState();

  const [profileImg, setProfileImg] = useState();
  const [files, setFiles] = useState([]);
  const [cadfiles, setCadfiles] = useState([]);

  const [cads, setCads] = useState([]);

  const [isDollar, setIsDollar] = useState(false);

  const fetchMyInfo = async () => {
    const r = await getMyinfo();
    const { data } = r;

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

      console.log(data?.fileList);
      const cads = data?.fileList?.map((el) => {
        return {
          fileName: el.fileRealName,
          fileSize: el.fileSize,
          type: 'server',
          fileNo: el.fileNo,
          fileUrl: el.fileUrl,
          cadFile: el?.cadList,
        };
      });

      setCadfiles(cads);

      let cad = [];
      if (data.swNoName) cad = data.swNoName.split(',').map((el) => ({ name: el }));
      if (data.swEtc) cad.push({ name: '기타:' + data.swEtc });
      if (cad.length > 0) setCads(cad);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return { data, files, cadfiles, profileImg, cads, isDollar, setIsDollar };
};

export default useMypageTopDesigner;
