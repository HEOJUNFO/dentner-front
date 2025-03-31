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
  const banks = [{ name: '은행 1', value: 0 }, { name: '은행 2', value: 1 }];

  return (
    <div className={`memberLayout`}>
      <div className="joinStep2">
        <h2>이메일 회원가입</h2>
        <form>
          <div className="tws">
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
                상호 명
                <sup>필수항목</sup>
              </dt>
              <dd>
                <input type="text" placeholder="상호 명" />
              </dd>
            </dl>
            <dl>
              <dt>
                대표자 명
                <sup>필수항목</sup>
              </dt>
              <dd>
                <input type="text" placeholder="대표자 명" />
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
            <div className="joinGuide">
              <div className='back'>
                <p>
                  <em>치과기공소 통장 정보를 기입해주세요!</em>
                  등록한 사업자등록증의 대표자와 예금주가 다를 경우,
                  서비스 이용이 불가능합니다.
                </p>
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
          <BaseButton className={'btnB mt50'} label={'가입 신청하기'} />
        </form>
      </div>
    </div>
  );
};

export default JoinPage;
