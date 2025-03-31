import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '@components/common';
import RequestPublic from './components/RequestPublic';
import RequestTarget from './components/RequestTarget';
import { useRequest } from './hooks/useRequest';
import { useNav } from '@components/hooks';

const RequestPage = () => {
  const { t } = useTranslation();
  const { isLoading, tab, handleTab, filterOpt, user } = useRequest();
  const { state } = useNav();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(location.pathname, { replace: true, state: {} });
    if (state?.request === 'select') {
      handleTab(2);
    }
  }, []);

  if (isLoading) return <></>;

  return (
    <>
      <section>
        <div className="titNbtn reqCase">
          <div>
            <h2>{t('request.view')}</h2>
            {user?.memberSe === 'A' && (
              <span>
                <Link to="/request/target/write" className="btnL ss">
                  {t('request.submit_target')}
                </Link>
                <Link to="/request/public/write" className="btnL ss">
                  {t('request.submit_public')}
                </Link>
              </span>
            )}
          </div>
        </div>
        <div className="tabNav">
          <nav>
            <ul>
              <li className={`${tab === 1 ? 'on' : ''}`}>
                <BaseButton label={t('request.public')} onClick={() => handleTab(1)} />
              </li>

              <li className={`${tab === 2 ? 'on' : ''}`}>
                <BaseButton label={t('request.target')} onClick={() => handleTab(2)} />
              </li>
            </ul>
          </nav>
        </div>
        {/* -- */}
        {tab === 1 && <RequestPublic opt={filterOpt} />}
        {tab === 2 && <RequestTarget opt={filterOpt} />}
      </section>
    </>
  );
};

export default RequestPage;
