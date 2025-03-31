import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample2.png';
import sampleProfile2 from '@assets/images/sample/sample6.jpeg';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { ItemTag, PostsMore, BaseButton } from '@components/common';
import { SwiperImage, SwiperImageThumbs } from '@components/common/Swiper';

const EstimatePage = () => {
    const [sStep , setSearchTab] = useState(1);
    const handleSearchTab = (sStep) => {
        setSearchTab(sStep);
    }
    const [ratingValue, setRating] = useState(0);
    const handleRating = (rate) => {
      setRating(rate);
    }
    const handleReset = () => {
      setRating(0);
    }

    const items = [{ name: '지르코니아' }, { name: 'Bar type' }, { name: '투명교정' }, { name: 'Framework' }, { name: 'All on X (Porcelain)' }];
    const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];
    const infoItems = [{ name: 'EXOCAD'}, { name: '3Shape-2024ver'}  ];

    const [thumbsSwiper, setThumbsSwiper] = useState();
    const img_file_list = [
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
    ]
    const img_file_list2 = [
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
        { file_path: sampleProfile},
        { file_path: sampleProfile2},
    ]  
    const moreItems = [
        {
            name: '차단하기',
            onClick: () => {
            alert(2);
            },
        },
        { name: '신고하기' },
    ];

  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <div className='viewBox subView'>
                <h2>견적서</h2>
                <div className='cdInfo'>
                    <div className='back'>
                        <div className='infoD'>
                            <span className='profileImg'>
                                <img src={sampleProfile2} />
                            </span>
                            <div>
                                <strong>Apple 치카푸카</strong>
                                <span class="mDRating">
                                    <span><i>평가</i><em>3.5</em></span>
                                    <span>리뷰 수<em>00개</em></span>
                                    <span>거래 총 금액<em>9,000,000,000원</em></span>
                                </span>
                                <span className='sorting'>
                                    <span>
                                        <input type='checkbox' id='sorting5' />
                                        <label htmlFor='sorting5'>관심 치자이너</label>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <p>
                            Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다.
                            넓은 공간에서 최고의 의료진에게 소중한 치아를 믿고 맡겨보세요!
                        </p>
                    </div>
                    <span className='right'>
                        <BaseButton label={'치자이너 선택'} className={'bDC'}/>
                        <Link className='bCG'>채팅하기</Link>
                        <PostsMore items={moreItems} />
                    </span>
                </div>
                <div className='tvs'>
                    <article>
                        <div className='cdSummery'>
                            <strong className='mTit'>상세내용</strong>
                            <div className='designerCase'>
                                <dl className='notM'>
                                    <dt>평점</dt>
                                    <dd className='ratingArea'>
                                        <Rating  
                                        allowFraction
                                        initialValue={3.5}
                                        onClick={function noRefCheck(){}}
                                        size={15}
                                        fillColor='#FFB525'
                                        emptyColor='#F7EFDE'
                                        readonly 
                                        showTooltip />
                                    </dd>
                                </dl>
                                <dl className='notM'>
                                    <dt>리뷰수</dt>
                                    <dd>100개</dd>
                                </dl>
                                <dl className='notM'>
                                    <dt>거래 총 금액</dt>
                                    <dd>900,000,000 P(￦) / 900,000 P($)</dd>
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
                        <div className='cdSummery twin'>
                            <div>
                                <dl>
                                    <dt>구동 가능한 CAD S/W</dt>
                                    <dd>
                                        <ItemTag items={cadss} className='itemTag' />
                                    </dd>
                                </dl>
                            </div>
                            <div className='notM'>
                                <dl>
                                    <dt>납품 가능일</dt>
                                    <dd><strong className="time">2024. 05. 14 <strong>18:30</strong></strong></dd>
                                </dl>
                            </div>
                        </div>
                        <h3 className='lineCase'>견적서</h3>
                        <div className='detail'>
                            <div className='mBack'>
                                <h4><strong>보철종류/금액</strong></h4>
                                <div className='orderCase'>
                                    <div className='itemList'>
                                        <div><strong><strong>크라운 &gt; </strong>Zirconia &gt; 일반 (Hole X)</strong> <em>100,000 <i>2</i> = <span><span>200,000</span> 원</span></em></div>
                                        <div><strong><strong>스프린트/서지컬가이드 &gt; </strong>Surgical Guide &gt; Partital &gt; 1~3 Holes</strong> <em>100,000 <i>3</i> = <span><span>300,000</span> 원</span></em></div>
                                    </div>
                                </div>
                            </div>
                            <div className='priceSet'>
                                <span>
                                    총 결제 금액
                                </span>
                                <strong className='right'>
                                    <strong>500,000</strong> <em>P(￦)</em>
                                </strong>
                            </div>
                            <div className='mBack mDeadlineCase'>
                                <dl>
                                    <dt>납품 가능일</dt>
                                    <dd><strong className="time">2024. 05. 14 <strong>18:30</strong></strong></dd>
                                </dl>
                            </div>
                            <div className='mBack'>
                                <h4><strong>포트폴리오</strong></h4>
                                <div className='portfolioImg'>
                                    <div className='pfMainSwiper'>
                                        <SwiperImage
                                            items={img_file_list.map((el, idx) => {
                                            return (
                                                <img key={`${idx}pimgSet`} src={el.file_path} />
                                            );
                                            })}
                                            thumbsSwiper={thumbsSwiper}
                                            pagination={true}
                                        />
                                    </div>
                                    <div className='pfThumbsSwiper'>
                                        <SwiperImageThumbs
                                        space={0}
                                        items={img_file_list2.map((el, idx) => {
                                            return <span><img key={`${idx}SwiperImageThumbs`} src={el.file_path} /></span>;
                                        })}
                                        perview={'auto'}
                                        setThumbsSwiper={setThumbsSwiper}
                                        navigation={true}
                                        />
                                    </div>
                                </div>
                                <div className="btnArea mCase">
                                    <BaseButton label={'포트폴리오 3D 뷰어 보기'} className={'btnB'} />
                                </div>
                            </div>
                        </div>
                        <div className='btnArea pcCase'>
                            <BaseButton label={'포트폴리오 3D 뷰어 보기'} className={'btnB'}/>
                        </div>
                        <h3 className='lineCase'>내 요청서 정보</h3>
                        <div className='detail reQMinInfo'>
                            <div className='left'>
                                <ItemTag items={infoItems} className='itemTag' />
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
            </div>
        </section>
    </>
  );
};

export default EstimatePage;
