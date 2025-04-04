import { BaseButton, BaseInput } from '@components/common';
import { Designer, TableSorting, WrapListBox, TableSortingM } from '@components/ui';
import React from 'react';

import { ModalAlertPresent, ModalPresent } from '@components/common';
import BlockAlert from '../../components/ui/modal/BlockAlert';
import LinkAlert from '../../components/ui/modal/LinkAlert';
import ReportModal from '../../components/ui/modal/ReportModal';
import FieldSelection from './components/FieldSelection';
import useDesignerPage from './hooks/useDesignerPage';
import { useTranslation } from 'react-i18next';
import useWindowSize from '../../components/hooks/useWindowSize';

const DesignerPage = () => {
  const isMobile = useWindowSize();
  const {
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    params,
    items,
    sortType,
    sortingItems,
    keyword,
    setKeyword,
    handleEnter,
    handleSearchClick,
    handleFilterChange,
    handleSortingChange,
    handleAddBlock,
    total,
    perPage,
    currentPage,
    setCurrentPage,
    setParams
  } = useDesignerPage();
  const { t } = useTranslation();

  return (
    <>
      <section>
        <h2>{t('header.search_dental_designer')}</h2>
        {/* 검색 */}
        <fieldset className="searchArea designerCase">
          <div className="searchTab">
            <button className="on"> {t('center_page.search_case')}</button>
          </div>
          <div className="searchInput">
            <div>
              <p>
                {t('disigner.select_type')}, <br />
                <strong>{t('disigner.search')}!</strong>
              </p>
              <span className="searchSet">
                <BaseInput type="text" className="txt" value={keyword} placeholder={t('disigner.related_search')} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => handleEnter(e)} />
                <BaseButton type="submit" className="icon" label={t('base.search')} onClick={handleSearchClick} />
              </span>
            </div>
          </div>
          <div className="searchFillter">
            <FieldSelection params={params} onChange={handleFilterChange} />
          </div>
        </fieldset>
        {/* 목록 */}
        <WrapListBox>
          <div className="listTit searchChoice">
            <h3>{t('disigner.total')}</h3>
            {isMobile ? (
              <TableSortingM items={sortingItems} defaultValue={sortType} onChange={handleSortingChange} button={true} buttonTitle={'관심 치자이너'} buttonPosition={{ bottom: -5 }} />
            ) : (
              <TableSorting items={sortingItems} defaultValue={sortType} onChange={handleSortingChange} eventType="click" />
            )}
          </div>
          <Designer items={items} type={sortType} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => {
            const startRow = (page - 1) * perPage;
            setParams((prev) => ({...prev, startRow }))
            setCurrentPage(page)
          }} />
        </WrapListBox>
      </section>

      {isModal.visible && (
        <ModalAlertPresent>
          <LinkAlert
            {...isModal.value}
            onClose={() => {
              setIsModal({ visible: false, value: null });
            }}
          />
        </ModalAlertPresent>
      )}

      {/* 차단하기 */}
      {isModal2.visible && (
        <ModalAlertPresent>
          <BlockAlert
            onBlock={handleAddBlock}
            onClose={() => {
              setIsModal2({ visible: false, value: null });
            }}
          />
        </ModalAlertPresent>
      )}

      {/* 신고하기 */}
      {isModal3.visible && (
        <ModalPresent>
          <ReportModal
            type={'C'}
            targetType={'A'}
            {...isModal3.value}
            onClose={() => {
              setIsModal3({ visible: false, value: null });
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default DesignerPage;
