import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BaseInput, BaseButton, ModalPresent, ModalAlertPresent, ModalFullPresent } from '@components/common';
import { ThreeDCommsModal, ConfirmModal } from '@components/ui';
import ThreeDViewer from './ThreeDViewer';
import useCADViewPage from './hooks/useCADCommsPage';
import { useTranslation } from 'react-i18next';
import { NotiContext } from '../../components/ui/layout/hooks/useContext'; // Update this path if needed based on your project structure

import ChannelService from '../../ChannelService';

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
    handleAllCheck,
    isAllChecked,
    handelUpload,
    handleNav,
    isClick,
    handleNoti,
    fetch3d,
  } = useCADViewPage();
  const { t } = useTranslation();
  const { setIsModalOpen } = useContext(NotiContext); // Access the context

  // Update both ChannelTalk and PWA banner visibility when modal state changes
  useEffect(() => {
    if (isModal?.isVisible) {
      ChannelService.hideChannelButton();
      setIsModalOpen(true); // Hide PWA banner when modal is open
    } else {
      ChannelService.showChannelButton();
      setIsModalOpen(false); // Show PWA banner when modal is closed
    }
  }, [isModal?.isVisible, setIsModalOpen]);

  if (isLoading) return <></>;
  if (error) return <>{error}</>;

  return (
    <>
      <section>
        <div className="titNbtn inqListCase">
          <div>
            <h2>{t('version2_2.text92')}</h2>
          </div>
        </div>
        <article>
          <div className="listTopSorting">
            {user?.memberSe === 'C' && (
              <div>
                <span className="checkSet">
                  <BaseInput
                    type="checkbox"
                    id={`checkbox`}
                    checked={isAllChecked}
                    label={t('base.select_all')}
                    onChange={(e) => handleAllCheck(e)}
                  />
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
                {items?.map((item, idx) => (
                  <li key={`3d${idx}`}>
                    <BaseInput
                      type="checkbox"
                      value={item?.threeInfoNo}
                      checked={checkedItems.includes(item?.threeInfoNo)}
                      onChange={(e) => handleCheck(e, item)}
                    />
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
                ))}
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
            onClose={() => setUploadModal(false)}
          />
        </ModalPresent>
      )}

      {isModal?.isVisible && (
        <ModalFullPresent>
          <ThreeDViewer
            fileList={isModal.fileList}
            requestFormNo={isModal.requestFormNo}
            threeInfoNo={isModal.threeInfoNo}
            threeSj={isModal.threeSj}
            isMemo={true}
            onClose={() => setModal({ isVisible: false })}
          />
        </ModalFullPresent>
      )}

      {isConfirmModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal
            {...isConfirmModal.value}
            onClose={() => setIsConfirmModal({ visible: false, value: null })}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default CADCommsPage;