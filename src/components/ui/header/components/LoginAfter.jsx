import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import sampleProfile from '@assets/images/no_user.png';
import { withCommas } from '@utils/common';
import { useTranslation } from 'react-i18next';
import { NotiContext } from '../../layout/hooks/useContext';
import UserStore from '@store/UserStore';

const LoginAfter = ({ user, mileage, designerMileage }) => {
  const { t } = useTranslation();
  const { notiCnt } = useContext(NotiContext);

  const { message } = UserStore();

  return (
    <div className="loginAfter" style={{ display: 'inline-flex' }}>
      <span className="goBtn">
        {user?.memberSe !== 'B' && <Link to="/payment">{t('header.transaction_list')}</Link>}
        {user?.memberSe === 'A' && <Link to="/request/basket">{t('base.request_basket')}</Link>}
      </span>
      <span className="userInfo">
        <span className="profileImg">
          <img src={user?.memberProfileImage || sampleProfile} />
        </span>
        <em>{user?.memberNickName}</em>
        {user?.memberSe === 'A' && (
          <Link to="/mileage">
            {withCommas(mileage)}
            P(
            {user?.memberTp === 'B' && <>$</>}
            {user?.memberTp === 'A' && <>￦</>})
          </Link>
        )}
        {user?.memberSe === 'C' && <Link to="/mileageOffice">{withCommas(Number(designerMileage) || 0)}P(￦)</Link>}
      </span>
      <span className="userMy">
        <Link className={`${message ? 'on bChat' : 'bChat'}`} to={user?.memberSe === 'C' ? '/designerchat' : user?.memberSe === 'B' ? '/centerchat' : '/chat'} state={{ targetSe: 'B' }}>
          <em>{t('base.chat')}</em>
        </Link>{' '}
        {/* 채팅이 없는 경우 class on 삭제 */}
        <Link className="bNoty on" to="/notiy">
          <em>{t('base.noti')}</em>
          {Number(notiCnt) > 0 && <i>{notiCnt || 0}</i>}
        </Link>{' '}
        {/* 알림 없는 경우 i 삭제 */}
        <Link className="bMypage" to="/mypage">
          {t('base.mypage')}
        </Link>
      </span>
      <span className="gomBtn">
        {user?.memberSe !== 'B' && <Link to="/payment">{t('header.transaction_list')}</Link>}
        <Link to="/request/basket">{t('base.request_basket')}</Link>
      </span>{' '}
      {/* 모바일 용 (지우지 말아주세요) */}
    </div>
  );
};

export default LoginAfter;
