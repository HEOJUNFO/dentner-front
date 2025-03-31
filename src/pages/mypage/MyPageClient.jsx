import React, { useRef, useState } from 'react';
import BlockClient from './components/BlockClient';

const MyPageClient = () => {

  return (
    <>
      <article>
        <div className="mypageBox">
          <BlockClient/>
        </div>
      </article>
    </>
  );
};

export default MyPageClient;