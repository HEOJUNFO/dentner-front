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
        <h2>마이페이지</h2>
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
      </section>
    </>
  );
};

export default MyPagePage;