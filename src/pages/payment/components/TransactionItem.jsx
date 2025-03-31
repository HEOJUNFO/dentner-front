import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Pagenation, BaseInput, BaseSelect, BaseButton, ModalPresent, ModalAlertPresent } from '@components/common';
import { CancelModal, CancelCallModal, ConfirmModal } from '@components/ui';
import useTransactionItem from '../hooks/useTransactionItem';
import { replaceToBr, withCommas } from '@utils/common';
import { useTranslation } from 'react-i18next';
import { dateFormat, timeFormat } from '@utils/DateUtil';
import useChat from '@components/hooks/useChat';

/**
 * 의뢰인 요청서 상태
 * @param {*} param0
 * @returns
 */
const TransactionItem = ({
  isDetail, // 상세여부
  requestFormNo,
  payStatus, // 결제여부
  estimateReceiveYn, // 의뢰서수령여부
  estimate3dYn, // 3d 뷰어 소통여부
  addPayStatus, // 추가금요청여부
  reviewYn, // 리뷰작성여부
  statusName,
  status,
  dealStatusName,
  dealStatus,
  docCnt,
  title,
  registerDate,
  registerTime,
  requestType,
  deadlineDate,
  deadlineTime,
  expireDate,
  expireTime,
  designer,
  requestPayCn, // 추가금요청사유
  requestPayDt, // 추가금요청일자
  requestRemakingDate, // 재제작요청일자
  requestRemakingTime, // 재제작요청일자
  requestRemakingNo, // 재제작의뢰번호
  requestRemakingSeName, // 재제작사유
  requestRemakingDeletedAt, // 재제작요청철회
  onCancelRework, // 재제작철회
  onReport, // 신고하기
  onFetch,
  onCancel, // 거래취소
  onCancelReq, // 거래취소요청
  estimateAmount, // 예상결제마일리지
  totalAmount, // 결제마일리지
  addAmount, // 추가결제마일리지
  targetAmount, // 지정요청 예상결제마일리지
  requestEstimateNo, // 공개요청서 선택된 견적서
  isMyRequest,
  requestPayDeletedAt, // 추가금철회여부
}) => {
  const {
    isDeal,
    handleNav,
    handleCancelPay,
    handleDetail,
    handleCancel,
    handleCancelReq,
    isCancelModal,
    isCancelCallModal,
    handleConfirmCancelReq,
    isModal,
    setIsModal,
    handleRemove,
    isRemoveModal,
    setIsRemoveModal,
    user,
  } = useTransactionItem({
    onFetch,
  });
  const { t } = useTranslation();
  const { handleRoom } = useChat();
  const [isToggle, setToggle] = useState(true);
  return (
    <>
      <li>
        <div className="stsSum">
          <span>
            <strong
              className={`iSts ${status === 'B' ? 'select' : ''} ${status === 'C' ? 'ing' : ''} ${status === 'D' ? 'end' : ''} ${status === 'E' || status === 'G' || status === 'H' ? 'cancel' : ''} ${status === 'F' ? 'cing' : ''}`}
            >
              {/*{requestType === 'A' && <>{statusName}</>}*/}
              {/*{(status !== 'C' || dealStatus !== 'E') && requestType === 'B' && <>{statusName}</>}*/}
              {requestType === 'A' && <>{t(`status.${statusName}`)}</>}
              {(status !== 'C' || dealStatus !== 'E') && requestType === 'B' && <>{t(`status.${statusName}`)}</>}

              {status === 'C' && dealStatus === 'E' && !requestRemakingNo && requestType === 'B' && <>{t('version2_2.text148')}</>}
              {status === 'C' && dealStatus === 'E' && requestRemakingNo && requestType === 'B' && <>{t('version2_2.text148')}</>}
            </strong>
            {requestType === 'A' && (
              <span className="reQNum">
                <i>{t('service_page.term_quote_form')}</i>
                <strong>{docCnt}</strong>
              </span>
            )}
          </span>
          <strong className="time">
            {registerDate} <strong>{registerTime}</strong>
          </strong>
        </div>
        <div className="subject">
          <strong>{title}</strong>
        </div>

        <div className="mBack">
          {/* 공개요청 */}
          {requestType === 'A' && (
            <>
              <div className="mReverse">
                {designer && (
                  <div className="choiceDt">
                    <div className="left">
                      <span className="profileSet">
                        <span className="profileImg">
                          <img src={designer?.profileImage} />
                        </span>
                        <span className="nick">
                          <span>{t('base.dental_designer')}</span>
                          <strong>{designer?.nickName}</strong>
                        </span>
                      </span>

                      {/* 예상 결제 마일리지/ */}
                      {['I'].includes(status) && (
                        <span className="mileage">
                          <label>{t('transaction.expect')}</label>
                          <strong>
                            <strong>{requestType === 'A' ? withCommas(estimateAmount) : withCommas(targetAmount)}</strong>P(
                            {user?.memberTp === 'B' && <>$</>}
                            {user?.memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}
                      {status === 'C' && (
                        <span className="mileage">
                          {isDeal({ step: dealStatus, maxStep: 'B', payStatus }) === 'end' && (
                            <>
                              <label>{t('transaction.complete')}</label>
                              <strong>
                                <strong>{withCommas(totalAmount)}</strong>P(
                                {user?.memberTp === 'B' && <>$</>}
                                {user?.memberTp === 'A' && <>￦</>})
                              </strong>
                            </>
                          )}
                          {isDeal({ step: dealStatus, maxStep: 'B', payStatus }) !== 'end' && (
                            <>
                              <label>{t('transaction.expect')}</label>
                              <strong>
                                <strong>{requestType === 'A' ? withCommas(estimateAmount) : withCommas(targetAmount)}</strong>P(
                                {user?.memberTp === 'B' && <>$</>}
                                {user?.memberTp === 'A' && <>￦</>})
                              </strong>
                            </>
                          )}
                          {addAmount > 0 && requestPayDeletedAt !== 'Y' && (
                            <span>
                              <label>{t('transaction.additional')}</label>
                              <strong>
                                <strong>{withCommas(addAmount)}</strong>P(
                                {user?.memberTp === 'B' && <>$</>}
                                {user?.memberTp === 'A' && <>￦</>})
                              </strong>
                            </span>
                          )}
                        </span>
                      )}
                      {/* 요청거절 */}
                      {status === 'H' && (
                        <span className="mileage done">
                          <label>{t('transaction.expect')}</label>
                          <strong>
                            <strong>{withCommas(estimateAmount)}</strong>P(
                            {user?.memberTp === 'B' && <>$</>}
                            {user?.memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}

                      {/* 거래취소 승인 대기중 */}
                      {status === 'F' && (
                        <span className="mileage">
                          <label>{t('transaction.complete')}</label>
                          <strong>
                            <strong>{withCommas(estimateAmount)}</strong>P(
                            {user?.memberTp === 'B' && <>$</>}
                            {user?.memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}

                      {status === 'D' && (
                        <span className="mileage">
                          <label>{t('transaction.final')}</label>
                          <strong>
                            <strong>{withCommas(totalAmount)}</strong>P(
                            {user?.memberTp === 'B' && <>$</>}
                            {user?.memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="postEdit">
                        <BaseButton label={t('disigner.report')} className={'bRP'} onClick={onReport} />
                        {requestType === 'A' && (
                          <span>
                            <Link to={`/payment/${requestFormNo}/designer`}>{t('transaction.quote_list')}</Link>
                          </span>
                        )}
                      </span>
                      <span className="twinBtn small">
                        <BaseButton className="mShort" label={t('base.view_profile')} onClick={() => handleNav(`/designer/view/${designer.designerNo}`)} />
                        <span>
                          <BaseButton onClick={() => handleRoom(designer?.designerNo, 'C')} label={t('base.do_chat')} />
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                <div className="stepBox">
                  <div className="totalStep">
                    <div className={`progress ${status === 'D' || status === 'F' || status === 'E' || status === 'G' ? 'done' : ''}`}>
                      {['F', 'E', 'G'].includes(status) && (
                        <>
                          <div>
                            <span style={{ width: status === 'F' ? '67%' : status === 'E' || status === 'G' ? '100%' : '' }}></span>
                          </div>
                          <ol>
                            <li>{t('status.quote')}</li> {/* 5% */}
                            <li>{t('status.select_dental')}</li> {/* 37% */}
                            {status === 'G' && <li className={status === 'G' ? 'on' : ''}>{t('status.trade')}</li>} {/* 67% */}
                            {status !== 'G' && <li className={status === 'F' ? 'on' : ''}>{t('status.cancel_wait')}</li>} {/* 67% */}
                            <li className={status === 'E' ? 'on' : ''}>{t('status.cancel')}</li> {/* 100% */}
                          </ol>
                        </>
                      )}

                      {!['F', 'E', 'G'].includes(status) && (
                        <>
                          <div>
                            <span style={{ width: status === 'A' ? '5%' : status === 'B' ? '37%' : status === 'C' ? '67%' : status === 'D' ? '100%' : '' }}></span>
                          </div>
                          <ol>
                            {/* //진행 상태 (A:견적 요청중, B:치자이너 선택중, C:거래중, D:거래완료, E:거래취소, F:거래취소 승인 대기중, G:요청마감, H:요청수락(치자이너), I: 치자이너 수락대기) */}
                            <li className={status === 'A' ? 'on' : ''}>{t('status.quote')}</li> {/* 5% */}
                            <li className={status === 'B' ? 'on' : ''}>{t('status.select_dental')}</li> {/* 37% */}
                            <li className={status === 'C' ? 'on' : ''}>{t('status.trade')}</li> {/* 67% */}
                            <li className={status === 'D' ? 'on' : ''}>{t('status.complete')}</li> {/* 100% */}
                          </ol>
                        </>
                      )}
                    </div>
                    <div className="infoNd">
                      {status === 'A' && (
                        <p>
                          <span role="img" aria-label="guide">
                            💬
                          </span>{' '}
                          {t('status.sentence.quote')} ...
                        </p>
                      )}
                      {status === 'B' && (
                        <p>
                          <span role="img" aria-label="technologist">
                            🧑🏻‍💻
                          </span>{' '}
                          {t('status.sentence.quote_received')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'B' && payStatus !== 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.transaction_ing')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'B' && payStatus === 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.payment_completed')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'C' && estimateReceiveYn !== 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.accept_request')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'C' && estimateReceiveYn === 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.received_request')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'E' && !requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.received_request')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'E' && requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="waring">
                            ❗️️️
                          </span>
                          {/* CAD파일 재제작을 요청했어요! 치자이너와의 3D 뷰어 소통이 필요하다면 채팅으로 요청해주세요. */}
                          {t('status.sentence.req_cad_reupload')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'D' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('version2_4.text11')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'F' && !requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="payment">
                            💳️
                          </span>{' '}
                          {t('status.sentence.additional_rate')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'F' && requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="payment">
                            💳️
                          </span>{' '}
                          {t('status.sentence.need_additional_payment')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'G' && (!requestRemakingNo || requestRemakingDeletedAt === 'Y') && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.cad_uploaded')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'G' && requestRemakingNo && requestRemakingDeletedAt !== 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.cad_reuploaded')}
                        </p>
                      )}
                      {status === 'D' && (
                        <p>
                          <span role="img" aria-label="done">
                            ✔️
                          </span>
                          {t('status.sentence.transaction_completed')}
                        </p>
                      )}
                      {status === 'F' && isMyRequest && (
                        <p>
                          <span role="img" aria-label="guide">
                            💬
                          </span>{' '}
                          {t('status.sentence.examine_cancel_request')}
                        </p>
                      )}
                      {status === 'E' && (
                        <p>
                          <span role="img" aria-label="cancel">
                            ⛔
                          </span>
                          {t('status.sentence.cancel')}
                        </p>
                      )}
                      {status === 'G' && (
                        <p>
                          <span role="img" aria-label="cancel">
                            ⛔
                          </span>
                          {t('status.sentence.request_expired')}
                        </p>
                      )}
                    </div>
                  </div>

                  {isDetail && ['C', 'D', 'F', 'E'].includes(status) && (
                    <div className="detailStep">
                      <button className={`bDSToggle ${!isToggle ? 'on' : ''}`} onClick={() => setToggle(!isToggle)}>
                        {t('transaction.fold_step')}
                      </button>{' '}
                      {isToggle && (
                        <ol className={`${status === 'F' || status === 'E' ? 'stop' : ''}`}>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'A' })) ? 'pointer' : '' }}
                            className={isDeal({ status, step: dealStatus, maxStep: 'A' })}
                            onClick={() => handleDetail(isDeal({ status, step: dealStatus, maxStep: 'A' }), 'A', requestEstimateNo)}
                          >
                            <em>1</em>
                            <span>{t('base.estimate')}</span>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'B', payStatus })) ? 'pointer' : '' }}
                            className={isDeal({ status, step: dealStatus, maxStep: 'B', payStatus })}
                            onClick={() => handleDetail(isDeal({ status, step: dealStatus, maxStep: 'B', payStatus }), 'B', requestFormNo)}
                          >
                            <em>2</em>
                            <span>{t('status.request_payment')}</span>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'C', estimateReceiveYn })) ? 'pointer' : '' }}
                            className={isDeal({ status, step: dealStatus, maxStep: 'C', payStatus, estimateReceiveYn })}
                            onClick={() => handleDetail(isDeal({ status, step: dealStatus, maxStep: 'C' }), 'C', requestFormNo)}
                          >
                            <em>3</em>
                            <span>{t('status.request_received')}</span>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'D', estimate3dYn })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'D', estimate3dYn }), 'D', requestFormNo, { requestType })}
                            className={isDeal({ status, step: dealStatus, maxStep: 'D', estimate3dYn })}
                          >
                            <em>4</em>
                            <span>3D {t('status.viewer')}</span>
                          </li>
                          <li className={isDeal({ status, step: dealStatus, maxStep: 'E' })}>
                            <em>5</em>
                            <span style={{ textDecorationLine: 'none' }}>CAD{t('status.upload')}</span>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'F', addPayStatus })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ status, step: dealStatus, maxStep: 'F', addPayStatus }), 'F', requestFormNo)}
                            className={isDeal({ status, step: dealStatus, maxStep: 'F', addPayStatus })}
                          >
                            <em>6</em>
                            <span>{t('status.additional_payment')}</span>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'G' })) ? 'pointer' : '' }}
                            className={isDeal({ status, step: dealStatus, maxStep: 'G' })}
                            onClick={() => handleDetail(isDeal({ status, step: dealStatus, maxStep: 'G' }), 'G', requestFormNo)}
                          >
                            <em>7</em>
                            <span>CAD{t('status.file_received')}</span>
                          </li>
                          <li className={isDeal({ status, step: dealStatus, maxStep: 'H', reviewYn })}>
                            <em>8</em>
                            <span style={{ textDecorationLine: 'none' }}>{t('status.review')}</span>
                          </li>
                        </ol>
                      )}
                    </div>
                  )}

                  {isDetail && status === 'C' && requestRemakingNo && requestRemakingDeletedAt !== 'Y' && (
                    <div className="addData">
                      <dl>
                        <dt>{t('transaction.remake_history')}</dt>
                        <dd className="txt">
                          <span>{t('transaction.remake_reason')}</span>
                          <p>{requestRemakingSeName}</p>
                        </dd>
                        <dd>
                          <span className="time">
                            {requestRemakingDate} <span>{requestRemakingTime}</span>
                          </span>
                        </dd>
                      </dl>
                      <div className="right listStsBtn">
                        {dealStatus !== 'G' && <BaseButton label={t('transaction.cancel_remake')} className={'btnW'} onClick={onCancelRework} />}
                        <BaseButton label={t('transaction.detail')} className={'btnL'} onClick={() => handleNav(`/payment/reqeust/rework/view/${requestFormNo}`)} />
                      </div>
                    </div>
                  )}

                  {/* 추가금액 */}
                  {isDetail && status === 'C' && dealStatus === 'F' && !requestRemakingNo && (
                    <div className="addData">
                      <dl>
                        <dt>{t('transaction.add_history')}</dt>
                        <dd className="txt">
                          <span>{t('transaction.add_reason')}</span>
                          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(requestPayCn)) }}></p>
                        </dd>
                        <dd>
                          <span className="time">
                            {dateFormat(requestPayDt)} <span>{timeFormat(requestPayDt)}</span>
                          </span>
                        </dd>
                      </dl>
                    </div>
                  )}

                  {isDetail && status === 'C' && dealStatus === 'F' && requestRemakingNo && (
                    <div className="addData">
                      <dl>
                        <dt>
                          {requestRemakingNo && t('transaction.remake')} {t('transaction.add_history')}
                        </dt>
                        <dd className="txt">
                          <span>
                            {requestRemakingNo && t('transaction.remake')} {t('transaction.add_reason')}
                          </span>
                          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(requestPayCn)) }}></p>
                        </dd>
                        <dd>
                          <span className="time">
                            {dateFormat(requestPayDt)} <span>{timeFormat(requestPayDt)}</span>
                          </span>
                        </dd>
                      </dl>
                      <div className="right listStsBtn">
                        <BaseButton label={t('transaction.detail')} className={'btnL'} onClick={() => handleNav(`/payment/reqeust/charges/view/${requestFormNo}`)} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <dl className={`deadlineSet mReact ${designer ? '' : 'notDesign'}`}>
                {/* notDesign */}
                <dt>
                  <em> {t('request.expiration_date')}</em>
                </dt>
                <dd>
                  <span className="time">
                    {expireDate} <span>{expireTime}</span>
                  </span>
                </dd>

                <dt>
                  <em> {t('request.delivery_deadline')}</em>
                </dt>
                <dd>
                  <span className="time red">
                    {deadlineDate} <span>{deadlineTime}</span>
                  </span>
                </dd>
              </dl>
            </>
          )}

          {requestType === 'B' && (
            <>
              <div className="mReverse">
                {designer && (
                  <div className="choiceDt">
                    <div className="left">
                      <span className="profileSet">
                        <span className="profileImg">
                          <img src={designer?.profileImage} />
                        </span>
                        <span className="nick">
                          <span>{t('base.dental_designer')}</span>
                          <strong>{designer?.nickName}</strong>
                        </span>
                      </span>

                      {/* 예상 결제 마일리지/ */}
                      {['I'].includes(status) && (
                        <span className="mileage">
                          <label>{t('transaction.expect')}</label>
                          <strong>
                            <strong>{requestType === 'A' ? withCommas(estimateAmount) : withCommas(targetAmount)}</strong>P(
                            {user?.memberTp === 'B' && <>$</>}
                            {user?.memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}
                      {status === 'C' && (
                        <span className="mileage">
                          {isDeal({ step: dealStatus, maxStep: 'B', payStatus }) === 'end' && (
                            <>
                              <label>{t('transaction.complete')}</label>
                              <strong>
                                <strong>{withCommas(totalAmount)}</strong>P(
                                {user?.memberTp === 'B' && <>$</>}
                                {user?.memberTp === 'A' && <>￦</>})
                              </strong>
                            </>
                          )}
                          {isDeal({ step: dealStatus, maxStep: 'B', payStatus }) !== 'end' && (
                            <>
                              <label>{t('transaction.expect')}</label>
                              <strong>
                                <strong>{requestType === 'A' ? withCommas(estimateAmount) : withCommas(targetAmount)}</strong>P(
                                {user?.memberTp === 'B' && <>$</>}
                                {user?.memberTp === 'A' && <>￦</>})
                              </strong>
                            </>
                          )}
                          {addAmount > 0 && requestPayDeletedAt !== 'Y' && (
                            <span>
                              <label>{t('transaction.additional')}</label>
                              <strong>
                                <strong>{withCommas(addAmount)}</strong>P(
                                {user?.memberTp === 'B' && <>$</>}
                                {user?.memberTp === 'A' && <>￦</>})
                              </strong>
                            </span>
                          )}
                        </span>
                      )}
                      {/* 요청거절 */}
                      {status === 'H' && (
                        <span className="mileage done">
                          <label>{t('transaction.expect')}</label>
                          <strong>
                            <strong>{withCommas(estimateAmount)}</strong>P(
                            {user?.memberTp === 'B' && <>$</>}
                            {user?.memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}

                      {/* 거래취소 승인 대기중 */}
                      {status === 'F' && (
                        <span className="mileage">
                          <label>{t('transaction.complete')}</label>
                          <strong>
                            <strong>{withCommas(estimateAmount)}</strong>P(
                            {user?.memberTp === 'B' && <>$</>}
                            {user?.memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}

                      {status === 'D' && (
                        <span className="mileage">
                          <label>{t('transaction.final')}</label>
                          <strong>
                            <strong>{withCommas(totalAmount)}</strong>P(
                            {user?.memberTp === 'B' && <>$</>}
                            {user?.memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="postEdit">
                        <BaseButton label={t('disigner.report')} className={'bRP'} onClick={onReport} />
                        {requestType === 'A' && (
                          <span>
                            <Link to={`/payment/${requestFormNo}/designer`}>{t('transaction.quote_list')}</Link>
                          </span>
                        )}
                      </span>
                      <span className="twinBtn small">
                        <BaseButton className="mShort" label={t('base.view_profile')} onClick={() => handleNav(`/designer/view/${designer.designerNo}`)} />
                        <span>
                          <BaseButton onClick={() => {

                            handleRoom(designer?.designerNo, 'C')
                          }} label={t('base.do_chat')} />
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                <div className="stepBox">
                  <div className="totalStep">
                    <div className={`progress ${status === 'D' || status === 'F' || status === 'E' || status === 'G' || status === 'H' ? 'done' : ''}`}>
                      {status === 'H' && (
                        <>
                          <div>
                            <span style={{ width: '100%' }}></span>
                          </div>
                          <ol>
                            <li>{t('request.target')}</li> {/* 5% */}
                            <li>{t('status.trade')}</li> {/* 51% */}
                            <li className="on">{t('status.cancel')}</li> {/* 100% */}
                          </ol>
                        </>
                      )}

                      {status === 'I' && (
                        <>
                          <div>
                            <span style={{ width: status === 'I' ? '5%' : '' }}></span>
                          </div>
                          <ol>
                            <li className={status === 'I' ? 'on' : ''}>{t('request.target')}</li> {/* 5% */}
                            <li>{t('status.trade')}</li> {/* 51% */}
                            <li>{t('status.complete')}</li> {/* 100% */}
                          </ol>
                        </>
                      )}

                      {['F', 'E', 'G'].includes(status) && (
                        <>
                          <div>
                            <span style={{ width: status === 'F' ? '51%' : status === 'E' ? '100%' : '' }}></span>
                          </div>
                          <ol>
                            <li className={status === 'A' ? 'on' : ''}>{t('status.accept_request')}</li> {/* 5% */}
                            <li className={status === 'F' ? 'on' : ''}>{status === 'F' ? t('status.cancel_wait') : t('status.trade')}</li> {/* 51% */}
                            <li className={status === 'E' ? 'on' : ''}>{t('status.cancel')}</li> {/* 100% */}
                          </ol>
                        </>
                      )}

                      {!['I', 'H', 'F', 'E', 'G'].includes(status) && (
                        <>
                          <div>
                            <span style={{ width: status === 'A' ? '5%' : status === 'C' ? '51%' : status === 'D' ? '100%' : '' }}></span>
                          </div>
                          <ol>
                            <li className={status === 'A' ? 'on' : ''}>{t('status.accept_request')}</li> {/* 5% */}
                            <li className={status === 'C' ? 'on' : ''}>{t('status.trade')}</li> {/* 51% */}
                            <li className={status === 'D' ? 'on' : ''}>{t('status.complete')}</li> {/* 100% */}
                          </ol>
                        </>
                      )}
                    </div>

                    <div className="infoNd">
                      {status === 'A' && (
                        <p>
                          <span role="img" aria-label="guide">
                            💬
                          </span>{' '}
                          {t('status.sentence.quote')} ...
                        </p>
                      )}
                      {status === 'B' && (
                        <p>
                          <span role="img" aria-label="technologist">
                            🧑🏻‍💻
                          </span>{' '}
                          {t('status.sentence.quote_received.')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'B' && payStatus !== 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.transaction_ing')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'B' && payStatus === 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.payment_completed')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'C' && estimateReceiveYn !== 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.accept_request')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'C' && estimateReceiveYn === 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.received_request')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'D' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('version2_4.text11')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'E' && !requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.received_request')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'E' && requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="waring">
                            ❗️️️
                          </span>
                          {/* CAD파일 재제작을 요청했어요! 치자이너와의 3D 뷰어 소통이 필요하다면 채팅으로 요청해주세요. */}
                          {t('status.sentence.req_cad_reupload')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'F' && !requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="payment">
                            💳️
                          </span>{' '}
                          {t('status.sentence.additional_rate')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'F' && requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="payment">
                            💳️
                          </span>{' '}
                          {t('status.sentence.need_additional_payment')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'G' && (!requestRemakingNo || requestRemakingDeletedAt === 'Y') && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.cad_uploaded')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'G' && requestRemakingNo && requestRemakingDeletedAt !== 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.cad_reuploaded')}
                        </p>
                      )}
                      {status === 'D' && (
                        <p>
                          <span role="img" aria-label="done">
                            ✔️
                          </span>
                          {t('status.sentence.transaction_completed')}
                        </p>
                      )}
                      {status === 'F' && isMyRequest && (
                        <p>
                          <span role="img" aria-label="done">
                            💬
                          </span>{' '}
                          {t('status.sentence.examine_cancel_request')}
                        </p>
                      )}
                      {status === 'E' && (
                        <p>
                          <span role="img" aria-label="cancel">
                            ⛔
                          </span>
                          {t('status.sentence.cancel')}
                        </p>
                      )}
                      {status === 'G' && (
                        <p>
                          <span role="img" aria-label="cancel">
                            ⛔
                          </span>
                          {t('status.sentence.request_expired')}
                        </p>
                      )}
                      {status === 'I' && (
                        <p>
                          <span role="img" aria-label="guide">
                            💬
                          </span>{' '}
                          {t('status.sentence.wait_accept')}
                        </p>
                      )}
                      {status === 'H' && (
                        <p>
                          <span role="img" aria-label="cancel">
                            ⛔
                          </span>{' '}
                          {t('status.sentence.reject_request')}
                        </p>
                      )}
                    </div>
                  </div>

                  {isDetail && ['C', 'D', 'F', 'E'].includes(status) && (
                    <div className="detailStep">
                      <button className={`bDSToggle ${!isToggle ? 'on' : ''}`} onClick={() => setToggle(!isToggle)}>
                        {t('transaction.fold_step')}
                      </button>{' '}
                      {/* 클릭 시 className='bPSToggle on' */}
                      {isToggle && (
                        <ol className={`${status === 'F' || status === 'E' ? 'step7 stop' : 'step7'}`}>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'B', payStatus })) ? 'pointer' : '' }}
                            className={isDeal({ step: dealStatus, maxStep: 'B', payStatus })}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'B' }), 'B', requestFormNo)}
                          >
                            <em>1</em>
                            <span>{t('status.request_payment')}{}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'C', payStatus, estimateReceiveYn })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'C', payStatus, estimateReceiveYn }), 'C', requestFormNo, { requestType })}
                            className={isDeal({ step: dealStatus, maxStep: 'C', payStatus, estimateReceiveYn })}
                          >
                            <em>2</em>
                            <span>{t('status.request_received')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'D', estimate3dYn })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'D', estimate3dYn }), 'D', requestFormNo, { requestType })}
                            className={isDeal({ status, step: dealStatus, maxStep: 'D', estimate3dYn })}
                          >
                            <em>3</em>
                            <span>3D {t('status.viewer')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li className={isDeal({ status, step: dealStatus, maxStep: 'E' })}>
                            <em>4</em>
                            <span style={{ textDecoration: 'none' }}>CAD{t('status.upload')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'F', addPayStatus })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'F', addPayStatus }), 'F', requestFormNo)}
                            className={isDeal({ status, step: dealStatus, maxStep: 'F', addPayStatus })}
                          >
                            <em>5</em>
                            <span>{t('status.additional_payment')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'G' })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'G' }), 'G', requestFormNo)}
                            className={isDeal({ status, step: dealStatus, maxStep: 'G' })}
                          >
                            <em>6</em>
                            <span>CAD{t('status.file_received')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li className={isDeal({ status, step: dealStatus, maxStep: 'H', reviewYn })}>
                            <em>7</em>
                            <span>{t('status.review')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                        </ol>
                      )}
                    </div>
                  )}

                  {isDetail && status === 'C' && requestRemakingNo && requestRemakingDeletedAt !== 'Y' && (
                    <div className="addData">
                      <dl>
                        <dt>{t('transaction.remake_history')}</dt>
                        <dd className="txt">
                          <span>{t('transaction.remake_reason')}</span>
                          <p>{requestRemakingSeName}</p>
                        </dd>
                        <dd>
                          <span className="time">
                            {requestRemakingDate} <span>{requestRemakingTime}</span>
                          </span>
                        </dd>
                      </dl>
                      <div className="right listStsBtn">
                        {dealStatus !== 'G' && <BaseButton label={t('transaction.cancel_remake')} className={'btnW'} onClick={onCancelRework} />}
                        <BaseButton label={t('transaction.detail')} className={'btnL'} onClick={() => handleNav(`/payment/reqeust/rework/view/${requestFormNo}`)} />
                      </div>
                    </div>
                  )}

                  {/* 추가금액 */}
                  {isDetail && status === 'C' && dealStatus === 'F' && !requestRemakingNo && (
                    <div className="addData">
                      <dl>
                        <dt>{t('transaction.add_history')}</dt>
                        <dd className="txt">
                          <span>{t('transaction.add_reason')}</span>
                          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(requestPayCn)) }}></p>
                        </dd>
                        <dd>
                          <span className="time">
                            {dateFormat(requestPayDt)} <span>{timeFormat(requestPayDt)}</span>
                          </span>
                        </dd>
                      </dl>
                    </div>
                  )}

                  {isDetail && status === 'C' && dealStatus === 'F' && requestRemakingNo && (
                    <div className="addData">
                      <dl>
                        <dt>
                          {requestRemakingNo && t('transaction.remake')} {t('transaction.add_history')}
                        </dt>
                        <dd className="txt">
                          <span>
                            {requestRemakingNo && t('transaction.remake')} {t('transaction.add_reason')}
                          </span>
                          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(requestPayCn)) }}></p>
                        </dd>
                        <dd>
                          <span className="time">
                            {dateFormat(requestPayDt)} <span>{timeFormat(requestPayDt)}</span>
                          </span>
                        </dd>
                      </dl>
                      <div className="right listStsBtn">
                        <BaseButton label={t('transaction.detail')} className={'btnL'} onClick={() => handleNav(`/payment/reqeust/charges/view/${requestFormNo}`)} />
                      </div>
                    </div>
                  )}

                  {isDetail && status === 'C' && dealStatus === 'G' && requestPayDeletedAt === 'Y' && (
                    <div className="addData">
                      <dl>
                        <dt>
                          {requestRemakingNo && t('transaction.remake')} {t('transaction.add_history')}
                        </dt>
                        <dd className="txt">
                          <span>
                            {requestRemakingNo && t('transaction.remake')} {t('transaction.add_reason')}
                          </span>
                          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(requestPayCn)) }}></p>
                          <strong>&nbsp; {`(${t('version2_2.text149')})`}</strong>
                        </dd>
                        <dd>
                          <span className="time">
                            {requestRemakingDate} <span>{requestRemakingTime}</span>
                          </span>
                        </dd>
                      </dl>
                    </div>
                  )}
                </div>
              </div>
              <dl className="deadlineSet mReact">
                <dt>
                  <em> {t('request.delivery_deadline')}</em>
                </dt>
                <dd>
                  <span className="time red">
                    {deadlineDate} <span>{deadlineTime}</span>
                  </span>
                </dd>
              </dl>
            </>
          )}
        </div>
        {isDetail && (
          <>
            <div className="listStsBtn">
              <Link to={`/request/view/${requestFormNo}`} className="btnL">
                {t('transaction.my_request')}
              </Link>
              {['E', 'G', 'H'].includes(status) && <BaseButton label={t('transaction.delete')} className={'btnW'} onClick={() => setIsRemoveModal(true)} />}
              {status === 'F' && !isMyRequest && (
                <BaseButton
                  label={t('status.cancel_accept')}
                  className={'btnW'}
                  style={{ color: '#FF6969', borderColor: '#FF6969' }}
                  onClick={() => setIsModal({ visible: true, value: { requestFormNo, memberNo: designer.memberNo } })}
                />
              )}
              {/* {['A', 'B', 'C'].includes(status) && ['A', 'B'].includes(dealStatus) && <BaseButton label={'거래취소'} className={'btnW'} onClick={onCancel} />}
              {['A', 'B', 'C'].includes(status) && ['C', 'D'].includes(dealStatus) && <BaseButton label={'거래취소 요청'} className={'btnW'} onClick={() => console.log('취소')} />} */}
              {['C'].includes(status) && ['A', 'B', 'C'].includes(dealStatus) && estimateReceiveYn === 'N' && (
                <BaseButton label={t('status.cancel')} className={'btnW'} onClick={() => handleCancel({ ...designer, requestFormNo, status, dealStatus })} />
              )}
              {['C'].includes(status) && ['C', 'D', 'E'].includes(dealStatus) && estimateReceiveYn === 'Y' && !requestRemakingNo && (
                <BaseButton label={t('status.request_cancel')} className={'btnW'} onClick={() => handleCancelReq({ ...designer, requestFormNo, status, dealStatus })} />
              )}
            </div>

            {status === 'D' && (
              <>
                <p className="goDetail">
                  {t('transaction.do_you_like')}
                  <strong>{t('transaction.register_profile')}😃</strong>
                </p>
              </>
            )}

            {status === 'B' && (
              <div className="btnArea">
                <Link to={`/payment/${requestFormNo}/designer`} className="btnB">
                  {t('status.select_dental')}
                </Link>
              </div>
            )}

            {status === 'C' && dealStatus === 'B' && payStatus !== 'Y' && (
              <div className="btnArea">
                <Link to={`/payment/reqeust/${requestFormNo}`} className="btnB">
                  {t('transaction.e_contract')}
                </Link>
              </div>
            )}

            {status === 'C' && dealStatus === 'D' && (
              <div className="btnArea">
                <Link to={`/payment/comms/${requestFormNo}/cad`} className="btnB">
                  {t('version2_2.text150')}
                </Link>
              </div>
            )}

            {status === 'C' && dealStatus === 'G' && (
              <div className="btnArea">
                <Link to={`/payment/cad/${requestFormNo}`} className="btnB">
                  CAD{t('status.receive_file')}
                </Link>
              </div>
            )}

            {status === 'C' && dealStatus === 'F' && (
              <div className="btnArea">
                <Link to={`/payment/reqeust/charges/${requestFormNo}`} className="btnB">
                  {t('status.pay_additionally')}
                </Link>
              </div>
            )}

            {status === 'D' && (
              <>
                <div className="btnArea">
                  <BaseButton className="btnW" label={t('transaction.request_remake')} onClick={() => handleNav(`/payment/reqeust/rework/${requestFormNo}`)} />
                  {reviewYn === 'N' && <BaseButton className="btnB" label={t('status.review')} onClick={() => handleNav(`/payment/review/${requestFormNo}`)} />}
                  {reviewYn === 'Y' && <BaseButton className="btnB" label={t('status.watch_review')} onClick={() => handleNav(`/mypage/review`)} />}
                </div>
              </>
            )}
          </>
        )}
      </li>
      {isCancelModal.visible && (
        <ModalPresent>
          <CancelModal onFetch={onFetch} {...isCancelModal.value} />
        </ModalPresent>
      )}

      {isCancelCallModal.visible && (
        <ModalPresent>
          <CancelCallModal onFetch={onFetch} {...isCancelCallModal.value} />
        </ModalPresent>
      )}

      {isModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal
            title={t('version2_1.text12')}
            doneContents={t('version2_1.text13')}
            failContents={t('version2_1.text14')}
            contents={t('version2_1.text15')}
            btnCancel={t('version2_1.text3')}
            btnConfirm={t('base.confirm')}
            onConfirm={() => handleConfirmCancelReq(requestFormNo)}
            onClose={() => {
              setIsModal({ visible: false, value: '' });
            }}
          />
        </ModalAlertPresent>
      )}

      {isRemoveModal && (
        <ModalAlertPresent>
          <ConfirmModal
            title={t('version2_2.text151')}
            doneContents={t('version2_2.text152')}
            failContents={t('version2_2.text153')}
            contents={t('version2_2.text154')}
            btnCancel={t('version2_1.text3')}
            btnConfirm={t('base.confirm')}
            onConfirm={() => handleRemove(requestFormNo)}
            onClose={() => {
              setIsRemoveModal(false);
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default TransactionItem;
