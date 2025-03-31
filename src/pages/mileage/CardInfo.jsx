import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CardModal from '../../components/ui/modal/CardModal';

const CardInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP' onClick={() => {
                    navigate(-1);
                  }}>이전</Link>
            </div>
            <div className='popupInPage'>
                <CardModal prev={state?.prev}/>
            </div>
        </section>
    </>
  );
};

export default CardInfo;