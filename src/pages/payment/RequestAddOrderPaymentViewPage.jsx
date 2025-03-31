import React from 'react';
import DOMPurify from 'dompurify';
import { Link, useNavigate } from 'react-router-dom';
import { BaseButton } from '@components/common';
import { RequestMiniInfo } from '@components/ui';
import { withCommas, replaceToBr, getByteSize } from '@utils/common';
import useRequestAddOrderPaymentViewPage from './hooks/useRequestAddOrderPaymentViewPage';
import { useTranslation } from 'react-i18next';

/**
 * path: payment/reqeust/charges/view/{requestFormNo}
 * 추가금 결제 상세
 * @returns
 */
const RequestAddOrderPaymentViewPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, error, data, id } = useRequestAddOrderPaymentViewPage();

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
        <h2>{t('transaction.add_history')}</h2>
        <div className="viewBox">
          <div className="tvs">
            <article>
              <RequestMiniInfo sw={data.form.requestSwName} reqTitle={data.form.requestFormSj} reqDesc={data.form.requestDocDesc} registerDt={data.form.registerDt} reqNo={id} />

              <div className="detail">
                <h4>
                  <strong>{t('transaction.add_reason')}</strong>
                </h4>
                <div className="orderCase">
                  <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data.requestPayCn)) }}></p>
                  <div className="priceSet">
                    <span>{t('version2_2.text116')}</span>
                    <strong className="right">
                      <strong>{withCommas(data.requestPayAmount)}</strong> <em>P(￦)</em>
                    </strong>
                  </div>
                </div>
                <h4>
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
                            <button className="bFD">Download</button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="allDownload">
                    <BaseButton label={t('version2_2.text117')} className={'btnG'} />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestAddOrderPaymentViewPage;
