import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import NotiyBasicPage from './NotiyBasicPage';
import NotiyNewsPage from './NotiyNewsPage';

const NotiyPage = () => {
  const [tab , setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  }
  const tabRef = useRef();

  return (
    <>
      <section>
        <h2>알림</h2>
        <div className='tabNav' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>알림</button></li>
                    <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>덴트너 소식</button></li>
                </ul>
            </nav>
        </div>
        {/* -- */}
        {tab === 1 && <NotiyBasicPage />}
        {tab === 2 && <NotiyNewsPage />}

        
        {/* <div className='noList chat'>
                진행중인 채팅목록이 없습니다.
            </div> */}
      </section>
    </>
  );
};

export default NotiyPage;
