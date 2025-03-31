import { BaseButton, BaseInput, BaseSelect, Pagenation, ModalPresent } from '@components/common';
import { RadioSet } from '@components/ui';
import React, { forwardRef, useImperativeHandle } from 'react';
import useChargingDetail from '../hooks/useChargingDetail';
import ChargingItem from './ChargingItem';
import Table from './Table';
import { useTranslation } from 'react-i18next';
import ChargeRefundModal from '@components/ui/modal/ChargeRefundModal';

const ChargingDetail = forwardRef(({ }, ref) => {
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
    handleSelectDate,
    handleChangeDate,
    selectedDateType,
    setSelectedDateType,
    filter,
    onClickSearch,
    onKeyDown,
    fetchMileageCharges,
    isChargeRefundModal
  } = useChargingDetail();

  useImperativeHandle(ref, () => ({
    fetch: () => fetchMileageCharges(),
  }));
  const { t } = useTranslation();

  return (
    <div className="listBox">
      <div className="listTit lCase">
        <h3>{t('mileage.charge_history')}</h3>
        <div className="back">
          <div className="sorting sts">
            <RadioSet items={statusCode} groupName={'statusFilter_Charging'} checkValue={params.statusFilter} onChange={(e) => handleChange('statusFilter', e.target.value)} />
          </div>
          <div className={`${selectedDateType === 'set' ? 'right sortingSet enCase' : 'right sortingSet'}`}>
            {/* <div className="right sortingSet" */}
            {
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
            }
          </div>
        </div>
      </div>

      <div className="mileageList chargeCase">
        <Table {...table} items={<ChargingItem items={items} type={params.statusFilter} />} />
      </div>

      <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />

      {isChargeRefundModal.visible && (
        <ModalPresent>
          <ChargeRefundModal {...isChargeRefundModal.value} />
        </ModalPresent>
      )}
    </div>

  );
});

export default ChargingDetail;
