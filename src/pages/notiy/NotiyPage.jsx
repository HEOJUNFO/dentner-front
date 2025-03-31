import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import NotiyBasicPage from './NotiyBasicPage';
import NotiyNewsPage from './NotiyNewsPage';
import { useNotify } from './hooks/useNotify';
import { useTranslation } from 'react-i18next';

const NotiyPage = () => {
  const {t} = useTranslation();
  const { tab , setTab } = useNotify();
  const tabRef = useRef();

  return (
    <>
      <section>
        <h2>{t('base.noti')}</h2>
        <div className='tabNav' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => setTab(1)}>{t('base.noti')}</button></li>
                    <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => setTab(2)}>{t('notify_p.news')}</button></li>
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
