import React, { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Client from './components/Client';
import Other from './components/Other';
import UserStore from '@store/UserStore';
import PWAInstallPrompt from './components/PWAInstallPrompt';

const MainPage = () => {
  const { user, login } = UserStore();
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);

  useEffect(() => {
    // Check if user is on mobile
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check if app is not installed as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    // Show prompt if on mobile and not installed
    if (isMobile && !isStandalone) {
      // Check local storage to see if user has dismissed the prompt before
      const pwaPromptDismissed = localStorage.getItem('pwaPromptDismissed');
      const pwaPromptExpiration = localStorage.getItem('pwaPromptDismissedExpiration');
      
      // Check if the dismissal has expired
      let hasExpired = false;
      if (pwaPromptExpiration) {
        const expirationDate = new Date(pwaPromptExpiration);
        hasExpired = new Date() > expirationDate;
      }

      if (!pwaPromptDismissed || hasExpired) {
        setShowPWAPrompt(true);
      }
    }
  }, []);

  const handleClosePrompt = () => {
    setShowPWAPrompt(false);
    // Set flag in localStorage so we don't show prompt again for a while
    localStorage.setItem('pwaPromptDismissed', 'true');

    // Set an expiration for this flag (7 days)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    localStorage.setItem('pwaPromptDismissedExpiration', expirationDate.toISOString());
  };

  if (user?.memberSe === 'A' || !user) {
    return (
      <>
        {showPWAPrompt && <PWAInstallPrompt onClose={handleClosePrompt} />}
        <Banner type={'A'} className={'mainVisual'} />
        <Client />
      </>
    );
  }

  return (
    <>
      {showPWAPrompt && <PWAInstallPrompt onClose={handleClosePrompt} />}
      <Banner type={'A'} className={'mainVisual'} />
      <Other />
    </>
  );
};

export default MainPage;