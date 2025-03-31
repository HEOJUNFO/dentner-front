import React, { useState } from 'react';
import { BaseButton } from '@components/common';
import { withCommas, dateFormat } from '@utils/common';
import { useTranslation } from 'react-i18next';

/**
 * 마일리지 결제내역
 * @param {*} param0
 * @returns
 */
const SettleItem = ({ type = '', items = [] }) => {
  const { t } = useTranslation();

  return (
    <>
      {items.length === 0 && (
        <tr className="mNoLine">
          <td colSpan={7}>
            <div className="noList">{t('version2_3.text46')}</div>
          </td>
        </tr>
      )}
      {items.map((item, idx) => {
        return (
          <tr key={`SettleItem${idx}`} className={`${item.calculateSe === 'A' ? 'ing' : item.calculateSe === 'B' ? 'end' : ''}`}>
            <td>
              <em>{item.calculateSe === 'A' ? t('version2_3.text47') : item.calculateSe === 'B' ? t('version2_3.text48') : t('version2_3.text49')}</em>
            </td>
            <td>
              {withCommas(item.mileageAmount)} {item.mileageUnit === 'A' ? 'P(￦)' : 'P($)'}
            </td>
            <td>{withCommas(item.calculateAmount)}</td>
            <td>{item.mileageCn}</td>
            <td className="date">{item.registerDt ? dateFormat('yyyy.MM.DD', item.registerDt) : "-"}</td>
          </tr>
        );
      })}
    </>
  );
};

export default SettleItem;
