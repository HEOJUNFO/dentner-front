import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BaseButton, Pagenation } from '@components/common';
import useFaq from '@components/hooks/useFaq';
import FaqItem from './FaqItem';
import { useTranslation } from 'react-i18next';

const Faq = ({ type }) => {
  const { isLoading, items, fillterItems, tab, selectedTab, setSelectedTab } = useFaq();
  const { t } = useTranslation();

  if (isLoading) return <></>;
  if (type === 'main') {
    return (
      <div className="mainFaq">
        <div className="infoAreaTit">
          <em>{t('faq.more_faq')}</em>
          <strong>FAQ</strong>
        </div>
        <div className="tabNav faqCase mainCase">
          <nav>
            <ul>
              {tab.map((el, idx) => {
                return (
                  <li className={`${selectedTab === el.value ? 'on' : ''}`} key={`selectedTab_${idx}`}>
                    <BaseButton type="button" label={el.title} onClick={() => setSelectedTab(el.value)} />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        {/* -- */}
        <div className="fqalsBack">
          <div className="fqals">
            <div>
              {fillterItems?.map((el, idx) => {
                return <FaqItem key={el.bbsNo} element={el} />;
              })}
            </div>
          </div>

          <div className="btn">
            <Link to="/help" state={{ selectedTab: selectedTab }}>
              {t('base.view_more')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <h2>FAQ</h2>
      <article>
        <div className="tabNav faqCase">
          <nav>
            <ul>
              {tab.map((el, idx) => {
                return (
                  <li className={`${selectedTab === el.value ? 'on' : ''}`} key={`selectedTab_${idx}`}>
                    <BaseButton type="button" label={el.title} onClick={() => setSelectedTab(el.value)} />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="fqalsBack">
          <div className="fqals">
            <div>
              {fillterItems?.map((el, idx) => {
                return <FaqItem key={el.bbsNo} element={el} />;
              })}
            </div>
          </div>

          {/* <Pagenation /> */}
        </div>
      </article>
    </section>
  );
};

export default Faq;
