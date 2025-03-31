import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
const FindIdPage = () => {
  const [certVisible, setCertVisible] = useState(false);
  const [jStep, setJoinStep] = useState(1);
  const handleJoinStep = (jStep) => {
    setJoinStep(jStep);
  };
  const [jTab, setJoinTab] = useState(1);
  const handleJoinTab = (jTab) => {
    setJoinTab(jTab);
  };
  const { t } = useTranslation();


  return (
    <>
      <section className="memberLayout">
        {jStep === 1 && (
          <div className="findIdStep1">
            <h2>{t('find.id')}</h2>
            <article>
              <form>
                <div className="tws">
                    <dl>
                      <dt>
                        {t('certify.phone')}
                        <sup>필수항목</sup>
                      </dt>
                      <dd className="phoneCertify">
                        <span className="certifySet">
                          <input type="text" placeholder="휴대전화번호를 입력하세요." />
                          <em>00:55</em>
                        </span>
                        <input type="button" className="btnB sm" value="인증번호 전송" />
                        <p className="notiP">인증 번호를 전송하였습니다.</p>
                        <input type="text" placeholder="인증번호를 입력하세요." />
                        <input type="button" className="btnB sm" value="인증 확인" disabled />
                        <p className="errorP">인증번호가 일치하지 않습니다.</p>
                      </dd>
                    </dl>
                </div>
                <button type="button" className="btnB mt50" onClick={() => handleJoinStep(2)}>
                  아이디 찾기
                </button>
              </form>
            </article>
          </div>
        )}
        {jStep === 2 && (
          <div className="findEnd">
            <article>
              <div>
                <h2>아이디 정보 확인</h2>
                <p>
                  고객님의 정보와 일치하는 아이디입니다.
                  <span>user1234@email.com</span>
                </p>
                <Link to="/login" className="btnB">
                  로그인 하기
                </Link>
                <Link to="/findPw" className="btnL">
                  비밀번호 찾기
                </Link>
              </div>
            </article>
          </div>
        )}
      </section>
      <Outlet />
    </>
  );
};

export default FindIdPage;
