import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import InfoMgt from './InfoMgtPage';
import CenterMgt from './CenterMgtPage';
import DesignerMgt from './DesignerMgtPage';
import PaymentMgt from './PaymentMgtPage';
import PrivacyMgt from './PrivacyMgtPage';
import ReviewMgt from './ReviewMgtPage';
import NotiyMgt from './NotiyMgtPage';
import { BaseInput, ItemTag, BaseButton, } from '@components/common';
import { Link } from 'react-router-dom';

const MyPagePage = () => {
  const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }];
  const [tab , setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  }
  const tabRef = useRef();

  return (
    <>
      <section>
        <h2>마이페이지</h2>
        <div className='mypageTop'>
          <div>
            <span className='profileImgBack'>
              <span className='profileImg'>
                <img src={sampleProfile} />
              </span>
              <span className='profileUpload'>
                <input type='file' id='file1' />
              </span>
            </span>
            <strong>선미니피그코알라몽키</strong>
            <ItemTag items={cadss} className='itemTag' />
            <Link to='' className='btnPModify'>프로필 수정하기</Link>
          </div>
        </div>
        <div className='tabNav mypage' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>개인정보 관리</button></li>
                    <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>치과기공소 관리</button></li>
                    <li className={`${tab === 3 ? 'on' : ''}`}><button onClick={() => handleTab(3)}>치자이너 관리</button></li>
                    <li className={`${tab === 4 ? 'on' : ''}`}><button onClick={() => handleTab(4)}>거래이력 관리</button></li>
                    {/* <li className={`${tab === 5 ? 'on' : ''}`}><button onClick={() => handleTab(5)}>개인정보 업무위탁 계약 관리</button></li> */}
                    <li className={`${tab === 6 ? 'on' : ''}`}><button onClick={() => handleTab(6)}>리뷰 관리</button></li>
                    <li className={`${tab === 7 ? 'on' : ''}`}><button onClick={() => handleTab(7)}>알림 설정</button></li>
                </ul>
            </nav>
        </div>
        {/* -- */}
        {tab === 1 && <InfoMgt />}
        {tab === 2 && <CenterMgt />}
        {tab === 3 && <DesignerMgt />} 
        {tab === 4 && <PaymentMgt />} 
        {tab === 5 && <PrivacyMgt />} 
        {tab === 6 && <ReviewMgt />} 
        {tab === 7 && <NotiyMgt />} 
      </section>
    </>
  );
};

export default MyPagePage;
