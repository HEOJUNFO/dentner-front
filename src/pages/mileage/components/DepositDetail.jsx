import { BaseButton, BaseInput, BaseSelect, Pagenation } from '@components/common';
import { RadioSet } from '@components/ui';
import React from 'react';
import useDepositDetail from '../hooks/useDepositDetail';
import PaymentItem from './PaymentItem';
import Table from './Table';
import DepositItem from './DepositItem';
import { useTranslation } from 'react-i18next';

const DepositDetail = ({ fetch }) => {
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
        fetchDepositList
    } = useDepositDetail();

    const { t } = useTranslation();
    return (
        <div className="listBox">
            <div className='mOSRBack'>
                <div className="listTit lCase">
                    <h3>{t('version2_3.text37')}</h3>
                    <div className="back">
                        <div className="sorting sts">
                            <RadioSet items={statusCode} groupName={'amountFilter'} checkValue={params.amountFilter} onChange={(e) => handleChange('amountFilter', e.target.value)} />
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
                <div className="settlementRule">
                    <p>
                        <span>
                            <strong>[국내] 원화 P(￦) <i>:</i></strong> PG사 수수료 2.8%(VAT포함 3.08)를 제외한 금액이 입금됩니다.
                            <br />
                            <span>
                                <em>&lt;정산식&gt;</em> 원화 마일리지 - PG수수료(PG부가세 포함) <span>= 실 예정 정산금액 (원)</span>
                            </span>
                        </span>
                    </p>
                    <p>
                        <span>
                            <strong>[국외] 달러 P($) <i>:</i></strong> 덴트너 수수료(PG사 수수료 포함) 10%를 차감한 금액이 입금됩니다.
                            <br />
                            <span>
                                <em>&lt;정산식&gt;</em> 달러 마일리지 x 90% x 환율 <span>= 실 예정 정산금액 (원)</span>
                            </span>
                        </span>
                    </p>
                </div>
            </div>
            <div className="mileageList depositCase">
                <Table {...table} items={<DepositItem type={params.amountFilter} items={items} fetch={async() => {
                    await fetchDepositList();
                    await fetch();
                }} />} />
            </div>
            <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
        </div>
    );
};

export default DepositDetail;
