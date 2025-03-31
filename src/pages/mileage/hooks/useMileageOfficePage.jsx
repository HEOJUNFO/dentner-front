import UserStore from '@store/UserStore';
import { useEffect, useRef, useState } from 'react';
import { getDesignerMileage, getSettleList, getSettleMileage, postDesignerMileage } from '../../../api/Mileage';
import ModalStore from '@store/ModalStore';

const useMileageOfficePage = () => {
  const { actions } = ModalStore();
  const { user, mileage, setDesignerMileage } = UserStore();
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [tab, setTab] = useState(1);

  const [desiMileage, setDesiMileage] = useState({ mileageWon: 0, mileageDollar: 0 });
  const [settleMileage, setSettleMileage] = useState({ mileageWon: 0, mileageDollar: 0 });

  // 보유 마일리지 조회
  const fetchDesignerMileage = async () => {
    const r = await getDesignerMileage();
    if (r?.data) {
      setDesiMileage(r?.data);
      setDesignerMileage(r?.data?.mileageWon);
    }
  };

  //   정산 마일리지 조회
  const fetchSettleMileage = async () => {
    const r = await getSettleMileage();
    if (r?.data) {
      setSettleMileage(r?.data);
    }
  };

  const [isLock, setLock] = useState(false);

  //마일리지 정산
  const handleSettleMileage = async (body) => {
    // if (body.calculateAmount <= 0) {
    //   actions.setDoneAlert({ isVisible: true, title: '알림', contents: '정산할 금액이 없습니다.', btnName: '확인' });
    //   return;
    // }

    if (isLock) return;
    setLock(true);
    try {
      const r = await postDesignerMileage(body);
      // console.log(r)
      if (r.statusCode === 200) {
        setIsModal3(true);
        fetchSettleMileage();
      }
    } catch (e) {
    } finally {
      setLock(false);
    }
  };

  const handleTab = (tab) => {
    setTab(tab);
  };

  const fetch = () => {
    fetchDesignerMileage();
    fetchSettleMileage();
  };

  useEffect(() => {
    fetch();
  }, []);

  return {
    user,
    mileage,
    desiMileage,
    settleMileage,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    tab,
    handleTab,
    handleSettleMileage,
    fetchDesignerMileage,
    fetchSettleMileage,
    fetch,
  };
};

export default useMileageOfficePage;
