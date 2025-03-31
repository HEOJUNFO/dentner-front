import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Pagenation, BaseInput, BaseSelect, BaseButton } from '@components/common';
import TransactionHistory from './components/TransactionHistory';

/**
 * 지정요청
 * @param {*} param0
 * @returns
 */
const PaymentTarget = ({ items = [], user = {}, total, perPage, currentPage, onPageChange }) => {
  return (
    <>
      <TransactionHistory items={items} type={user?.memberSe} />

      {total > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={onPageChange} />}
    </>
  );
};

export default PaymentTarget;
