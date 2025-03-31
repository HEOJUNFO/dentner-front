import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useNav } from '@components/hooks';

const Request = () => {
  const { t } = useTranslation();
  const { handleNav } = useNav();

  return (
    <div className="mainInquire">
      <div className="infoAreaTit">
        <strong>
          <strong>{t('mainpage.desire_mode')}</strong>{t('mainpage.create_request')}
        </strong>
      </div>
      <div className="go">
        <div style={{cursor: "pointer"}} onClick={()=>handleNav("/request/easymode")}>
          <dl>
            <dt>{t('mode.easy')}</dt>
            <dd>
              <em>{t('mainpage.multiple_patients')}</em>{t('mainpage.object_marker')}<br />
              <em>{t('mainpage.bulk_request')}</em>{t('mainpage.can_do')}
            </dd>
          </dl>
          <Link to="/request/easymode">{t('mainpage.go_request')}</Link>
        </div>
        <div style={{cursor: "pointer"}} onClick={()=>handleNav("/request/detailmode")}>
          <dl>
            <dt>{t('mode.detail')}</dt>
            <dd>
            <em>{t('mainpage.single_patient')}</em>{t('mainpage.object_marker')}<br />
              <em>{t('mainpage.detail_request')}</em>{t('mainpage.can_do')}
            </dd>
          </dl>
          <Link to="/request/detailmode">{t('mainpage.go_request')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Request;
