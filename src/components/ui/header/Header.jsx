import { React, useState, useRef, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHeader } from './hooks/useHeader';
import 'react-modern-drawer/dist/index.css';
import LoginAfter from './components/LoginAfter';
import LoginBefore from './components/LoginBefore';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { location, navigate, login, isOpen, setisOpen, toggleDrawer, user, mileage, designerMileage } = useHeader();

  const [lang, setLang] = useState();
  const handleLanguage = (lang) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    sessionStorage.setItem('lang', lang);

    document.body.className = lang
    document.documentElement.lang = lang;

  };

  useEffect(() => {
    const l = sessionStorage.getItem('lang');
    if (l) {
      setLang(l);
      i18n.changeLanguage(l);
    } else {
      let locale = navigator.language || navigator.userLanguage;
      switch (locale) {
        case 'ko':
        case 'ko-KR':
          locale = 'ko';
          break;
        case 'en':
        case 'en-US':
          locale = 'en';
          break;
      }
      setLang(locale);
      i18n.changeLanguage(locale);

      document.documentElement.lang = locale;
    }
  }, []);

  return (
    <>
      <div id="header" className={login ? 'loginA' : ''}>
        <header>
          <div>
            <h1>
              <Link to="/">DENTNER</Link>
            </h1>
            <div className="pcArear">
              <ul>
                <li>
                  <Link to="/service" state={{ to: 'service_introduce' }}>
                    {t('header.introduce_service')}
                  </Link>
                </li>
                <li>
                  <Link to="/request">{t('header.view_request')}</Link>
                </li>
                <li>
                  <Link to="/center">{t('header.search_dentalLab')}</Link>
                </li>
                <li>
                  <Link to="/designer">{t('header.search_dental_designer')}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pcMyLnb">
            {/* 로그인 전 */}
            {!login && <LoginBefore />}

            {/* 로그인 후 */}
            {login && <LoginAfter user={user} mileage={mileage} designerMileage={designerMileage} />}
            <div className="langChoice">
              <span>
              <input 
  type="radio" 
  name="lang" 
  id="langE" 
  onChange={() => handleLanguage('en')} 
  checked={lang === 'en'} 
/>
<label htmlFor="langE">EN</label>
              </span>
              <span>
              <input 
  type="radio" 
  name="lang" 
  id="langk" 
  onChange={() => handleLanguage('ko')} 
  checked={lang === 'ko'} 
/>
<label htmlFor="langk">KR</label>
              </span>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
