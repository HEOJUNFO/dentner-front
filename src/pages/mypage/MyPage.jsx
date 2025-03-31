import { BaseButton, ItemTag } from '@components/common';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import MypageTopDesigner from './components/MypageTopDesigner';
import MypageTopCenter from './components/MypageTopCenter';
import { useTranslation } from 'react-i18next';
import useMyPage from './hooks/useMyPage';

const MyPage = () => {
  const { t, i18n } = useTranslation();
  const { isLoading, userInfo, menus, tab, setTab, user, handleProfileType, handleAddDesigner, centerInfo } = useMyPage();
  const [kindValue, setKindValue] = useState(false);
  const [both, setBoth] = useState(false);

  //A: 의뢰인, B:치기공사, C:치자이너
  if (isLoading) return <></>;
  return (
    <>
      <section>
        {user?.memberSe === 'A' ? (
          <h2>{t('base.mypage')}</h2>
        ) : (
          <h2 className={user?.memberSe === 'C' && user?.multiProfileCnt === 1 ? '' : 'withToggle'}>
            {t('base.mypage')}
            {user?.memberSe === 'B' && user?.multiProfileCnt === 1 && (
              <div style={{ marginTop: 33 }}>
                <button className="btnL sm" style={{ width: 230 }} onClick={handleAddDesigner}>
                  {t('version2_2.text22')}
                </button>
              </div>
            )}
            {user?.multiProfileCnt === 2 && (
              <span className="toggleSet label">
                <input type="checkbox" id="toggleLabel" checked={user?.memberSe === 'B'} onChange={(e) => handleProfileType(e.target.checked)} />
                <label>
                  <span>{t('service_page.dental_labs')}</span>
                  <em>{t('base.dental_designer')}</em>
                </label>
              </span>
            )}
          </h2>
        )}
        {user?.memberSe === 'A' && (
          <div className="mypageTop">
            <div>
              <span className="profileImgBack">
                <span className="profileImg">
                  <img src={userInfo.profileImg} />
                </span>
                {/* <span className="profileUpload">
                  <input type="file" id="file1" />
                </span> */}
              </span>
              <strong>{userInfo?.memberNickName}</strong>
              <ItemTag items={userInfo?.cad} className="itemTag" />
              <Link to="/mypage/modify" className="btnPModify">
                {t('version2_1.text35')}
              </Link>
            </div>
          </div>
        )}
        {user?.memberSe === 'B' && (
          <div style={{ display: `${kindValue ? 'none' : 'block'}` }}>
            <div className={`${user?.multiProfileCnt > 1 ? 'myPageTopOffice' : 'myPageTopOffice'} yetDesigner`}>
              {' '}
              {/* 치자이너 프로필 있을 경우 className='myPageTopOffice' */}
              {user?.multiProfileCnt === 1 && (
                <div className="addDesigner">
                  <p>
                    {t('version2_2.text165')}
                    <br />
                    <strong>
                      {t('version2_2.text166')} <strong>{t('version2_2.text167')}</strong>
                    </strong>
                  </p>
                </div>
              )}
              <div className="back">
                <MypageTopCenter />
                <Link to="/mypage/modify" className="btnPModify">
                  {t('version2_1.text35')}
                </Link>
              </div>
            </div>
          </div>
        )}
        {user?.memberSe === 'C' && (
          <div className="myPageTopOffice">
            <div className="back dCase">
              <MypageTopDesigner />
              <Link to="/mypage/modify" className="btnPModify">
                {t('version2_1.text35')}
              </Link>
            </div>
          </div>
        )}
        <div className="tabNav mypage">
          <nav>
            <ul>
              {menus.map((el, idx) => {
                return (
                  <li key={`MyPageTab_${idx}`} className={`${tab === el.value ? 'on' : ''}`}>
                    <BaseButton label={t(el.desc)} onClick={el.onClick} />
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <Outlet />
      </section>
    </>
  );
};

export default MyPage;
