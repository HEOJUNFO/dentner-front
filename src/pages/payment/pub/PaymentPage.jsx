import React, { useEffect, useRef, useState, useCallback } from 'react';
import PaymentTotal from './PaymentTotal';
import PaymentOpen from './PaymentOpen';
import PaymentChoice from './PaymentChoice';

const PaymentPage = () => {
  const [tab , setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  }
  const tabRef = useRef();

  return (
    <>
      <section>
        <h2>거래내역</h2>
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
        {tab === 1 && <PaymentTotal />}
        {tab === 2 && <PaymentOpen />}
        {tab === 3 && <PaymentChoice />} 
      </section>
    </>
  );
};

export default PaymentPage;
