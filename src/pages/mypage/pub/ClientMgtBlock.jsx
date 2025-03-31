import React from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseButton, PostsMore } from '@components/common';
import sampleProfile from '@assets/images/sample/sample1.jpeg';

const ClientMgtBlock = () => {
  return (
    <>
        <article>
            <div className='mypageBox'>
                <div className='listTit'>
                    <h3>차단 의뢰인 관리</h3>
                </div>
                <div className='searchList blockCase'>
                    <ul>
                        <li>
                            <span className='profileImg'>
                                <img src={sampleProfile} />
                            </span>
                            <div className='listD'>
                                <strong>어쩌궁 의뢰인</strong>
                            </div>
                            <BaseButton className={'bBU'} label={'차단 해제'} />
                        </li>
                        <li>
                            <span className='profileImg'>
                                <img src={sampleProfile} />
                            </span>
                            <div className='listD'>
                                <strong>어쩌궁 의뢰인</strong>
                            </div>
                            <BaseButton className={'bBU'} label={'차단 해제'} />
                        </li>
                        {/* <li className='noList'>차단된 의뢰인이 없습니다.</li> */}
                    </ul>
                </div>
                <Pagenation />
            </div>
        </article>
    </>
  );
};

export default ClientMgtBlock;
