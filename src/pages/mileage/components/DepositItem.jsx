import React, { useState } from 'react';
import { BaseButton } from '@components/common';
import { withCommas, dateFormat } from '@utils/common';
import useMileageOfficePage from '../hooks/useMileageOfficePage';
import { ModalPresent } from '@components/common';
import SettlementModal from '../../../components/ui/modal/SettlementModal';
import useDepositDetail from '../hooks/useDepositDetail';
import { useTranslation } from 'react-i18next';

/**
 * 마일리지 결제내역
 * @param {*} param0
 * @returns
 */
const DepositItem = ({ type = '', items = [], fetch }) => {
  const { t } = useTranslation();
  const { isModal, setIsModal, handleSettleType, settleItem } = useDepositDetail();

  return (
    <>
      {items.length === 0 && (
        <tr className="mNoLine">
          <td colSpan={7}>
            <div className="noList">{t('version2_3.text44')}</div>
          </td>
        </tr>
      )}
      {items.map((item, idx) => {
        return (
          <tr key={`DepositItem${idx}`} className={`${item.mileageUnit === 'A' ? 'won' : ''}`}>
            <td>
              <em>{item.mileageUnit === 'A' ? t('version2_3.text38') : t('version2_3.text39')}</em>
            </td>
            <td style={{ color: item.mileageSe === 'D' ? 'red' : '' }}>
              {withCommas(item.mileageAmount)} {item.mileageUnit === 'A' ? 'P(￦)' : 'P($)'}
            </td>
            {/* <td>{withCommas(item.transferAmount)}</td> */}
            <td>{withCommas(item.expectedAmount)}</td>
            <td>{item.mileageCn}</td>
            <td className="date">{item.transferDt ? dateFormat('yyyy.MM.DD', item.transferDt) : '-'}</td>
            <td className="sts">
              {/* calculateStatus 정산여부 (N:미정산,A:정산진행,B:정산완료) */}
              {/** payRefundStatus (A:미환불 B:전체환불 C:일부환불) */}
              {/** mileageSe (D:결제환불 B:결제) */}
              {/* {item.calculateStatus === 'N' && item?.refundStatus === 'N' && <BaseButton label={'정산요청'} onClick={() => handleSettleType(item)} />} */}
              {item.calculateStatus === 'N' && item.mileageSe !== 'D' && item?.refundStatus !== 'Y' && (item?.payRefundStatus === 'A' || item?.payRefundStatus === 'C') && (
                <BaseButton label={t('version2_3.text40')} onClick={() => handleSettleType(item)} />
              )}
              {item.calculateStatus === 'A' && <em>{t('version2_3.text41')}</em>}
              {item.calculateStatus === 'B' && <em style={{ color: '#AAAAAA', borderColor: '#AAAAAA' }}>{t('version2_3.text43')}</em>}
              {item?.refundStatus === 'Y' && <em>{t('version2_3.text42')}</em>}
            </td>
          </tr>
        );
      })}
      {isModal && (
        <ModalPresent>
          <SettlementModal
            item={settleItem}
            onClose={() => {
              setIsModal(false);
              fetch();
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default DepositItem;
