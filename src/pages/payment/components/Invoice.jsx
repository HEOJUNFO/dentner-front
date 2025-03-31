import React, { useEffect, useRef, useState, useCallback } from 'react';
import { withCommas } from '@utils/common';
import { useTranslation } from 'react-i18next';

/**
 * 의뢰서 결제 -결제 내역
 * @returns
 */
const Invoice = ({ items = [], amount = 0 }) => {

  const { t } = useTranslation();
  return (
    <>
      <h3 className="pt60 lineCase">{t('mileage.pay')}</h3>
      <div className="detail">
        <div className="mBack">
          <h4>
            <strong>
              {t('base.prosthesistype')}/{t('base.amount')}
            </strong>
          </h4>
          <div className="orderCase">
            <div className="itemList">
              {items.map((el, idx) => {
                const sdt = el.requestTypeName?.split(' > ') || [];
                //const cnt = Number(el.count) || 0;
                const cnt = Number((el.addCount || el.count)) || 0;
                const amount = Number(el.amount) || 0;
                let total = 0
                if(el.baseCnt && el.baseCnt> 0) {
                  total = el.totalAmount;
                } else{
                  total = cnt * amount;
                }

                return (
                  <div key={`Invoice_${idx}`}>
                    <strong>
                      {sdt.map((ele, idxx) => {
                        if (idxx === 0) {
                          return <strong key={`RequestEstimate__strong_${idx}_${idxx}`}>{ele} &gt; </strong>;
                        } else if (sdt.length - 1 === idxx) {
                          return ele;
                        } else {
                          return <React.Fragment key={`RequestEstimates__fragment_${idx}_${idxx}`}>{ele} &gt;</React.Fragment>;
                        }
                      })}
                    </strong>{' '}
                    <em>
                      {
                        (el.baseCnt && el.baseCnt > 0) ?
                          <>
                            {/*{withCommas(amount)} + ({withCommas(el.addAmount)} <i>{el.count - el.baseCnt}</i>) ={' '}*/}
                            {withCommas(amount)} + ({withCommas(el.addAmount)} <i>{(el.addCount || el.count) - el.baseCnt}</i>) ={' '}

                          </>
                      :
                          <>
                            {withCommas(amount)} <i>{cnt}</i> ={' '}
                          </>
                      }
                      <span>
                        <span>{withCommas(total)}</span> {el?.memberTp === 'B' ? 'P($)' : 'P(￦)'}
                      </span>
                    </em>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="priceSet">
          <span style={{ fontWeight: '600' }}>{t('version2_2.text143')}</span>
          <strong className="right">
            <strong>{withCommas(amount)}</strong> <em>{items[0].memberTp === 'B' ? 'P($)' : 'P(￦)'}</em>
          </strong>
        </div>
        <div className="priceSet">
          <span>{t('version2_2.text144')}</span>
          <strong className="right">
            <strong>{withCommas(amount)}</strong> <em>{items[0].memberTp === 'B' ? 'P($)' : 'P(￦)'}</em>
          </strong>
        </div>
      </div>
    </>
  );
};

export default Invoice;
