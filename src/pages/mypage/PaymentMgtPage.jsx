import { BaseButton, BaseInput, BaseSelect, ModalAlertPresent, ModalPresent, BaseDatePicker } from '@components/common';
import React, { useRef, useState } from 'react';
import PaymentMgtListAll from './PaymentMgtListAll';
import PaymentMgtListOpen from './PaymentMgtListOpen';
import PaymentMgtListChoice from './PaymentMgtListChoice';
import usePaymentPage from '../payment/hooks/usePaymentPage';

const PaymentMgtPage = () => {
  // 마이페이지 거래이력은 거래이력에서 참고
  const {
    isLoading,
    tab,
    setTab,
    user,
    menus,
    stss,
    items,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    isConModal,
    isReport,
    handleSearch,
    onClickSearch,
    handleChangeDate,
    filter,
    handleSelectDate,
    selectedDateType,
    setSelectedDateType,
  } = usePaymentPage();

  const tems = [
    { name: '전체', value: 0 },
    { name: '1개월', value: 1 },
    { name: '3개월', value: 3 },
    { name: '6개월', value: 6 },
    { name: '1년', value: 12 },
    { name: '기간 지정', value: 'set' },
  ];

  return (
    <>
      <article>
        <div className="tabNav mypageSub">
          <nav>
            <ul>
              {menus.map((el, idx) => (
                <li key={`Payment_tab_${idx}`} className={`${tab === el.value ? 'on' : ''}`}>
                  <BaseButton label={el.title} onClick={() => setTab(el.value)} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mypageBox payMgtCase">
          <div className="listTit myPayment">
            <h3>거래이력 관리</h3>

            <BaseSelect items={stss} onChange={(e) => handleSearch('statusFilter', e.value)} />
            {/* <div className="right sortingSet">
              <span className="sArea">
                <BaseSelect
                  items={tems}
                  placeholder={'전체'}
                  onChange={(e) => {
                    handleSelectDate(e);
                    setSelectedDateType(e);
                  }}
                />
                {selectedDateType?.value === 'set' && (
                  <>
                    <BaseInput type="text" value={filter} onChange={(e) => handleChangeDate(e)} placeholder="2024-01-01 ~ 2024-01-01" />
                    <BaseButton label={'검색'} className={'btnB ss'} onClick={() => onClickSearch()} />
                  </>
                )}
              </span>
            </div> */}
          </div>
          {tab === '' && <PaymentMgtListAll items={items} user={user} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
          {tab === 'A' && <PaymentMgtListOpen items={items} user={user} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
          {tab === 'B' && <PaymentMgtListChoice items={items} user={user} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
        </div>
      </article>
    </>
  );
};

export default PaymentMgtPage;
