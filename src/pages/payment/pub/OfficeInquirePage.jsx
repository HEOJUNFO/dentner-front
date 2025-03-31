import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ItemTag, PostsMore, BaseButton } from '@components/common';

const OfficeInquirePage  = () => {
    const infoItems = [{ name: '의뢰서 a'}];
  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <h2>의뢰서 수령</h2>
            <div className='viewBox'>
                <div className='tvs'>
                    <article>
                        <h3 className='pt60 reQTit'>의뢰인 의뢰서 정보</h3>
                        <div className='detail reQMinInfo'>
                            <div className='left'>
                                <ItemTag items={infoItems} className='itemTag' />
                                <strong>@8321430183048173057</strong>
                                <p>크라운 15 / 어비트먼트 10</p>
                            </div>
                            <div className='right'>
                                <strong className='time'>2024. 06. 30 <strong>18:30</strong></strong>
                                <Link className='bMR' to='/requestView'><span><em>더</em> 자세히보기</span></Link>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </>
  );
};

export default OfficeInquirePage ;
