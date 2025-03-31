import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ItemTag, PostsMore, BaseButton, BaseInput } from '@components/common';

const EstimatePage = () => {
    const infoItems = [{ name: 'EXOCAD'}, { name: '3Shape-2024ver'}  ];

  return (
    <>
        <section>
            <h2><strong>견적서</strong> 작성하기</h2>
            <div className='writeBox estimateWrite'>
                <div className='tvs'>
                    <article>
                        <h3>의뢰인 요청서 정보</h3>
                        <div className='detail reQMinInfo'>
                            <div className='left'>
                                <ItemTag items={infoItems}  className="itemTag" />
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5/ 하악 프레임 크라</strong>
                                <p>크라운 15 / 어비트먼트 10</p>
                            </div>
                            <div className='right'>
                                <strong className='time'>2024. 06. 30 <strong>18:30</strong></strong>
                                <Link className='bMR' to='/requestView'><span><em>더</em> 자세히보기</span></Link>
                            </div>
                        </div>
                    </article>
                </div>
                <div className='tws'>
                    <form>
                        <div className="detail">
                            <dl>
                                <dt>
                                    의뢰인이 요청한 각 보철종류의 <strong>단가를 입력해주세요<sup>필수항목</sup></strong>
                                </dt>
                                <dd>
                                    <div className='itemList'>
                                        <ul>
                                            <li>
                                                <div><strong><strong>크라운 &gt; </strong>Zirconia &gt; 일반 (Hole X)</strong> <em><strong>2</strong>개</em></div>
                                                <span className="priceUnit">
                                                    <span className="unit">
                                                        <span>단가</span>
                                                        <BaseInput
                                                            type="text"
                                                            id="typeAmount"
                                                            placeholder="0"
                                                        />
                                                        <em>원</em>
                                                    </span>
                                                </span>
                                            </li>
                                            <li>
                                                <div><strong><strong>크라운 &gt; </strong>Zirconia &gt; 일반 (Hole X)</strong> <em><strong>60</strong>개</em></div>
                                                <span className="priceUnit">
                                                    <span className="unit">
                                                        <span>단가</span>
                                                        <BaseInput
                                                            type="text"
                                                            id="typeAmount"
                                                            placeholder="0"
                                                        />
                                                        <em>원</em>
                                                    </span>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='priceSet'>
                                        <span>
                                            총 견적 금액
                                        </span>
                                        <strong className='right'>
                                            <em>1,800,000</em> <strong>원</strong>
                                        </strong>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    납품 가능한 시간을 선택해주세요
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <span className='calUnit '>
                                        <em>날짜</em>
                                        <input type='text' defaultValue='24.03.02.월' />
                                    </span>
                                    <span className='calUnit time'>
                                        <em>시간</em>
                                        <input type='text' defaultValue='11:30' />
                                    </span> 
                                </dd>
                            </dl>
                            <dl>
                                <dt>상세내용</dt>
                                <dd>
                                    <textarea placeholder='의뢰인이 참고해야할 내용을 작성해주세요 (최대 1,000자)'></textarea>
                                </dd>
                            </dl>
                        </div>
                        <div className='btnArea'>
                            <BaseButton label={'견적서 보내기'} className={'btnB'} />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
  );
};

export default EstimatePage;
