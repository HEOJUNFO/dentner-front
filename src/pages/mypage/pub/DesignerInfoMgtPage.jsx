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
  const ituts = [
    { name: '+82', value: 0 },
    { name: '+80', value: 1 },
  ];
  const banks = [{ name: '은행 1', value: 0 }, { name: '은행 2', value: 1 }];

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
                        상호 명<sup>필수항목</sup>
                        </dt>
                        <dd>
                        <BaseInput type="text" placeholder="상호 명을 입력하세요." value='정플란트치과의원' />
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                        대표자 명<sup>필수항목</sup>
                        </dt>
                        <dd>
                        <BaseInput type="text" placeholder="대표자 명을 입력하세요." value='정선미' />
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
                    <div className="joinGuide">
                        <div className='back'>
                            <p>
                                <em>치과기공소 통장 정보를 기입해주세요!</em>
                                등록한 사업자등록증의 대표자와 예금주가 다를 경우,
                                서비스 이용이 불가능합니다.
                            </p>
                            <div>
                                <span>
                                    <em>&#91;가입 가능&#93;</em><br/>
                                    <i>가입자 이름 : 홍길동</i><br/>
                                    대표자 : 김철수<br/>
                                    예금주 : 김철수
                                </span>
                                <span>
                                    <em>&#91;가입 불가&#93;</em><br/>
                                    <i>가입자 이름 : 홍길동</i><br/>
                                    대표자 : 김철수<br/>
                                    <strong>예금주 : 홍길동</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                    <dl>
                        <dt>
                            은행 명
                            <sup>필수항목</sup>
                        </dt>
                        <dd>
                            <BaseSelect items={banks} placeholder={'은행을 선택해주세요.'} onChange={(e) => console.log(e)} />
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            예금주
                            <sup>필수항목</sup>
                        </dt>
                        <dd>
                            <input type="text" placeholder="예금주를 입력하세요." />
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            계좌번호
                            <sup>필수항목</sup>
                        </dt>
                        <dd>
                            <input type="text" placeholder="계좌번호를 입력하세요." />
                            <input type="button" className="btnB sm mt10" value="본인 인증" />
                        </dd>
                    </dl>
                    <div className='invoiceAgree'>
                        <span className="checkSet">
                            <input type="checkbox" id="cad" />
                            <label htmlFor="cad">* CAD 디자인 용역 시, 전자계산서 발행은 필수입니다.</label>
                        </span>
                    </div>
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
