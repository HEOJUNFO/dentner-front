import sampleProfile from '@assets/images/no_user.png';
import { BaseButton, Pagenation, ModalAlertPresent } from '@components/common';
import { ConfirmModal } from '@components/ui';
import { ratingToMessage } from '@utils/common';
import React, { useState } from 'react';
import useMyPageReview from './hooks/useMyPageReview';
import { ModalPresent } from '@components/common';
import ReportModal from '../../components/ui/modal/ReportModal';
import { useTranslation } from 'react-i18next';
import ReviewMsg from "@pages/mypage/components/ReviewMsg.jsx";

const ReviewMgtPage = () => {
  const { t } = useTranslation();
  const { user, isLoading, error, isConModal, items, total, perPage, currentPage, setCurrentPage, handleRemove, handleModify } = useMyPageReview();
  const [isModal, setIsModal] = useState(false);
  const [reportTarget, setReportTarget] = useState({});

  const handleReport = (t) => {
    setReportTarget({ type: 'C', target: t, targetType: 'D', targetNo: t?.reviewNo });
    setIsModal(true);
  };

  if (isLoading) return <></>;
  return (
    <>
      <article>
        <div className="mypageBox">
          <div className="listTit">
            <h3>{t('mypage.review')}</h3>
          </div>
          <div className="reviewList">
            <ul>
              {items.map((item, idx) => {
                // item.registerDt
                const datePart = item.registerDt ? item.registerDt.split(' ')[0] : '';
                const timePart = item.registerDt ? item.registerDt.split(' ')[1].substring(0, 5) : '';

                return (
                  <li key={`reviewList_${idx}`}>
                    <span className="profileImg">
                      <img src={item.memberProfileImage || sampleProfile} />
                    </span>
                    <div className="back">
                      <div className="userInfo">
                        <span className="nick">
                          <span>{user?.memberSe === 'A' ? t('base.dental_designer') : t('faq.client')}</span>
                          <strong>{item.memberNickName}</strong>
                        </span>
                        <span className="time">
                          {datePart} <span>{timePart}</span>
                        </span>
                      </div>
                      <div className="historyInfo">
                        <div>
                          <span className="dRating">
                            <span>
                              {/* <i>평가</i> */}
                              <i>{t('version2_1.text34')}</i>
                              <em>{item.reviewRate}</em>
                            </span>
                            <ReviewMsg rating={item.reviewRate}/>
                            {/*<strong>{ratingToMessage(item.reviewRate)}</strong>*/}
                          </span>
                          <p>{item.reviewCn}</p>
                          {item.fileList.length > 0 && (
                            <ol>
                              {item.fileList.map((el, idx) => {
                                return (
                                  <li key={`fileList_${idx}`}>
                                    <img src={el.fileUrl} />
                                  </li>
                                );
                              })}
                            </ol>
                          )}
                        </div>
                        <span className="postEdit">
                          {user?.memberSe === 'A' ? (
                            // <BaseButton label={'수정'} onClick={() => handleModify(item)} />
                            <BaseButton label={t('version2_2.text2')} onClick={() => handleModify(item)} />
                          ) : (
                            // <BaseButton style={{ color: '#FF6969' }} label={'신고'} onClick={() => handleReport(item)} />
                            <BaseButton style={{ color: '#FF6969' }} label={t('version2_4.text50')} onClick={() => handleReport(item)} />
                          )}
                          <span>
                            {/* <BaseButton label={'삭제'} onClick={() => handleRemove(item)} /> */}
                            <BaseButton label={t('version2_2.text3')} onClick={() => handleRemove(item)} />
                          </span>
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
        </div>
      </article>

      {isConModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal {...isConModal.value} />
        </ModalAlertPresent>
      )}

      {isModal && (
        <ModalPresent>
          <ReportModal
            {...reportTarget}
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default ReviewMgtPage;
