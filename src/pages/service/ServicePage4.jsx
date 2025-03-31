// 약관

import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import { Pagenation, ItemTag, BaseButton } from '@components/common';
import { Link } from 'react-router-dom';

const ServicePage4 = () => {
  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };
  const tabRef = useRef();

  return (
    <>
      <section>
        <h2>플랫폼 서비스 혜택 및 정보 수신에 동의(선택)</h2>
        <article className='serviceRules'>
          마케팅 정보 수집, 이용 목적<br/><br/>
          - 신규 기능 및 서비스 홍보 및 이용 권유<br/>
          - 경품 지급 등 이용자 편의 제공
        </article>
      </section>
    </>
    );
};

export default ServicePage4;
