import { BaseButton, BaseInput, BaseSelect, ModalAlertPresent, ModalPresent, BaseDatePicker } from '@components/common';
import { ConfirmModal, ReportModal, CancelModal, CancelCallModal } from '@components/ui';
import React from 'react';
import usePaymentPage from './hooks/usePaymentPage';

import PaymentSummery from './components/PaymentSummery';
import PaymentFull from './PaymentFull';
import PaymentPublic from './PaymentPublic';
import PaymentTarget from './PaymentTarget';
import { useTranslation } from 'react-i18next';

const PaymentPage = () => {
  const {
    isLoading,
    user,
    menus,
    stss,
    tab,
    setTab,
    items,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    isConModal,
    isCancelModal,
    isCancelCallModal,
    isReport,
    handleSearch,
    onClickSearch,
    handleChangeDate,
    filter,
    handleSelectDate,
    selectedDateType,
    setSelectedDateType,
    onKeyDown,
  } = usePaymentPage();
  const { t } = useTranslation();

  const tems = [
    { name: t('request.all'), value: 0 },
    { name: `1${t('payment.month')}`, value: 1 },
    { name: `3${t('payment.month')}`, value: 3 },
    { name: `6${t('payment.month')}`, value: 6 },
    { name: `1${t('payment.year')}`, value: 12 },
    { name: t('payment.specify_period'), value: 'set' },
  ];
  if (isLoading) return <></>;

  return (
    <>
      <section>
        <h2>{t('header.transaction_list')}</h2>

        {['C', 'B'].includes(user.memberSe) && <PaymentSummery />}

        <div className="tabNav">
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

        <article>
          {/* 목록 */}
          <div className="listBox">
            <div className="listTit paymentCase">
              <BaseSelect items={stss} onChange={(e) => handleSearch('statusFilter', e.value)} />
              <div className={`${selectedDateType?.value === 'set' ? 'right sortingSet enCase' : 'right sortingSet'}`}>
                {/* <div className="right sortingSet" */}
                <span className="sArea">
                  <BaseSelect
                    items={tems}
                    placeholder={t('request.all')}
                    onChange={(e) => {
                      handleSelectDate(e);
                      setSelectedDateType(e);
                    }}
                  />
                  {selectedDateType?.value === 'set' && (
                    <>
                      <BaseInput type="text" value={filter} onChange={(e) => handleChangeDate(e)} onKeyDown={onKeyDown} placeholder="2024-01-01 ~ 2024-01-01" />
                      <BaseButton label={t('base.search')} className={'btnB ss'} onClick={() => onClickSearch()} />
                    </>
                  )}
                </span>
              </div>
            </div>

            {tab === '' && <PaymentFull items={items} user={user} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
            {tab === 'A' && <PaymentPublic items={items} user={user} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
            {tab === 'B' && <PaymentTarget items={items} user={user} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
          </div>
        </article>
        {/* -목록- */}
      </section>

      {isConModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal {...isConModal.value} />
        </ModalAlertPresent>
      )}

      {/* 신고하기 */}
      {isReport.visible && (
        <ModalPresent>
          <ReportModal {...isReport.value} />
        </ModalPresent>
      )}

      {/* 거래취소 */}
      {isCancelModal.visible && (
        <ModalPresent>
          <CancelModal {...isCancelModal.value} />
        </ModalPresent>
      )}

      {isCancelCallModal.visible && (
        <ModalPresent>
          <CancelCallModal {...isCancelCallModal.value} />
        </ModalPresent>
      )}

      {/* {isModal2 && (
        <ModalPresent>
          <CancelCallModal
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalPresent>
      )} */}
    </>
  );
};

export default PaymentPage;
