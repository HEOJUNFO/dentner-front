import React from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseButton, PostsMore } from '@components/common';
import sampleProfile from '@assets/images/sample/sample3.png';

const CenterMgtPage = () => {
  return (
    <>
      <div className='listTit'>
          <h3>차단 치과기공소</h3>
      </div>
      <div className='searchList blockCase'>
        <ul>
          <li>
            <span className='profileImg'>
              <img src={sampleProfile} />
            </span>
            <div className='listD'>
              <strong>Apple 치카푸카</strong>
            </div>
            <BaseButton className={'bBU'} label={'차단 해제'} />
          </li>
          <li>
            <span className='profileImg'>
              <img src={sampleProfile} />
            </span>
            <div className='listD'>
              <strong>Apple 치카푸카</strong>
            </div>
            <BaseButton className={'bBU'} label={'차단 해제'} />
          </li>
          {/* <li className='noList'>관심 치과기공소가 없습니다.</li> */}
        </ul>
      </div>
      <Pagenation />
    </>
  );
};

export default CenterMgtPage;
