import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BeforeInquire from './BeforeInquirePage';
import TemporaryInquire from './TemporaryInquirePage';

const InquirePage = () => {
  const [tab , setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  }
  const tabRef = useRef();

  return (
    <>
      <section>
        <div className='titNbtn inqListCase'>
          <div>
            <h2>의뢰서 바구니</h2>
            <span>
                <Link to='/inquireWrite' className='btnL ss'>간편모드 의뢰서 작성</Link>
                <Link to='/inquireDetailWrite' className='btnL ss'>상세모드 의뢰서 작성</Link>
            </span>
          </div>
        </div>
        <div className='tabNav' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>요청전 의뢰서</button></li>
                    <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>요청한 의뢰서</button></li>
                    <li className={`${tab === 3 ? 'on' : ''}`}><button onClick={() => handleTab(3)}>임시저장 의뢰서</button></li>
                </ul>
            </nav>
        </div>
        {/* -- */}
        {tab === 1 && <BeforeInquire />}
        {tab === 2 && '요청전 의뢰서와 동일'}
        {tab === 3 && <TemporaryInquire />} 
      </section>
    </>
  );
};

export default InquirePage;
