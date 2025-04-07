import { useEffect, useState } from 'react';
import { getTransactions, get3d, delete3d, post3dAlarmTalk } from '@api/Payment';
import { useNav, useSnack } from '@components/hooks';
import UserStore from '@store/UserStore';

/**
 * id: requestFormNo
 * @returns
 */
const useCADCommsPage = () => {
  const { user } = UserStore();
  const { handleNav, params: pathValue } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [items, setItems] = useState([]);
  const [id, setId] = useState();

  const [checkedItems, setCheckedItems] = useState([]);
  const [isAllChecked, setAllChecked] = useState(false);

  const [isClick, setClick] = useState(false);
  const [isUploadModal, setUploadModal] = useState(false);
  const [isModal, setModal] = useState({ isVisible: false });
  const [isConfirmModal, setIsConfirmModal] = useState({ visible: false, value: '' });

  // 거래내역 조회
  const fetchTransaction = async () => {
    try {
      const r = await getTransactions({ params: { requestFormNo: id, memberSe: user.memberSe } });

      const { data: dt } = r;
      if (dt.list.length === 0) {
        showWarnSnackbar('요청서 조회 실패');
        handleNav(-1);
      } else {
        const { requestStatus, requestRemakingNo, requestDealStatus, estimate3dYn } = dt?.list[0];
        fetch3d();
        if (requestStatus === 'C' && requestDealStatus === 'D' && estimate3dYn === 'Y') {
          // 버튼 활성화
          setClick(true);
        }
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  // stl 파일 목록 조회
  const fetch3d = async () => {
    const r = await get3d(id);
    if (r?.data) {
      setItems(r?.data);
    }
  };

  // 삭제
  const handleRemove = async () => {
    const r = await delete3d(checkedItems.join(','));
    if (Boolean(Number(r.data))) {
      fetch3d();
      setAllChecked(false);
    }
  };

  // 3d 뷰어
  const handleViewer = (item) => {
    setModal({ isVisible: true, ...item });
  };

  const handleCheck = (e, item) => {
    if (e.target.checked) {
      const arr = [...checkedItems, item?.threeInfoNo];

      if (items.length > 0 && arr.length === items.length) setAllChecked(true);
      setCheckedItems(arr);
    } else {
      const arr = checkedItems.filter((threeInfoNo) => threeInfoNo != e.target.value);
      setCheckedItems(arr);
      setAllChecked(false);
    }
  };

  const handleAllCheck = (e) => {
    if (e.target.checked) {
      const checked = items.map((item) => {
        return item.threeInfoNo;
      });
      setCheckedItems(checked);
      setAllChecked(true);
    } else {
      setCheckedItems([]);
      setAllChecked(false);
    }
  };

  // 알림전송
  const handleNoti = async () => {
    const r = await post3dAlarmTalk({ requestFormNo: id, memberSe: user?.memberSe });
    if (Boolean(Number(r?.data))) {
      showSnackbar('확인요청 알림을 보냈습니다.');
      handleNav(-1);
    } else {
      showWarnSnackbar('네트워크 오류');
    }
  };

  const handelUpload = () => {
    if (items.length > 4) {
      showWarnSnackbar('최대 5개까지 가능합니다. 기존 데이터를 삭제 후 진행해주세요.');
      return;
    }
    setUploadModal(true);
  };

  useEffect(() => {
    if (!id) return;
    fetchTransaction();
  }, [id]);

  useEffect(() => {
    if (pathValue?.id) setId(pathValue?.id);
  }, [pathValue]);

  return {
    isLoading,
    error,
    items,
    isClick,
    user,
    id,
    isUploadModal,
    setUploadModal,
    isModal,
    setModal,
    handleViewer,
    handleCheck,
    checkedItems,
    handleRemove,
    isConfirmModal,
    setIsConfirmModal,
    handleAllCheck,
    isAllChecked,
    handelUpload,
    handleNav,
    handleNoti,
    fetch3d,
  };
};

export default useCADCommsPage;
