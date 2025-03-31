import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';

import useChatDesignerPage from './hooks/useChatDesignerPage';
import { useTranslation } from 'react-i18next';
const ChatDesignerPage = () => {
  const { t } = useTranslation();
  const { items, handleNav } = useChatDesignerPage();
  const [chatDetail, setChatDetail] = useState(true);

  return (
    <>
      <section>
        <div className={`${chatDetail ? 'fotMView on' : 'fotMView'}`}>
          <h2 className="pb50">{t('base.chat')}</h2>
        </div>

        <Outlet />
      </section>
    </>
  );
};

export default ChatDesignerPage;
