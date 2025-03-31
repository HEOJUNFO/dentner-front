import React, { useState } from 'react';
import { BaseButton, ModalAlertPresent, BaseTextArea } from '@components/common';
import CancelDoneAlert from './CancelDoneAlert';
import sampleProfile from '@assets/images/no_user.png';
import { useTranslation } from 'react-i18next';

/**
 * 치자이너 요청서 - 거절 모달
 * @param {*} param0
 * @returns
 */
const RejectModal = ({ onClose, member = { nickName: '', profileImg: '' }, onChange, onReject }) => {
  const { t } = useTranslation();
  //   const [isModal, setIsModal] = useState(false);
  const handleImageError = (e) => {
    e.target.src = sampleProfile;
  };
  return (
    <>
      <div className="basicPop rejectPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('version2_3.text85')}</h1>
        <div className="pBack">
          <div className="userInfo">
            <h2>{t('version2_3.text86')}</h2>
            <div>
              <span className="profileImg">
                <img src={member.profileImg || sampleProfile} onError={handleImageError} />
              </span>
              <strong>{member.nickName}</strong>
            </div>
          </div>
          <BaseTextArea placeholder={t('version2_3.text87')} onChange={onChange} />
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={t('version2_2.text106')} className={'btnB'} onClick={() => onReject()} />
        </div>
      </div>

      {/* {isModal && (
        <ModalAlertPresent>
          <CancelDoneAlert
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalAlertPresent>
      )} */}
    </>
  );
};

export default RejectModal;
