import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
const FindPwPage = () => {
    const [pwVisible, setPwVisible] = useState(false);
    const [pwVisible2, setPwVisible2] = useState(false);
    const [certVisible, setCertVisible] = useState(false);
    const [certVisible2, setCertVisible2] = useState(false);
    const [certVisible3, setCertVisible3] = useState(false);
    const [talkOk, setTalkOk] = useState(false);
    const [jStep , setJoinStep] = useState(1);
    const handleJoinStep = (jStep) => {
        setJoinStep(jStep);
    }
    const [jTab , setJoinTab] = useState(1);
    const handleJoinTab = (jTab) => {
        setJoinTab(jTab);
    }
    const { t } = useTranslation();


  return (
    <>
      <section className='memberLayout'>
        {jStep === 1 && 
        <div className='findPwStep1'>
            <h2>
                {t('find.password')}
            </h2>
            <article>
                <form>
                    <div className='tws'>
                        <dl>
                            <dt>
                                {t('login.email')}
                                <sup> 필수항목</sup>
                            </dt>
                            <dd>
                                <input type='text' placeholder={t('placeholder.enter_email')} />
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                {t('certify.phone')}
                                <sup>필수항목</sup>
                            </dt>
                            <dd className='phoneCertify'>
                                <span className='certifySet'>
                                    <input type='text' placeholder={t('placeholder.enter_phone')} />
                                    <em>00:55</em>
                                </span>
                                <input type='button'  className='btnB sm' value='인증번호 전송' />
                                <p className='notiP'>
                                    {t('notify.sent_cert')}
                                </p>
                                <input type='text' placeholder={t('placeholder.enter_credential')} />
                                <input type='button'  className='btnB sm' value='인증 확인' disabled />
                                <p className='errorP'>
                                    {t('error.unmatch_credential')}
                                </p>
                            </dd>
                        </dl>
                    </div>
                    <button type='button' className='btnB mt50' onClick={() => handleJoinStep(2)}>{t('mutate.password')}</button>
                </form>
            </article>
        </div>
        }
        {jStep === 2 && 
        <div className='findPwStep2'>
            <h2>
            {t('mutate.password')}
            </h2>
            <form>
                <div className='tws'>
                    <dl>
                        <dt>
                            {t('login.password')}
                            <sup>필수항목</sup>
                        </dt>
                        <dd>
                            <span className={`pwSet ${pwVisible ? 'on' : ''}`}>
                                <input type={`${pwVisible ? 'text' : 'password'}`} placeholder={t('placeholder.enter_password')} />
                                <input type='button' onClick={() => setPwVisible(!pwVisible)} value='Password View' />
                            </span>
                            <span className={`pwSet ${pwVisible2 ? 'on' : ''}`}>
                                <input type={`${pwVisible2 ? 'text' : 'password'}`} placeholder={t('placeholder.enter_password')} />
                                <input type='button' onClick={() => setPwVisible2(!pwVisible2)} value='Password View' />
                            </span>
                        </dd>
                    </dl>
                </div>
                <button type='button' className='btnB mt50' onClick={() => handleJoinStep(3)}>{t('mutate.password')}</button>
            </form>
        </div>
        }
        {jStep === 3 && 
        <div className='findEnd'>
            <article>
                <div>
                    <h2>{t('notify.success_mutate_password')}</h2>
                    <p>{t('notify.noti_success_password')}</p>
                    <Link to='/login' className='btnB'>{t('login.do_login')}</Link>
                </div>
            </article>
        </div>
        }
      </section>
      <Outlet />
    </>
  );
};

export default FindPwPage;
