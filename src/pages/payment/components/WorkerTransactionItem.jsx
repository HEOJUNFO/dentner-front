import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { BaseButton, ModalPresent, ModalAlertPresent } from '@components/common';
import { CancelModal, CancelCallModal, ConfirmModal } from '@components/ui';
import useWorkerTransactionItem from '../hooks/useWorkerTransactionItem';
import { useTranslation } from 'react-i18next';
import { replaceToBr, withCommas } from '@utils/common';
import ModalStore from '@store/ModalStore';
import useChat from '@components/hooks/useChat';
import { dateFormat } from '@utils/DateUtil';

/**
 * 요청서
 * 지정요청은 납품완료가 있고 공개요청은 납품완료가 없음
 * 위 내용으로 정선미와 이야기 했고 기획대로 진행하라고 함.
 * @param {*} param0
 * @returns
 */
const WorkerTransactionItem = ({
  isDetail,
  requestFormNo, // 요청서번호
  payStatus, // 결제여부
  estimateReceiveYn, // 의뢰서수령여부
  estimate3dYn, // 3d 뷰어 소통여부
  addPayStatus, // 추가금요청여부
  statusName,
  statusNameKOR,
  statusNameENG,
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
  member,
  requestPayCn, // 추가금요청사유
  requestPayDt, // 추가금요청일자
  onCancelPay, // 철회요청
  onFetch,
  requestRemakingDate, // 재제작요청일자
  requestRemakingTime, // 재제작요청일자
  requestRemakingNo, // 재제작의뢰번호
  requestRemakingSeName, // 재제작사유
  requestRemakingDeletedAt, // 재제작요청철회
  requestPayDeletedAt, // 추가금철회여부
  estimateAmount, // 예상결제마일리지
  totalAmount, // 결제마일리지
  addAmount, // 추가결제마일리지
  onReport, // 신고하기
  requestEstimateNo, // 공개요청서 선택된 견적서
  remakingAddYn, // 재제작 추가금 요청여부
  isMyRequest,
  memberTp,
  memberOutAt
}) => {

  const {
    isDeal,
    handle3dCommunication,
    handleSkip,
    handleNav,
    handleDetail,
    handleCancel,
    handleCancelReq,
    handleConfirmCancelReq,
    isCancelModal,
    isCancelCallModal,
    isModal,
    setIsModal,
    handleRemove,
    isRemoveModal,
    setIsRemoveModal,
    isConfirmModal,
    setIsConfirmModal,
    handleConfirmModal,
  } = useWorkerTransactionItem({ onFetch });
  const { actions } = ModalStore();
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === 'en' || i18n.language === 'en-US';
  const { handleRoom } = useChat();

  const [isToggle, setToggle] = useState(true);
  const handle3d = () => {
    actions.setDoneAlert({ isVisible: true, title: '알림', contents: '준비중입니다!', btnName: '확인' });
  };

  return (
    <>
      <li>
        <div className="stsSum">
          <span>
            <strong
              className={`iSts ${status === 'B' ? '' : ''} ${status === 'C' ? 'ing' : ''} ${status === 'D' ? 'end' : ''} ${status === 'E' || status === 'G' || status === 'H' ? 'cancel' : ''} ${status === 'F' ? 'cing' : ''}`}
              // select
            >
              {status === 'B' && (isEnglish ? statusNameENG : statusNameKOR)}
              {status === 'I' && (isEnglish ? statusNameENG : statusNameKOR)}
              {!(status === 'C' && dealStatus === 'G' && requestType === 'B') && status !== 'B' && status !== 'I' && !(status === 'C' && dealStatus === 'E' && requestRemakingNo) && (
                <>{isEnglish ? statusNameENG : statusNameKOR}</>
              )}
              {status === 'C' && dealStatus === 'G' && requestType === 'B' && <>{isEnglish ? statusNameENG : statusNameKOR}</>}
              {status === 'C' && dealStatus === 'E' && requestRemakingNo && requestType === 'B' && <>{isEnglish ? statusNameENG : statusNameKOR}</>}
            </strong>
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
                {member && (
                  <div className="choiceDt">
                    <div className="left">
                      <span className="profileSet">
                        <span className="profileImg">
                          <img src={member.profileImage} />
                        </span>
                        <span className="nick">
                          <span>{t('faq.client')}</span>
                          <strong>{member.nickName}</strong>
                        </span>
                      </span>

                      {status === 'C' && (
                        <span className="mileage">
                          {isDeal({ step: dealStatus, maxStep: 'B' }) === 'end' && (
                            <>
                              <label>{t('transaction.complete')}</label>
                              <strong>
                                <strong>{withCommas(totalAmount)}</strong>P(
                                {memberTp === 'B' && <>$</>}
                                {memberTp === 'A' && <>￦</>})
                              </strong>
                            </>
                          )}
                          {isDeal({ step: dealStatus, maxStep: 'B' }) !== 'end' && (
                            <>
                              <label>{t('transaction.request')}</label>
                              <strong>
                                <strong>{withCommas(estimateAmount)}</strong>P(
                                {memberTp === 'B' && <>$</>}
                                {memberTp === 'A' && <>￦</>})
                              </strong>
                            </>
                          )}

                          {addAmount > 0 && requestPayDeletedAt !== 'Y' && (
                            <span>
                              <label>{t('transaction.more_request')}</label>
                              <strong>
                                <strong>{withCommas(addAmount)}</strong>P(
                                {memberTp === 'B' && <>$</>}
                                {memberTp === 'A' && <>￦</>})
                              </strong>
                            </span>
                          )}
                        </span>
                      )}

                      {/* 요청거절 */}
                      {status === 'H' && (
                        <span className="mileage">
                          <label>{t('transaction.request')}</label>
                          <strong>
                            <strong>{withCommas(estimateAmount)}</strong>P(
                            {memberTp === 'B' && <>$</>}
                            {memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}

                      {status === 'D' && (
                        <span className="mileage">
                          <label>{t('transaction.final')}</label>
                          <strong>
                            <strong>{withCommas(totalAmount)}</strong>P(
                            {memberTp === 'B' && <>$</>}
                            {memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="postEdit">
                        <BaseButton label={t('version2_2.text4')} className={'bRP'} onClick={onReport} />
                        <span>
                          <Link to={`/request/view/${requestFormNo}`}>{t('header.view_request')}</Link>
                        </span>
                      </span>
                      <span className="twinBtn small">
                        <BaseButton className="mShort" label={t('base.view_profile')} onClick={(e) => handleNav(`/profile/view/${member.memberNo}`)} />
                        {/*  */}
                        <span>
                          <BaseButton onClick={() => handleRoom(member?.memberNo, 'A')} label={t('base.do_chat')} />
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                <div className="stepBox">
                  <div className="totalStep">
                    {['E', 'F'].includes(status) && (
                      <div className={`progress done`}>
                        <div>
                          <span style={{ width: status === 'E' ? '100%' : '' }}></span>
                        </div>
                        <ol>
                          <li className={status === 'A' ? 'on' : ''}>{t('status.accept_request')}</li> {/* 5% */}
                          <li className={status === 'F' ? 'on' : ''}>{t('status.cancel_wait')}</li> {/* 51% */}
                          <li className={status === 'E' ? 'on' : ''}>{t('status.cancel')}</li> {/* 100% */}
                        </ol>
                      </div>
                    )}

                    {!['E', 'F'].includes(status) && (
                      <div className={`progress ${['D'].includes(status) ? 'done' : ''}`}>
                        <div>
                          <span style={{ width: status === 'B' ? '5%' : status === 'C' ? '51%' : status === 'D' ? '100%' : '' }}></span>
                        </div>
                        <ol>
                          <li className={status === 'B' ? 'on' : ''}>{t('status.choice_req')}</li> {/* 5% */}
                          <li className={status === 'C' ? 'on' : ''}>{t('status.trade')}</li> {/* 51% */}
                          <li className={status === 'D' ? 'on' : ''}>{t('status.complete')}</li> {/* 100% */}
                        </ol>
                      </div>
                    )}

                    <div className="infoNd">
                      {status === 'B' && (
                        <p>
                          <span role="img" aria-label="guide">
                            💬
                          </span>{' '}
                          {t('status.sentence.examine_quote')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'B' && payStatus !== 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            🧑🏻‍💻️
                          </span>{' '}
                          {t('status.sentence.select')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'B' && payStatus === 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.pay')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'C' && estimateReceiveYn !== 'Y' && (
                        <p>
                          <span role="img" aria-label="receive">
                            🤲🏻
                          </span>{' '}
                          {t('status.sentence.req_receive')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'C' && estimateReceiveYn === 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.received')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'D' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('version2_4.text12')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'E' && !requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="waring">
                            ❗️️️
                          </span>{' '}
                          {t('status.sentence.req_cad_upload')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'F' && (
                        <p>
                          <span role="img" aria-label="payment">
                            💰️
                          </span>{' '}
                          {t('status.sentence.req_more_pay')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'G' && remakingAddYn === 'Y' && addPayStatus === 'Y' && (
                        <p>
                          <span role="img" aria-label="receive">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.pay_additionalPay')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'G' && remakingAddYn === 'N' && (
                        <p>
                          <span role="img" aria-label="receive">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.uploaded_cad')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'E' && requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="waring">
                            ❗️️️
                          </span>{' '}
                          {t('status.sentence.req_cad_reupload2')}
                        </p>
                      )}

                      {status === 'D' && (
                        <p>
                          <span role="img" aria-label="done">
                            ✔️
                          </span>{' '}
                          {t('status.sentence.transaction_completed')}
                        </p>
                      )}

                      {status === 'E' && (
                        <p>
                          <span role="img" aria-label="cancel">
                            ⛔
                          </span>{' '}
                          {t('status.sentence.complete_cancel')}
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
                        <ol className={`${status === 'F' || status === 'E' ? 'stop step7' : 'step7'}`}>
                          <li className={`end`} style={{ cursor: 'pointer' }} onClick={() => handleDetail(isDeal({ status, step: dealStatus, maxStep: 'A' }), 'A', requestEstimateNo)}>
                            <em>1</em>
                            <span>{t('service_page.term_quote_form')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'B' })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'B' }), 'B', requestFormNo)}
                            className={isDeal({ status, step: dealStatus, maxStep: 'B' })}
                          >
                            <em>2</em>
                            <span>{t('version2_2.text105')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'C' })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'C' }), 'C', requestFormNo, { requestType })}
                            className={isDeal({ status, step: dealStatus, maxStep: 'C' })}
                          >
                            <em>3</em>
                            <span>{t('status.request_received')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li className={isDeal({ status, step: dealStatus, maxStep: 'D', estimate3dYn })}>
                            <em>4</em>
                            <span>{t('status.viewer')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'E' })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'E' }), 'E', requestFormNo)}
                            className={isDeal({ status, step: dealStatus, maxStep: 'E' })}
                          >
                            <em>5</em>
                            <span>{t('version2_2.text97')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'F', addPayStatus })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'F', addPayStatus }), 'F', requestFormNo)}
                            className={isDeal({ status, step: dealStatus, maxStep: 'F', addPayStatus })}
                          >
                            <em>6</em>
                            <span>{t('status.additional_payment')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li className={isDeal({ status, step: dealStatus, maxStep: 'G' })}>
                            <em>7</em>
                            <span style={{ textDecorationLine: 'none' }}>{t('version2_2.text145')}</span>
                          </li>
                        </ol>
                      )}
                    </div>
                  )}

                  {status === 'C' && requestRemakingNo && requestRemakingDeletedAt !== 'Y' && (
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
                        {/* <BaseButton label={'재제작 요청철회'} className={'btnW'} /> */}
                        <BaseButton label={t('transaction.detail')} className={'btnL'} onClick={() => handleNav(`/payment/reqeust/rework/view/${requestFormNo}`)} />
                      </div>
                    </div>
                  )}

                  {status === 'C' && dealStatus === 'F' && (
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
                          <span className="time">{dateFormat('yyyy.MM.DD | H:i', requestPayDt)}</span>
                        </dd>
                      </dl>
                      <div className="right listStsBtn">
                        <BaseButton label={`${requestRemakingNo ? t('transaction.remake') : ''} ${t('version2_2.text155')}`} className={'btnW'} onClick={() => onCancelPay()} />
                        <BaseButton
                          label={`${requestRemakingNo ? t('transaction.remake') : ''} ${t('version2_2.text156')}`}
                          className={'btnW'}
                          onClick={() => handleNav(`/payment/charges/${requestFormNo}`, { requestRemakingNo })}
                        />
                        <BaseButton label={'내역 상세보기'} className={'btnL'} onClick={() => handleNav(`/payment/reqeust/charges/view/${requestFormNo}`)} />
                      </div>
                    </div>
                  )}
                  {status === 'C' && dealStatus === 'G' && requestPayDeletedAt === 'Y' && (
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
                          <strong>&nbsp; {`(${t('version2_2.text159')})`}</strong>
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
                  <em>{t('request.expiration_date')}</em>
                </dt>
                <dd>
                  <span className="time">
                    {expireDate} <span>{expireTime}</span>
                  </span>
                </dd>

                <dt>
                  <em>{t('request.delivery_deadline')}</em>
                </dt>
                <dd>
                  <span className="time red">
                    {deadlineDate} <span>{deadlineTime}</span>
                  </span>
                </dd>
              </dl>
            </>
          )}

          {/* 지정요청 */}
          {requestType === 'B' && (
            <>
              <div className="mReverse">
                {member && (
                  <div className="choiceDt">
                    <div className="left">
                      <span className="profileSet">
                        <span className="profileImg">
                          <img src={member.profileImage} />
                        </span>
                        <span className="nick">
                          <span>{t('faq.client')}</span>
                          <strong>{member.nickName}</strong>
                        </span>
                      </span>

                      {status === 'C' && (
                        <span className="mileage">
                          {isDeal({ step: dealStatus, maxStep: 'B' }) === 'end' && (
                            <>
                              <label>{t('transaction.complete')}</label>
                              <strong>
                                <strong>{withCommas(totalAmount)}</strong>P(
                                {memberTp === 'B' && <>$</>}
                                {memberTp === 'A' && <>￦</>})
                              </strong>
                            </>
                          )}
                          {isDeal({ step: dealStatus, maxStep: 'B' }) !== 'end' && (
                            <>
                              <label>{t('transaction.request')}</label>
                              <strong>
                                <strong>{withCommas(estimateAmount)}</strong>P(
                                {memberTp === 'B' && <>$</>}
                                {memberTp === 'A' && <>￦</>})
                              </strong>
                            </>
                          )}

                          {addAmount > 0 && requestPayDeletedAt !== 'Y' && (
                            <span>
                              <label>{t('transaction.more_request')}</label>
                              <strong>
                                <strong>{withCommas(addAmount)}</strong>P(
                                {memberTp === 'B' && <>$</>}
                                {memberTp === 'A' && <>￦</>})
                              </strong>
                            </span>
                          )}
                        </span>
                      )}

                      {/* 요청거절 */}
                      {status === 'H' && (
                        <span className="mileage">
                          <label>{t('transaction.request')}</label>
                          <strong>
                            <strong>{withCommas(estimateAmount)}</strong>P(
                            {memberTp === 'B' && <>$</>}
                            {memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}

                      {status === 'D' && (
                        <span className="mileage">
                          <label>{t('transaction.final')}</label>
                          <strong>
                            <strong>{withCommas(totalAmount)}</strong>P(
                            {memberTp === 'B' && <>$</>}
                            {memberTp === 'A' && <>￦</>})
                          </strong>
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="postEdit">
                        <BaseButton label={t('version2_2.text4')} className={'bRP'} onClick={onReport} />
                        <span>
                          <Link to={`/request/view/${requestFormNo}`}>{t('header.view_request')}</Link>
                        </span>
                      </span>
                      <span className="twinBtn small">
                        <BaseButton className="mShort" label={t('base.view_profile')} onClick={(e) => {
                          if(memberOutAt === 'Y') {
                            alert('탈퇴한 회원 입니다.')
                            return;
                          }
                          handleNav(`/profile/view/${member.memberNo}`)
                        }} />
                        {/*  */}
                        <span>
                          <BaseButton onClick={() => {
                            if(memberOutAt === 'Y') {
                              alert('탈퇴한 회원 입니다.')
                              return;
                            }
                            handleRoom(member?.memberNo, 'A')
                          }} label={t('base.do_chat')} />
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                <div className="stepBox">
                  <div className="totalStep">
                    {status === 'H' && (
                      <div className="progress done">
                        <div>
                          <span style={{ width: status === 'I' ? '5%' : status === 'C' ? '51%' : status === 'E' ? '100%' : '' }}></span>
                        </div>
                        <ol>
                          <li>{t('version2_2.text157')}</li> {/* 5% */}
                          <li>{t('status.trade')}</li> {/* 51% */}
                          <li className="on">{t('status.cancel')}</li> {/* 100% */}
                        </ol>
                      </div>
                    )}
                    {status !== 'H' && status !== 'F' && status !== 'E' && (
                      <div className={`progress ${status === 'D' || status === 'F' || status === 'G' ? 'done' : ''}`}>
                        <div>
                          <span style={{ width: status === 'I' ? '5%' : status === 'C' ? '51%' : status === 'D' ? '100%' : '' }}></span>
                        </div>
                        <ol>
                          <li className={status === 'I' ? 'on' : ''}>{t('status.reviewing_request2')}</li> {/* 5% */}
                          <li className={status === 'C' ? 'on' : ''}>{t('status.trade')}</li> {/* 51% */}
                          <li className={status === 'D' ? 'on' : ''}>{t('status.complete')}</li> {/* 100% */}
                        </ol>
                      </div>
                    )}

                    {status === 'E' && (
                      <div className={`progress done`}>
                        <div>
                          <span style={{ width: status === 'E' ? '100%' : '' }}></span>
                        </div>
                        <ol>
                          <li className={status === 'A' ? 'on' : ''}>{t('status.accept_request')}</li> {/* 5% */}
                          <li className={status === 'F' ? 'on' : ''}>{t('status.trade')}</li> {/* 51% */}
                          <li className={status === 'D' ? 'on' : ''}>{t('status.cancel')}</li> {/* 100% */}
                        </ol>
                      </div>
                    )}

                    {status === 'F' && (
                      <div className={`progress done`}>
                        <div>
                          <span style={{ width: status === 'F' ? '51%' : '' }}></span>
                        </div>
                        <ol>
                          <li className={status === 'A' ? 'on' : ''}>{t('status.accept_request')}</li> {/* 5% */}
                          <li className={status === 'F' ? 'on' : ''}>{t('status.cancel_wait')}</li> {/* 51% */}
                          <li className={status === 'D' ? 'on' : ''}>{t('status.cancel')}</li> {/* 100% */}
                        </ol>
                      </div>
                    )}

                    <div className="infoNd">
                      {status === 'I' && (
                        <p>
                          <span role="img" aria-label="guide">
                            💬
                          </span>{' '}
                          {t('status.sentence.req_target')}
                        </p>
                      )}
                      {(status === 'E' || status === 'H') && (
                        <p>
                          <span role="img" aria-label="cancel">
                            ⛔
                          </span>{' '}
                          {t('status.sentence.complete_cancel')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'B' && payStatus !== 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            🧑🏻‍💻️
                          </span>{' '}
                          {t('status.sentence.target_wait_pay')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'B' && payStatus === 'Y' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.pay')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'C' && estimateReceiveYn === 'Y' && (
                        <p>
                          <span role="img" aria-label="receive">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.received')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'C' && estimateReceiveYn !== 'Y' && (
                        <p>
                          <span role="img" aria-label="receive">
                            🤲🏻
                          </span>{' '}
                          {t('status.sentence.req_receive')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'D' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('version2_4.text12')}
                        </p>
                      )}
                      {status === 'C' && dealStatus === 'E' && !requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="waring">
                            ❗️️️
                          </span>{' '}
                          {t('status.sentence.req_cad_upload')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'F' && (
                        <p>
                          <span role="img" aria-label="payment">
                            💰️
                          </span>
                          {t('status.sentence.req_more_pay')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'G' && remakingAddYn === 'Y' && addPayStatus === 'Y' && (
                        <p>
                          <span role="img" aria-label="receive">
                            ✨️
                          </span>
                          {t('status.sentence.pay_additionalPay')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'E' && requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="waring">
                            ❗️️️
                          </span>
                          {t('status.sentence.req_cad_reupload2')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'G' && addPayStatus !== 'Y' && !requestRemakingNo && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.uploaded_cad')}
                        </p>
                      )}

                      {status === 'C' && dealStatus === 'G' && requestRemakingNo && remakingAddYn === 'N' && (
                        <p>
                          <span role="img" aria-label="sparkles">
                            ✨️
                          </span>{' '}
                          {t('status.sentence.uploaded_cad')}
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
                          {t('status.sentence.examine_cancel_request2')}
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
                        <ol className={`${status === 'F' || status === 'E' ? 'step6 stop' : 'step6'}`}>
                          <li
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'B' }), 'B', requestFormNo)}
                            className={isDeal({ status, step: dealStatus, maxStep: 'B' })}
                          >
                            <em>1</em>
                            <span>{t('version2_2.text105')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'C', payStatus, estimateReceiveYn })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'C', payStatus, estimateReceiveYn }), 'C', requestFormNo, { requestType })}
                            className={isDeal({ status, step: dealStatus, maxStep: 'C', payStatus, estimateReceiveYn })}
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
                            <span>{t('status.viewer')}</span>
                            <Link to="">{t('mileage.detail')}</Link>
                          </li>
                          <li
                            style={{ cursor: ['ing', 'end', 'cancel'].includes(isDeal({ status, step: dealStatus, maxStep: 'E' })) ? 'pointer' : '' }}
                            onClick={() => handleDetail(isDeal({ step: dealStatus, maxStep: 'E' }), 'E', requestFormNo)}
                            className={isDeal({ status, step: dealStatus, maxStep: 'E' })}
                          >
                            <em>4</em>
                            <span>{t('version2_2.text97')}</span>
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
                          <li className={isDeal({ status, step: dealStatus, maxStep: 'G' })}>
                            <em>6</em>
                            <span style={{ textDecorationLine: 'none' }}>{t('version2_2.text145')}</span>
                          </li>
                        </ol>
                      )}
                    </div>
                  )}

                  {status === 'C' && requestRemakingNo && requestRemakingDeletedAt !== 'Y' && (
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
                        <BaseButton label={t('transaction.detail')} className={'btnL'} onClick={() => handleNav(`/payment/reqeust/rework/view/${requestFormNo}`)} />
                      </div>
                    </div>
                  )}

                  {status === 'C' && dealStatus === 'F' && (
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
                          <span className="time">{dateFormat('yyyy.MM.DD | H:i', requestPayDt)}</span>
                        </dd>
                      </dl>
                      <div className="right listStsBtn">
                        <BaseButton label={`${requestRemakingNo ? t('transaction.remake') : ''} ${t('version2_2.text155')}`} className={'btnW'} onClick={() => onCancelPay()} />
                        <BaseButton
                          label={`${requestRemakingNo ? t('transaction.remake') : ''} ${t('version2_2.text156')}`}
                          className={'btnW'}
                          onClick={() => handleNav(`/payment/charges/${requestFormNo}`, { requestRemakingNo })}
                        />
                        <BaseButton label={t('transaction.detail')} className={'btnL'} onClick={() => handleNav(`/payment/reqeust/charges/view/${requestFormNo}`)} />
                      </div>
                    </div>
                  )}
                  {status === 'C' && dealStatus === 'G' && requestPayDeletedAt === 'Y' && (
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
                            {dateFormat('yyyy.MM.DD | H:i', requestPayDt)}
                          </span>
                        </dd>
                      </dl>
                    </div>
                  )}
                </div>
              </div>
              <dl className="deadlineSet mReact">
                <dt>
                  <em>{t('request.delivery_deadline')}</em>
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
        <div className="right listStsBtn">
          {requestType === 'A' && (
            <Link to={`/request/estimated/view/${requestFormNo}`} className="btnL">
              {t('version2_2.text64')}
            </Link>
          )}
          {['E', 'G', 'H'].includes(status) && <BaseButton label={t('transaction.delete')} className={'btnW'} onClick={() => setIsRemoveModal(true)} />}
          {status === 'F' && !isMyRequest && (
            <BaseButton
              label={t('status.cancel_accept')}
              className={'btnW'}
              style={{ color: '#FF6969', borderColor: '#FF6969' }}
              onClick={() => setIsModal({ visible: true, value: { requestFormNo, memberNo: member.memberNo } })}
            />
          )}
          {((['C'].includes(status) && ['A', 'B', 'C'].includes(dealStatus) && estimateReceiveYn === 'N') || ['B'].includes(status)) && (
            <BaseButton label={t('status.cancel')} className={'btnW'} onClick={() => handleCancel({ ...member, requestFormNo, status, dealStatus })} />
          )}
          {['C'].includes(status) && ['C', 'D', 'E'].includes(dealStatus) && estimateReceiveYn === 'Y' && !requestRemakingNo && (
            <BaseButton label={t('status.request_cancel')} className={'btnW'} onClick={() => handleCancelReq({ ...member, requestFormNo, status, dealStatus })} />
          )}
        </div>

        {isDetail && (
          <>
            {status === 'I' && (
              <div className="btnArea">
                <Link to={`/request/view/${requestFormNo}`} className="btnB">
                  {t('request.view')}
                </Link>
              </div>
            )}

            {status === 'C' && dealStatus === 'B' && payStatus === 'Y' && (
              <div className="btnArea">
                <Link to={`/payment/contract/${requestFormNo}`} className="btnB">
                  {t('version2_2.text160')}
                </Link>
              </div>
            )}

            {status === 'C' && dealStatus === 'C' && estimateReceiveYn !== 'Y' && (
              <div className="btnArea">
                <Link to={`/payment/receive/${requestFormNo}`} state={{ requestType }} className="btnB">
                  {t('version2_2.text161')}
                </Link>
              </div>
            )}

            {status === 'C' && dealStatus === 'C' && estimateReceiveYn === 'Y' && (
              <div className="btnArea">
                <BaseButton className="btnW" label={t('version2_2.text162')} onClick={() => handleSkip(requestFormNo)} />
                <BaseButton className="btnB" label={t('version2_2.text163')} onClick={() => handle3dCommunication(requestFormNo, requestType)} />
              </div>
            )}

            {status === 'C' && dealStatus === 'D' && (
              <div className="btnArea">
                <Link to={`/payment/comms/${requestFormNo}/cad`} className="btnB">
                  {t('version2_2.text163')}
                </Link>

                <BaseButton className="btnW" label={t('version2_2.text164')} onClick={() => handleConfirmModal(requestFormNo)} />
              </div>
            )}

            {status === 'C' && dealStatus === 'E' && (
              <div className="btnArea">
                <Link to={`/payment/reqeust/${requestFormNo}/cad`} className="btnB">
                  {t('version2_2.text101')}
                </Link>
              </div>
            )}
          </>
        )}

        {status === 'H' && (
          <div className="listStsBtn">
            <BaseButton label={t('transaction.delete')} className={'btnW'} />
          </div>
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

export default WorkerTransactionItem;
