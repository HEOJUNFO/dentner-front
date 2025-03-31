import { BaseButton, ModalPresent, ModalAlertPresent } from '@components/common';
import { RejectModal, RequestMiniInfo, ConfirmModal } from '@components/ui';
import { replaceToBr } from '@utils/common';
import DOMPurify from 'dompurify';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useContractRequestPage from './hooks/useContractRequestPage';
import { useTranslation } from 'react-i18next';

/**
 * 계약 요청서 페이지
 * @returns
 */
const ContractRequestPage = () => {
  const navigate = useNavigate();
  const { isLoading, error, id, data, isModal, setIsModal, handleReject, handleSubmit, setRejectContent, handleRequestConfirmModal, isConfirmModal, setIsConfirmModal } = useContractRequestPage();
  const { t } = useTranslation();
  if (isLoading) return <></>;
  if (error) return <>'error'</>;

  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            이전
          </Link>
        </div>
        <h2>{t('version2_2.text105')}</h2>
        <div className="viewBox subView">
          <div className="tvs">
            <article>
              <div className="detail">
                <div className="mBack">
                  <h4>
                    <strong>{t('base.request')}</strong>
                  </h4>
                  <div className="paragraph" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data.requestFormPayDc)) }}></div>
                </div>
              </div>

              <h3 className="pt60 lineCase">{t('version2_2.text51')}</h3>
              <RequestMiniInfo sw={data.requestSwName} reqTitle={data.requestFormSj} reqDesc={data.requestDocDesc} registerDt={data.registerDt} reqNo={id} />

              {data?.payStatus === 'Y' && data?.requestStatus === 'C' && data?.requestDealStatus === 'B' && (
                <div className="btnArea">
                  <BaseButton label={t('version2_2.text106')} className={'btnW'} onClick={() => setIsModal(true)} />
                  <BaseButton label={t('version2_2.text107')} className={'btnB'} onClick={() => handleRequestConfirmModal()} />
                </div>
              )}
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

      {isConfirmModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal
            {...isConfirmModal.value}
            onClose={() => {
              setIsConfirmModal({ visible: false, value: null });
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default ContractRequestPage;
