import {
  deleteDesignerInterest,
  getDentalDesigner,
  getDentalDesignerReviewList,
  postDesignerBlock,
  postDesignerInterest
} from '@api/Designer';
import sampleProfile from '@assets/images/sample/sample3.png';
import { useNav } from '@components/hooks';
import ModalStore from '@store/ModalStore';
import UserStore from '@store/UserStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const useDesignerViewPage = () => {
  const { t } = useTranslation();

  const { actions } = ModalStore();
  const { user } = UserStore();
  const { handleNav, params, navigationType, navigate } = useNav();

  const [isLoading, setLoading] = useState(true);

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [isModal4, setModal4] = useState({ isVisible: false });

  const [isMine, setMine] = useState(false);

  const [file, setFile] = useState();

  const [id, setId] = useState(null);
  const [interest, setInterest] = useState(false);
  const [cads, setCads] = useState([]);
  const [data, setData] = useState({
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

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [reviewParams, setReviewParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });


  const moreItems = [
    // ...(user.memberSe === 'A'
    //   ? [
    //       {
    //         name: '링크복사',
    //         onClick: () => {
    //           setIsModal(true);
    //         },
    //       },
    //     ]
    //   : []),
    {
      name: t('disigner.block'),
      onClick: () => {
        setIsModal2(true);
      },
    },
    {
      name: t('disigner.report'),
      onClick: () => {
        setIsModal3(true);
      },
    },
  ];

  // 관심등록
  const handleAddInterest = async () => {
    const r = await postDesignerInterest(id);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setInterest(true);
    }
  };

  // 관심삭제
  const handleRemoveInterest = async () => {
    const r = await deleteDesignerInterest(id);
    const dt = Number(r.data);
    if (Boolean(dt)) {
      setInterest(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = sampleProfile;
  };

  const handleInterestChange = (e) => {
    if (e.target.checked) handleAddInterest();
    else handleRemoveInterest();
  };

  // 3d 상세보기
  const handleThreeDView = () => {
    // cadList가 있다면 viewer.js에서 필요한 속성 이름으로 매핑
    const mappedFiles = file?.cadList ? file.cadList.map(item => ({
      threeFileNo: item.fileNo,
      threeFileUrl: item.fileUrl,
      threeFileRealName: item.fileRealName || item.fileName
    })) : [];

    // 모달 상태 설정
    setModal4({ 
      isVisible: true, 
      fileList: mappedFiles 
    });
  };


  // 치자이너 차단
  const handleAddBlock = async (e) => {
    const r = await postDesignerBlock(data.memberNo);

    const { data: dt } = r;
    if (Boolean(Number(dt))) {
      setIsModal2(false);
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') }); //알림 차단되었습니다. 확인
      // handleNav('/designer');
      handleNav(-1);
    }
  };

  const fetchDentalDesigner = async () => {
    const r = await getDentalDesigner(id);

    const { data, statusCode } = r;
    if (data) {
      setData({ ...data });

      if (data?.memberNo === user.memberNo) setMine(true);
      else setMine(false);
    } else {
      alert('탈퇴된 회원입니다.')
      handleNav(-1);
    }

    setLoading(false);
  };

  const fetchReviewList = async () => {
    const r = await getDentalDesignerReviewList(id, reviewParams)
    //console.log(r)
    const { cnt, list } = r.data;
    setTotal(cnt);
    setItems(list);
    //setItems(data?.list);
  }

  useEffect(() => {
    if (data.interestYn === 'Y') setInterest(true);
    else setInterest(false);

    let cad = [];
    if (data.swNoName) cad = data.swNoName.split(',').map((el) => ({ name: el }));
    if (data.swEtc) cad.push({ name: t('version2_1.text31') + ':' + data.swEtc }); //기타
    if (cad.length > 0) setCads(cad);
  }, [data]);


  useEffect(() => {
    if (!id) return;
    fetchDentalDesigner();
    fetchReviewList()
  }, [id]);

  useEffect(() => {
    if (params?.id) setId(params?.id);
  }, []);

  return {
    isLoading,
    user,
    data,
    cads,
    interest,
    moreItems,
    handleInterestChange,
    handleImageError,
    handleAddBlock,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    isMine,
    isModal4,
    setModal4,
    setFile,
    handleThreeDView,
    items,total, currentPage, perPage,setCurrentPage
  };
};

export default useDesignerViewPage;
