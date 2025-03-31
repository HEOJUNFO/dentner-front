import React from 'react';
import { useTranslation } from 'react-i18next';
import DOMPurify from 'dompurify';
import { ItemTag, BaseButton } from '@components/common';
import { replaceToBr, getByteSize } from '@utils/common';
import { useRequestMyInfoPage } from './hooks/useRequestMyInfoPage';
import useFileDownload from '@components/hooks/useFileDownload';
import { Link, useNavigate } from 'react-router-dom';

/**
 * path: /request/view/doc/{requestDocGroupNo}
 * 내 의뢰서 정보
 * @returns
 */
const RequestMyInfoPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, error, data, user, cads, isMine, handleModify, handleRemove, pathValue, typeCountData } = useRequestMyInfoPage();
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
        <div className="titNbtn">
          <div>
            <h2>{t('request.my_request_info')}</h2>
            {isMine && data.requestYn === 'N' && (
              <span className="postEdit">
                <BaseButton label={t('version2_2.text2')} onClick={handleModify} />
                <span>
                  <BaseButton label={t('version2_2.text3')} onClick={handleRemove} />
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="viewBox topLine">
          <div className="tvs myInquireView">
            <article>
              <div className="detail">
                <h4>
                  <strong>{t('version2_2.text10')}</strong>
                </h4>
                <div>
                  <span className="itemTag category">
                    <em>{data.requestNumber}</em>
                  </span>
                </div>

                {user.memberSe === 'A' && (
                  <>
                    <h4>
                      <strong>선호 CAD S/W</strong>
                    </h4>
                    <div>
                      <ItemTag items={cads} className="itemTag" />
                    </div>
                  </>
                )}

                <h4>
                  <strong>{`${t('base.prosthesistype')}/${t('base.amount')}`}</strong>
                </h4>
                <div className="itemList">
                  {data.prostheticsList.map((el, idx) => {
                    const sdt = el.requestTypeName?.split(' > ') || [];
                    // typeCountData가 있으면 해당 값 사용, 없으면 기존 el.count 사용
                    const displayCount = typeCountData && typeCountData[idx] ? typeCountData[idx] : el.count;
                    
                    return (
                      <div key={`RequestCategoryAndProsthesis_${idx}`}>
                        <strong>
                          {sdt.map((ele, idxx) => {
                            if (idxx === 0) {
                              return <strong key={`RequestCategoryAndProsthesis__strong_${idx}_${idxx}`}>{ele} &gt; </strong>;
                            } else if (sdt.length - 1 === idxx) {
                              return ele;
                            } else {
                              return <React.Fragment key={`RequestCategoryAndProsthesis__fragment_${idx}_${idxx}`}>{ele} &gt;</React.Fragment>;
                            }
                          })}
                        </strong>{' '}
                        <em>
                          {displayCount}
                          {t('base.count')}
                        </em>
                      </div>
                    );
                  })}
                </div>

                {user.memberSe === 'A' && (
                  <>
                    <h4>
                      <strong>{t('version2_2.text11')}</strong>
                    </h4>
                    <div>
                      <span className="itemTag">
                        <em>{data.requestProcessName}</em>
                      </span>
                    </div>
                  </>
                )}

                <h4>
                  <strong>{t('base.request')}</strong>
                </h4>
                <div className="paragraph" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data.requestDc)) }}></div>

                <h4>
                  <strong>{t('version2_2.text12')}</strong>
                </h4>
                <div className="fileSet">
                  <ul className="mt0">
                    {data.fileList.map((el, idx) => {
                      return (
                        <li key={`fileSet_${idx}`}>
                          <span className={`fileLoad ${idx === 0 ? '' : 'notMust'}`}>
                            <span>
                              {el.fileRealName}
                              <em>{getByteSize(el.fileSize)}</em>
                            </span>
                            <button className="bFD" onClick={(e) => handleFileDownloadEncrypt(e, el.fileNo, el.fileRealName)}>
                              Download
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {data.fileList.length > 0 && (
                    <div className="allDownload">
                      <BaseButton
                        label={`${t('version2_2.text12')} ${t('base.all')} ${t('version2_2.text13')}`}
                        className={'btnG'}
                        onClick={(e) => handleFileZipDownloadEncrypt(e, 'G', pathValue?.id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestMyInfoPage;