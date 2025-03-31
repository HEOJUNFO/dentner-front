import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BaseInput, BaseButton } from '@components/common';
import { SmsVerify, PasswordCheck } from '@components/ui';
import { useFindPw, useValid } from './hooks';
import { useTranslation } from 'react-i18next';
const FindPwP = () => {
  const { isEmail, step, setStep, memberType, setMemberType, params, setParams, handleVerifyClick, handleSmsVerify, handleChange, handlePasswordChange, handleSendClick } = useFindPw();
  const { handleEmailFocus, handleEmailBlur, handlePassword } = useValid({ params, setParams });

  const { t } = useTranslation();

  return (
    <>
      <section className="memberLayout">
        {step === 1 && (
          <div className="findPwStep1">
            <h2> {t('find.password')}</h2>
            <article>
              <div className="tws">
                <dl>
                  <dt>
                    {t('join.client_type')}
                    <sup>{t('base.required')}</sup>
                  </dt>
                  <dd className="typeChoice">
                    <BaseButton className={`${memberType === 1 ? 'on' : ''}`} label={t('base.korean')} onClick={() => setMemberType(1)} />
                    <BaseButton className={`${memberType === 2 ? 'on' : ''}`} label={t('base.foreigner')} onClick={() => setMemberType(2)} />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    {t('login.email')}
                    <sup>{t('base.required')}</sup>
                  </dt>
                  <dd>
                    <BaseInput
                      type="text"
                      id="memberEmail"
                      placeholder={params.memberEmail.placeholder}
                      value={params.memberEmail.value}
                      error={params.memberEmail.error}
                      maxLength={params.memberEmail.maxLength}
                      onChange={(e) => handleChange(e.target.id, e.target.value)}
                      onBlur={(e) => handleEmailBlur(e, false)}
                      onFocus={handleEmailFocus}
                      readOnly={isEmail}
                    />
                  </dd>
                </dl>

                {memberType === 1 && (
                  <SmsVerify
                    certification="B"
                    onVerifyClick={handleVerifyClick}
                    err={params.memberHp.error}
                    onChange={handleSmsVerify}
                    email={params.memberEmail.value}
                    onSendClick={handleSendClick}
                  />
                )}
                {memberType === 2 && (
                  <SmsVerify
                    type={2}
                    certification="B"
                    onVerifyClick={handleVerifyClick}
                    err={params.memberHp.error}
                    onChange={handleSmsVerify}
                    email={params.memberEmail.value}
                    onSendClick={handleSendClick}
                  />
                )}
              </div>

              {Boolean(Number(params.memberHp.success)) && <BaseButton className="btnB mt50" label={t('mutate.password')} onClick={() => setStep(2)} />}
            </article>
          </div>
        )}
        {step === 2 && (
          <div className="findPwStep2">
            <h2>{t('mutate.password')}</h2>
            <form>
              <div className="tws">
                <dl>
                  <dt>
                    {t('login.password')}
                    <sup>{t('base.required')}</sup>
                  </dt>
                  <dd>
                    <PasswordCheck onPassword={handlePassword} err={params.memberPassword.error} />
                  </dd>
                </dl>
              </div>
              <BaseButton className="btnB mt50" label={t('mutate.password')} onClick={handlePasswordChange} disabled={!Boolean(Number(params.memberPassword.success))} />
            </form>
          </div>
        )}
        {step === 3 && (
          <div className="findEnd">
            <article>
              <div>
                <h2>{t('notify.success_mutate_password')}</h2>
                <p>{t('notify.noti_success_password')}</p>
                <Link to="/login" className="btnB">
                  {t('login.do_login')}
                </Link>
              </div>
            </article>
          </div>
        )}
      </section>
    </>
  );
};

export default FindPwP;
