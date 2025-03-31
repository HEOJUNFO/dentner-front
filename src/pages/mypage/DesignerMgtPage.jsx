import React, { useRef, useState } from 'react';
import DesignerMgtList from './DesignerMgtList';
import DesignerMgtBlock from './DesignerMgtBlock';

const DesignerMgtPage = () => {
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
                      <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>관심 치자이너</button></li>
                      <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>차단 치자이너</button></li>
                  </ul>
              </nav>
          </div>
          <div className='mypageBox'>
            {tab === 1 && <DesignerMgtList />}
            {tab === 2 && <DesignerMgtBlock />}
          </div>
        </article>
    </>
  );
};

export default DesignerMgtPage;
