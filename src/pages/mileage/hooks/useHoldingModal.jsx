import UserStore from '@store/UserStore';
import { useEffect, useRef, useState } from 'react';
import { getDesignerMileage, getSettleList, getSettleMileage, postDesignerMileage } from '../../../api/Mileage';

const useHoldingModal = () => {
  const [amount, setAmount] = useState({})

  const fetchExpectedAmount = async () => {
    const r = await getDesignerMileage();
   
    if (r?.data) {
        setAmount(r?.data);
    }
  };

  useEffect(() => {
    fetchExpectedAmount();
  }, []);

  return { amount };
};

export default useHoldingModal;
