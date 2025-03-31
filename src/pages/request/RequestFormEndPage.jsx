import { useNav } from '@components/hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const RequestFormEndPage = () => {
  const { handleNav, state } = useNav();
  const { t } = useTranslation();

  const [mode, setMode] = useState();
  useEffect(() => {
    console.log(state);
    if (!state?.requestDocGroupNo) {
      handleNav(-1);
    }
    setMode(state?.requestMode);
  }, []);
  return (
    <>
      <section>
        <div className="inquireEnd">
          <h2>{`${t('service_page.term_request_form')} ${t('version2_2.text59')}`}</h2>
          <p>{t('version2_2.text60')}</p>
          <div className="btn">
            <Link to="/request/basket" className="btnL">
            {t('version2_2.text61')}
            </Link>
            <Link to={`/request/view/doc/${state?.requestDocGroupNo}`} className="btnL">
            {t('version2_2.text62')}
            </Link>
            {mode === 'easy' && (
              <Link to="/request/easymode" className="btnB">
                {t('version2_2.text63')}
              </Link>
            )}

            {mode === 'detail' && (
              <Link to="/request/detailmode" className="btnB">
                {t('version2_2.text63')}
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestFormEndPage;
