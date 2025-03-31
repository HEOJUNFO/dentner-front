import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BaseSelect, ItemTag, SwiperImage } from '@components/common';
import { Rating } from 'react-simple-star-rating';
import sampleProfile from '@assets/images/sample/sample3.png';

const MypageTopCenter = () => {
    const items = [{ name: '지르코니아' }, { name: 'Bar type' }, { name: '투명교정' }, { name: 'Framework' }, { name: 'All on X (Porcelain)' }];
    const cate = [{ name: '카테고리' }, { name: '카테고리' }, { name: '카테고리' }];
    const [imgFileList, setImgFileList] = useState([]);
    useEffect(() => {}, [imgFileList]);
    const [sStep , setSearchTab] = useState(0);
    const handleSearchTab = (sStep) => {
        setSearchTab(sStep);
    }
    const [tab , setTab] = useState(1);
    const handleTab = (tab) => {
      setTab(tab);
    }

  return (
    <>
        <article className='mTopOffice'>
            <span className='profileImg'>
                <img src={sampleProfile} />
            </span>
            <div className='mTOBack'>
                <div className='bIBack'>
                    <div className='baseInfoBack'>
                        <div className='baseInfo'>
                            <div>
                                <strong>우수리 치자이너</strong>
                                <span className="mDRating">
                                    <span><i>평가</i><em>3.5</em></span>
                                    <span>리뷰 수<em>00<em>개</em></em></span>
                                    <span>거래 총 금액<em>900,000,000 <em>P(￦)</em></em><em>900,000 <em>P($)</em></em></span>
                                </span>
                            </div>
                            <div>
                                <div className='itemTag line'>
                                    <span>EXOCAD</span> <span>3Shape-2024ver</span>
                                </div>
                            </div>
                            <p className='notM'>
                                Apple 치카푸카는 150평 대규모 치과로 모든 분야 진료가 가능합니다.<br/>
                                넓은 공간에서 최고의 의료진에게 소중한 치아를 믿고 맡겨보세요!
                            </p>
                        </div>
                    </div>
                    <div className='rankSet notM'>
                        <div className='col'>
                            평점
                            <span className="ratingArea">
                                <Rating
                                    allowFraction
                                    initialValue={3.5}
                                    size={18}
                                    fillColor="#FFB525"
                                    emptyColor="#F7EFDE"
                                    readonly
                                />
                                <em>3.5</em>
                            </span>
                        </div>
                        <div className='col'>
                            리뷰수
                            <strong>100개</strong>
                        </div>
                    </div>
                </div>
                <div className='cdSummery notM'>
                    <div>
                        <dl>
                            <dt>거래 총 금액</dt>
                            <dd>900,000,000 <strong>P(￦)</strong> / 900,000 <strong>P($)</strong></dd>
                        </dl>
                        <dl>
                            <dt>수정 가능 횟수</dt>
                            <dd>3회</dd>
                        </dl>
                        <dl>
                            <dt>수정 보증 기간</dt>
                            <dd>20일</dd>
                        </dl>
                    </div>
                </div>
                <div className='tabNav mypageSummery'>
                    <nav>
                        <ul>
                            <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>한줄소개</button></li>
                            <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>상세내용</button></li>
                            <li className={`${tab === 3 ? 'on' : ''}`}><button onClick={() => handleTab(3)}>수가표</button></li>
                            <li className={`${tab === 4 ? 'on' : ''}`}><button onClick={() => handleTab(4)}>포트폴리오</button></li>
                        </ul>
                    </nav>
                </div>
                <div className='dIBack'>
                    <dl className={`${tab === 1 ? 'mCase mOn' : 'mCase'}`}>
                        <dt className='notM'><strong>한줄 소개</strong></dt>
                        <dd className='paragraph'>
                            Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                        </dd>
                    </dl>
                    <dl className={`${tab === 3 ? 'mOn' : ''}`}>
                        <dt className='notM'><strong>보철 종류와 그에 따른 수가표</strong></dt>
                        <dd>
                            <div className='prostheticsType'>
                                <div className={`${sStep === 1 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(1)}>크라운</strong>
                                    <div className='itemData'>
                                        <div>
                                            <ul>
                                                <li><span>일반 (Hole X)</span></li>
                                                <li><span>SCRP (Hole O)</span></li>
                                                <li className='on'><span>국소의치 지대치 일반</span></li>
                                                <li><span>국소의치 지대치 SCRP</span></li>
                                                <li><span>기타(직접입력)</span></li>
                                            </ul>
                                        </div>
                                        <p>
                                            <span className='left'>크라운 &gt; 국소의치 지대치 SCRP <span><em>1,000</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sStep === 2 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(2)}>캡</strong>
                                    <div className='itemData'>
                                        <div>
                                            <ul>
                                                <li><span>일반 (Hole X)</span></li>
                                                <li><span>SCRP (Hole O)</span></li>
                                                <li className='on'>
                                                    <span>국소의치 지대치 일반</span>
                                                </li>
                                                <li><span>국소의치 지대치 SCRP</span></li>
                                                <li><span>기타(직접입력)</span></li>
                                            </ul>
                                        </div>
                                        <p>
                                            <span className='left'>캡 &gt; 국소의치 지대치 SCRP <span><em>1,000</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sStep === 3 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(3)}>어버트먼트</strong>
                                    <div className='itemData'>
                                        <div></div>
                                        <p>
                                            <span className='left'>어버트먼트 <span><em>1,000</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sStep === 4 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(4)}>인레이/온레이</strong>
                                    <div className='itemData'>
                                        <div></div>
                                        <p>
                                            <span className='left'>인레이/온레이 <span><em>1,000</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sStep === 5 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(5)}>의치</strong>
                                    <div className='itemData'>
                                        <div>
                                            <ul>
                                                <li className='noDeph'><span>Full</span></li>
                                                <li className='noDeph'><span>Partial</span></li>
                                                <li className='on'>
                                                    <span>Flipper</span>
                                                </li>
                                            </ul>
                                            <ol>
                                                <li><span>1~4 Teeth</span></li>
                                                <li className='on'>
                                                    <span>5~ Teeth</span>
                                                </li>
                                            </ol>
                                            <ol className='noDeph'>
                                                <li><span>One body(Base + Teeth)</span></li>
                                                <li className='on'><span>Two body(Base / Teeth)</span></li>
                                            </ol>
                                        </div>
                                        <p>
                                            <span className='left'>의치 &gt; Flipper &gt; 5~ Teeth &gt;Two body(Base / Teeth) <span><em>1,000</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sStep === 6 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(6)}>스프린트/서지컬가이드</strong>
                                    <div className='itemData'>
                                        <div>
                                            <ul>
                                                <li><span>Splint</span></li>
                                                <li className='on'>
                                                    <span>Surgical Guide</span>
                                                </li>
                                            </ul>
                                            <ol>
                                                <li className='on'>
                                                    <span>Partial</span>
                                                </li>
                                            </ol>
                                            <ol className='noDeph'>
                                                <li className='on'><span>1~3 Holes</span></li>
                                                <li><span>4~ Holes</span></li>
                                            </ol>
                                        </div>
                                        <p>
                                            <span className='left'>스프린트/서지컬가이드 &gt; Surgical Guide &gt; Partial &gt; 1~3 Holes<span><em>1,000</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sStep === 7 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(7)}>개인트레이</strong>
                                    <div className='itemData'>
                                        <div>
                                            <ul>
                                                <li className='on'><span>Hole</span>
                                                    <ol>
                                                        <li><span>일반</span></li>
                                                        <li><span>Transfer type</span></li>
                                                        <li className='on'><span>Pick-up type</span></li>
                                                    </ol>
                                                </li>
                                                <li><span>Mo Hole</span></li>
                                            </ul>
                                        </div>
                                        <p>
                                            <span className='left'>개인트레이 &gt; Hole &gt; Pick-up type <span><em>1,000</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sStep === 8 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(8)}>프레임</strong>
                                    <div className='itemData'>
                                        <div>
                                            <ul>
                                                <li><span>Partial</span></li>
                                                <li className='on'><span>Full</span>
                                                    <ol>
                                                        <li><span>Full mesh</span></li>
                                                        <li className='on'><span>직접입력</span></li>
                                                    </ol>
                                                </li>
                                            </ul>
                                        </div>
                                        <p>
                                            <span className='left'>프레임 &gt; Full &gt; 직접입력<span><em>1,000</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sStep === 9 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(9)}>교정</strong>
                                    <div className='itemData'>
                                        <div></div>
                                        <p>
                                            <span className='left'>교정 <span><em>0</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                                <div className={`${sStep === 10 ? 'listItem on' : 'listItem'}`}>
                                    <strong onClick={() => handleSearchTab(10)}>기타</strong>
                                    <div className='itemData'>
                                        <div></div>
                                        <p>
                                            <span className='left'>기타 <span><em>0</em> 원</span></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="prostheticsMType">
                                <BaseSelect items={cate} placeholder={'1차 카테고리 '} onChange={(e) => console.log(e)} />
                                <BaseSelect items={cate} placeholder={'2차 카테고리 '} onChange={(e) => console.log(e)} />
                                <BaseSelect items={cate} placeholder={'3차 카테고리 '} onChange={(e) => console.log(e)} />
                                <BaseSelect items={cate} placeholder={'4차 카테고리 '} onChange={(e) => console.log(e)} />
                                <div className='choice'>
                                    <div>
                                        크라운 &gt; 국소의치 지대치 일반
                                        <span><em>1,000</em> 원 / <em>0.75</em> 달러</span>
                                    </div>
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <div className={`${tab === 2 ? 'mSummery mOn' : 'mSummery'}`}>
                        <div className='cdSummery mCase'>
                            <dl>
                                <dt>수정 가능 횟수</dt>
                                <dd>3회</dd>
                            </dl>
                            <dl>
                                <dt>수정 보증 기간</dt>
                                <dd>20일</dd>
                            </dl>
                        </div>
                        <dl>
                            <dt><strong>참고사항</strong></dt>
                            <dd className='paragraph'>
                                우수리 치자이너는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다.<br/>
                                넓은 공간에서 최고의 의료진에게 소중한 치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요!
                            </dd>
                        </dl>
                    </div>
                    <dl className={`${tab === 4 ? 'mOn' : ''}`}>
                        <dt className='notM'><strong>포트폴리오</strong></dt>
                        <dd className='fileSet designerCase'>
                            {/*  */}
                            <div className="pfImgSwiper">
                                <SwiperImage
                                items={items.map((el, idx) => {
                                    return (
                                    <span className="imgSet">
                                        <span><img key={`${idx}pimgSet`} src={sampleProfile} /></span>
                                    </span>
                                    );
                                })}
                                perview={'auto'}
                                space="11"
                                pagination={false}
                                />
                            </div>
                            {/*  */}
                        </dd>
                    </dl>
                </div>
            </div>
        </article>
    </>
  );
};

export default MypageTopCenter;
