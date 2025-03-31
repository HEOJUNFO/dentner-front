import { React, useState, useRef, useEffect, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import Drawer from 'react-modern-drawer';
import MobileSnb from './MobileSnb';
import { useHeader } from '../hooks/useHeader';
import 'react-modern-drawer/dist/index.css';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { location, navigate, lognin, isOpen, setisOpen, toggleDrawer } = useHeader();

  return (
    <>
      <div id="header">
        <header>
          <div>
            <h1>
              <Link to="/">DENTNER</Link>
            </h1>
            <div className="pcArear">
              <ul>
                <li>
                  <Link to="/service">서비스 소개</Link>
                </li>
                <li>
                  <Link to="/request">요청서 보기</Link>
                </li>
                <li>
                  <Link to="/center">치과기공소 찾기</Link>
                </li>
                <li>
                  <Link to="/designer">치자이너 찾기</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pcMyLnb">
            {/* 로그인 전 */}
            <div className="loginBefore" style={{ display: lognin ? 'none' : 'inline-flex' }}>
              <Link className="goLogin" to="/login">
                로그인
              </Link>
              <Link className="btnB ss" to="/join">
                회원가입
              </Link>
            </div>
            {/* 로그인 후 */}
            <div className="loginAfter" style={{ display: lognin ? 'inline-flex' : 'none' }}>
              <span className="goBtn">
                <Link to="/payment">거래내역</Link>
                <Link to="/inquire">의뢰서 바구니</Link>
              </span>
              <span className="userInfo">
                <span className="profileImg">
                  <img src={sampleProfile} />
                </span>
                <em>선미니</em>
                <Link to="/mileage">27,900P(￦)</Link>
              </span>
              <span className="userMy">
                <Link className="bChat on" to="/chat">
                  <em>채팅</em>
                </Link>{' '}
                {/* 채팅이 없는 경우 class on 삭제 */}
                <Link className="bNoty" to="/notiy">
                  <em>알림</em>
                  <i>8</i>
                </Link>{' '}
                {/* 알림 없는 경우 i 삭제 */}
                <Link className="bMypage" to="/mypage">
                  마이페이지
                </Link>
              </span>
            </div>
            {/**/}
            <div className="langChoice">
              <span>
                <input type="radio" name="lang" id="langE" />
                <label htmlFor="langE">EN</label>
              </span>
              <span>
                <input type="radio" name="lang" id="langk" defaultChecked />
                <label htmlFor="langk">KR</label>
              </span>
            </div>
          </div>
          <button className="mSnb" onClick={() => toggleDrawer()}>
            Mobile Snb
          </button>
        </header>
      </div>

      <Drawer open={isOpen} onClose={toggleDrawer} direction="right" size={window.innerWidth}>
        <MobileSnb toggleDrawer={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default Header;
