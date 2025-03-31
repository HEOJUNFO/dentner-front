import React from 'react';
import { ModalAlertPresent } from '@components/common';
import { Designer, ConfirmModal } from '@components/ui';
import useRequestDesignerPage from './hooks/useRequestDesignerPage';
import DesignerChoice from './components/DesignerChoice';
import { useTranslation } from 'react-i18next';

/**
 * 치자이너 선택 화면
 */
const DesignerChoicePage = () => {
  const { isLoading, isModal, setIsModal, items, choiceItem, total, perPage, currentPage, setCurrentPage, handleDesigner } = useRequestDesignerPage();
  const { t } = useTranslation();
  if (isLoading) return <></>;
  return (
    <>
      <section>
        <h2>{t('status.select_dental')}</h2>

        {/* 선택한 치자이너 */}
        {choiceItem.length > 0 && <DesignerChoice items={choiceItem} />}

        {/* 치자이너 목록 */}
        <article>
          <div className="listBox">
            <div className="listTit pt0">
              <h3>
                {t('version2_2.text118')} ({items.length})
              </h3>
            </div>

            <Designer className={'searchList choiceCase'} type={5} items={items} total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
          </div>
        </article>
      </section>

      {isModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal
            title={t('status.select_dental')}
            doneContents={t('version2_1.text8')}
            failContents={t('version2_1.text9')}
            contents={t('version2_1.text10')}
            btnCancel={t('version2_1.text3')}
            btnConfirm={t('version2_1.text11')}
            onConfirm={handleDesigner}
            onClose={() => {
              setIsModal({ visible: false, value: '' });
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default DesignerChoicePage;
