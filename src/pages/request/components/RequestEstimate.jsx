import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseInput } from '@components/common';

/**
 * 견적서 단가
 * @param {*} param0
 * @returns
 */
const RequestEstimate = ({ requestTypeName, amount, count, memberTp = 'A', index, error, onChange }) => {
  const { t } = useTranslation();
  const sdt = requestTypeName?.split(' > ') || [];

  return (
    <li>
      <div>
        <strong>
          {/* <strong>크라운 &gt; </strong>Zirconia &gt; 일반 (Hole X) */}
          {sdt.map((ele, idxx) => {
            if (idxx === 0) {
              return <strong key={`RequestEstimate__strong_${index}_${idxx}`}>{ele} &gt; </strong>;
            } else if (sdt.length - 1 === idxx) {
              return ele;
            } else {
              return <React.Fragment key={`RequestEstimates__fragment_${index}_${idxx}`}>{ele} &gt;</React.Fragment>;
            }
          })}
        </strong>{' '}
        <em>
          <strong>{count}</strong>
          {t('base.count')}
        </em>
      </div>
      <span className="priceUnit">
        <span className="unit">
          <span>{t('version2_2.text90')}</span>
          <BaseInput
            type="text"
            id="typeAmount"
            placeholder="0"
            maxLength="10"
            error={error}
            value={amount}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
              onChange(index, e.target.value);
            }}
            // onKeyUp={(e) => {
            //   if (!/[0-9]/.test(e.key)) {
            //     e.preventDefault();
            //   }
            // }}
          />
          {memberTp === 'A' && <em>P(￦)</em>}
          {memberTp === 'B' && <em>P($)</em>}
        </span>
      </span>
    </li>
  );
};

export default RequestEstimate;
