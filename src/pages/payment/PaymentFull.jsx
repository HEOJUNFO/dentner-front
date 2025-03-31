import { Pagenation } from '@components/common';
import React from 'react';
import TransactionHistory from './components/TransactionHistory';

const PaymentFull = ({ items = [], user = {}, total, perPage, currentPage, onPageChange }) => {
  return (
    <>
      <TransactionHistory items={items} type={user?.memberSe} />

      {total > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={onPageChange} />}
    </>
  );
};

export default PaymentFull;
