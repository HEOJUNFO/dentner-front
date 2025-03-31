import React from 'react';
import { BaseInput, BaseButton, ModalAlertPresent, ModalPresent } from '@components/common';
import { WrapListBox, DentalStudio, TableSorting } from '@components/ui';
import LinkAlert from '../../components/ui/modal/LinkAlert';
import BlockAlert from '../../components/ui/modal/BlockAlert';
import ReportModal from '../../components/ui/modal/ReportModal';
import useCenterPage from './hooks/useCenterPage';
import FieldSelection from './components/FieldSelection';
import RegionSelection from './components/RegionSelection';
import { useTranslation } from 'react-i18next';

const CenterPage = () => {
  const {
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    sortType,
    sortingItems,
    searchType,
    keyword,
    setKeyword,
    handleEnter,
    handleSearchClick,
    handleSearchTypeChange,
    items,
    params,
    handleFilterChange,
    total,
    perPage,
    currentPage,
    setCurrentPage,
      setParams
  } = useCenterPage();
  const { t } = useTranslation();

  return (
    <>
      <section>
        <h2>{t('header.search_dentalLab')}</h2>
        {/* 검색 */}
        <fieldset className="searchArea">
          <div className="searchTab">
            <button className={`${searchType === 1 ? 'on' : ''}`} onClick={() => handleSearchTypeChange(1)}>
              {t('center_page.search_case')}
            </button>
            <button className={`${searchType === 2 ? 'on' : ''}`} onClick={() => handleSearchTypeChange(2)}>
              {t('center_page.search_location')}
            </button>
          </div>
          <div className="searchInput">
            <div>
              <p>
                {searchType === 1 && `${t('center_page.select_max_four')} `}
                {searchType === 2 && `${t('center_page.select_prefer_location')} `}
                <br />
                <strong>{t('center_page.search_custom')}</strong>
              </p>
              <span className="searchSet">
                <BaseInput
                  type="text"
                  className="txt"
                  value={keyword}
                  placeholder={t('center_page.related_search')}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => handleEnter(e)}
                />
                <BaseButton type="submit" className="icon" label={'검색'} onClick={handleSearchClick} />
              </span>
            </div>
          </div>
          <div className="searchFillter">
            {searchType === 1 && <FieldSelection onChange={handleFilterChange} params={params} />}
            {searchType === 2 && <RegionSelection onChange={handleFilterChange} params={params} />}
          </div>
        </fieldset>
        {/* 목록 */}
        <WrapListBox>
          <div className="listTit searchChoice">
            <h3>{t('center_page.total_dentalLab')}</h3>
            <TableSorting items={sortingItems} defaultValue={sortType} eventType="click" />
          </div>
          <DentalStudio 
  items={items} 
  type={sortType === 0 || sortType === 1 ? sortType : 0} 
  total={total} 
  perPage={perPage} 
  currentPage={currentPage} 
  onPageChange={(page) => {
    const startRow = (page - 1) * perPage;
    setParams((prev) => ({...prev, startRow }))
    setCurrentPage(page)
  }} 
/>
        </WrapListBox>
      </section>

      {/* url 복사 */}
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
            {...isModal2.value}
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
            type={'B'}
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

export default CenterPage;
