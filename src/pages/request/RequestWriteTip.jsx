import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InquireTipModal from '../../components/ui/modal/InquireTipModal';

const RequestWriteTip = () => {
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
                <InquireTipModal />
            </div>
        </section>
    </>
  );
};

export default RequestWriteTip;
