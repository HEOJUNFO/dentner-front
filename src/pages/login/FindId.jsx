import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BaseButton } from '@components/common';
import { SmsVerify } from '@components/ui';
import useFindId from './hooks/useFindId';
import { useTranslation } from 'react-i18next';
const FindId = () => {
  const { step, memberType, setMemberType, params, handleVerifyClick, handleSmsVerify, handleFindIdClick, email } = useFindId();
  const { t } = useTranslation();

  return (
    <>
      <section className="memberLayout">
        {step === 1 && (
          <div className="findIdStep1">
            <h2>
              {/* 아이디 찾기 */}
              {t('find.id')}
            </h2>
            <article>
              <form>
                <div className="tws">
                  <dl>
                    <dt>
                      {/* 회원유형 */}
                      {t('join.client_type')}
                      <sup>{t('base.required')}</sup>
                    </dt>
                    <dd className="typeChoice">
                      <BaseButton className={`${memberType === 1 ? 'on' : ''}`} label={t('base.korean')} onClick={() => setMemberType(1)} />
                      <BaseButton className={`${memberType === 2 ? 'on' : ''}`} label={t('base.foreigner')} onClick={() => setMemberType(2)} />
                    </dd>
                  </dl>

                  {memberType === 1 && <SmsVerify certification="A" onVerifyClick={handleVerifyClick} err={params.memberHp.error} onChange={handleSmsVerify} />}
                  {memberType === 2 && <SmsVerify type={2} certification="A" onVerifyClick={handleVerifyClick} err={params.memberHp.error} onChange={handleSmsVerify} />}
                </div>
                {Boolean(Number(params.memberHp.success)) && (
                  <BaseButton className={`btnB mt50`} label={t('find.id')} disabled={!Boolean(Number(params.memberHp.success))} onClick={() => handleFindIdClick()} />
                )}
              </form>
            </article>
          </div>
        )}
        {step === 2 && (
          <div className="findEnd">
            <article>
              <div>
                <h2>
                  {/* 아이디 정보 확인 */}
                  {t('version2_1.text112')}
                </h2>
                <p>
                  {/* 고객님의 정보와 일치하는 아이디입니다. */}
                  {t('version2_1.text113')}
                  <span>{email}</span>
                </p>
                <Link to="/login" className="btnB">
                  {t('login.do_login')}
                </Link>
                <Link to="/login/pwInquiry" className="btnL">
                  {/* 비밀번호 찾기 */}
                  {t('find.password')}
                </Link>
              </div>
            </article>
          </div>
        )}
      </section>
    </>
  );
};

export default FindId;
