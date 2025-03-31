import React, { useState } from 'react';
import { BaseButton } from '@components/common';
import BlockDoneAlert from './BlockDoneAlert';
import { ModalAlertPresent } from '@components/common';

const BlockAlert = ({ onClose }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <div className="alertPop" style={{ display: 'block' }}>
        <h1 className="pt">차단하기</h1>
        <div className="pBack">해당 회원을 차단하시겠습니까?</div>
        <div className="pBtn">
          <BaseButton label={'취소'} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={'확인'} className={'btnB'} onClick={() => setIsModal(true)} />
        </div>
      </div>
      {isModal && (
        <ModalAlertPresent>
          <BlockDoneAlert
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default BlockAlert;
