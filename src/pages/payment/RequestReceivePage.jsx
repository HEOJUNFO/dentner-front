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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isLoading, error, items } = useRequestReceivePage(state?.requestType);
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
              {/* <div className="detail reQMinInfo">
                <div className="left">
                  <ItemTag items={infoItems} />
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5/ 하악 프레임 크라</strong>
                  <p>크라운 15 / 어버트먼트 10</p>
                </div>
                <div className="right">
                  <strong className="time">
                    2024. 06. 30 <strong>18:30</strong>
                  </strong>
                  <Link className="bMR" to="/requestView">
                    <span><em>더</em> 자세히보기</span>
                  </Link>
                </div>
              </div> */}
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestReceivePage;
