import React, { useRef, useState } from 'react';
import PaymentMgtListAll from './PaymentMgtListAll';
import PaymentMgtListOpen from './PaymentMgtListOpen';
import PaymentMgtListChoice from './PaymentMgtListChoice';

const PaymentMgtPage = () => {
  const [tab , setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  }
  const tabRef = useRef();
  return (
    <>
      <article>
        <div className='tabNav mypageSub' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>전체</button></li>
                    <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>공개요청</button></li>
                    <li className={`${tab === 3 ? 'on' : ''}`}><button onClick={() => handleTab(3)}>지정요청</button></li>
                </ul>
            </nav>
        </div>
        <div className='mypageBox payMgtCase'>
          {tab === 1 && <PaymentMgtListAll />}
          {tab === 2 && <PaymentMgtListOpen />}
          {tab === 3 && <PaymentMgtListChoice />}
        </div>
      </article>
    </>
  );
};

export default PaymentMgtPage;
