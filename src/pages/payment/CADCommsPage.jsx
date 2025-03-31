import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, BaseButton, ModalPresent, ModalAlertPresent, ModalFullPresent } from '@components/common';
import { ThreeDCommsModal, ThreeDModal, ConfirmModal } from '@components/ui';
import useCADViewPage from './hooks/useCADCommsPage';
import { useTranslation } from 'react-i18next';

const CADCommsPage = () => {
  const {
    isLoading,
    error,
    id,
    items,
    user,
    isUploadModal,
    setUploadModal,
    isModal,
    setModal,
    handleViewer,
    handleCheck,
    checkedItems,
    handleRemove,
    isConfirmModal,
    setIsConfirmModal,
    handleConfirmModal,
    handleAllCheck,
    isAllChecked,
    handelUpload,
    handleNav,
    isClick,
    handleNoti,
    fetch3d,
  } = useCADViewPage();
  const { t } = useTranslation();

  // console.log(items)
  if (isLoading) return <></>;
  if (error) return <>{error}</>;
  return (
    <>
      <section>
        <div className="titNbtn inqListCase">
          <div>
            <h2>{t('version2_2.text92')}</h2>
            <span>{/* <BaseButton type="button" className="btnL ss" label={'3D 파일 업로드'} onClick={() => handelUpload()} /> */}</span>
          </div>
        </div>

        <article>
          <div className="listTopSorting">
            {user?.memberSe === 'C' && (
              <div>
                <span className="checkSet">
                  <BaseInput type="checkbox" id={`checkbox`} checked={isAllChecked} label={t('base.select_all')} onChange={(e) => handleAllCheck(e)} />
                </span>
                <span className="postEdit">
                  <strong>
                    {t('base.select')} <em>{checkedItems.length}</em>
                    {t('base.count')}
                  </strong>
                  <span>
                    <Link to="" onClick={handleRemove}>
                    {t('version2_2.text93')}
                    </Link>
                  </span>
                </span>
              </div>
            )}
          </div>
          <div className="listBox">
            <div className="inquireList">
              <ul>
                {items?.length === 0 && <li className="noList">{t('version2_2.text94')}</li>}
                {items?.map((item, idx) => {
                  return (
                    <li key={`3d${idx}`}>
                      <BaseInput type="checkbox" value={item?.threeInfoNo} checked={checkedItems.includes(item?.threeInfoNo)} onChange={(e) => handleCheck(e, item)} />
                      {/* id={`checkbox${requestDocGroupNo}`} value={requestDocGroupNo} checked={isChecked} onChange={(e) => onChange(e, item)}  */}
                      <div className="reQMinInfo">
                        <div className="left">
                          <strong>{item?.threeSj}</strong>
                        </div>
                        <div className="right">
                          <Link className="bMR" to={``} onClick={() => handleViewer(item)}>
                            <span>
                              <em>3D Viewer</em>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="inquireChoiced">
            {user?.memberSe === 'C' && isClick && (
              <div className="btnArea" style={{ paddingBottom: '5px' }}>
                <BaseButton label={t('version2_2.text95')} className={'btnB'} onClick={() => handelUpload()} />
              </div>
            )}
            {isClick && (
              <div className="btnArea" style={{ paddingBottom: '5px', paddingTop: '15px' }}>
                <BaseButton label={t('version2_2.text96')} className={'btnB'} onClick={() => handleNoti()} />
              </div>
            )}

            <div className="btnArea" style={{ paddingBottom: '5px', paddingTop: '15px' }}>
              <BaseButton label={t('base.back')} className={'btnW'} onClick={() => handleNav(-1)} />
            </div>
          </div>
        </article>
      </section>

      {isUploadModal && (
        <ModalPresent>
          <ThreeDCommsModal
            requestFormNo={id}
            onFetch={fetch3d}
            onClose={() => {
              setUploadModal(false);
            }}
          />
        </ModalPresent>
      )}

      {isModal?.isVisible && (
        <ModalFullPresent>
          <ThreeDModal
            {...isModal}
            onClose={() => {
              setModal({ isVisible: false });
            }}
          />
        </ModalFullPresent>
      )}

      {isConfirmModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal
            {...isConfirmModal.value}
            onClose={() => {
              setIsConfirmModal({ visible: false, value: null });
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default CADCommsPage;
