import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample2.png';
import sampleProfile2 from '@assets/images/sample/sample6.jpeg';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { ItemTag, PostsMore, BaseButton, BaseSelect } from '@components/common';
import { SwiperImage, SwiperImageThumbs } from '@components/common/Swiper';
import LinkAlert from '../../../components/ui/modal/LinkAlert';
import BlockAlert from '../../../components/ui/modal/BlockAlert';
import ReportModal from '../../../components/ui/modal/ReportModal';
import {ModalAlertPresent} from '@components/common';
import {ModalPresent} from '@components/common';

const DesignerViewPage = () => {
    const [isModal, setIsModal] = useState(false);
    const [isModal2, setIsModal2] = useState(false);
    const [isModal3, setIsModal3] = useState(false);
    const [sStep , setSearchTab] = useState(0);
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
    const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];
    const moreItems = [
        {
            name: '링크복사',
            onClick: () => {
                setIsModal(true);
            },
        },
        {
            name: '차단하기',
            onClick: () => {
                setIsModal2(true);
            },
        },
        { name: '신고하기',
            onClick: () => {
                setIsModal3(true);
            },
        },
    ];
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
    const cate = [{ name: '카테고리' }, { name: '카테고리' }, { name: '카테고리' }];


  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <div className='viewBox subView'>
                <h2>치자이너 상세</h2>
                <div className='cdInfo office'> {/* Office일 경우 class 추가 */}
                    <div className='back'>
                        <div className='infoD designCase'>
                            <span className='profileImg'>
                                <img src={sampleProfile2} />
                            </span>
                            <div>
                                <strong>우수리 치자이너</strong>
                                <span class="mDRating">
                                    <span><i>평가</i><em>3.5</em></span>
                                    <span>리뷰 수<em>00개</em></span>
                                    <span>거래 총 금액<em>9,000,000,000원</em></span>
                                </span>
                            </div>
                        </div>
                        <p>
                            Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다.<br/>
                            넓은 공간에서 최고의 의료진에게 소중한 치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요!
                        </p>
                    </div>
                    <span className='right'>
                        <Link to='' className='btnL'>프로필 수정하기</Link>
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
                                    <dd className='price'>900,000,000 <i>P(￦)</i> / 900,000 <i>P($)</i></dd>
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
                        <h3>보철 정보</h3>
                        <div className='detail'>
                            <div className='mBack'>
                                <h4><strong>구동 가능한 CAD S/W</strong></h4>
                                <ItemTag items={cadss} className='itemTag' />
                            </div>
                        </div>
                        <div className='detail'>
                            <div className='mBack'>
                                <h4><strong>보철 종류와 그에 따른 수가표</strong></h4>
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
                                                <span className='left'>크라운 &gt; 국소의치 지대치 SCRP <span><em>1,000</em> 원 / <em>0.73</em> 달러</span></span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`${sStep === 2 ? 'listItem on' : 'listItem'}`}>
                                        <strong onClick={() => handleSearchTab(2)}>캡</strong>
                                        <div className='itemData'>
                                            <div>
                                                <ul>
                                                    <li><span>일반 (Hole X)</span></li>
                                                    <li><span>SCRP (Hole O)</span>
                                                    </li>
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
                                                    <li><span>Full</span></li>
                                                    <li><span>Partial</span></li>
                                                    <li className='on'>
                                                        <span>Flipper</span>
                                                        <ol>
                                                            <li><span>1~4 Teeth</span></li>
                                                            <li className='on'>
                                                                <span>5~ Teeth</span>
                                                                <ol>
                                                                    <li><span>One body(Base + Teeth)</span></li>
                                                                    <li className='on'><span>Two body(Base / Teeth)</span></li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ul>
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
                                                        <ol>
                                                            <li className='on'>
                                                                <span>Partial</span>
                                                                <ol>
                                                                    <li className='on'><span>1~3 Holes</span></li>
                                                                    <li><span>4~ Holes</span></li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ul>
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
                            </div>
                        </div>
                        <h3>상세설명</h3>
                        <div className='detail'>
                            <div className='mBack'>
                                <h4><strong>참고사항</strong></h4>
                                <p className='paragraph'>
                                    우수리 치자이너는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다.
                                    넓은 공간에서 최고의 의료진에게 소중한 치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요!
                                </p>
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
                        <div className='btnArea pb0 pcCase'>
                            <BaseButton label={'포트폴리오 3D 뷰어 보기'} className={'btnB'}/>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        {isModal &&
            <ModalAlertPresent >
                <LinkAlert onClose={() => {setIsModal(false)}}/>
            </ModalAlertPresent>
        }
        {isModal2 &&
            <ModalAlertPresent >
                <BlockAlert onClose={() => {setIsModal2(false)}}/>
            </ModalAlertPresent>
        }
        {isModal3 &&
            <ModalPresent >
                <ReportModal onClose={() => {setIsModal3(false)}}/>
            </ModalPresent>
        }
    </>
  );
};

export default DesignerViewPage;
