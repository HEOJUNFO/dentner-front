import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BaseButton, BaseSelect, ImageSetting, BaseInput } from '@components/common';

const InfoMgtPage = () => {

  const [imgFileList, setImgFileList] = useState([]);
  useEffect(() => {
    //console.log(imgFileList);
  }, [imgFileList]);
  
  const [pwVisible, setPwVisible] = useState(false);
  const [pwVisible2, setPwVisible2] = useState(true);
  const [talkOk, setTalkOk] = useState(true);
  
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
    <>
        <article>
          <div className='mypageBox'>
            <div className='listTit'>
              <h3>개인정보 관리</h3>
            </div>
            <div className='myInfoModify'>
              <span className='postEdit'>
                  <BaseButton label={'로그아웃'} />
                  <span><BaseButton label={'탈퇴하기'} /></span>
              </span>
              <div className='memberLayout'>
                <form>
                  <div className="tws">
                    <dl>
                      <dt>
                        이메일 주소
                        <sup>필수항목</sup>
                      </dt>
                      <dd>
                        <BaseInput type="text" placeholder="이메일 주소를 입력하세요." value='user8520@email.com' disabled={true} />
                      </dd>
                    </dl>
                    <dl>
                      <dt>
                        비밀번호
                        <sup>필수항목</sup>
                      </dt>
                      <dd>
                        <span className={`pwSet ${pwVisible ? 'on' : ''}`}>
                          <input type={`${pwVisible ? 'text' : 'password'}`} placeholder="비밀번호를 입력하세요." defaultValue='●●●●●●●●' />
                          <input type="button" onClick={() => setPwVisible(!pwVisible)} value="Password View" />
                        </span>
                        <span className={`pwSet ${pwVisible2 ? 'on' : ''}`}>
                          <input type={`${pwVisible2 ? 'text' : 'password'}`} placeholder="비밀번호를 입력하세요." defaultValue='qlalfqjsgh1234**' />
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
                            <BaseInput type="text" placeholder="이름을 입력하세요." value='정선미' disabled={true} />
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            휴대폰 인증
                            <sup>필수항목</sup>
                          </dt>
                          <dd className="phoneCertify">
                            <span className="certifySet">
                              <input type="text" placeholder="휴대전화번호를 입력하세요." defaultValue={'01012345678'}/>
                              <em>00:55</em>
                            </span>
                            <input type="button" className="btnB sm" value="인증번호 전송" />
                            <p className="notiP">인증 번호를 전송하였습니다.</p>
                            <input type="text" placeholder="인증번호를 입력하세요." defaultValue={'45644'}/>
                            <input type="button" className="btnB sm" value="인증 확인" />
                            {/* <p className="errorP">인증번호가 일치하지 않습니다.</p> */}
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            치과의사 면허증 첨부
                            <sup>필수항목</sup>
                          </dt>
                          <dd>
                            <span className='fileLoad disabled'>
                              <span>
                                면허증.pdf
                                <em>328.36 mb</em>
                              </span>
                            </span>
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            면허번호
                            <sup>필수항목</sup>
                          </dt>
                          <dd>
                            <BaseInput type="text" placeholder="면허번호를 입력하세요." value='1556548000' disabled={true} />
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            치과명
                            <sup>필수항목</sup>
                          </dt>
                          <dd className="officeName">
                            <em>치과명에 치과기공소는 입력하실 수 없습니다.</em>
                            <BaseInput type="text" placeholder="치과명을 입력하세요." value='정플란트치과의원' />
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            사업자 등록번호
                            <sup>필수항목</sup>
                          </dt>
                          <dd>
                            <BaseInput type="text" placeholder="사업자등록번호을 입력하세요." value='8886669994440' />
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            사업장 주소
                            <sup>필수항목</sup>
                          </dt>
                          <dd className="addressInput">
                            <BaseInput type="text" placeholder="주소를 입력하세요." value='서울 금천구 디지털로 121 ' />
                            <BaseInput type="text" placeholder="상세주소를 입력하세요." value='에이스 가산타워 3층, 307호 ' />
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
                              <input type="text" placeholder="휴대전화번호를 입력하세요." defaultValue={'01012345678'}/>
                              <em>00:55</em>
                            </span>
                            <input type="button" className="btnB sm" value="인증번호 전송" />
                            <p className="notiP">인증 번호를 전송하였습니다.</p>
                            <input type="text" placeholder="인증번호를 입력하세요." defaultValue={'45644'}/>
                            <input type="button" className="btnB sm" value="인증 확인" />
                            {/* <p className="errorP">인증번호가 일치하지 않습니다.</p> */}
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
                                <input type="radio" name="radio0" id="radio1" defaultChecked onChange={() => setTalkOk(!talkOk)} />
                                <label htmlFor="radio1">알림톡 설정</label>
                              </span>
                              <span>
                                <input type="radio" name="radio0" id="radio2" onChange={() => setTalkOk(!talkOk)} />
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
                            <BaseInput type="text" placeholder="성을 입력하세요." value='KIM' disabled={true} />
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            이름
                            <sup>필수항목</sup>
                          </dt>
                          <dd>
                            <BaseInput type="text" placeholder="이름을 입력하세요." value='Min ji' disabled={true} />
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            직업 선택
                            <sup>필수항목</sup>
                          </dt>
                          <dd>
                            <BaseSelect items={jobs} placeholder={'치과'} onChange={(e) => console.log(e)} />
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            사업자 명<sup>필수항목</sup>
                          </dt>
                          <dd>
                            <BaseInput type="text" placeholder="사업자 명을 입력하세요." value='정플란트치과의원' />
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            사업자등록번호
                            <sup>필수항목</sup>
                          </dt>
                          <dd>
                            <BaseInput type="text" placeholder="사업자등록번호을 입력하세요." value='124234200' />
                          </dd>
                        </dl>
                        <dl>
                          <dt>
                            사업자 주소
                            <sup>필수항목</sup>
                          </dt>
                          <dd className="addressInput">
                            <BaseInput type="text" placeholder="주소를 입력하세요." value='서울 금천구 디지털로 121 ' />
                            <BaseInput type="text" placeholder="상세주소를 입력하세요." value='에이스 가산타워 3층, 307호 ' />
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
                  {/* <BaseButton className={'btnB mt50'} label={'수정하기'} /> */}
                  <Link to='' className='btnB mt50'>수정하기 </Link>
                </form>
              </div>
            </div>
          </div>
        </article>
    </>
  );
};

export default InfoMgtPage;
