import React, { useEffect, useRef, useState, useCallback } from 'react';
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

  return (
    <>
      <section className='memberLayout'>
        {jStep === 1 && 
        <div className='findPwStep1'>
            <h2>
                비밀번호 찾기
            </h2>
            <article>
                <form>
                    <div className='tws'>
                        <dl>
                            <dt>
                                회원유형
                                <sup>필수항목</sup>
                            </dt>
                            <dd className='typeChoice'>
                                <input type='button' value='한국인' className={`${jTab === 1 ? 'on' : ''}`}  onClick={() => handleJoinTab(1)} />
                                <input type='button' value='외국인' className={`${jTab === 2 ? 'on' : ''}`}  onClick={() => handleJoinTab(2)} />
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                이메일 주소
                                <sup>필수항목</sup>
                            </dt>
                            <dd>
                                <input type='text' placeholder='이메일 주소를 입력하세요.' />
                            </dd>
                        </dl>
                        {jTab === 1 &&
                        <dl>
                            <dt>
                                휴대폰 인증
                                <sup>필수항목</sup>
                            </dt>
                            <dd className='phoneCertify'>
                                <span className='certifySet'>
                                    <input type='text' placeholder='휴대전화번호를 입력하세요.' />
                                    <em>00:55</em>
                                </span>
                                <input type='button'  className='btnB sm' value='인증번호 전송' />
                                <p className='notiP'>
                                    인증 번호를 전송하였습니다.
                                </p>
                                <input type='text' placeholder='인증번호를 입력하세요.' />
                                <input type='button'  className='btnB sm' value='인증 확인' disabled />
                                <p className='errorP'>
                                    인증번호가 일치하지 않습니다.
                                </p>
                            </dd>
                        </dl>
                        }
                        {jTab === 2 &&
                        <dl>
                            <dt>
                                휴대폰 인증
                                <sup>필수항목</sup>
                            </dt>
                            <dd className='phoneCertify'>
                                <span className={`cSelect ${certVisible ? 'on' : ''}`} id='cSelect'>
                                    <em className='sValue' onClick={() => setCertVisible(!certVisible)}>+82</em>
                                    <span className='cArea'>
                                        <span className='on'>+82</span>
                                        <span>+80</span>
                                    </span>
                                </span>
                                <span className='certifySet'>
                                    <input type='text' placeholder='휴대전화번호를 입력하세요.' />
                                    <em>00:55</em>
                                </span>
                                <input type='button'  className='btnB sm' value='인증번호 전송' />
                                <p className='notiP'>
                                    인증 번호를 전송하였습니다.
                                </p>
                                <input type='text' placeholder='인증번호를 입력하세요.' />
                                <input type='button'  className='btnB sm' value='인증 확인' disabled />
                                <p className='errorP'>
                                    인증번호가 일치하지 않습니다.
                                </p>
                            </dd>
                        </dl>
                        }
                    </div>
                    <button type='button' className='btnB mt50' onClick={() => handleJoinStep(2)}>비밀번호 변경하기</button>
                </form>
            </article>
        </div>
        }
        {jStep === 2 && 
        <div className='findPwStep2'>
            <h2>
                비밀번호 변경하기
            </h2>
            <form>
                <div className='tws'>
                    <dl>
                        <dt>
                            비밀번호
                            <sup>필수항목</sup>
                        </dt>
                        <dd>
                            <span className={`pwSet ${pwVisible ? 'on' : ''}`}>
                                <input type={`${pwVisible ? 'text' : 'password'}`} placeholder='비밀번호를 입력하세요.' />
                                <input type='button' onClick={() => setPwVisible(!pwVisible)} value='Password View' />
                            </span>
                            <span className={`pwSet ${pwVisible2 ? 'on' : ''}`}>
                                <input type={`${pwVisible2 ? 'text' : 'password'}`} placeholder='비밀번호를 입력하세요.' />
                                <input type='button' onClick={() => setPwVisible2(!pwVisible2)} value='Password View' />
                            </span>
                        </dd>
                    </dl>
                </div>
                <button type='button' className='btnB mt50' onClick={() => handleJoinStep(3)}>비밀번호 변경하기</button>
            </form>
        </div>
        }
        {jStep === 3 && 
        <div className='findEnd'>
            <article>
                <div>
                    <h2>비밀번호 변경완료</h2>
                    <p>비밀번호 변경이 완료되었습니다.</p>
                    <Link to='/login' className='btnB'>로그인 하기</Link>
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
