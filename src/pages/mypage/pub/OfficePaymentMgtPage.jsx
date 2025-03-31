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
        <div className='paySummery mypage'>
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
