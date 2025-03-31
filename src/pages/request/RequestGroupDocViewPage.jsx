import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseButton, ModalPresent, ModalAlertPresent } from '@components/common';
import { RejectModal, ReportModal, CancelModal, CancelCallModal, ReqDeleteAlert } from '@components/ui';
import { nameMaskingFormat } from '@utils/common';
import { useRequestViewPage } from './hooks/useRequestViewPage';
import RequestHeader from './components/RequestHeader';
import RequestProfile from './components/RequestProfile';
import RequestDeadline from './components/RequestDeadline';
import RequestCategoryAndProsthesis from './components/RequestCategoryAndProsthesis';
import RequestNote from './components/RequestNote';
import RequestMyInfo from './components/RequestMyInfo';
import RequestComment from './components/RequestComment';
import defaultImg from '@assets/images/no_user.png';
import DesignerProfile from './components/DesignerProfile';

/**
 * 의뢰서 상세
 * @returns
 */
const RequestGroupDocViewPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    isLoading,
    isEstimated,
    error,
    user,
    data,
    handleAgree,
    handleModify,
    handleRemove,
    handleEstimatedPage,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    setRejectContent,
    handleReject,
    isMine,
    handleNav,
    handleCancel,
    handleCancelReq,
    isCancelModal,
    isCancelCallModal,
    isRemoveModal,
  } = useRequestViewPage();

  if (isLoading) return <></>;
  if (error) return <>{error}</>;
  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            이전
          </Link>
        </div>
        <h2>{t('status.request_received')}</h2>
        <div className="viewBox">
          <div className="tvs">
            <article>
              {/* 내 의뢰서 정보 */}
              {data?.registerNo === user.memberNo && <RequestMyInfo className={'pt60'} {...data} />}
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestGroupDocViewPage;
