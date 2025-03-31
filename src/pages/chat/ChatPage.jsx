import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import useChatPage from './hooks/useChatPage';

const ChatPage = () => {
  const { t } = useTranslation();
  const { tab, handleTab } = useChatPage();

  const tabRef = useRef();
  const [chatDetail, setChatDetail] = useState(false);

  return (
    <>
      <section>
        <div className={`${chatDetail ? 'fotMView on' : 'fotMView'}`}>
          <h2>{t('base.chat')}</h2>
          <div className="tabNav chatCase" ref={tabRef}>
            <nav>
              <ul>
                <li className={`${tab === 1 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(1)}>{t('dentalProsthetics.description.dentalLab')}</button>
                </li>
                <li className={`${tab === 2 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(2)}>{t('base.dental_designer')}</button>
                </li>
                {/* <li className={`${tab === 3 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(3)}>{t('chat.ex')}</button>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <Outlet />
      </section>
    </>
  );
};

export default ChatPage;
