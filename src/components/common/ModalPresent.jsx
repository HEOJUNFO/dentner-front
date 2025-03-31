// import React, { useEffect, useRef } from 'react';
import React, { useEffect } from 'react';
import ModalPortal from './ModalPortal';
// import useResize from '../../pages/main/hooks/useResize';
// import { actions } from '@store/ResizeStore';

//모달의 wrapper와 effect를 설정해주는 컴포넌트
const ModalPresent = ({ children }) => {
  // const resizeRef = useRef(null);
  // const { targetRef, isUnder } = useResize({ targetRef: resizeRef });

  // //1200보다 under일 경우 effect는 기본 upper일 경우 coverflow
  // useEffect(() => {
  //   if (!isUnder) actions.setEffect('coverflow');
  //   else if (isUnder) actions.setEffect('');
  // }, [isUnder]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => document.body.style.removeProperty('overflow');
  }, []);

  return (
    <ModalPortal>
      {/* <div ref={targetRef} className='popDim'> */}
      <div className="popDim">{children}</div>
    </ModalPortal>
  );
};

export default ModalPresent;
