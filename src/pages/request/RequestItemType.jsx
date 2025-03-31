import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ItemTypeModal from '../../components/ui/modal/ItemTypeModal';

const RequestItemType = () => {
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
                <ItemTypeModal request={state?.request} prosthetics={state?.prosthetics}/>
            </div>
        </section>
    </>
  );
};

export default RequestItemType;
