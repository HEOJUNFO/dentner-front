import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import { useNav } from '@components/hooks';
import { useEffect, useState } from 'react';
import { getRequestProfile, postRequestBlock } from '@api/Request';
import { useTranslation } from 'react-i18next';

const useProfileDetailPage = () => {
  const { t, i18n } = useTranslation();
  const { actions, callback } = ModalStore();
  const { user } = UserStore();
  const { handleNav, params } = useNav();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  const [pathValue, setPathValue] = useState('');

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isMine, setIsMine] = useState(false);

  /** 프로필 수정하기 */
  const handleModifly = () => {
    handleNav('/mypage/modify');
  };

  const handleAddBlock = async (e) => {
    const r = await postRequestBlock(data.memberNo);

    const { data: dt } = r;
    if (Boolean(Number(dt))) {
      setIsModal2(false);
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text1'), btnName: t('base.confirm'), callback: () => handleNav(-1) });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const r = await getRequestProfile(pathValue);
      const { data } = r;
      if (!data) {
        alert('탈퇴한 회원입니다')
        handleNav(-1);
        return;
      }
      const cad = data.memberSwName?.split(',') ?? [];
      const cads = cad.map((el) => ({ name: el }));
      // console.log(r);
      if (data) {
        setData({ ...data, cads: cads });
        setLoading(false);
      } else {
        // TODO 잘못된접근 화면 처리
        handleNav(-1);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const moreItems = [
    {
      name: t('disigner.block'),
      onClick: () => {
        setIsModal(true);
      },
    },
    {
      name: t('disigner.report'),
      onClick: () => {
        setIsModal2(true);
      },
    },
  ];

  useEffect(() => {
    if (!pathValue) return;
    fetchData();
  }, [pathValue]);

  useEffect(() => {
    if (params?.id) {
      if (user.memberNo == params?.id) {
        setIsMine(true);
      }
      setPathValue(params?.id);
    }
  }, []);

  return {
    isLoading,
    error,
    user,
    data,
    handleModifly,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isMine,
    moreItems,
    handleAddBlock,
  };
};

export default useProfileDetailPage;
