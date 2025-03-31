import React, { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import WorkerTransactionItem from './WorkerTransactionItem';
import { useTranslation } from 'react-i18next';

/**
 * 거래내역 목록
 * @param {*} param0
 * @returns
 */
const TransactionHistory = ({ items, type, isDetail = true }) => {
  const { t } = useTranslation();
  // console.log('TransactionHistory', type, items)
  return (
    <div className="paymentList">
      <ul>
        {items.length === 0 && <li className='noList'>{t('version2_2.text147')}</li>}
        {type === 'A' && items.map((item, idx) => <TransactionItem key={`TransactionItem__${idx}`} isDetail={isDetail} {...item} />)}
        {['B', 'C'].includes(type) && items.map((item, idx) => <WorkerTransactionItem key={`WorkerTransactionItem__${idx}`} isDetail={isDetail} {...item} />)}

        {/* <li className='noList search'>검색 결과가 없습니다.</li>
        <li className='noList'>등록된 목록이 없습니다.</li> */}
      </ul>
    </div>
  );
};

export default TransactionHistory;
