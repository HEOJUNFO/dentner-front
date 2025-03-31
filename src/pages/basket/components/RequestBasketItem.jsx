import React from 'react';
import { Link } from 'react-router-dom';
import { BaseInput } from '@components/common';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../../components/hooks/useWindowSize';
const RequestBasketItem = ({ item, onChange, checkedItems = [], tab }) => {
  const { registerDt, requestDocDesc, requestDocGroupNo, requestDocName, requestNumber } = item;
  const isChecked = checkedItems.find((el) => el.requestDocGroupNo == requestDocGroupNo) || false;
  const { t } = useTranslation();
  const isMobile = useWindowSize();

  return (
    <li>
      {tab !== 'B' && <BaseInput type="checkbox" id={`checkbox${requestDocGroupNo}`} value={requestDocGroupNo} checked={isChecked} onChange={(e) => onChange(e.target.checked, item, e.target.value)} />}
      <div className="reQMinInfo" onClick={() => isMobile && onChange(!isChecked, item, `${requestDocGroupNo}`)}>
        <div className="left">
          <span className="itemTag br4">
            <em>{requestDocName}</em>
          </span>
          <strong>{requestNumber}</strong>
          <p>{requestDocDesc}</p>
        </div>
        <div className="right">
          <strong className="time">
            {registerDt.split(' ')[0]} <strong>{registerDt.split(' ')[1].substring(0, 5)}</strong>
          </strong>
          <Link className="bMR" to={`/request/view/doc/${requestDocGroupNo}`}>
            <span>
              <em>{t('mainpage.guide.steps.more')}</em> {t('base.view_detail')}
            </span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default RequestBasketItem;
