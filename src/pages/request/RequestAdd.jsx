import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReqAddModal from '../../components/ui/modal/ReqAddModal';

const RequestAdd = () => {
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
                <ReqAddModal selectedReqs={state?.selectedReqs} params={state?.params} type={state?.type}/>
            </div>
        </section>
    </>
  );
};

export default RequestAdd;
