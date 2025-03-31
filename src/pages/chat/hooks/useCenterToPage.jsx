import { getChatRoom } from '@api/Chat';
import { postRequestBlock } from '@api/Request';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import { useEffect, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';

const useCenterToPage = ({ typeProps }) => {
  const { t } = useTranslation();

  const { actions } = ModalStore();
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const { user, message, setMessage } = UserStore();
  const { handleNav, state } = useNav();

  const [isLoading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const [listEditor, setListEditor] = useState(false);

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
          setIsModal2({ visible: true, onBlock: () => handleAddBlock(item.targetNo) });
        },
      },
      {
        name: t('disigner.report'),
        onClick: () => {
          setIsModal3({ visible: true, target: { memberNo: item?.targetNo, memberName: item?.memberNickName, profileImage: item?.memberProfileImage } });
        },
      },
    ];
  };

  const handleAddBlock = async (memberNo) => {
    const r = await postRequestBlock(memberNo);

    const { data } = r;
    if (Boolean(Number(data))) {
      setIsModal2({ visible: false });
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm') }); //알림 차단되었습니다. 확인
    }
  };

  const fetchChatRoom = async () => {
    try {
      const r = await getChatRoom({ targetSe: 'A', memberSe: typeProps?.type ? 'B' : 'C', params });
      const { data, statusCode, message } = r;

      if (data) {
        setItems(data?.list);
        setTotal(data?.cnt);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatRoom();
  }, [state?.targetSe, typeProps?.type]);

  useEffect(() => {
    if (message) {
      fetchChatRoom();
      setMessage(false);
    }
  }, [message]);

  const handleChecked = (checked, roomNo) => {
    if (checked) {
      setCheckedItems((prev) => [...prev, roomNo]);
    } else {
      setCheckedItems(checkedItems.filter((el) => el !== roomNo));
    }
  };

  const handleAllChecked = (checked) => {
    if (checked) {
      const room = items.map((el) => el.roomNo);
      setCheckedItems(room);
    } else {
      setCheckedItems([]);
    }
  };

  const handleLeave = () => {
    if (checkedItems.length === 0) {
      showWarnSnackbar(t('version2_1.text28')); //선택된 채팅방이 없습니다.
      return;
    }
    setIsModal({ visible: true, roomNo: checkedItems.join(',') });
  };

  return {
    total,
    fetchChatRoom,
    items,
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
    listEditor,
    setListEditor,
  };
};

export default useCenterToPage;
