import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalAlertPresent, ModalPresent } from '@components/common';
import { WrapListBox, Designer, TableSorting } from '@components/ui';

import BlockAlert from '../../../components/ui/modal/BlockAlert';
import ReportModal from '../../../components/ui/modal/ReportModal';
import useInterestedDesigners from '../hooks/useInterestedDesigners';

/**
 * 마이페이지 - 치자이너 관리 - 관심 치자이너
 * @returns
 */
const InterestedDesigners = () => {
  const { t } = useTranslation();
  const { isLoading, isModal2, setIsModal2, isModal3, setIsModal3, items, total, perPage, currentPage, setCurrentPage, handleAddBlock } = useInterestedDesigners();

  return (
    <>
      <div className="listTit">
        <h3>{t('designer.interest')}</h3>
      </div>
      {!isLoading && <Designer items={items} type={1} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />}

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

export default InterestedDesigners;
