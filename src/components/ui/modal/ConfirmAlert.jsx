import { BaseButton } from '@components/common';
import React from 'react';

const ConfirmAlert = ({ onClose, title, contents, btnCancel, btnConfirm, onConfirm }) => {

  return (
    <>
      <div className="alertPop" style={{ display: 'block' }}>
        <h1 className="pt">{title}</h1>
        <div className="pBack">{contents}</div>
        <div className="pBtn">
          <BaseButton label={btnCancel} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={btnConfirm} className={'btnB'} onClick={() => onConfirm()} />
        </div>
      </div>
    </>
  );
};

export default ConfirmAlert;
