import React from 'react';
import DOMPurify from 'dompurify';
import { BaseButton, ModalPresent, ModalAlertPresent } from '@components/common';
import { RequestMiniInfo, CheckSet } from '@components/ui';
import PayModal from '../../components/ui/modal/PayModal';
import useRequestAddOrderPaymentPage from './hooks/useRequestAddOrderPaymentPage';
import { withCommas, replaceToBr, getByteSize } from '@utils/common';
import PayFailAlert from '../../components/ui/modal/PayFailAlert';
import { Link, useNavigate } from 'react-router-dom';
import useFileDownload from '@components/hooks/useFileDownload';
import { useTranslation } from 'react-i18next';

/**
 * path: /payment/reqeust/charges/{requestFormNo}
 * 추가금 결제 페이지
 * @returns
 */
const RequestAddOrderPaymentPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error, isActive, data, id, handleSumbit, isSuccess, handleSuccessModal, isFail, handleFailModal, handleNav, handleCheck, params, pathValue } = useRequestAddOrderPaymentPage();

  const { handleFileDownload, handleFileZipDownload, handleFileDownloadEncrypt, handleFileZipDownloadEncrypt } = useFileDownload();

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
        {/* <h2>추가금 결제하기</h2> */}
        <h2>{t('status.pay_additionally')}</h2>
        <div className="viewBox subView">
          <div className="tvs">
            <article>
              <div className="infoNotes mt0">
                <dl>
                  <dt>{t('version2_4.text104')}</dt>
                  <dd>
                    {t('version2_4.text105')} <br className="mline" />
                    {t('version2_4.text106')} <br className="mline" />
                    {t('version2_4.text107')}
                    <br />
                    <br className="mline" />
                    {t('version2_4.text108')} <br className="mline" />
                    {t('version2_4.text109')}
                  </dd>
                </dl>
              </div>

              <h3 className="pt60 lineCase">{t('version2_4.text110')}</h3>
              <RequestMiniInfo sw={data.form.requestSwName} reqTitle={data.form.requestFormSj} reqDesc={data.form.requestDocDesc} registerDt={data.form.registerDt} reqNo={id} />

              <div className="detail">
                <div className="mBack">
                  <h4>
                    {/* <strong>추가금 요청사유</strong> */}
                    <strong>{t('transaction.add_reason')}</strong>
                  </h4>
                  <div className="orderCase">
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data.requestPayCn)) }}></p>
                  </div>
                </div>
                <div className="priceSet">
                  {/* <span>추가 결제금액</span> */}
                  <span>{t('version2_2.text116')}</span>
                  <strong className="right">
                    <strong>{withCommas(data.requestPayAmount)}</strong>
                    {data?.requestPayUnit === 'B' && <em>P($)</em>}
                    {data?.requestPayUnit === 'A' && <em>P(￦)</em>}
                  </strong>
                </div>
                <h4>
                  {/* <strong>첨부파일</strong> */}
                  <strong>{t('version2_2.text12')}</strong>
                </h4>
                <div className="fileSet">
                  <ul className="mt0">
                    {data.fileList.map((el, idx) => {
                      return (
                        <li key={`fileList_${idx}`}>
                          <span className="fileLoad">
                            <span>
                              {el.fileRealName}
                              <em>{getByteSize(el.fileSize)}</em>
                            </span>
                            <button className="bFD" onClick={(e) => handleFileDownload(e, el.fileNo, el.fileRealName)}>
                              Download
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="allDownload">
                    <BaseButton label={t('version2_2.text117')} className={'btnG'} onClick={(e) => handleFileZipDownload(e, 'I', pathValue?.id)} />
                  </div>
                </div>
              </div>

              <div className="infoNotes">
                {isActive && (
                  <CheckSet
                    id={'isConfirm'}
                    onChange={handleCheck}
                    value={params.isConfirm.value}
                    label={
                      <>
                        <sup>{t('base.required')}</sup> {t('version2_2.text125')}
                      </>
                    }
                  />
                )}
              </div>

              {isActive && (
                <div className="btnArea pb0">
                  <BaseButton label={t('status.pay_additionally')} className={'btnB'} onClick={() => handleSumbit()} />
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      {isSuccess && (
        <ModalPresent>
          <PayModal left={data.requestPayAmount} onSubmit={() => handleNav(-1)} onClose={() => handleSuccessModal()} />
        </ModalPresent>
      )}

      {isFail && (
        <ModalAlertPresent>
          <PayFailAlert onClose={() => handleFailModal()} />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default RequestAddOrderPaymentPage;
