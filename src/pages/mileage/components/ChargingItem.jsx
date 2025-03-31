import React from 'react';
import { BaseButton } from '@components/common';
import { withCommas, dateFormat } from '@utils/common';
import { useTranslation } from 'react-i18next';

/**
 * 마일리지 충전내역
 * @param {*} param0
 * @returns
 */
const ChargingItem = ({ type = '', items = [] }) => {
  const { t } = useTranslation();

  return (
    <>
      {items.length === 0 && (
        <tr className="mNoLine">
          <td colSpan={6}>
            {type === 'C' && <div className="noList">{t('mileage.no_refund_history')}</div>}
            {type !== 'C' && <div className="noList">{t('mileage.no_charge_history')}</div>}
          </td>
        </tr>
      )}
      {items.map((item, idx) => {
        return (
          <tr key={`ChargingItem__${idx}`} className={`${item.mileageSe === 'C' ? 'refund' : ''}`}>
            <td>
              <em>{item.mileageSe === 'C' ? t('mileage.refund_charge') : t('base.charge')}</em>
            </td>
            <td>
              {item.mileageSe === 'A' ? '+' : '-'}
              {withCommas(item.mileageAmount)} {item.mileageUnit === 'A' ? 'P(￦)' : '$'}
            </td>
            <td>
              {withCommas(item.mileageAmount)}
              {item.mileageUnit === 'A' ? '원' : '$'}
            </td>
            <td>{item.mileageCn}</td>
            <td className="date">{dateFormat('yyyy.MM.DD', item.registerDt)}</td>
            <td className="sts">
              {/* 환불요청 A, 환불진행중 B, 환불완료 C */}
              {item.mileageStatus === 'A' && <BaseButton label={t('mileage.refund')} onClick={() => item.onRefund()} />}
              {item.mileageStatus === 'B' && <em>{t('mileage.refund_ing')}</em>}
              {item.mileageStatus === 'C' && <em>{t('mileage.refund_complete')}</em>}
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default ChargingItem;
