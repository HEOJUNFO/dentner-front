import React  from 'react';
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
  return (
    <div className="paymentList">
      <ul>
        {items.length === 0 && <li className='noList'>{t('version2_2.text147')}</li>}
        {type === 'A' && items.map((item, idx) => <TransactionItem key={`TransactionItem__${idx}`} isDetail={isDetail} {...item} />)}
        {['B', 'C'].includes(type) && items.map((item, idx) => <WorkerTransactionItem key={`WorkerTransactionItem__${idx}`} isDetail={isDetail} {...item} />)}

      </ul>
    </div>
  );
};

export default TransactionHistory;
