import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
            <a 
              href={`${window.location.protocol}//${window.location.host}/service2`} 
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.links.privacy_policy')}
            </a>
            <a 
              href={`${window.location.protocol}//${window.location.host}/service1`} 
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.links.terms_of_service')}
            </a>
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
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <a href="https://www.linkedin.com/company/dentner/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginLeft: '10px' }}>
              <img src="https://cdn.jsdelivr.net/gh/HEOJUNFO/blockout@main/images/linkedin.png" alt="LinkedIn" style={{ width: '24px', height: '24px' }} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100083322402265" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginLeft: '10px' }}>
              <img src="https://cdn.jsdelivr.net/gh/HEOJUNFO/blockout@main/images/facebook-square.png" alt="Facebook" style={{ width: '24px', height: '24px' }} />
            </a>
            <a href="https://www.instagram.com/dentner_korea/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', marginLeft: '10px' }}>
              <img src="https://cdn.jsdelivr.net/gh/HEOJUNFO/blockout@main/images/instagram.png" alt="Instagram" style={{ width: '24px', height: '24px' }} />
            </a>
          </div>
          <p>COPYRIGHT © DENTNER ALL RIGHTS RESERVED.</p>
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