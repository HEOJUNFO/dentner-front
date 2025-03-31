import { BaseButton, BaseInput, BaseSelect, Pagenation } from '@components/common';
import { RadioSet } from '@components/ui';
import React from 'react';
import useSettleDetail from '../hooks/useSettleDetail';
import PaymentItem from './PaymentItem';
import Table from './Table';
import DepositItem from './DepositItem';
import SettleItem from './SettleItem';
import { useTranslation } from 'react-i18next';

const SettleDetail = () => {
  const {
    isLoading,
    error,
    statusCode,
    dateItem,
    sortItem,
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
  } = useSettleDetail();

  const { t } = useTranslation();
  return (
    <div className="listBox">
        <div className="listTit lCase">
            <h3>{t('version2_3.text45')}</h3>
            <div className="back">
                <div className="sorting sts">
                <RadioSet items={statusCode} groupName={'statusFilter'} checkValue={params.statusFilter} onChange={(e) => handleChange('statusFilter', e.target.value)} />
                </div>
                <div className="right sortingSet">
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
        <div className="mileageList calculateCase">
            <Table {...table} items={<SettleItem type={params.statusFilter} items={items} />} />
        </div>
        <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
    </div>
  );
};

export default SettleDetail;
