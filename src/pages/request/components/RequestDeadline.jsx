import React from 'react';
import { useTranslation } from 'react-i18next';

const RequestDeadline = ({
  requestFormSe,
  requestDeadlineDate,
  requestDeadlineTime,
  requestDeadlineTimeHour,
  requestDeadlineTimeMin,
  requestExpireDate,
  requestExpireTime,
  requestExpireTimeHour,
  requestExpireTimeMin,
}) => {
  const { t } = useTranslation();
  return (
    <div className="deadline">
      {requestFormSe === 'A' && (
        <span>
          <em>{t('status.sentence.deadline')}</em>
          <strong className="time">
            {requestExpireDate}{' '}
            <strong>
              {requestExpireTimeHour}:{requestExpireTimeMin}
            </strong>
          </strong>
        </span>
      )}
      <span>
        <em>{t('status.sentence.delivery_deadline')}</em>
        <strong className="time">
          {requestDeadlineDate}{' '}
          <strong>
            {requestDeadlineTimeHour}:{requestDeadlineTimeMin}
          </strong>
        </strong>
      </span>
    </div>
  );
};

export default RequestDeadline;
