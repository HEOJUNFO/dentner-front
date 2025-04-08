import React, { useEffect, useState, lazy, Suspense } from 'react';
import { ModalAlertPresent, Loading } from '@components/common';
import { DoneAlert } from '@components/ui';
import useLayout from './hooks/useLayout';
import Footer from '../footer/Footer';
import { NotiContext } from './hooks/useContext';
import PWADownloadSVG from '../../../svg/PWADownloadSVG';

const Header = lazy(() => import('../header/Header'));

const Layout = ({ children }) => {
  const { isAlertPresent, doneAlert, handleClose, notiCnt, setNotiCnt, isLoading } = useLayout();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal visibility
  
  // Check if device is mobile and if PWA is already installed
  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check if app is in standalone mode (already installed)
    const checkStandalone = () => {
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
    };
    
    checkMobile();
    checkStandalone();
    
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };
    
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  
  const handleBannerClick = async () => {
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

  // Modified condition to also check modal state - hide banner when any modal is open
  const showPWABanner = isMobile && !isStandalone && !isModalOpen;

  return (
    <NotiContext.Provider value={{ notiCnt, setNotiCnt, isModalOpen, setIsModalOpen }}>
      {showPWABanner && (
        <div 
          onClick={handleBannerClick}
          style={{
            backgroundColor: '#d6e4ff', 
            padding: '12px 0', 
            textAlign: 'center',
            color: '#333',
            fontSize: '16px',
            fontWeight: '500',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            cursor: 'pointer'
          }}
        >
          덴트너 앱 다운 받고 실시간 알림 받기
          <span style={{ 
            padding: '2px 5px', 
            borderRadius: '3px', 
            marginLeft: '5px',
            verticalAlign: 'middle'
          }}>
            <PWADownloadSVG/>
          </span>
        </div>
      )}
      <div id="wrap" style={{ marginTop: showPWABanner ? '40px' : '0' }}>
        {isLoading && <Loading />}
        <Suspense fallback={<Loading />}>
          <Header />
        </Suspense>
        <div id="container">{children}</div>

        {isAlertPresent && <ModalAlertPresent>{doneAlert && <DoneAlert {...doneAlert} onClose={() => handleClose()} />}</ModalAlertPresent>}
        <Footer />
      </div>
    </NotiContext.Provider>
  );
};

export default Layout;