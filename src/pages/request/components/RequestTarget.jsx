import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Pagenation, BaseSelect, ItemTag, BaseButton, ModalPresent } from '@components/common';
import { CheckFilter, TableSorting, TableSortingM, RequestInfo, SortingStatus } from '@components/ui';
import ItemTypeModal from '@components/ui/modal/ItemTypeModal';
import { useRequestTarget } from '../hooks/useRequestTarget';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../../components/hooks/useWindowSize';

const RequestTarget = ({ opt }) => {
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
    params,
    items,
    handleProstheticsChange,
    handleChange,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    user,
  } = useRequestTarget();
  const { t } = useTranslation();

  return (
    <>
      <article>
        {/* 필터 */}
        <CheckFilter items={opt} titleName={'typeName'} valueName={'teethTypeNo'} onChange={handleProstheticsChange} />

        {/* 목록 */}
        <div className="listBox">
          <div className="listTit keyword reqChoice">
            {/* 진행상태 */}
            <SortingStatus items={stss} groupName={'sts'} checkValue={params.statusFilter} onChange={(e) => handleChange('statusFilter', e.target.value)} />

            {/* 검색필터 */}
            {isMobile ? 
            <TableSortingM items={sortingItems} defaultValue={sortType} onChange={handleSortingChange} input={sortringInput} /> : 
            <TableSorting items={sortingItems} defaultValue={sortType} onChange={handleSortingChange} input={sortringInput} />
            }
          </div>
          <div className="requesrList">
            <ul className={['B', 'C'].includes(user?.memberSe) ? `choiceCase office` : ''}>
              {/* 치과기공소, 치자이너 일 경우 <ul className="choiceCase office"> */}
              {user?.memberSe === 'B' && (
                <li className="noList info">
                  <p>
                  {t('version2_2.text20')}
                    <br />
                    {t('version2_2.text21')} <strong>{t('version2_2.text22')}</strong> {t('version2_2.text23')}
                  </p>
                  {/* 
                  치과기공소 프로필 만으로는 지정요청을 이용할 수 없어요.
                  <br />
                  지정요청을 이용하시려면 치자이너 프로필로도 가입을 해주세요! */}
                </li>
              )}
              {!isLoading && user?.memberSe !== 'B' && (
                <>
                  {/* <li className="noList search">검색 결과가 없습니다.</li> */}
                  {items.length === 0 && <li className="noList">{t('base.empty_search_list')}</li>}
                  {items.map((el, idx) => {
                    return <RequestInfo type={'target'} key={`RequestInfo_${idx}`} {...el} />;
                  })}
                </>
              )}
            </ul>
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

export default RequestTarget;
