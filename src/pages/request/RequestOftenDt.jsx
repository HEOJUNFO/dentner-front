import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import OftenDTModal from '../../components/ui/modal/OftenDTModal';

const RequestOftenDt = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link
            to=""
            className="bMP"
            onClick={() => {
              navigate(-1);
            }}
          >
            이전
          </Link>
        </div>
        <div className="popupInPage">
          <OftenDTModal type={state?.type} params={state?.params} />
        </div>
      </section>
    </>
  );
};

export default RequestOftenDt;
