import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, BaseButton } from '@components/common';
import { RequestMiniInfo } from '@components/ui';
import { getByteSize } from '@utils/common';
import useCADViewPage from './hooks/useCADViewPage';
import useFileDownload from '@components/hooks/useFileDownload';
import { useTranslation } from 'react-i18next';

const CADViewPage = () => {
  const navigate = useNavigate();
  const { isLoading, error, items, isClick, handleReworkWrite, handleReviewWrite, user, isReceive, transfer, submitTransactionTransfer } = useCADViewPage();
  const { handleFileDownload } = useFileDownload();
  // console.log(items)
  const { t } = useTranslation();
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
        <h2>{t('version2_2.text102')} {user?.memberSe === 'A' && t('version2_2.text103')}</h2>
        <div className="viewBox subView">
          <div className="tvs">
            <article>
              <h3 className="pt0 lineCase">{t('version2_2.text12')}</h3>

              {isReceive && (
                <>
                  <div className="cadDownload">
                    <ul>
                      {items.map((item, idx) => {
                        return (
                          <li key={`CADViewPage_${idx}`}>
                            <RequestMiniInfo
                              type={1}
                              sw={item.requestDocName}
                              reqTitle={item.requestNumber}
                              reqDesc={item.requestDocDesc}
                              registerDt={item.registerDt}
                              reqNo={item.requestDocGroupNo}
                            />
                            <span className="fileLoad">
                              <span>
                                {item.cadRealName}
                                <em>{getByteSize(item.cadFileSize)}</em>
                              </span>
                              <button
                                className="bFD"
                                onClick={(e) => {
                                  handleFileDownload(e, item.cadFileNo, item.cadRealName);
                                  if (transfer === 'N') {
                                    submitTransactionTransfer();
                                  }
                                }}
                              >
                                {t('version2_2.text104')}
                              </button>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {user?.memberSe === 'A' && (
                    <div className="btnArea">
                      <BaseButton className="btnW" label={t('transaction.request_remake')} onClick={handleReworkWrite} />
                      <BaseButton className="btnB" label={t('status.review')}  onClick={handleReviewWrite} disabled={!isClick} />
                    </div>
                  )}
                </>
              )}
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default CADViewPage;
