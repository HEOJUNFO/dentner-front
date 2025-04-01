import { RequestMiniInfo } from '@components/ui';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useRequestReceivePage from './hooks/useRequestReceivePage';
import { useTranslation } from 'react-i18next';

/**
 * path: /payment/receive/{requestFormNo}
 * 의뢰서 수령 페이지
 * @returns
 */
const RequestReceivePage = () => {
  const { t,i18n } = useTranslation();

  const isEnglish = i18n.language === 'en' || i18n.language === 'en-US';
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isLoading, error, items } = useRequestReceivePage(state?.requestType);
  if (isLoading) return <></>;
  if (error) return <>{error}</>;


  return (
    <>
      <section>
        <h2>{t('status.request_received')}</h2>
        <div className="viewBox">
          <div className="tvs">
            <article>
              <h3 className="pt60 reQTit">{t('request.my_request_info')}</h3>
              {items?.map((item, idx) => {
                return (
                  <RequestMiniInfo
                    key={`RequestReceivePage_${idx}`}
                    type={1}
                    sw={item.requestDocName}
                    reqTitle={item.requestNumber}
                    reqDesc={item.requestDocDesc}
                    registerDt={item.registerDt}
                    reqNo={item.requestDocgroupNo}
                    requestSe={item?.requestSe}
                  />
                );
              })}
            </article>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link 
              to="" 
              onClick={() => navigate(-1)} 
              className="bMP"
              style={{
                display: 'inline-block',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 'normal',
                textDecoration: 'none',
                padding: '12px 0',
                borderRadius: '4px',
                backgroundColor: '#4a6eef',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
              }}
            >
              {isEnglish ? 'Go back' : '뒤로가기'}

            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestReceivePage;