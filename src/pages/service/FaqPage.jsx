import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import { Pagenation, ItemTag, BaseButton } from '@components/common';
import { Link } from 'react-router-dom';

const FaqPage = () => {
  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };
  const tabRef = useRef();

  return (
    <>
      <section>
        <h2>FAQ</h2>
        <article>
          <div className="tabNav faqCase" ref={tabRef}>
            <nav>
              <ul>
                <li className={`${tab === 1 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(1)}>공통</button>
                </li>
                <li className={`${tab === 2 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(2)}>의뢰인</button>
                </li>
                <li className={`${tab === 3 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(3)}>치과기공소</button>
                </li>
                <li className={`${tab === 4 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(4)}>치자이너</button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="fqalsBack">
            <div className="fqals">
              <div>
                <dl>
                  <dt>덴트너는 어떤 서비스 인가요?</dt>
                  <dd>등록된 답변 내용이 노출됩니다</dd>
                </dl>
                <dl className="on">
                  <dt>덴트너는 어떤 서비스 인가요?</dt>
                  <dd>어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.</dd>
                </dl>
                <dl>
                  <dt>덴트너는 어떤 서비스 인가요?</dt>
                  <dd>등록된 답변 내용이 노출됩니다</dd>
                </dl>
              </div>
            </div>
            <Pagenation />
          </div>
        </article>
      </section>
    </>
  );
};

export default FaqPage;
