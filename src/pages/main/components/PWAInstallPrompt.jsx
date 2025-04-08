import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const PWAInstallPrompt = ({ onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const { t, i18n } = useTranslation();

  const isEnglish = i18n.language === 'en' || i18n.language === 'en-US';
  
  useEffect(() => {
    console.log('pwaevent')
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleBeforeInstallPrompt = (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  };
  
  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // 더 자세한 로깅
      console.log('설치 조건: ', {
        isHttps: window.location.protocol === 'https:',
        isStandalone: window.matchMedia('(display-mode: standalone)').matches,
        hasServiceWorker: 'serviceWorker' in navigator
      });
      
      window.location.href = 'https://persistent-noodle-339.notion.site/PWA-1c768c8beb948068a299ef5b98951395';
      return;
    }
    
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("사용자가 앱 설치를 동의했습니다.");
      } else {
        console.log("사용자가 앱 설치를 동의하지 않았습니다.");
      }
      setDeferredPrompt(null);
    });
  };

  // Inline styles
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalContentStyle = {
    backgroundColor: '#F2F7FF',
    borderRadius: '16px',
    padding: '20px',
    width: '90%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const headerStyle = {
    marginBottom: '20px'
  };

  const headerTitleStyle = {
    fontSize: '24px',
    margin: 0
  };

  const logoContainerStyle = {
    marginBottom: '20px'
  };

  const logoInnerStyle = {
    width: '120px',
    height: '120px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  };

  const logoTextStyle = {
    color: '#5C7CFA',
    fontSize: '22px',
    fontWeight: 'bold'
  };

  const descriptionStyle = {
    marginBottom: '20px',
    lineHeight: 1.5
  };

  const installButtonStyle = {
    backgroundColor: '#5C7CFA',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '18px',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '20px'
  };

  const footerStyle = {
    width: '100%'
  };

  const webButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#6c757d',
    textDecoration: 'underline',
    cursor: 'pointer',
    padding: '8px',
    fontSize: '14px'
  };

  return (
    <div style={overlayStyle}>
      <div style={modalContentStyle}>
        <div style={headerStyle}>
          <h2 style={headerTitleStyle}>
            {isEnglish ? "Add to Home Screen" : "홈 화면 추가"}
          </h2>
        </div>
        
        <div style={logoContainerStyle}>
          <div style={logoInnerStyle}>
            <span style={logoTextStyle}>DENTNER</span>
          </div>
        </div>
        
        <p style={descriptionStyle}>
          {isEnglish ? (
            "Add the Dentner app to your home screen for fast and convenient access."
          ) : (
            <>
              Dentner앱을 홈 화면에 추가하여
              <br />
              빠르고 편리하게 이용하세요.
            </>
          )}
        </p>
        
        <button 
          style={installButtonStyle} 
          onClick={handleInstallClick}
        >
          {isEnglish ? "Install App" : "앱 설치하기"}
        </button>
        
        <div style={footerStyle}>
          <button style={webButtonStyle} onClick={onClose}>
            {isEnglish ? "No thanks, I'll use the web" : "괜찮아요. 웹으로 볼게요"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
