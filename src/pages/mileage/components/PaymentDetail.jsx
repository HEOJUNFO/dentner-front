import { BaseButton, BaseInput, BaseSelect, Pagenation, ModalPresent } from '@components/common';
import { RadioSet } from '@components/ui';
import React, { useTransition } from 'react';
import usePaymentDetail from '../hooks/usePaymentDetail';
import PaymentItem from './PaymentItem';
import Table from './Table';
import { useTranslation } from 'react-i18next';
import PayRefundModal from '@components/ui/modal/PayRefundModal';

const PaymentDetail = () => {
  const {
    isLoading,
    error,
    statusCode,
    dateItem,
    params,
    table,
    handleChange,
    items,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    handleChangeDate,
    handleSelectDate,
    selectedDateType,
    setSelectedDateType,
    filter,
    onClickSearch,
    onKeyDown,
    isPayRefundModal
  } = usePaymentDetail();
  const { t } = useTranslation();

  return (
    <div className="listBox">
      <div className="listTit lCase">
        <h3>{t('mileage.pay_history')}</h3>
        <div className="back">
          <div className="sorting sts">
            <RadioSet items={statusCode} groupName={'statusFilter'} checkValue={params.statusFilter} onChange={(e) => handleChange('statusFilter', e.target.value)} />
          </div>
          <div className={`${selectedDateType === 'set' ? 'right sortingSet enCase' : 'right sortingSet'}`}>
            {/* <div className="right sortingSet" */}
            <span className="sArea">
              <BaseSelect
                items={dateItem}
                placeholder={t('base.all')}
                onChange={(e) => {
                  handleSelectDate(e);
                  setSelectedDateType(e.value);
                }}
              />
              {selectedDateType === 'set' && (
                <>
                  <BaseInput type="text" onChange={(e) => handleChangeDate(e)} value={filter} placeholder="2024-01-01 ~ 2024-01-01" onKeyDown={onKeyDown} />
                  <BaseButton label={t('base.search')} className={'btnB ss'} onClick={onClickSearch} />
                </>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="mileageList payCase">
        <Table {...table} items={<PaymentItem type={params.statusFilter} items={items} />} />
      </div>
      <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />

      {isPayRefundModal.visible && (
        <ModalPresent>
          <PayRefundModal {...isPayRefundModal.value} />
        </ModalPresent>
      )}
    </div>
  );
};

export default PaymentDetail;
