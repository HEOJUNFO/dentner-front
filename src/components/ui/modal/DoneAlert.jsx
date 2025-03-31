import React from 'react';
import { BaseButton } from '@components/common';

const BlockDoneAlert = ({ onClose, title, contents, btnName }) => {
  return (
    <div className="alertPop" style={{ display: 'block' }}>
      <h1 className="pt">{title}</h1>
      <div className="pBack">{contents}</div>
      <div className="pBtn">
        <BaseButton label={btnName} className={'btnB'} onClick={() => onClose()} />
      </div>
    </div>
  );
};

export default BlockDoneAlert;
