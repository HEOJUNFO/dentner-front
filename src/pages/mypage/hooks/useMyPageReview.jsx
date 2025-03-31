import { useNav } from '@components/hooks';
import UserStore from '@store/UserStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMyReview, deleteMyReview } from '@api/Mypage';

const useMyPageReview = () => {
  const { user } = UserStore();
  const { handleNav, pathname } = useNav();
  const { t, i18n } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState({
    startRow: 0,
    pageCnt: perPage,
  });

  const [isConModal, setConModal] = useState({
    visible: false,
    value: '',
  });

  // 리뷰삭제 모달
  const handleRemove = (el) => {
    setConModal({
      visible: true,
      value: {
        title: t('version2_4.text51'), //'리뷰 삭제',
        doneContents: t('version2_4.text52'), //'리뷰 삭제되었습니다.',
        failContetns: t('version2_4.text53'), //'리뷰삭제 오류',
        contents: t('version2_4.text54'), //'리뷰 삭제하시겠습니까?',
        btnCancel: t('version2_1.text3'), //'취소',
        btnConfirm: t('base.confirm'), //'확인',
        onConfirm: () => removeMyReview(el.reviewNo),
        onClose: () => setConModal({ visible: false, value: '' }),
      },
    });
  };

  // 리뷰삭제
  const removeMyReview = async (reviewNo) => {
    try {
      const r = await deleteMyReview(reviewNo);
      const { data } = r;
      if (Number(data) > 0) {
        fetchMyReview();
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  // 리뷰 수정
  const handleModify = (el) => {
    handleNav(`/payment/review/${el.reviewNo}`, { mode: 'modify' });
  };

  // 리뷰 목록 조회
  const fetchMyReview = async () => {
    let data = { ...params, reviewSe: user?.memberSe === 'C' ? 'B' : 'A' };
    try {
      // setLoading(true);

      const r = await getMyReview(data);
      const { cnt, list } = r.data;
      setTotal(cnt);
      setItems(list);
    } catch (e) {
      setError('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const startRow = (currentPage - 1) * perPage;
    setParams((prevParams) => {
      if (prevParams.startRow !== startRow || prevParams.pageCnt !== perPage) {
        return {
          ...prevParams,
          startRow,
          pageCnt: perPage,
        };
      }
      return prevParams;
    });
  }, [currentPage, perPage]);

  useEffect(() => {
    fetchMyReview();
  }, [params]);

  return { user, isLoading, error, isConModal, items, total, perPage, currentPage, setCurrentPage, handleRemove, handleModify };
};

export default useMyPageReview;
