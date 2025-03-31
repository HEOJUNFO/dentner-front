import React, { useRef, useState } from 'react';
import BlockDesigner from './components/BlockDesigner';
import InterestedDesigners from './components/InterestedDesigners';
import { useTranslation } from 'react-i18next';

const MyPageDesigner = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };
  const tabRef = useRef();
  return (
    <>
      <article>
        <div className="tabNav mypageSub" ref={tabRef}>
          <nav>
            <ul>
              <li className={`${tab === 1 ? 'on' : ''}`}>
                <button onClick={() => handleTab(1)}>{t('designer.interest')}</button>
              </li>
              <li className={`${tab === 2 ? 'on' : ''}`}>
                <button onClick={() => handleTab(2)}>{t('designer.block')}</button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mypageBox">
          {tab === 1 && <InterestedDesigners />}
          {tab === 2 && <BlockDesigner />}
        </div>
      </article>
    </>
  );
};

export default MyPageDesigner;
