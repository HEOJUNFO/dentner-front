import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BaseButton } from '@components/common';
import { RequestMiniInfo } from '@components/ui';
import { getByteSize } from '@utils/common';
import useCADViewPage from './hooks/useCADViewPage';
import useFileDownload from '@components/hooks/useFileDownload';
import { useTranslation } from 'react-i18next';

const CADViewPage = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    items,
    isClick,
    handleReworkWrite,
    handleReviewWrite,
    user,
    isReceive,
    transfer,
    submitTransactionTransfer,
  } = useCADViewPage();
  const { handleFileDownload } = useFileDownload();
  const { t, i18n } = useTranslation();

  const isEnglish = i18n.language === 'en' || i18n.language === 'en-US';

  const [downloadedFiles, setDownloadedFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (items && items.length > 0 && downloadedFiles.length === items.length) {
      setShowModal(true);
    }
  }, [downloadedFiles, items]);

  const handleDownload = (e, fileNo, fileName) => {
    handleFileDownload(e, fileNo, fileName);
    if (!downloadedFiles.includes(fileNo)) {
      setDownloadedFiles([...downloadedFiles, fileNo]);
    }

    if (transfer === 'N') {
      submitTransactionTransfer();
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
        <h2>
          {t('version2_2.text102')}{' '}
          {user?.memberSe === 'A' && t('version2_2.text103')}
        </h2>
        <div className="viewBox subView">
          <div className="tvs">
            <article>
              <h3 className="pt0 lineCase">{t('version2_2.text12')}</h3>

              {isReceive && (
                <>
                  <div className="cadDownload">
                    <ul>
                      {items.map((item, idx) => (
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
                              onClick={(e) =>
                                handleDownload(e, item.cadFileNo, item.cadRealName)
                              }
                            >
                              {t('version2_2.text104')}
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {user?.memberSe === 'A' && (
                    <div className="btnArea">
                      <BaseButton
                        className="btnW"
                        label={t('transaction.request_remake')}
                        onClick={handleReworkWrite}
                      />
                      <BaseButton
                        className="btnB"
                        label={t('status.review')}
                        onClick={handleReviewWrite}
                        disabled={!isClick}
                      />
                    </div>
                  )}
                </>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* 다운로드 완료 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <h3>{isEnglish ? 'Notification' : '알림'}</h3>
              <p>{isEnglish ? 'Transaction has been completed.' : '거래가 완료되었습니다.'}</p>
            </div>
            <div className="modal-footer">
              <button className="confirm-btn" onClick={closeModal}>
                {isEnglish ? 'OK' : '확인'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 모달 스타일 */}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-container {
          background-color: #fff;
          width: 350px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .modal-content h3 {
          margin: 0;
          padding: 25px 25px 5px 25px;
          font-size: 18px;
          font-weight: bold;
          text-align: left;
          margin-bottom: 10px; /* 제목과 본문 사이 간격 추가 */
        }

        .modal-content p {
          margin: 0;
          padding: 0 25px 25px 25px;
          font-size: 15px;
          color: #333;
          text-align: left;
        }

        .modal-footer {
          padding: 0 25px 25px 25px;
        }

        .confirm-btn {
          width: 100%;
          height: 50px;
          background-color: #4373e5;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          font-weight: 500;
        }
      `}</style>
    </>
  );
};

export default CADViewPage;