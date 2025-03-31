import React, { useContext, useState, useEffect } from 'react';
//import { MenuContext } from "react-flexible-sliding-menu";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useHeader } from './hooks/useHeader';
import LoginAfter from './components/LoginAfter';
import LoginBefore from './components/LoginBefore';
import { useTranslation } from 'react-i18next';

/*
  화면 : 모바일 우측 사이드메뉴
  설명 : 햄버거 버튼 클릭시 나오는 메뉴
  react-modern-drawer 라이브러리 사용
 */
const MobileSnb = ({ toggleDrawer, onHandelLang, onHandleLuClick, language, isLanOn }) => {
  const [current, setCurrent] = useState('/');
  const location = useLocation();
  const navigate = useNavigate();
  const [isPriOn, setIsPriOn] = useState(false);
  const {t} = useTranslation();

  //현재 pathname설정하는 로직
  useEffect(() => {
    setCurrent(location.pathname);
  }, []);

  const handleLink = (e, link) => {
    e.preventDefault();
    navigate(link);
    //headerGnb(false);
    toggleDrawer();
    setCurrent(link);
  };

  //새창으로 부킹엔진으로 보내는 로직
  const handleBooking = (url) => {
    window.open(url, '_blank');
  };

  const { lognin } = useHeader();

  return (
    <div id="mSnb" style={{ display: 'block' }}>
      <button className="btnMSnbClose" onClick={() => toggleDrawer()}>
        Mobile SNB Close Button
      </button>
      {/* 로그인 후 */}
      {lognin && <LoginAfter />}
      <div className="mSnbNav">
        <ul>
          <li>
            <Link to="/service" onClick={() => toggleDrawer()}>{t('header.introduce_service')}</Link>
          </li>
          <li>
            <Link to="/request" onClick={() => toggleDrawer()}>{t('header.view_request')}</Link>
          </li>
          <li>
            <Link to="/center" onClick={() => toggleDrawer()}>{t('header.search_dentalLab')}</Link>
          </li>
          <li>
            <Link to="/designer" onClick={() => toggleDrawer()}>{t('header.search_dental_designer')}</Link>
          </li>
        </ul>
      </div>
      {lognin && 
        <div className='mLogout'>
          <span className="langChoice">
            <span>
              <input type="radio" name="lang2" id="langE2" />
              <label htmlFor="langE2">EN</label>
            </span>
            <span>
              <input type="radio" name="lang2" id="langk2" defaultChecked />
              <label htmlFor="langk2">KR</label>
            </span>
          </span>
          <Link to="/designer">{t('base.logout')}</Link>
        </div>
      }
      {!lognin && <LoginBefore />}
    </div>
  );
};

export default MobileSnb;
