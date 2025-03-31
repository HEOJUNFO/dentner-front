import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
const JoinEnd = () => {
  const [certVisible, setCertVisible] = useState(false);
  const [certVisible2, setCertVisible2] = useState(false);
  const [certVisible3, setCertVisible3] = useState(false);
  const [talkOk, setTalkOk] = useState(false);
  const [jStep, setJoinStep] = useState(1);
  const handleJoinStep = (jStep) => {
    setJoinStep(jStep);
  };
  const [jTab, setJoinTab] = useState(1);
  const handleJoinTab = (jTab) => {
    setJoinTab(jTab);
  };

  return (
    <div className={`memberLayout joinend`}>
      <div className="joinStep3">
        <div>
          <h2>가입 신청 완료</h2>
          <p>
            <span>
              현재 <strong>가입 승인 대기중</strong> 입니다.
            </span>
            관리자가 가입 승인 시 덴트너 이용이 가능합니다.
            <br />
            회원 승인은 가입 신청 후 영업일 기준 최대 1~3일이 소요됩니다.
          </p>
          <Link to="/main" className="btnB">
            홈으로 이동
          </Link>
        </div>
        <div className="joinFail" style={{ display: 'none' }}>
          <h2>회원가입 승인 거절</h2>
          <p>
            <span>
              현재 <strong>가입 승인이 거절</strong> 되었습니다.
            </span>
            이메일을 확인해주세요
          </p>
          <button className="btnB" onClick={() => handleJoinStep(1)}>
            다시 가입 신청하기
          </button>
        </div>
        <div className="joinOk" style={{ display: 'none' }}>
          <h2>회원가입 완료</h2>
          <p>
            <span>
              현재 <strong>가입 승인이 완료</strong> 되었습니다.
            </span>
            반갑습니다.
          </p>
          <Link to="/main" className="btnB">
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinEnd;
