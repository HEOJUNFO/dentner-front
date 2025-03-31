import { getMileage, getMileageCard } from '@api/Mileage';
import UserStore from '@store/UserStore';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../../../components/hooks/useWindowSize';
import useNav from '../../../components/hooks/useNavigate';

const useMileagePage = () => {
  const { user, mileage, setMileage } = UserStore();
  const navigate = useNavigate();
  const isMobile = useWindowSize();
  const { state } = useNav();
  const { t, i18n } = useTranslation();

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const refChargingDetail = useRef();

  const [card, setCard] = useState();

  const [isModal, setIsModal] = useState(false);
  const [isModal7, setIsModal7] = useState(false);
  const [isModal2, setIsModal2] = useState(false); // 마일리지충전모달
  const [isModal3, setIsModal3] = useState(false); // 카드저장모달

  const handleCharge = () => {
    if (isMobile) {
      navigate('/mileageCharge')
    } else {
      setIsModal2(true);
    }
  };

  // 내 마일리지 조회
  const fetchMileage = async () => {
    const r = await getMileage();
    if (r?.data) {
      setMileage(r?.data);
    }
  };

  // 등록 카드 조회
  const fetchCard = async () => {
    const r = await getMileageCard();
    const { data } = r;
    setCard(data);
  };

  useEffect(() => {
    fetchMileage();
    fetchCard();
  }, []);

  return { isLoading, isMobile, error, refChargingDetail, user, mileage, card, fetchCard, handleCharge, isModal, setIsModal, isModal2, setIsModal2, isModal3, setIsModal3, isModal7, setIsModal7, navigate };
};

export default useMileagePage;
