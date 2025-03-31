import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import RequestOpenOffice from './RequestOpenOfficePage';
import RequestChoiceOffice from './RequestChoiceOfficePage';
import RequestOpen from './RequestOpenPage';
import RequestChoice from './RequestChoicePage';

const RequestPage = () => {
  const [tab , setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  }
  const tabRef = useRef();

  return (
    <>
      <section>
        <div className='titNbtn reqCase'>
          <div>
            <h2>요청서 보기</h2>
            <span>
                <Link to='/requestWrite2' className='btnL ss'>1:1 지정 요청하기</Link>
                <Link to='/requestWrite' className='btnL ss'>공개 요청하기</Link>
            </span>
          </div>
        </div>
        <div className='tabNav' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>공개요청</button></li>
                    <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>지정요청</button></li>
                </ul>
            </nav>
        </div>
        {/* -- */}
        {tab === 1 && <RequestOpenOffice />}
        {tab === 2 && <RequestChoiceOffice />}
      </section>
    </>
  );
};

export default RequestPage;
