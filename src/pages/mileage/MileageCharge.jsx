import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChargeModal from '../../components/ui/modal/ChargeModal';

const MileageCharge = () => {
  const navigate = useNavigate();

  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP' onClick={() => {
                    navigate(-1);
                  }}>이전</Link>
            </div>
            <div className='popupInPage'>
                <ChargeModal/>
            </div>
        </section>
    </>
  );
};

export default MileageCharge;