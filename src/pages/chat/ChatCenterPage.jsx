import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useChatCenterPage from './hooks/useChatCenterPage';
import { useTranslation } from 'react-i18next';

const ChatCenterPage = () => {
  const { t } = useTranslation();
  const { chatDetail, type, handleChange } = useChatCenterPage();

  return (
    <>
      <section>
        <div className={`${chatDetail ? 'fotMView on' : 'fotMView'}`}>
          <h2 className="withToggle">
            {t('base.chat')}
            <span className="toggleSet label">
              <input type="checkbox" id="toggleLabel" checked={type} onChange={(e) => handleChange(e.target.checked)} />
              <label>
                <span>
                  {/* 치과기공소 */}
                  {t('service_page.dental_labs')}
                </span>
                <em>
                  {/* 치자이너 */}
                  {t('faq.dental_designer')}
                </em>
              </label>
            </span>
          </h2>
        </div>

        <Outlet context={{ type }} />
      </section>
    </>
  );
};

export default ChatCenterPage;
