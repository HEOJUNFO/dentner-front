import React, { useEffect, useState } from 'react';
import { ModalAlertPresent, Loading } from '@components/common';
import { DoneAlert } from '@components/ui';
import useLayout from './hooks/useLayout';
import Footer from '../footer/Footer';
import { NotiContext } from './hooks/useContext';

const Header = React.lazy(() => import('../header/Header'));

const Layout = ({ children }) => {
  const { isAlertPresent, doneAlert, handleClose, notiCnt, setNotiCnt, isLoading } = useLayout();

  return (
    <NotiContext.Provider value={{ notiCnt, setNotiCnt }}>
      <div id="wrap">
        {isLoading && <Loading />}
        <Header />
        <div id="container">{children}</div>

        {isAlertPresent && <ModalAlertPresent>{doneAlert && <DoneAlert {...doneAlert} onClose={() => handleClose()} />}</ModalAlertPresent>}
        <Footer />
      </div>
    </NotiContext.Provider>
  );
};

export default Layout;
