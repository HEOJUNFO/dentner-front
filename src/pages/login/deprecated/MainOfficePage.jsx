import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BaseButton } from '@components/common';
import sampleProfile from '@assets/images/sample/sample8.png';
import samplePartner from '@assets/images/sample/sample5.png';
import profileImg01 from '@assets/images/img_main_profile.png';
import profileImg02 from '@assets/images/img_main_profileM.png';
import Banner from '../../main/components/Banner';
import { Faq } from '@components/ui';

const MainOfficePage = () => {
  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };
  const [tab2, setTab2] = useState(1);
  const handleTab2 = (tab2) => {
    setTab2(tab2);
  };
  const [tab3, setTab3] = useState(1);
  const handleTab3 = (tab3) => {
    setTab3(tab3);
  };
  const tabRef = useRef();

  return (
    <>
      {/* 메인비주얼 */}
      <Banner />

      {/* 공개요청 + 지정요청 현황 */}
      <div className="mainStatus">
        <div className="infoAreaTit">
          <strong>
            <strong>공개요청 + 지정요청</strong> 현황
          </strong>
        </div>
        <div className="paySummery">
          <div className="back left">
            <strong className="tit">
              의뢰현황
              <dl>
                <dt>총 의뢰</dt>
                <dd>
                  <strong>181</strong>건
                </dd>
              </dl>
            </strong>
            <div>
              <dl>
                <dt>의뢰</dt>
                <dd className="start">
                  <strong>8</strong>건
                </dd>
              </dl>
              <dl>
                <dt>작업중</dt>
                <dd>
                  <strong>25</strong>건
                </dd>
              </dl>
              <dl>
                <dt>작업 완료</dt>
                <dd className="end">
                  <strong>148</strong>건
                </dd>
              </dl>
            </div>
          </div>
          <div className="back right">
            <strong className="tit">납기관리</strong>
            <div>
              <dl>
                <dt>
                  1시간 <span>내 예정</span>
                </dt>
                <dd>
                  <strong>0</strong>건
                </dd>
              </dl>
              <dl>
                <dt>
                  3시간 <span>내 예정</span>
                </dt>
                <dd>
                  <strong>6</strong>건
                </dd>
              </dl>
              <dl>
                <dt>
                  6시간 <span>내 예정</span>
                </dt>
                <dd>
                  <strong>17</strong>건
                </dd>
              </dl>
              <dl>
                <dt>
                  12시간 <span>내 예정</span>
                </dt>
                <dd>
                  <strong>25</strong>건
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* 프로필 작성 */}
      <div className="mainProfile">
        <div className="infoAreaTit">
          <strong>
            정성스러운 프로필 작성으로
            <br />
            <strong>전세계 거래처</strong>를 만나보세요!
          </strong>
        </div>
        <div className="cut">
          <span className="pcCase">
            <img src={profileImg01} />
          </span>
          <span className="mCase">
            <img src={profileImg02} />
          </span>
        </div>
      </div>

      {/* 회원차이점 */}
      <div className="mainDifference">
        <div className="back">
          <div className="left">
            <div className="infoAreaTit">
              <strong>
                <strong>치과기공소, 치자이너 회원</strong>
                <br />
                어떻게 다를까요?
              </strong>
            </div>
            <dl>
              <dt>치과기공소 회원</dt>
              <dd>
                <strong>소장님</strong>이 가입하실 수 있고
                <br /> <strong>기공소 홍보와 CAD 거래를 하실 수 있어요!</strong>
              </dd>
            </dl>
            <dl>
              <dt>치자이너 회원</dt>
              <dd>
                <strong>소장님</strong>과 <strong>직원</strong>이 가입하실 수 있고
                <br /> <strong>CAD 거래를 하실 수 있어요!</strong>
              </dd>
            </dl>
          </div>
          <div className="right">
            <dl>
              <dt>치과기공소</dt>
              <dd>
                <span>
                  <strong>치과기공소를 홍보</strong>할 수 있어요!
                </span>
                <span>
                  <strong>CAD파일을 거래</strong>할 수 있어요!
                </span>
              </dd>
            </dl>
            <dl>
              <dt>치자이너</dt>
              <dd>
                <span>
                  <strong>CAD파일을 거래</strong>할 수 있어요!
                </span>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      {/* 프로필 관리 */}
      <div className="mainProfileMgt">
        <div className="infoAreaTit">
          <strong>
            나만의 시간 관리,
            <br />
            <strong>프로필 공개/비공개 기능</strong>을 이용해보세요!
          </strong>
        </div>
        <div className="pFMgtToggle">
          <dl>
            <dt>프로필 관리</dt>
            <dd>
              <span className="toggleSet label">
                <input type="checkbox" id="toggleLabel" defaultChecked disabled />
                <label>
                  <span>공개</span>
                  <em>비공개</em>
                </label>
              </span>
            </dd>
          </dl>
        </div>
      </div>

      {/* 고객보러가기 */}
      <div className="mainGoClient">
        <div className="infoAreaTit">
          <strong>
            <strong>새로운 요청서</strong>를 확인하고
            <br />
            <strong>신규 고객</strong>을 만나러 가볼까요!
          </strong>
        </div>
      </div>

      {/* 덴트너 이용 */}
      <div className="mainUsed">
        <div className="infoAreaTit">
          <strong className="big">
            <span>많은 사람들이</span> 덴트너를 이용하고 있어요!
          </strong>
        </div>
        <div className="num">
          <span>
            <strong>
              <strong>120</strong>명
            </strong>
            가입자 수
          </span>
          <span>
            <strong>
              <strong>526</strong>개
            </strong>
            의뢰 수
          </span>
          <span>
            <strong>
              <strong>5,482,000</strong>P(￦)/ <strong>7,613,849</strong>P($)
            </strong>
            거래 총 금액
          </span>
        </div>
      </div>

      {/* 고객사 */}
      <div className="mainPartner">
        <div className="infoAreaTit">
          <strong>
            <span>덴트너는 국내외 여러</span>
            <br />
            고객사와 함께하고 있어요!
          </strong>
        </div>
        <ul>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
          <li>
            <Link to="">
              <img src={samplePartner} />
            </Link>
          </li>
        </ul>
      </div>
      {/* FAQ */}
      <Faq type="main" />
      {/*  */}
      <div className="sampleBox">
        <div>규제샌드박스 실종특례 명시 코멘트로 위치 요청 부탁드립니다.</div>
      </div>
    </>
  );
};

export default MainOfficePage;
