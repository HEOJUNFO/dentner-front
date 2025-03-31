import React, { useRef, useState } from 'react';
import { BaseButton } from '@components/common';

const ReqAddModal = ({ onClose }) => {
  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };
  const tabRef = useRef();
  return (
    <>
      <div className="basicPop reqAddPop" style={{ display: 'block' }}>
        <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">의뢰서 추가하기</h1>
        <div className="tabNav popCase" ref={tabRef}>
          <nav>
            <ul>
              <li className={`${tab === 1 ? 'on' : ''}`}>
                <button onClick={() => handleTab(1)}>요청전 의뢰서</button>
              </li>
              <li className={`${tab === 2 ? 'on' : ''}`}>
                <button onClick={() => handleTab(2)}>요청한 의뢰서</button>
              </li>
            </ul>
          </nav>
        </div>
        {/* -- */}
        {tab === 1 && (
          <div>
            <div className="pBack">
              <ul>
                <li className="reQMinInfo on">
                  <div className="left">
                    <span className="itemTag">
                      <em>지르코니아</em>
                    </span>
                    <strong>@8321430183048173057</strong>
                    <p>크라운 15 / 어비트먼트 10</p>
                  </div>
                  <div className="right">
                    <strong className="time">
                      2024. 06. 30 <strong>18:30</strong>
                    </strong>
                  </div>
                </li>
                <li className="reQMinInfo on">
                  <div className="left">
                    <span className="itemTag">
                      <em>지르코니아</em>
                    </span>
                    <strong>@8321430183048173057</strong>
                    <p>크라운 15 / 어비트먼트 10</p>
                  </div>
                  <div className="right">
                    <strong className="time">
                      2024. 06. 30 <strong>18:30</strong>
                    </strong>
                  </div>
                </li>
                <li className="reQMinInfo">
                  <div className="left">
                    <span className="itemTag">
                      <em>지르코니아</em>
                    </span>
                    <strong>@8321430183048173057</strong>
                    <p>크라운 15 / 어비트먼트 10</p>
                  </div>
                  <div className="right">
                    <strong className="time">
                      2024. 06. 30 <strong>18:30</strong>
                    </strong>
                  </div>
                </li>
                <li className="reQMinInfo">
                  <div className="left">
                    <span className="itemTag">
                      <em>지르코니아</em>
                    </span>
                    <strong>@8321430183048173057</strong>
                    <p>크라운 15 / 어비트먼트 10</p>
                  </div>
                  <div className="right">
                    <strong className="time">
                      2024. 06. 30 <strong>18:30</strong>
                    </strong>
                  </div>
                </li>
                <li className="reQMinInfo">
                  <div className="left">
                    <span className="itemTag">
                      <em>지르코니아</em>
                    </span>
                    <strong>@8321430183048173057</strong>
                    <p>크라운 15 / 어비트먼트 10</p>
                  </div>
                  <div className="right">
                    <strong className="time">
                      2024. 06. 30 <strong>18:30</strong>
                    </strong>
                  </div>
                </li>
              </ul>
            </div>
            <div className="pBtn">
              <BaseButton label={'추가하기 (2/10)'} className={'btnB'} />
            </div>
          </div>
        )}
        {tab === 2 && (
          <div>
            <div className="pBack">
              <ul>
                <li className="noList">저장된 의뢰서가 없습니다.</li>
              </ul>
            </div>
            <div className="pBtn mHideCase">
              {' '}
              {/* mHideCase : 모바일에서 사용하지 않는 버튼 영역 */}
              <BaseButton label={'추가하기 (0/0)'} className={'btnB'} disabled={true} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ReqAddModal;
