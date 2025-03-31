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
        console.log(item);
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
                  item.mileageAmount > 0 ? (
                    <BaseButton label={t('mileage.refund')} onClick={() => item.onRefund()} />
                  ) : (
                    <></>
                  )
                ) : item.mileageStatus === 'B' ? (
                  <em>{t('mileage.refund_ing')}</em>
                ) : (
                  <em>{t('mileage.refund_complete')}</em>
                ))}
              {/* 환불요청 A, 환불진행중 B, 환불완료 C */}
              {/* {item.mileageStatus === 'A' && <BaseButton label={t('mileage.refund')} />}
              {item.mileageStatus === 'B' && <em>{t('mileage.refund_ing')}</em>}
              {item.mileageStatus === 'C' && <em>{t('mileage.refund_complete')}</em>} */}
            </td>
          </tr>
        );
      })}
      {/* <tr className="refund">
              <td>
                <em>결제 환불</em>
              </td>
              <td>+ 450,000,000 P(￦)</td>
              <td>김은지 치자이너 / 요청서 제목</td>
              <td>2024.05.05</td>
              <td></td>
            </tr>
            <tr>
              <td>
                <em>결제</em>
              </td>
              <td>- 900,000,000 P(￦)</td>
              <td>김은지 치자이너 / 요청서 제목</td>
              <td>2024.05.04</td>
              <td>
                <BaseButton label={'환불요청'} onClick={() => setIsModal4(true)} />
              </td>
            </tr> */}
    </>
  );
};

export default PaymentItem;
