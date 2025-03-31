import React from 'react';
import useMyPageNoti from './hooks/useMyPageNoti';
import { useTranslation } from 'react-i18next';

const MyPageNoti = () => {
  const { t } = useTranslation();
  const { isLoading, items, handleChange , handleChangeAll , user} = useMyPageNoti();
  if (isLoading) return <></>;

  return (
    <>
      <article>
        <div className="mypageBox">
          <div className="listTit">
            <h3>{t('mypage.noti')}</h3>
          </div>
          <div className="notiySetting">

            <ul>
              <li >
                <dl>
                  <dt>{user?.memberTp === 'A' ? t('카카오톡_알림') : t('이메일_알림')}</dt>
                  <dd>{t('알림_설명', {alarm : user?.memberTp === 'A' ? t('mypage.kakao') : t('이메일')})}</dd>
                </dl>
                <span className="toggleSet">
                  <input type="checkbox" checked={items?.filter((e) => e.alarmCodeTp === 'B' && e.alarmStatus === 'Y')?.length > 0 } onChange={(e) => {
                    handleChangeAll('B', e)
                  }} />
                </span>
              </li>
            </ul>
            <ul style={{paddingLeft:20}}>
              {items?.filter((e) => e.alarmCodeTp === 'B' && e.alarmStatus === 'Y')?.length > 0  && items?.filter((e) => e.alarmCodeTp === 'B')?.map((item, idx) => {
                return (
                    <li key={`notiySetting_${idx}`}>
                      <dl>
                        <dt>{item.alarmCodeName}</dt>
                        <dd>{item.alarmCodeDesc}</dd>
                      </dl>
                      <span className="toggleSet">
                      <input type="checkbox" checked={item?.alarmStatus === 'Y' ? true : false} onChange={(e) => handleChange(item.alarmCodeNo, e)} />
                    </span>
                    </li>
                );
              })}
            </ul>
            <ul>
              <li >
                <dl>
                  <dt>{t('앱_알림')}</dt>
                  <dd>{t('알림_설명', {alarm : t('앱_알림')})}</dd>
                </dl>
                <span className="toggleSet">
                  <input type="checkbox" checked={items?.filter((e) => e.alarmCodeTp === 'A' && e.alarmStatus === 'Y')?.length > 0 } onChange={(e) => {
                    handleChangeAll('A', e)
                  }} />
                </span>
              </li>
            </ul>
            <ul style={{paddingLeft:20}}>
              {items?.filter((e) => e.alarmCodeTp === 'A' && e.alarmStatus === 'Y')?.length > 0 && items?.filter((e) => e.alarmCodeTp === 'A')?.map((item, idx) => {
                return (
                  <li key={`notiySetting_${idx}`}>
                    <dl>
                      <dt>{item.alarmCodeName}</dt>
                      <dd>{item.alarmCodeDesc}</dd>
                    </dl>
                    <span className="toggleSet">
                      <input type="checkbox" checked={item?.alarmStatus === 'Y' ? true : false} onChange={(e) => handleChange(item.alarmCodeNo, e)} />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </article>
    </>
  );
};

export default MyPageNoti;
