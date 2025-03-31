import React from 'react';
import Banner from './components/Banner';
import Client from './components/Client';
import Other from './components/Other';
import UserStore from '@store/UserStore';

const MainPage = () => {
  const { user, login } = UserStore();
  if (user?.memberSe === 'A' || !user) {
    return (
      <>
        <Banner type={'A'} className={'mainVisual'} />

        <Client />
      </>
    );
  }

  return (
    <>
      <Banner type={'A'} className={'mainVisual'} />

      <Other />
    </>
  );
};

export default MainPage;
