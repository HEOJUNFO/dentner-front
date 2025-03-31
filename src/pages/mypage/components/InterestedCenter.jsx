import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalPresent, ModalAlertPresent } from '@components/common';
import { DentalStudio } from '@components/ui';

import useInterestedCenter from '../hooks/useInterestedCenter';
import ReportModal from '../../../components/ui/modal/ReportModal';
import BlockAlert from '../../../components/ui/modal/BlockAlert';

/**
 * 마이페이지 - 치기공소 관리 - 관심 치기공소
 * @returns
 */
const InterestedCenter = () => {
  const { t } = useTranslation();
  const { isLoading, isModal2, setIsModal2, isModal3, setIsModal3, items, total, perPage, currentPage, setCurrentPage } = useInterestedCenter();

  return (
    <>
      <div className="listTit">
        <h3>{t('center.interest')}</h3>
      </div>

      {!isLoading && <DentalStudio items={items} type={1} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}

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

export default InterestedCenter;
