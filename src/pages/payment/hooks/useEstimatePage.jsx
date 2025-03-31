import React, { useEffect, useRef, useState } from 'react';
import { useNav } from '@components/hooks';
import { getEstimated, postTransaction } from '@api/Payment';
import { getDentalDesigner, postDesignerInterest, deleteDesignerInterest, postDesignerBlock } from '@api/Designer';
import sampleProfile from '@assets/images/sample/sample3.png';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';

export const useEstimatePage = () => {
  const { user } = UserStore();
  const { actions, callback } = ModalStore();

  const { handleNav, params: pathValue } = useNav();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [cads, setCads] = useState([]);
  const [data, setData] = useState();
  const [interest, setInterest] = useState(false);
  const [designer, setDesigner] = useState({
    memberNo: '',
    memberProfileImage: '',
    memberDentistryName: '',
    memberNickName: '',
    oneIntroduction: '',
    reviewCnt: '',
    reviewAvg: '',
    interestYn: '',
    prostheticsName: '',
    swNo: '',
    swNoName: '',
    swEtc: '',
    wonPrice: '',
    dollarPrice: '',
    note: '',
    modifyCnt: '',
    modifyDay: '',
    memberBusinessName: '',
    registerDt: '',
    imageList: [],
  });

  const [isModal, setIsModal] = useState({ visible: false, value: '' });
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [isModal4, setModal4] = useState({ isVisible: false });
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState();

  const handleSelectedDesigner = (e) => {
    setIsModal({ visible: true, value: { requestFormNo: data.requestFormNo, memberNo: designer.memberNo } });
  };

  const handleDesigner = async () => {
    const { requestFormNo, memberNo } = isModal.value;

    if (requestFormNo && memberNo) {
      const r = await postTransaction({ requestFormNo, memberNo });
      const { data } = r;
      if (Boolean(Number(data))) {
        setIsModal({ visible: false, value: '' });
        actions.setDoneAlert({ isVisible: true, title: '알림', contents: '치자이너 선택이 완료되었습니다.', btnName: '확인', callback: () => {} });
        return true;
      } else {
        actions.setDoneAlert({ isVisible: true, title: '알림', contents: '치자이너 선택 오류.', btnName: '확인', callback: () => {} });
        return true;
      }
    }
    return false;
  };

  const handleInterestChange = (e) => {
    if (e.target.checked) handleAddInterest();
    else handleRemoveInterest();
  };

  // 관심등록
  const handleAddInterest = async () => {
    const r = await postDesignerInterest(designer?.memberNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setInterest(true);
    }
  };

  // 관심삭제
  const handleRemoveInterest = async () => {
    const r = await deleteDesignerInterest(designer?.memberNo);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setInterest(false);
    }
  };

  // 차단하기
  const handleAddBlock = async (e) => {
    const r = await postDesignerBlock(designer.memberNo);

    const { data: dt } = r;
    if (Boolean(Number(dt))) {
      setIsModal2(false);
      actions.setDoneAlert({ isVisible: true, title: '알림', contents: '차단되었습니다.', btnName: '확인' });
      // handleNav('/designer');
      // handleNav(-1);
    }
  };

  const handleImageError = (e) => {
    e.target.src = sampleProfile;
  };

  const handleDetail = () => {
    // console.log(data);
    handleNav(`/request/view/${data?.requestFormNo}`);
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
      requestFormNo: item.requestFormNo,
      requestStatus: item.requestStatus,
      estimateSe: item.estimateSe,
    };
  };

  const fetchEstimated = async () => {
    try {
      const r = await getEstimated(pathValue?.id);

      const dt = r.data;
      if (dt) {
        setData(convertItme(dt));
        fetchDentalDesigner(dt.memberNo);
      }
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchDentalDesigner = async (id) => {
    const r = await getDentalDesigner(id);

    const { data, statusCode } = r;
    if (data) {
      if (data?.interestYn === 'Y') setInterest(true);
      else setInterest(false);
      setDesigner({ ...data });

      let cad = [];
      if (data.swNoName) cad = data.swNoName.split(',').map((el) => ({ name: el }));
      if (data.swEtc) cad.push({ name: '기타:' + data.swEtc });
      if (cad.length > 0) setCads(cad);
      if (data?.fileList?.length > 0) setFiles(data?.fileList);
    }
  };

  const handleThreeDView = () => {
    setModal4({ isVisible: true, fileList: file?.cadList });
  };

  useEffect(() => {
    if (pathValue?.id) {
      fetchEstimated();
    }
  }, [pathValue]);

  return {
    isLoading,
    error,
    data,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    designer,
    cads,
    handleDetail,
    handleImageError,
    handleSelectedDesigner,
    handleDesigner,
    handleAddBlock,
    handleInterestChange,
    interest,
    files,
    file,
    setFile,
    isModal4,
    setModal4,
    handleThreeDView,
  };
};
