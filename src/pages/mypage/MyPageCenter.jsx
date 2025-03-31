import React, { useRef, useState } from 'react';
import InterestedCenter from './components/InterestedCenter';
import BlockCenter from './components/BlockCenter';
import { useTranslation } from 'react-i18next';

const MyPageCenter = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };

  return (
    <>
      <article>
        <div className="tabNav mypageSub">
          <nav>
            <ul>
              <li className={`${tab === 1 ? 'on' : ''}`}>
                <button onClick={() => handleTab(1)}>{t('center.interest')}</button>
              </li>
              <li className={`${tab === 2 ? 'on' : ''}`}>
                <button onClick={() => handleTab(2)}>{t('center.block')}</button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mypageBox">
          {tab === 1 && <InterestedCenter />}
          {tab === 2 && <BlockCenter />}
        </div>
      </article>
    </>
  );
};

export default MyPageCenter;
