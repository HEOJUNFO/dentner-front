import React, { useRef, useState } from 'react';
import MypageTopCenter from './MypageTopCenter';
import MypageTopDesigner from './MypageTopDesigner';
import CenterInfoMgt from './CenterInfoMgtPage';
import DesignerInfoMgt from './DesignerInfoMgtPage';
import ClientMgtBlock from './ClientMgtBlock';
import OfficePaymentMgt from './OfficePaymentMgtPage';
import OfficeReviewMgt from './OfficeReviewMgtPage';
import NotiyMgt from './NotiyMgtPage';
import { Link } from 'react-router-dom';

const MyPagePage = () => {
  const [tab , setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  }
  const tabRef = useRef();
  const [tab2 , setTab2] = useState(1);
  const handleTab2 = (tab2) => {
    setTab2(tab2);
  }
  const tabRef2 = useRef();
  const [kindValue, setKindValue] = useState(false);

  return (
    <>
      <section>
        <h2 className='withToggle'>
          마이페이지
          <span className="toggleSet label">
              <input type="checkbox" id="toggleLabel" defaultChecked onChange={() => setKindValue(!kindValue)} />
              <label>
                <span>치과기공소</span>
                <em>치자이너</em>
              </label>
          </span>
        </h2>
        <div style={{ display: `${kindValue ? 'none' : 'block'}` }}>
          <div className='myPageTopOffice yetDesigner'> {/* 치자이너 프로필 있을 경우 className='myPageTopOffice' */}
            <div className='addDesigner'>
              <p>
                치과기공소 프로필 만으로는 지정요청을 이용할 수 없어요.<br/>
                <strong>지정요청을 이용하시려면, <strong>치자이너 프로필로도 가입을 해주세요! 😃</strong></strong>
              </p>
            </div>
            <div className='back'>
              <MypageTopCenter />
              <Link to='/profileModify3' className='btnPModify'>프로필 수정하기</Link>
            </div>
          </div>
          <div className='tabNav mypage' ref={tabRef} >
              <nav>
                  <ul>
                      <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>개인정보 관리</button></li>
                      <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>차단 의뢰인 관리</button></li>
                      <li className={`${tab === 3 ? 'on' : ''}`}><button onClick={() => handleTab(3)}>알림 설정</button></li>
                  </ul>
              </nav>
          </div>
          {/* -- */}
          {tab === 1 && <CenterInfoMgt />}
          {tab === 2 && <ClientMgtBlock />}
          {tab === 3 && <NotiyMgt />} 
        </div>
        <div style={{ display: `${kindValue ? 'block' : 'none'}` }}>
          <div className='myPageTopOffice'>
            <div className='back dCase'>
              <MypageTopDesigner />
              <Link to='/profileModify2' className='btnPModify'>프로필 수정하기</Link>
            </div>
          </div>
          <div className='tabNav mypage' ref={tabRef2} >
              <nav>
                  <ul>
                      <li className={`${tab2 === 1 ? 'on' : ''}`}><button onClick={() => handleTab2(1)}>개인정보 관리</button></li>
                      <li className={`${tab2 === 2 ? 'on' : ''}`}><button onClick={() => handleTab2(2)}>차단 의뢰인 관리</button></li>
                      <li className={`${tab2 === 3 ? 'on' : ''}`}><button onClick={() => handleTab2(3)}>거래이력 관리</button></li>
                      <li className={`${tab2 === 4 ? 'on' : ''}`}><button onClick={() => handleTab2(4)}>받은 리뷰 관리</button></li>
                      <li className={`${tab2 === 5 ? 'on' : ''}`}><button onClick={() => handleTab2(5)}>알림 설정</button></li>
                  </ul>
              </nav>
          </div>
          {/* -- */}
          {tab2 === 1 && <DesignerInfoMgt />}
          {tab2 === 2 && <ClientMgtBlock />}
          {tab2 === 3 && <OfficePaymentMgt />} 
          {tab2 === 4 && <OfficeReviewMgt />} 
          {tab2 === 5 && <NotiyMgt />} 
        </div>
      </section>
    </>
  );
};

export default MyPagePage;
