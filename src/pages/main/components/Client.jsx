import React, { useEffect, useRef, useState, useCallback } from 'react';

import { Faq } from '@components/ui';
import Partner from './Partner';
import Used from './Used';
import Request from './Request';
import Tips from './Tips';
import Map from './Map';
import Cad from './Cad';
import Guide from './Guide';
import Banner from './Banner';

const Client = () => {
  return (
    <>
      {/* 의뢰서 */}
      <Request />

      {/* CAD 디자인 */}
      <Cad />

      {/* 치과기공소 */}
      <Map />

      {/* 의뢰서 작성 TIP */}
      <Tips />

      {/* 요청 */}
      <Guide />

      {/* 덴트너 이용 */}
      <Used />

      {/* 고객사 */}
      <Partner />

      {/* FAQ */}
      <Faq type="main" />

      {/*  */}
      <div className="sampleBox">
        <Banner type={'C'} />
      </div>
      {/* <div className="sampleBox">
        
        <div>규제샌드박스 실종특례 명시 코멘트로 위치 요청 부탁드립니다.</div>
      </div> */}
    </>
  );
};

export default Client;
