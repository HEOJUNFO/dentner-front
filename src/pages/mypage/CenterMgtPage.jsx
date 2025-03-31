import React, { useRef, useState } from 'react';
import CenterMgtList from './CenterMgtList';
import CenterMgtBlock from './CenterMgtBlock';

const CenterMgtPage = () => {
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
                      <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>관심 치과기공소</button></li>
                      <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>차단 치과기공소</button></li>
                  </ul>
              </nav>
          </div>
          <div className='mypageBox'>
            {tab === 1 && <CenterMgtList />}
            {tab === 2 && <CenterMgtBlock />}
          </div>
        </article>
    </>
  );
};

export default CenterMgtPage;
