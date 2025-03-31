import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Link } from 'react-router-dom';

const LoginBefore = () => {
  const { t } = useTranslation();
  return (
    <div className="loginBefore" style={{ display: 'inline-flex' }}>
      <Link className="goLogin" to="/login">
        {t('base.login')}
      </Link>
      <Link className="btnB ss" to="/login/join">
        {t('base.join')}
      </Link>
    </div>
  );
};

export default LoginBefore;
