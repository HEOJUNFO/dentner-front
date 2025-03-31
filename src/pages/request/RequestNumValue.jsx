import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NumValueModal from '../../components/ui/modal/NumValueModal';

const RequestNumValue = () => {
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
          <NumValueModal params={state?.params} />
        </div>
      </section>
    </>
  );
};

export default RequestNumValue;
