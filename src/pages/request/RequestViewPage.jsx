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
const RequestViewPage = () => {
  const navigate = useNavigate()
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
        <div className="viewBox">
          <h2>{t('request.detailview')}</h2>

          {/* 요청서 헤더 */}
          <RequestHeader {...data} onModify={handleModify} onRemove={handleRemove} isMine={isMine} setIsModal2={setIsModal2} />

          <div className="tvs">
            <article>
              <div className={`reQSummery ${data.requestFormSe === 'B' ? 'choiceCase' : ''}`}>
                <RequestProfile {...data} isMine={isMine} />

                <RequestDeadline {...data} />

                {/* 지정요청인 경우 지정 디자이너 프로필 노출 */}
                {data.requestFormSe === 'B' && <DesignerProfile designerNo={data?.requestDesignerNo} onNav={handleNav} />}
              </div>

              <div className="detail">
                {/* 카테고리, 보철종류/수량 */}
                <RequestCategoryAndProsthesis {...data} />
              </div>

              <div className="detail">
                {/* 요청사항 */}
                <RequestNote {...data} />
              </div>

              {/* 내 의뢰서 정보 */}
              {(data?.registerNo === user.memberNo ) &&  <RequestMyInfo {...data} />}

              {user.memberSe === 'A' && data?.registerNo === user.memberNo && (
                <div className="btnArea mLineCase">
                  {/* {data.requestStatus === 'A' && <BaseButton label={'거래 취소하기'} className={'btnL'} onClick={handleRemove} />} */}
                  {(data.requestStatus === 'A' || data.requestStatus === 'B') && <BaseButton label={t('version2_2.text9')} className={'btnL'} disabled />}
                  {['C'].includes(data.requestStatus) && ['A', 'B'].includes(data.requestDealStatus) && <BaseButton label={t('version2_2.text9')} className={'btnL'} onClick={() => handleCancel(data)} />}
                  {['C'].includes(data.requestStatus) && ['C', 'D'].includes(data.requestDealStatus) && (
                    <BaseButton label={t('version2_2.text6')} className={'btnL'} onClick={() => handleCancelReq(data)} />
                  )}

                  {data?.requestFormSe === 'A' && (
                    <BaseButton label={t('version2_2.text5')} className={'btnB'} disabled={data?.requestDocCnt > 0 ? false : true} onClick={() => handleNav(`/payment/${data.requestFormNo}/designer`)} />
                  )} 
                </div>
              )}

              {user.memberSe === 'A' && data?.registerNo === user.memberNo && <RequestComment {...data} setIsModal2={setIsModal2} />}
              {user.memberSe === 'C' && <RequestComment {...data} setIsModal2={setIsModal2} />}
              {((user.memberSe === 'C' && data?.requestFormSe === 'A' && ['A', 'B'].includes(data?.requestStatus)) || isEstimated) && (
                <div className="btnArea">
                  <BaseButton label={isEstimated ? t('version2_2.text7') : t('version2_2.text8')} className={'btnB'} onClick={handleEstimatedPage} />
                </div>
              )}

              {/* {user.memberSe === 'C' && data?.requestFormSe === 'B' && data?.payStatus === 'Y' && data?.requestStatus === 'C' && data?.requestDealStatus === 'B' && (
                <div className="btnArea">
                  <BaseButton label={'거절하기'} className={'btnW'} onClick={() => setIsModal(true)} />
                  <BaseButton label={'수락하기'} className={'btnB'} onClick={handleAgree} />
                </div>
              )} */}
            </article>
          </div>
        </div>
      </section>

      {isModal && (
        <ModalPresent>
          <RejectModal
            onChange={(e) => setRejectContent(e.target.value)}
            member={{ nickName: data.memberNickName, profileImg: data.memberProfileImage }}
            onClose={() => {
              setRejectContent('');
              setIsModal(false);
            }}
            onReject={handleReject}
          />
        </ModalPresent>
      )}

      {isModal2 && (
        <ModalPresent>
          <ReportModal
            type={'B'}
            target={{ memberNo: data.registerNo, memberName: nameMaskingFormat(data.memberNickName || data.memberDentistryName), profileImage: data.memberProfileImage || defaultImg }}
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalPresent>
      )}

      {isCancelModal.visible && (
        <ModalPresent>
          <CancelModal {...isCancelModal.value} />
        </ModalPresent>
      )}

      {isCancelCallModal.visible && (
        <ModalPresent>
          <CancelCallModal {...isCancelCallModal.value} />
        </ModalPresent>
      )}

      {isRemoveModal.visible && (
        <ModalAlertPresent>
          <ReqDeleteAlert {...isRemoveModal.value} />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default RequestViewPage;
