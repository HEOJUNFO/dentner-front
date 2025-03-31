import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PolicyModal from '../modal/PolicyModal';
import { ModalPresent } from '@components/common';
import { useTranslation } from 'react-i18next';

const Footerr = () => {
  const [isPolicyModal, setIsPolicyModal] = useState(false);
  const [keyName, setKeyName] = useState('');
  const { t } = useTranslation();

  const handlePolicyModal = (type) => {
    setKeyName(type);
    setIsPolicyModal(true);
  };

  return (
    <>
      <div id="footer">
        {/* <footer>
        <span className="flogo">DENTNER</span>
        <div className="goFBtn">
          <Link to="/service">서비스 소개</Link>
          <Link to="/service" state={{to:"quote"}}>이용방법</Link>
          <Link to="/help/notice">공지사항</Link>
          <Link to="/help">FAQ</Link>
          <Link to="javacsript:void(0);" onClick={() => handlePolicyModal("privacy")}>개인정보처리방침</Link>
          <Link to="javacsript:void(0);" onClick={()=> handlePolicyModal("tos")}>이용약관</Link>
        </div>
        <address>
          <div>
            <span>주식회사 덴트너</span>
            <span>
              <strong>대표자</strong>남원욱
            </span>
            <span>
              <strong>주소</strong>광주광역시 북구 첨단과기로 123, 창업진흥센터 B동 501-5 (광주과학기술원)
            </span>
          </div>
          <div>
            <span>
              <strong>E-mail</strong>support@dentner.com
            </span>
            <span>
              <strong>사업자등록번호</strong>231-86-02630
            </span>
            <span>
              <strong>통신판매 신고</strong>2024-광주북구-0565
            </span>
          </div>
        </address>
        <p>COPYRIGHT © DENTNER ALL RIGHTS RESERVED.</p>
        <button className="channelTalk">채널톡 문의하기</button>
      </footer> */}
        <footer>
          <span className="flogo">DENTNER</span>
          <div className="goFBtn">
            <Link to="/service" state={{ to: 'service_introduce' }}>
              {t('footer.links.service_intro')}
            </Link>
            <Link to="/service" state={{ to: 'quote' }}>
              {t('footer.links.how_to_use')}
            </Link>
            <Link to="/help/notice">{t('footer.links.notice')}</Link>
            <Link to="/help">FAQ</Link>
            {/* <Link to="javascript:void(0);" onClick={() => handlePolicyModal('privacy')}>
              {t('footer.links.privacy_policy')}
            </Link>
            <Link to="javascript:void(0);" onClick={() => handlePolicyModal('tos')}>
              {t('footer.links.terms_of_service')}
            </Link> */}
            <Link to="javascript:void(0);" onClick={() => window.open(`${window.location.protocol}//${window.location.host}/service2`, '_blank')}>
              {t('footer.links.privacy_policy')}
            </Link>
            <Link to="javascript:void(0);" onClick={() => window.open(`${window.location.protocol}//${window.location.host}/service1`, '_blank')}>
              {t('footer.links.terms_of_service')}
            </Link>
          </div>
          <address>
            <div>
              <span>주식회사 덴트너</span>
              <span>
                <strong>{t('footer.ceo')}</strong>남원욱
              </span>
              <span>
                <strong>{t('footer.address')}</strong>광주광역시 북구 첨단과기로 123, 창업진흥센터 B동 501-5 (광주과학기술원)
              </span>
            </div>
            <div>
              <span>
                <strong>E-mail</strong>support@dentner.com
              </span>
              <span>
                <strong>{t('footer.business_registration')}</strong>231-86-02630
              </span>
              <span>
                <strong>{t('footer.e_commerce_registration')}</strong>2024-광주북구-0565
              </span>
            </div>
          </address>
          <p>COPYRIGHT © DENTNER ALL RIGHTS RESERVED.</p>
          {/* <button className="channelTalk">{t('footer.contact_channel')}</button> */}
        </footer>
      </div>
      {isPolicyModal && (
        <ModalPresent>
          <PolicyModal onClose={() => setIsPolicyModal(false)} keyName={keyName} />
        </ModalPresent>
      )}
    </>
  );
};

export default Footerr;
