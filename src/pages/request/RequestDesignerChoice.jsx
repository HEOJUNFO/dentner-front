import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DesignerChoiceModal from '../../components/ui/modal/DesignerChoiceModal';

const RequestDesignerChoice = () => {
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
                <DesignerChoiceModal selectedDesigner={state?.selectedDesigner} params={state?.params} />
            </div>
        </section>
    </>
  );
};

export default RequestDesignerChoice;
