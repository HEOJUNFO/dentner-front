import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BaseButton, ItemTag, PostsMore, BaseSelect } from '@components/common';
import { useNotify } from './hooks/useNotify';
import { useTranslation } from 'react-i18next';

const NotiyNewsPage = ({}) => {
  const { t } = useTranslation();

  const { newsList, handleSingleRead, params, setParams, handleRead } = useNotify();

  return (
    <>
      {/* 목록 */}
      <article>
        <div className="listBox">
          <div className="listTit notiyCase">
            <span className="notiySorting newsCase">
              <span className="txtSorting">
                <span onClick={() => setParams({ ...params, readAt: null })}>
                  <input type="radio" id="sorting1" name="sorting1" defaultChecked />
                  <label htmlFor="sorting1">{t('base.all')}</label>
                </span>
                <span onClick={() => setParams({ ...params, readAt: 'N' })}>
                  <input type="radio" id="sorting2" name="sorting1" />
                  <label htmlFor="sorting2">{t('base.not_read')}</label>
                </span>
              </span>
              <BaseButton label={t('notify_p.read_all')} className="allRead" onClick={() => handleRead('B')} />
            </span>
          </div>
          <div className="notiyList">
            <ul>
              {newsList?.list?.length > 0 ? (
                newsList?.list?.map((el, ix) => {
                  return (
                    <li key={ix} className={el?.readAt === 'Y' ? '' : 'new'} onClick={() => handleSingleRead(el)}>
                      <em>{t('base.noti')}</em>
                      <strong>{el?.alarmSj}</strong>
                      <p>{el?.alarmCn}</p>
                    </li>
                  );
                })
              ) : (
                <li className="noList" style={{ backgroundColor: '#FFFFFF' }}>
                  {t('notify_p.not_exist')}
                </li>
              )}
            </ul>
          </div>
          {newsList?.cnt % newsList?.list?.length > 0 && <BaseButton label={t('base.view_more')} className="listMore" onClick={() => setParams({ ...params, pageCnt: params.pageCnt + 8 })} />}
        </div>
      </article>
    </>
  );
};

export default NotiyNewsPage;
