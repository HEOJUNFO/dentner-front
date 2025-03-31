import React from 'react';
import logo from '@assets/images/img_logo.png';
import ModalPortal from './ModalPortal';
// 술사진 로딩 페이지
const override = {
  span: '20px',
  // margin: '0 auto',
  marginTop: '220px',
  textAlign: 'center',
  // color: '#fff',
  // size: '20',
};

const SuspenseLoading = ({ loading }) => {
  return (
    <ModalPortal>
      <div style={override}>
        <img src={logo} />
        <div
          style={{
            padding: '20px',
            color: '#fff',
            fontWeight: '700',
          }}
        >
          <h> 페이지 이동중 ... </h>
        </div>
      </div>
    </ModalPortal>
  );
};

export default SuspenseLoading;
