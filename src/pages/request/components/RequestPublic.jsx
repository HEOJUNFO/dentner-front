import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Pagenation, BaseSelect, ItemTag, BaseButton, ModalPresent } from '@components/common';
import { CheckFilter, RequestInfo, TableSorting, TableSortingM } from '@components/ui';
import ItemTypeModal from '@components/ui/modal/ItemTypeModal';
import { useRequestPublic } from '../hooks/useRequestPublic';
import useWindowSize from '../../../components/hooks/useWindowSize';

const RequestPublic = ({ opt }) => {
  const { t } = useTranslation();
  const isMobile = useWindowSize();
  const {
    isLoading,
    isModal,
    setIsModal,
    request,
    prosthetics,
    stss,
    sortingItems,
    sortringInput,
    sortType,
    handleSortingChange,
    items,
    handleProstheticsChange,
    handleChange,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    user,
  } = useRequestPublic();

  if (isLoading) return <></>;

  return (
    <>
      <article>
        {/* 필터 */}
        <CheckFilter items={opt} titleName={'typeName'} valueName={'teethTypeNo'} onChange={handleProstheticsChange} />

        {/* 목록 */}
        <div className="listBox">
          <div className="listTit keyword reqOpen">
            {/* 진행상태 */}
            <BaseSelect items={stss} onChange={({ value }) => handleChange('statusFilter', value)} />

            {/* 검색필터 */}
            {isMobile ? (
              <TableSortingM
                items={sortingItems}
                defaultValue={sortType}
                onChange={handleSortingChange}
                input={sortringInput}
                button={true}
                buttonTitle={'내 요청글만 보기'}
                buttonPosition={{ top: 56, left: 0 }}
              />
            ) : (
              <TableSorting items={sortingItems} defaultValue={sortType} onChange={handleSortingChange} input={sortringInput} />
            )}
          </div>
          <div className="requesrList">
            {!isLoading && (
              <ul className={user?.memberSe === 'A' ? '' : 'office'}>
                {/* 치과기공소, 치자이너 일 경우 <ul className="office"> */}
                {/* <li className="noList search">검색 결과가 없습니다.</li> */}
                {items.length === 0 && <li className="noList">{t('base.empty_search_list')}</li>}
                {items.map((el, idx) => {
                  return <RequestInfo key={`RequestInfo_${idx}`} {...el} />;
                })}
              </ul>
            )}
          </div>
          {items.length > 0 && <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}
        </div>
      </article>

      {isModal && (
        <ModalPresent>
          <ItemTypeModal
            request={request}
            prosthetics={prosthetics}
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default RequestPublic;
