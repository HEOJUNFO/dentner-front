import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useJoinEnd } from './hooks/useJoinEnd';
import { useTranslation } from 'react-i18next';

/**
 * 회원가입 후 상태 조회 페이지
 * @returns
 */
const JoinEnd = () => {
  const { t } = useTranslation();
  const { user, memberApprovalSe } = useJoinEnd();

  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 로컬 스토리지 삭제
    localStorage.clear();
    // 페이지 새로고침
    window.location.href = '/'
  };

  return (
    <div className={`memberLayout joinend`}>
      <div className="joinStep3">
        {memberApprovalSe === 'A' && (
          <div>
            <h2>
              {/* 가입 신청 완료 */}
              {t('version2_1.text122')}
            </h2>
            <p>
              <span>
                {t('version2_1.text123')} <strong>{t('version2_1.text124')}</strong> {t('version2_1.text125')}
              </span>
              {/* 관리자가 가입 승인 시 덴트너 이용이 가능합니다. */}
              {t('version2_1.text126')}
              <br />
              {/* 회원 승인은 가입 신청 후 영업일 기준 최대 1~3일이 소요됩니다. */}
              {t('version2_1.text127')}
            </p>
              <Link to="/" className="btnB" >
                {/* 홈으로 이동 */}
                {t('version2_1.text52')}
              </Link>
              <button 
  onClick={handleLogout} 
  style={{
    marginTop:'15px',
    padding: '10px 20px',
    backgroundColor: 'white',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '10px',
    fontWeight: '500'
  }}
>
  {/* 로그아웃 */}
  {t('common.logout', '로그아웃')}
</button>
          </div>
        )}
        {memberApprovalSe === 'B' && (
          <div className="joinOk">
            <h2>
              {/* 회원가입 완료 */}
              {t('version2_1.text128')}
            </h2>
            <p>
              <span>
                {/* 현재 <strong>가입 승인이 완료</strong> 되었습니다. */}
                {t('version2_1.text123')} <strong>{t('version2_1.text129')}</strong> {t('version2_1.text130')}
              </span>
              {/* 반갑습니다. */}
              {t('version2_1.text131')}
            </p>
            <Link to="/" className="btnB">
              {/* 홈으로 이동 */}
              {t('version2_1.text52')}
            </Link>
          </div>
        )}
        {memberApprovalSe === 'C' && (
          // <div className="joinFail" style={{ display: 'none' }}>
          <div className="joinFail">
            <h2>
              {/* 회원가입 승인 거절 */}
              {t('version2_1.text132')}
            </h2>
            <p>
              <span>
                {/* 현재 <strong>가입 승인이 거절</strong> 되었습니다. */}
                {t('version2_1.text123')} <strong>{t('version2_1.text133')}</strong> {t('version2_1.text130')}
              </span>
              {/* 이메일을 확인해주세요 */}
              {t('version2_1.text134')}
            </p>
            <Link to="/login/join" className="btnB" replace={true}>
              {/* 다시 가입 신청하기 */}
              {t('version2_1.text135')}
            </Link>
            <button 
  onClick={handleLogout} 
  style={{
    marginTop:'15px',
    padding: '10px 20px',
    backgroundColor: 'white',
    color: '#666',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '10px',
    fontWeight: '500'
  }}
>
  {/* 로그아웃 */}
  {t('common.logout', '로그아웃')}
</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinEnd;