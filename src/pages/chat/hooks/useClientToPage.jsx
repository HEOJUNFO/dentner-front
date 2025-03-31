import { getChatRoom } from '@api/Chat';
import { postLaboratoryBlock } from '@api/Center';
import { postDesignerBlock } from '@api/Designer';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import { useEffect, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';

const useClientToPage = () => {
  const { t } = useTranslation();

  const { actions } = ModalStore();
  const { user, message, setMessage } = UserStore();
  const { handleNav, state } = useNav();

  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [isLoading, setLoading] = useState(false);
  const [target, setTarget] = useState();

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const [all, setAll] = useState(false);
  const [isModal, setIsModal] = useState({ visible: false });
  const [isModal2, setIsModal2] = useState({ visible: false });
  const [isModal3, setIsModal3] = useState({ visible: false });
  const [checkedItems, setCheckedItems] = useState([]);

  const moreItems = (item) => {
    return [
      {
        name: t('base.exit'),
        onClick: () => {
          setIsModal({ visible: true, roomNo: item.roomNo });
        },
      },
      {
        name: t('disigner.block'),
        onClick: () => {
          setIsModal2({
            visible: true,
            onBlock: () => {
              if (state?.targetSe === 'C') {
                handleAddBlockD(item.targetNo);
              } else {
                handleAddBlockC(item.targetNo);
              }
            },
          });
        },
      },
      {
        name: t('disigner.report'),
        onClick: () => {
          setIsModal3({ visible: true, target: { memberNo: item?.targetNo, memberName: item?.memberNickName, profileImage: item?.memberProfileImage, memberSe: state?.targetSe || 'B' } });
        },
      },
    ];
  };

  // 치기공소 차단
  const handleAddBlockC = async (memberNo) => {
    const r = await postLaboratoryBlock(memberNo);

    const { data: dt } = r;
    if (Boolean(Number(dt))) {
      setIsModal2({ visible: false, value: null });
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') }); //알림 차단되었습니다. 확인
    }
  };

  // 치자이너 차단
  const handleAddBlockD = async (memberNo) => {
    const r = await postDesignerBlock(memberNo);

    const { data } = r;
    if (Boolean(Number(data))) {
      setIsModal2({ visible: false, value: '' });
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') }); //알림 차단되었습니다. 확인
    }
  };

  const handleChecked = (checked, roomNo) => {
    if (checked) {
      setCheckedItems((prev) => [...prev, roomNo]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== roomNo));
    }
  };

  // 전체선택
  const handleAllChecked = (checked) => {
    setAll(checked);

    if (checked) {
      const room = items.map((el) => el.roomNo);
      setCheckedItems(room);
    } else {
      setCheckedItems([]);
    }
  };

  // 채팅방 나가기
  const handleLeave = () => {
    if (checkedItems.length === 0) {
      showWarnSnackbar(t('version2_1.text28')); //선택된 채팅방이 없습니다.
      return;
    }
    setIsModal({ visible: true, roomNo: checkedItems.join(',') });
  };

  // 채팅 목록
  const fetchChatRoom = async () => {
    try {
      const r = await getChatRoom({ targetSe: state?.targetSe || 'B', memberSe: user?.memberSe, params });
      const { data, statusCode, message } = r;

      if (data) {
        setItems(data?.list);
        setTotal(data?.cnt);
      }

      setTarget(state?.targetSe || 'B');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatRoom();
    setAll(false);
    setCheckedItems([]);
  }, [state?.targetSe]);

  useEffect(() => {
    if (message) {
      fetchChatRoom();
      setMessage(false);
    }
  }, [message]);

  return {
    fetchChatRoom,
    total,
    items,
    target,
    handleNav,
    moreItems,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    checkedItems,
    handleChecked,
    handleAllChecked,
    handleLeave,
    all,
  };
};

export default useClientToPage;
