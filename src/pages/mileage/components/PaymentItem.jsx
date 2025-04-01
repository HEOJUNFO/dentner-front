import React from 'react';
import { BaseButton } from '@components/common';
import { withCommas, dateFormat } from '@utils/common';
import { useTranslation } from 'react-i18next';

/**
 * 마일리지 결제내역
 * @param {*} param0
 * @returns
 */
const PaymentItem = ({ type = '', items = [] }) => {
  const { t } = useTranslation();
  return (
    <>
      {items.length === 0 && (
        <tr className="mNoLine">
          <td colSpan={6}>
            {type === 'D' && <div className="noList">{t('mileage.no_refund_history')}</div>}
            {type !== 'D' && <div className="noList">{t('mileage.no_pay_history')}</div>}
          </td>
        </tr>
      )}
      {items.map((item, idx) => {
        return (
          <tr key={`PaymentItem${idx}`} className={`${item.mileageSe === 'D' ? 'refund' : ''}`}>
            <td>
              <em>{item.mileageSe === 'D' ? t('mileage.refund_pay') : t('base.payment')}</em>
            </td>
            <td>
              {`${item.mileageSe === 'D' ? '+' : ''}`}
              {withCommas(item.mileageAmount)} {item.mileageUnit === 'A' ? 'P(￦)' : 'P($)'}
            </td>
            <td>{item.mileageCn}</td>
            <td className="date">{dateFormat('yyyy.MM.DD', item.registerDt)}</td>
            <td className="sts">
              {item.mileageSe !== 'D' &&
                (item.mileageStatus === 'A' ? (
                  <BaseButton label={t('mileage.refund')} onClick={() => item.onRefund()} />
                ) : item.mileageStatus === 'B' ? (
                  <em>{t('mileage.refund_ing')}</em>
                ) : (
                  <em>{t('mileage.refund_complete')}</em>
                ))}
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default PaymentItem;