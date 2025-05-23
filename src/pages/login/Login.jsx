import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BaseInput, BaseButton } from '@components/common';
import { useLogin } from './hooks/useLogin';
import DOMPurify from 'dompurify';
import { replaceToBr } from '@utils/common';

import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { user, handleChange, handleSubmit, params, error, googleLoginHandler } = useLogin();
  const { t } = useTranslation();
  if (user) return <></>;

  return (
    <section className="memberLayout">
      <h2>{t('base.login')}</h2>
      <article>
        <div className="login">
          <p className="subT">
            {t('login.welcome')}
            <br />
            <strong>DENTNER</strong>
            {t('login.start')}
          </p>
          <form>
            <div>
              <BaseInput type="text" value={params?.memberEmail} placeholder={t('placeholder.enter_email')} onChange={(e) => handleChange('memberEmail', e.target.value)} />
              <BaseInput type="password" value={params?.memberPassword} placeholder={t('placeholder.enter_password')} onChange={(e) => handleChange('memberPassword', e.target.value)} />
              {error && (
                <p className="errorP" style={{ display: 'block' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(error)) }}>
                </p>
              )}
            </div>
            <BaseButton type="submit" className="btnB sm" disabled={!params?.memberEmail || !params?.memberPassword} label={t('base.login')} onClick={handleSubmit} />
          </form>
          <div className="goFindJoin">
            <Link to="/login/idInquiry">{t('find.id')}</Link>
            <Link to="/login/pwInquiry">{t('find.password')}</Link>
            <Link to="/login/join">{t('join.email')}</Link>
          </div>

          <button className="btnW sm" onClick={googleLoginHandler}>
            {t('version2_1.text121')}
          </button>
        </div>
      </article>
    </section>
  );
};

export default Login;
