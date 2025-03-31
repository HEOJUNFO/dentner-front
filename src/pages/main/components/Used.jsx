import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUsed } from '../hooks/useMain';
import { withCommas } from '@utils/common';
const Used = () => {
  const { t } = useTranslation();
  const { items } = useUsed();

  return (
    <div className="mainUsed">
      <div className="infoAreaTit">
        <strong className="big">
          <span>{t('info_area.many_people')}</span> {t('info_area.use_dentner')}
        </strong>
      </div>
      <div className="num">
        <span>
          <strong>
            <strong>{items?.memberCnt}</strong>
            {t('base.people_num')}
          </strong>
          {t('info_area.subscribers')}
        </span>
        <span>
          <strong>
            <strong>{items?.requestCnt}</strong>
            {t('base.count')}
          </strong>
          {t('info_area.requests')}
        </span>
        <span>
          <strong>
            <strong>{withCommas(items?.wonTotalPrice)}</strong>P(￦)/ <strong>{withCommas(items?.dollarTotalPrice)}</strong>P($)
          </strong>
          {t('info_area.total_amount')}
        </span>
      </div>
    </div>
  );
};

export default Used;
