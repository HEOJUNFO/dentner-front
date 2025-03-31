import { BaseButton } from '@components/common';
import { getByteSize, replaceToBr } from '@utils/common';
import DOMPurify from 'dompurify';
import { Link, useNavigate } from 'react-router-dom';
import useReworkRequestViewPage from './hooks/useReworkRequestViewPage';
import useFileDownload from '@components/hooks/useFileDownload';
import { useTranslation } from 'react-i18next';

const ReworkRequestViewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoading, error, data, pathValue } = useReworkRequestViewPage();
  
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
        <h2>{t('transaction.remake_history')}</h2>
        <div className="viewBox topLine">
          <div className="tvs">
            <article>
              <div className="detail">
                <h4>
                  <strong>{t('transaction.remake_reason')}</strong>
                </h4>
                <div>
                  <span className="itemTag category">
                    <em>{data.remakingSeName}</em>
                  </span>
                </div>
                <h4>
                  <strong>{t('base.request')}</strong>
                </h4>
                <div className="paragraph" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data.remakingDc)) }}></div>
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
                            <button className="bFD" onClick={(e) => handleFileDownload(e, el.fileNo, el.fileRealName)}>
                              Download
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="allDownload">
                    <BaseButton label={t('version2_2.text117')} className={'btnG'} onClick={(e) => handleFileZipDownload(e, 'K', data?.requestFormRemakingNo)} />
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

export default ReworkRequestViewPage;
