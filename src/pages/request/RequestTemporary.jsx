import React from 'react';
import { Link, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import TemporaryModal from '../../components/ui/modal/TemporaryModal';

const RequestTemporary = () => {
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
                <TemporaryModal type={state?.type}/>
            </div>
        </section>
    </>
  );
};

export default RequestTemporary;