import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BaseButton, BaseSelect, ImageSetting } from '@components/common';
import AgreeSet from './components/AgreeSet';

const JoinPage = () => {
  const [imgFileList, setImgFileList] = useState([]);
  useEffect(() => {
    //console.log(imgFileList);
  }, [imgFileList]);

  const [pwVisible, setPwVisible] = useState(false);
  const [pwVisible2, setPwVisible2] = useState(false);
  const [talkOk, setTalkOk] = useState(false);

  const [jStep, setJoinStep] = useState(1);
  const handleJoinStep = (jStep) => {
    setJoinStep(jStep);
  };
  const [jTab, setJoinTab] = useState(1);
  const handleJoinTab = (jTab) => {
    setJoinTab(jTab);
  };

  const items = [
    { name: 'GMT - 00:00', value: 0 },
    { name: 'GMT - 01:00', value: 1 },
  ];

  const ituts = [
    { name: '+82', value: 0 },
    { name: '+80', value: 1 },
  ];

  const jobs = [
    { name: '직업 1', value: 0 },
    { name: '직업 2', value: 1 },
  ];

  return (
    <div className={`memberLayout`}>
      <div className="joinStep2">
        <h2>이메일 회원가입</h2>
        <form>
          <div className="tws">
            <dl>
              <dt>
                회원유형
                <sup>필수항목</sup>
              </dt>
              <dd className="typeChoice">
                <input type="button" value="한국인" className={`${jTab === 1 ? 'on' : ''}`} onClick={() => handleJoinTab(1)} />
                <input type="button" value="외국인" className={`${jTab === 2 ? 'on' : ''}`} onClick={() => handleJoinTab(2)} />
              </dd>
            </dl>
            <dl>
              <dt>
                약관동의
                <sup>필수항목</sup>
              </dt>
              <dd className="agreeSet">
                <span className="checkSet totalCase">
                  <input type="checkbox" id="checkbox1" />
                  <label htmlFor="checkbox1">모두 동의합니다.</label>
                </span>
                <ul>
                  <li>
                    <span className="checkSet">
                      <input type="checkbox" id="checkbox2" />
                      <label htmlFor="checkbox2">
                        <em>&#91;필수&#93;</em> 이용약관 동의
                      </label>
                    </span>
                    <input type="button" value="more" className="more" />
                  </li>
                  <li>
                    <span className="checkSet">
                      <input type="checkbox" id="checkbox3" />
                      <label htmlFor="checkbox3">
                        <em>&#91;필수&#93;</em> 개인정보처리방침 동의
                      </label>
                    </span>
                    <input type="button" value="more" className="more" />
                  </li>
                  <li>
                    <span className="checkSet">
                      <input type="checkbox" id="checkbox4" />
                      <label htmlFor="checkbox4">&#91;선택&#93; 마케팅 수신 동의</label>
                    </span>
                    <input type="button" value="more" className="more" />
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
                <input type="text" placeholder="이메일 주소를 입력하세요." />
              </dd>
            </dl>
            <dl>
              <dt>
                비밀번호
                <sup>필수항목</sup>
              </dt>
              <dd>
                <span className={`pwSet ${pwVisible ? 'on' : ''}`}>
                  <input type={`${pwVisible ? 'text' : 'password'}`} placeholder="비밀번호를 입력하세요." />
                  <input type="button" onClick={() => setPwVisible(!pwVisible)} value="Password View" />
                </span>
                <span className={`pwSet ${pwVisible2 ? 'on' : ''}`}>
                  <input type={`${pwVisible2 ? 'text' : 'password'}`} placeholder="비밀번호를 입력하세요." />
                  <input type="button" onClick={() => setPwVisible2(!pwVisible2)} value="Password View" />
                </span>
              </dd>
            </dl>
            {jTab === 1 && (
              <div className="joinType">
                <dl>
                  <dt>
                    이름
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <input type="text" placeholder="이름을 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    휴대폰 인증
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
                <dl>
                  <dt>
                    닉네임
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <input type="text" placeholder="닉네임을 입력하세요." />
                    <input type="button" className="btnB sm mt10" value="중복 확인" />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    치과의사 면허증 첨부
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <div className="fileSet">
                      <ImageSetting imgFileList={imgFileList} setImgFileList={setImgFileList} />
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    면허번호
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <input type="text" placeholder="면허번호를 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    치과명
                    <sup>필수항목</sup>
                  </dt>
                  <dd className="officeName">
                    <em>치과명에 치과기공소는 입력하실 수 없습니다.</em>
                    <input type="text" placeholder="치과명을 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    사업자 등록번호
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <input type="text" placeholder="사업자등록번호을 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    사업장 주소
                    <sup>필수항목</sup>
                  </dt>
                  <dd className="addressInput">
                    <input type="text" placeholder="주소를 입력하세요." />
                    <input type="text" className="mt10" placeholder="상세주소를 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    사업자 등록증 첨부
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <div className="fileSet">
                      <ImageSetting imgFileList={imgFileList} setImgFileList={setImgFileList} />
                    </div>
                  </dd>
                </dl>
              </div>
            )}
            {jTab === 2 && (
              <div className="joinType">
                <dl>
                  <dt>
                    휴대폰 인증
                    <sup>필수항목</sup>
                  </dt>
                  <dd className="phoneCertify">
                    <BaseSelect items={ituts} placeholder={'+82'} onChange={(e) => console.log(e)} />
                    <span className="certifySet">
                      <input type="text" placeholder="휴대전화번호를 입력하세요." />
                      <em>00:55</em>
                    </span>
                    <BaseButton type="button" className={'btnB sm'} label={'인증번호 전송'} />
                    <p className="notiP">인증 번호를 전송하였습니다.</p>
                    <input type="text" placeholder="인증번호를 입력하세요." />
                    <BaseButton type="button" className={'btnB sm'} label={'인증 확인'} disabled={true} />
                    <p className="errorP">인증번호가 일치하지 않습니다.</p>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    알림톡 설정
                    <sup>필수항목</sup>
                  </dt>
                  <dd className="talkChoice">
                    <em>
                      거래에서 발생하는 알림은 이메일로 제공됩니다.
                      <br />그 외의 알림톡 제공을 원하실 경우 설정해주세요.
                    </em>
                    <span className="talkSet">
                      <span>
                        <input type="radio" name="radio0" id="radio1" onChange={() => setTalkOk(!talkOk)} />
                        <label htmlFor="radio1">알림톡 설정</label>
                      </span>
                      <span>
                        <input type="radio" name="radio0" id="radio2" defaultChecked onChange={() => setTalkOk(!talkOk)} />
                        <label htmlFor="radio2">알림톡 설정하지 않음</label>
                      </span>
                    </span>
                  </dd>
                </dl>
                <dl style={{ display: `${talkOk ? 'block' : 'none'}` }}>
                  <dt>
                    알림톡 선택
                    <sup>필수항목</sup>
                  </dt>
                  <dd className="talkChoice">
                    <em>알림톡 방식을 선택해 주세요.</em>
                    <span className="talkSet short">
                      <span>
                        <input type="radio" name="radio2" id="radio21" />
                        <label htmlFor="radio21">카카오톡</label>
                      </span>
                      <span>
                        <input type="radio" name="radio2" id="radio22" defaultChecked />
                        <label htmlFor="radio22">왓츠앱</label>
                      </span>
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    성<sup>필수항목</sup>
                  </dt>
                  <dd>
                    <input type="text" placeholder="이름을 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    이름
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <input type="text" placeholder="이름을 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    닉네임
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <input type="text" placeholder="닉네임을 입력하세요." />
                    <BaseButton type="button" className={'btnB sm mt10'} label={'중복 확인'} />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    직업 선택
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <BaseSelect items={jobs} placeholder={'선택하세요.'} onChange={(e) => console.log(e)} />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    사업자 명<sup>필수항목</sup>
                  </dt>
                  <dd>
                    <input type="text" placeholder="사업자 명을 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    사업자 등록번호
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <input type="text" placeholder="사업자등록번호을 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    사업자 주소
                    <sup>필수항목</sup>
                  </dt>
                  <dd className="addressInput">
                    <input type="text" placeholder="주소를 입력하세요." />
                    <input type="text" className="mt10" placeholder="상세주소를 입력하세요." />
                  </dd>
                </dl>
                <dl>
                  <dt>
                    사업자 등록증 첨부
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <div className="fileSet">
                      <ImageSetting imgFileList={imgFileList} setImgFileList={setImgFileList} />
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    Timezone
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <BaseSelect items={items} placeholder={'GMT - 00:00'} onChange={(e) => console.log(e)} />
                  </dd>
                </dl>
              </div>
            )}
          </div>
          {/* <BaseButton className={'btnB mt50'} label={'가입 신청하기'} /> */}
          <Link to="/login/JoinEnd" className="btnB mt50">
            가입 신청하기{' '}
          </Link>
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
