import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample3.png';
import { Link } from 'react-router-dom';
import { BaseButton, ItemTag, PostsMore, BaseSelect } from '@components/common';
import { useNotify } from './hooks/useNotify';
import { useTranslation } from 'react-i18next';

const NotiyBasicPage = ({}) => {
  const { t } = useTranslation();
  const stss = [
    { name: t('base.all'), value: 0 },
    { name: t('base.chat'), value: 1 },
    { name: t('notify_p.received_quote'), value: 2 },
    { name: t('notify_p.noti_apply'), value: 3 },
    { name: t('notify_p.noti_signup'), value: 4 },
    { name: t('notify_p.mileage_accept'), value: 5 },
  ];
  const { notiList, setSorting, handleSingleRead, params, setParams, handleRead } = useNotify();

  return (
    <>
      {/* 목록 */}
      <article>
        <div className="listBox">
          <div className="listTit notiyCase">
            <BaseSelect
              items={stss}
              placeholder={t('base.all')}
              onChange={(e) => {
                setSorting(e.value);
              }}
            />
            <span className="notiySorting">
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
              <BaseButton label={t('notify_p.read_all')} className="allRead" onClick={() => handleRead('A')} />
            </span>
          </div>
          <div className="notiyList">
            <ul>
              {notiList?.list?.length > 0 ? (
                notiList?.list?.map((el, ix) => {
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
              {/* <li className='new'>
                            <em>새 소식</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다. </p>
                        </li>
                        <li className='new'>
                            <em>견적확인</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>
                                안내 내용이 이곳에 출력됩니다. <br/>
                                클릭 시, 관련 페이지로 이동됩니다.
                            </p>
                        </li>
                        <li>
                            <em>알림</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>거래취소</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>거래중</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>거래매치</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>채팅알림</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>견적확인</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li> */}
            </ul>
          </div>
          {notiList?.cnt % notiList?.list?.length > 0 && <BaseButton label={t('base.view_more')} className="listMore" onClick={() => setParams({ ...params, pageCnt: params.pageCnt + 8 })} />}
        </div>
      </article>
    </>
  );
};

export default NotiyBasicPage;
