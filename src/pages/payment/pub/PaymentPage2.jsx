import React, { useEffect, useRef, useState, useCallback } from 'react';
import PaymentTotal from './PaymentTotal';
import PaymentOpenOffice from './PaymentOpenOffice';
import PaymentChoiceOffice from './PaymentChoiceOffice';
// import PaymentOpenOffice from './PaymentOpen';
// import PaymentChoiceOffice from './PaymentChoice';

const PaymentPage = () => {
  const [tab , setTab] = useState(2);
  const handleTab = (tab) => {
    setTab(tab);
  }
  const tabRef = useRef();

  return (
    <>
      <section>
        <h2>거래내역</h2>
        <button className='bPSToggle'>의뢰현황/납기관리 접기</button> {/* 클릭 시 className='bPSToggle on' */}
        <div className='paySummery'>
            <div className='back left'>
                <strong className='tit'>
                    의뢰현황
                    <dl><dt>총 의뢰</dt><dd><strong>181</strong>건</dd></dl>
                </strong>
                <div>
                    <dl>
                        <dt>의뢰</dt>
                        <dd className='start'><strong>8</strong>건</dd>
                    </dl>
                    <dl>
                        <dt>작업중</dt>
                        <dd><strong>25</strong>건</dd>
                    </dl>
                    <dl>
                        <dt>작업 완료</dt>
                        <dd className='end'><strong>148</strong>건</dd>
                    </dl>
                </div>
            </div>
            <div className='back right'>
                <strong className='tit'>
                    납기관리
                </strong>
                <div>
                    <dl>
                        <dt>1시간 <span>내 예정</span></dt>
                        <dd><strong>0</strong>건</dd>
                    </dl>
                    <dl>
                        <dt>3시간 <span>내 예정</span></dt>
                        <dd><strong>6</strong>건</dd>
                    </dl>
                    <dl>
                        <dt>6시간 <span>내 예정</span></dt>
                        <dd><strong>17</strong>건</dd>
                    </dl>
                    <dl>
                        <dt>12시간 <span>내 예정</span></dt>
                        <dd><strong>25</strong>건</dd>
                    </dl>
                </div>
            </div>
        </div>
        <div className='tabNav' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>전체</button></li>
                    <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>공개요청</button></li>
                    <li className={`${tab === 3 ? 'on' : ''}`}><button onClick={() => handleTab(3)}>지정요청</button></li>
                </ul>
            </nav>
        </div>
        {/* -- */}
        {tab === 1 && '전체 생략'}
        {tab === 2 && <PaymentOpenOffice />}
        {tab === 3 && <PaymentChoiceOffice />} 
      </section>
    </>
  );
};

export default PaymentPage;
