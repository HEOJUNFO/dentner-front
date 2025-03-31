import React, { useState } from 'react';
import { BaseButton } from '@components/common';
import { useSnack } from '@components/hooks';
import ConfirmDoneAlert from './ConfirmDoneAlert';

const ConfirmModal = ({ onClose, title, contents, doneTitle, doneContents, failModalTitle, failModalContetns, failContents, btnCancel, btnConfirm, onConfirm, onDone }) => {
  const { showSnackbar, showWarnSnackbar } = useSnack();
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const handleClick = async () => {
    if (onConfirm) {
      const r = await onConfirm();
      if (r) {
        setIsModal(true);
      } else {
        if (failModalTitle) {
          setIsModal2(true);
        } else {
          showWarnSnackbar(failContents);
        }
      }
    } else {
      setIsModal(true);
    }
  };
  return (
    <>
      <div className="alertPop" style={{ display: (!isModal && !isModal2) ? 'block' : '' }}>
        <h1 className="pt">{title}</h1>
        <div className="pBack">{contents}</div>
        <div className="pBtn">
          <BaseButton label={btnCancel} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={btnConfirm} className={'btnB'} onClick={handleClick} />
        </div>
      </div>

      {isModal && (
        <ConfirmDoneAlert
          doneTitle={doneTitle}
          doneContents={doneContents}
          onClose={() => {
            setIsModal(false);
            if (onDone) onDone();
            else if (onClose) onClose();
          }}
        />
      )}
      {isModal2 && (
        <ConfirmDoneAlert
          doneTitle={failModalTitle}
          doneContents={failModalContetns}
          onClose={() => {
            setIsModal2(false);
            if (onClose) onClose();
          }}
        />
      )}
    </>
  );
};

export default ConfirmModal;
