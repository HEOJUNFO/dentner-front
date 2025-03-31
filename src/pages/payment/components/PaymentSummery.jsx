import React from 'react';
import usePaymentSummery from '../hooks/usePaymentSummery';
import { useTranslation } from 'react-i18next';

const PaymentSummery = ({ className }) => {
  const { t } = useTranslation();
  const { isLoading, error, item, isMobile, visible, setVisible } = usePaymentSummery();

  if (isLoading) return <></>;
  if (error) return <></>;

  return (
    <div className={`paySummery ${className}`}>
      {isMobile && <span className={`cSelect ${visible ? 'on' : ''}`}>
        <em className={`sValue`} onClick={() => setVisible(!visible)}>
          {`${t('main_other.request_status')}/${t('main_other.delivery_management')}`} {visible ? `${t('version2_4.text1')}` : `${t('version2_4.text2')}`}
        </em>
      </span>}
      {(isMobile ? visible : true) && 
      <>
        <div className="back left">
          <strong className="tit">
            {t('main_other.request_status')}
            <dl>
              <dt>{t('main_other.total_requests')}</dt>
              <dd>
                <strong>{item?.requestTotalCnt}</strong>{t('main_other.requests_in_progress_count')}
              </dd>
            </dl>
          </strong>
          <div>
            <dl>
              <dt>{t('version2_2.text146')}</dt>
              <dd className="start">
                <strong>{item?.requestCnt}</strong>{t('main_other.requests_in_progress_count')}
              </dd>
            </dl>
            <dl>
              <dt>{t('main_other.work_in_progress')}</dt>
              <dd>
                <strong>{item?.requestIngCnt}</strong>{t('main_other.requests_in_progress_count')}
              </dd>
            </dl>
            <dl>
              <dt>{t('main_other.work_completed')}</dt>
              <dd className="end">
                <strong>{item?.requestEndCnt}</strong>{t('main_other.requests_in_progress_count')}
              </dd>
            </dl>
          </div>
        </div>
        <div className="back right">
          <strong className="tit">{t('main_other.delivery_management')}</strong>
          <div>
            <dl>
              <dt>
                {t('main_other.due_in_1_hour')} <span>{t('main_other.due_time')}</span>
              </dt>
              <dd>
                <strong>{item?.end1HourCnt}</strong>{t('main_other.requests_in_progress_count')}
              </dd>
            </dl>
            <dl>
              <dt>
                {t('main_other.due_in_3_hours')} <span>{t('main_other.due_time')}</span>
              </dt>
              <dd>
                <strong>{item?.end3HourCnt}</strong>{t('main_other.requests_in_progress_count')}
              </dd>
            </dl>
            <dl>
              <dt>
                {t('main_other.due_in_6_hours')} <span>{t('main_other.due_time')}</span>
              </dt>
              <dd>
                <strong>{item?.end6HourCnt}</strong>{t('main_other.requests_in_progress_count')}
              </dd>
            </dl>
            <dl>
              <dt>
                {t('main_other.due_in_6_hours')} <span>{t('main_other.due_time2')}</span>
              </dt>
              <dd>
                <strong>{item?.end6HourAfterCnt}</strong>{t('main_other.requests_in_progress_count')}
              </dd>
            </dl>
          </div>
        </div>
      </>
      }
    </div>
  );
};

export default PaymentSummery;
