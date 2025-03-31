import {Suspense, useEffect, useState} from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Replace SnackbarProvider
import '@utils/i18n';
import { useTranslation, I18nextProvider } from 'react-i18next';
//import './App.css'
import routes from './router/routes';
import Layout from './components/ui/layout/Layout';
import PrivateRoute from '@components/routes/PrivateRoute';
import { ScrollToTop, SuspenseLoading } from '@components/common';
import useApp from './components/hooks/useApp';
import { GoogleOAuthProvider } from '@react-oauth/google';
import useScrollRestoration from '@components/hooks/useScrollRestoration';
import Error500 from '@pages/error/Error500';

import {requestPermissionAndGetToken, requestGetToken, onMessageListener} from '../firebase'


function ScrollRestoration() {
  useScrollRestoration();
  return null;
}


function App() {
  const { i18n } = useTranslation();
  const { isLoading, error } = useApp();

  //FIXME: env 파일로 들어가야할 부분
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

  useEffect(() => {
    const setNotify = async () => {
      const result = await requestGetToken()
      console.log(result)

      onMessageListener((payload) => {

        const { title, body, url } = payload.data;

        if (Notification.permission === 'granted') {
          navigator.serviceWorker.getRegistration().then((reg) => {
            reg?.showNotification(`${title}`, {
              body,
              data: { url },
              tag: url,
            });
          });
        }
      });
    }

    setTimeout(() => {
      setNotify()
    },2000)

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        console.log('앱이 포그라운드로 돌아옴');


      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, url } = event.data || {};
        if (type === 'REDIRECT' && url) {
          window.location.href = url;
        }
      });
    }

      document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };

  },[])

  if (isLoading) return <SuspenseLoading />;
  if (error) return <Error500 />;

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <I18nextProvider i18n={i18n}>
      <Toaster 
          toastOptions={{
            duration: 3000,
            position: 'bottom-center',
            style: {
              maxWidth: '672px',
              width: '100%'
            }
          }}
        />
        <Suspense fallback={<SuspenseLoading />}>
          <Router>
            <ScrollRestoration />
            <ScrollToTop>
              <Routes>
                {routes.map((route, idx) => {
                  return (
                    route.component && (
                      <Route
                        key={idx}
                        path={route.path}
                        element={
                          <route.layout>
                            {route.protected ? (
                              <PrivateRoute>
                                <route.component />
                              </PrivateRoute>
                            ) : (
                              <route.component />
                            )}
                          </route.layout>
                        }
                      >
                        {route.routes &&
                          route.routes.map((routes, idxx) => {
                            // return <Route key={idxx} path={routes.path} element={<routes.component />} />;
                            return (
                              <Route
                                key={idxx}
                                path={routes.path}
                                element={
                                  routes.protected ? (
                                    <PrivateRoute>
                                      <routes.component />
                                    </PrivateRoute>
                                  ) : (
                                    <routes.component />
                                  )
                                }
                              />
                            );
                          })}
                      </Route>
                    )
                  );
                })}
              </Routes>
            </ScrollToTop>
          </Router>
        </Suspense>
      </I18nextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;