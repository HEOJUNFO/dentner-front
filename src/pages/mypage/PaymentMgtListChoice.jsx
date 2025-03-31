import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, ItemTag, BaseButton } from '@components/common';
import sampleProfile2 from '@assets/images/sample/sample4.jpeg';
import TransactionHistory from '../payment/components/TransactionHistory';

const PaymentMgtPage = ({ items = [], user = {}, total, perPage, currentPage, onPageChange }) => {
  const stss = [
    { name: '진행상태 전체', value: 0 },
    { name: '요청 대기중', value: 1 },
    { name: '요청거절', value: 2 },
    { name: '거래중', value: 3 },
    { name: '납품완료', value: 4 },
    { name: '거래완료', value: 5 },
    { name: '거래취소', value: 6 },
    { name: '거래취소 승인 대기중', value: 7 },
  ];
  const tems = [
    { name: '전체', value: 0 },
    { name: '1개월', value: 1 },
    { name: '3개월', value: 2 },
    { name: '6개월', value: 3 },
    { name: '1년', value: 4 },
    { name: '기간 지정', value: 5 },
  ];

  return (
    <>
      <TransactionHistory items={items} type={user?.memberSe} isDetail={false} />

      {total > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={onPageChange} />}
    </>
  );
};

export default PaymentMgtPage;
