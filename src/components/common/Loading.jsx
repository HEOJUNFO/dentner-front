import React from 'react';
import { PulseLoader, SyncLoader } from 'react-spinners';
import ModalPortal from './ModalPortal';
import ModalStore from '@store/ModalStore';

const override = {
  textAlign: 'center',
};

const Loading = () => {
  const { actions, isProgress, received } = ModalStore();

  return (
    <ModalPortal>
      <div className="alertDim">
        {isProgress && (
          <div className="alertPop fileUpPop" style={{ display: 'block' }}>
            <div className="pBack">
              <span className="fileIng">
                <span>
                  File Upload...(<em>{received}</em>%)
                </span>
              </span>
            </div>
          </div>
        )}
        {!isProgress && <SyncLoader color="#4b72fe" loading={true} cssOverride={override} />}
      </div>
    </ModalPortal>
  );
};

export default Loading;
