import React, { useState } from 'react';
import { BaseButton } from '@components/common';
import sampleProfile from '@assets/images/sample/sample3.png';
import ReportDoneAlert from './ReportDoneAlert';
import { BaseSelect, ModalAlertPresent } from '@components/common';

const ReportModal = ({ onClose }) => {
  const [isModal, setIsModal] = useState(false);
  const items = [
    { name: '신고사유 1', value: 0 },
    { name: '신고사유 2', value: 1 },
  ];

  return (
    <>
      <div className="basicPop reportPop" style={{ display: 'block' }}>
        <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">차단하기</h1>
        <div className="pBack">
          <div className="userInfo">
            <h2>신고 대상</h2>
            <div>
              <span className="profileImg">
                <img src={sampleProfile} />
              </span>
              <strong>치기치기공</strong>
            </div>
          </div>
          <BaseSelect items={items} placeholder={'신고 사유를 선택하세요.'} onChange={(e) => console.log(e)} />
          <textarea placeholder="신고 사유를 입력하세요."></textarea>
        </div>
        <div className="pBtn">
          <BaseButton label={'취소'} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={'신고 접수하기'} className={'btnB'} onClick={() => setIsModal(true)} />
        </div>
      </div>
      {isModal && (
        <ModalAlertPresent>
          <ReportDoneAlert
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default ReportModal;
