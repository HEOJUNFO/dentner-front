import { getChatRoom } from '@api/Chat';
import { postDesignerBlock } from '@api/Designer';
import { postRequestBlock } from '@api/Request';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import { useEffect, useState } from 'react';
import { useNav, useSnack } from '@components/hooks';
import { useTranslation } from 'react-i18next';

const useDesignerToPage = () => {
  const { t } = useTranslation();

  const { actions } = ModalStore();
  const { user, message, setMessage } = UserStore();
  const { handleNav, state } = useNav();

  const [isLoading, setLoading] = useState(false);
  const [listEditor, setListEditor] = useState(false);

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

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
    setIsModal({ visible: true, roomNo: checkedItems.join(',') });
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
      const r = await getChatRoom({ targetSe: 'A', memberSe: user?.memberSe, params });
      const { data, statusCode, message } = r;

      if (data) {
        setListEditor(false);

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
  }, [state?.targetSe]);

  useEffect(() => {
    if (message) {
      fetchChatRoom();
      setMessage(false);
    }
  }, [message]);

  return {
    fetchChatRoom,
    items,
    total,
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
    listEditor,
    setListEditor,
    handleLeave,
  };
};

export default useDesignerToPage;
