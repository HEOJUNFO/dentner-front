import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
const JoinPage = () => {
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
      <section className={`memberLayout ${jStep === 1 ? 'kindMember' : ''}${jStep === 3 ? 'joinend' : ''} `}>
        {jStep === 1 && 
        <div className='joinStep1'>
            <h2>
                회원가입
            </h2>
            <article>
                <p className='subT'>
                    가입을 원하시는 <strong>회원유형</strong>을 선택해주세요.
                </p>
                <div>
                    <dl>
                        <dt>의뢰인</dt>
                        <dd className='txt'>
                            <span>CAD 파일을 의뢰할 수 있어요!</span>
                            <span>한국의 치과기공소를 만날 수 있어요!</span>
                        </dd>
                        <dd>
                            <button className='btnL ss' onClick={() => handleJoinStep(2)}>의뢰인으로 회원가입</button>
                        </dd>
                    </dl>
                    <dl>
                        <dt>치과기공소</dt>
                        <dd className='txt'>
                            <span>치과기공소를 홍보할 수 있어요!</span>
                            <span>CAD파일을 거래할 수 있어요!</span>
                        </dd>
                        <dd>
                            <button className='btnL ss' onClick={() => handleJoinStep(2)}>치과기공소로 회원가입</button>
                        </dd>
                    </dl>
                    <dl>
                        <dt>치자이너</dt>
                        <dd className='txt'>
                            <span>CAD파일을 거래할 수 있어요!</span>
                        </dd>
                        <dd>
                            <button className='btnL ss' onClick={() => handleJoinStep(2)}>치자이너로 회원가입</button>
                        </dd>
                    </dl>
                </div>
            </article>
        </div>
        }
        {jStep === 2 && 
        <div className='joinStep2'>
            <h2>
                이메일 회원가입
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
                                약관동의
                                <sup>필수항목</sup>
                            </dt>
                            <dd className='agreeSet'>
                                <span className='checkSet totalCase'>
                                    <input type='checkbox' id='checkbox1' />
                                    <label htmlFor='checkbox1'>모두 동의합니다.</label>
                                </span>
                                <ul>
                                    <li>
                                        <span className='checkSet'>
                                            <input type='checkbox' id='checkbox2' />
                                            <label htmlFor='checkbox2'><em>&#91;필수&#93;</em> 이용약관 동의</label>
                                        </span>
                                        <input type='button' value='more' className='more' />
                                    </li>
                                    <li>
                                        <span className='checkSet'>
                                            <input type='checkbox' id='checkbox3' />
                                            <label htmlFor='checkbox3'><em>&#91;필수&#93;</em> 개인정보처리방침 동의</label>
                                        </span>
                                        <input type='button' value='more' className='more' />
                                    </li>
                                    <li>
                                        <span className='checkSet'>
                                            <input type='checkbox' id='checkbox4' />
                                            <label htmlFor='checkbox4'>&#91;선택&#93; 마케팅 수신 동의</label>
                                        </span>
                                        <input type='button' value='more' className='more' />
                                    </li>
                                </ul>
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
                        {jTab === 1 &&
                        <div className='joinType'>
                            <dl>
                                <dt>
                                    이름
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <input type='text' placeholder='이름을 입력하세요.' />
                                </dd>
                            </dl>
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
                            <dl>
                                <dt>
                                    닉네임
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <input type='text' placeholder='닉네임을 입력하세요.' />
                                    <input type='button'  className='btnB sm mt10' value='중복 확인' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    치과의사 면허증 첨부
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <div className='fileSet'>
                                        <span className='fileFind'>
                                        <input type='file' id='file1' />
                                        <label htmlFor='file1'>파일 첨부하기</label>
                                        </span>
                                        <em className='guide'>[파일형식] <i>pdf, jpg, png</i> (500MB 이하)</em>
                                        <span className='fileLoad' style={{ display: 'none' }}>
                                            <span>
                                                면허증.pdf
                                                <em>328.36 mb</em>
                                            </span>
                                        <button className='bID'>Del</button>
                                        </span>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    면허번호
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <input type='text' placeholder='면허번호를 입력하세요.' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    치과명
                                    <sup>필수항목</sup>
                                </dt>
                                <dd className='officeName'>
                                    <em>치과명에 치과기공소는 입력하실 수 없습니다.</em>
                                    <input type='text' placeholder='치과명을 입력하세요.' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    사업장 주소
                                    <sup>필수항목</sup>
                                </dt>
                                <dd className='addressInput'>
                                    <input type='text' placeholder='주소를 입력하세요.' />
                                    <input type='text' className='mt10' placeholder='상세주소를 입력하세요.' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    사업자 등록증 첨부
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <div className='fileSet'>
                                        <span className='fileFind'>
                                        <input type='file' id='file1' />
                                        <label htmlFor='file1'>파일 첨부하기</label>
                                        </span>
                                        <em className='guide'>[파일형식] <i>pdf, jpg, png</i> (500MB 이하)</em>
                                        <span className='fileLoad' style={{ display: 'none' }}>
                                            <span>
                                                면허증.pdf
                                                <em>328.36 mb</em>
                                            </span>
                                        <button className='bID'>Del</button>
                                        </span>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        }
                        {jTab === 2 &&
                        <div className='joinType'>
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
                            <dl>
                                <dt>
                                    알림톡 설정
                                    <sup>필수항목</sup>
                                </dt>
                                <dd className='talkChoice'>
                                    <em>
                                        거래에서 발생하는 알림은 이메일로 제공됩니다.<br/>
                                        그 외의 알림톡 제공을 원하실 경우 설정해주세요.
                                    </em>
                                    <span className='talkSet'>
                                        <span>
                                            <input type='radio' name='radio0' id='radio1' onChange={() => setTalkOk(!talkOk)} />
                                            <label htmlFor='radio1'>알림톡 설정</label>
                                        </span>
                                        <span>
                                            <input type='radio' name='radio0' id='radio2' defaultChecked onChange={() => setTalkOk(!talkOk)} />
                                            <label htmlFor='radio2'>알림톡 설정하지 않음</label>
                                        </span>
                                    </span>
                                </dd>
                            </dl>
                            <dl style={{ display: `${talkOk ? 'block' : 'none'}` }}>
                                <dt>
                                    알림톡 선택
                                    <sup>필수항목</sup>
                                </dt>
                                <dd className='talkChoice'>
                                    <em>
                                        알림톡 방식을 선택해 주세요.
                                    </em>
                                    <span className='talkSet short'>
                                        <span>
                                            <input type='radio' name='radio2' id='radio21' />
                                            <label htmlFor='radio21'>카카오톡</label>
                                        </span>
                                        <span>
                                            <input type='radio' name='radio2' id='radio22' defaultChecked />
                                            <label htmlFor='radio22'>왓츠앱</label>
                                        </span>
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    성
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <input type='text' placeholder='이름을 입력하세요.' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    이름
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <input type='text' placeholder='이름을 입력하세요.' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    닉네임
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <input type='text' placeholder='닉네임을 입력하세요.' />
                                    <input type='button'  className='btnB sm mt10' value='중복 확인' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    직업 선택
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <span className={`cSelect ${certVisible2 ? 'on' : ''}`} id='cSelect'>
                                        <em className='sValue' onClick={() => setCertVisible2(!certVisible2)}>직업을 선택하세요.</em>
                                        <span className='cArea'>
                                            <span className='on'>직업을 선택하세요.</span>
                                            <span>직업을 선택하세요.</span>
                                        </span>
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    사업자 명
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <input type='text' placeholder='사업자 명을 입력하세요.' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    사업자등록번호
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <input type='text' placeholder='사업자등록번호을 입력하세요.' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    사업자 주소
                                    <sup>필수항목</sup>
                                </dt>
                                <dd className='addressInput'>
                                    <input type='text' placeholder='주소를 입력하세요.' />
                                    <input type='text' className='mt10' placeholder='상세주소를 입력하세요.' />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    사업자 등록증 첨부
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <div className='fileSet'>
                                        <span className='fileFind'>
                                        <input type='file' id='file1' />
                                        <label htmlFor='file1'>파일 첨부하기</label>
                                        </span>
                                        <em className='guide'>[파일형식] <i>pdf, jpg, png</i> (500MB 이하)</em>
                                        <span className='fileLoad' style={{ display: 'none' }}>
                                            <span>
                                                면허증.pdf
                                                <em>328.36 mb</em>
                                            </span>
                                        <button className='bID'>Del</button>
                                        </span>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    Timezone
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <span className={`cSelect ${certVisible3 ? 'on' : ''}`} id='cSelect'>
                                        <em className='sValue' onClick={() => setCertVisible3(!certVisible3)}>GMT - 00:00</em>
                                        <span className='cArea'>
                                            <span className='on'>GMT - 00:00</span>
                                            <span>GMT - 00:00</span>
                                        </span>
                                    </span>
                                </dd>
                            </dl>
                        </div>
                        }
                    </div>
                    <button type='button' className='btnB mt50' onClick={() => handleJoinStep(3)}>가입 신청하기</button>
                </form>
            </article>
        </div>
        }
        {jStep === 3 && 
        <div className='joinStep3'>
            <article>
                <div>
                    <h2>가입 신청 완료</h2>
                    <p>
                        <span>현재 <strong>가입 승인 대기중</strong> 입니다.</span>
                        관리자가 가입 승인 시 덴트너 이용이 가능합니다.<br/>
                        회원 승인은 가입 신청 후 영업일 기준 최대 1~3일이 소요됩니다.
                    </p>
                    <Link to='/main' className='btnB'>홈으로 이동</Link>
                </div>
                <div className='joinFail' style={{ display : 'none'}}>
                    <h2>회원가입 승인 거절</h2>
                    <p>
                        <span>현재 <strong>가입 승인이 거절</strong> 되었습니다.</span>
                        이메일을 확인해주세요
                    </p>
                    <button className='btnB' onClick={() => handleJoinStep(1)}>다시 가입 신청하기</button>
                </div>
                <div className='joinOk' style={{ display : 'none'}}>
                    <h2>회원가입 완료</h2>
                    <p>
                        <span>현재 <strong>가입 승인이 완료</strong> 되었습니다.</span>
                        반갑습니다.
                    </p>
                    <Link to='/main' className='btnB'>홈으로 이동</Link>
                </div>
            </article>
        </div>
        }
      </section>
      <Outlet />
    </>
  );
};

export default JoinPage;
