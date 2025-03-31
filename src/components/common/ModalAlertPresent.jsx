import React from 'react';
import ModalPortal from './ModalPortal';

const ModalAlertPresent = ({ children }) => {
  return (
    <ModalPortal>
      <div className="alertDim">{children}</div>
    </ModalPortal>
  );
};

export default ModalAlertPresent;
