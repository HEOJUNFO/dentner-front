import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample2.png';
import sampleProfile2 from '@assets/images/sample/sample6.jpeg';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { ItemTag, PostsMore, BaseButton } from '@components/common';
import { SwiperImage, SwiperImageThumbs } from '@components/common/Swiper';


const MyEstimatePage  = () => {
    const infoItems = [{ name: 'EXOCAD'}, { name: '3Shape-2024ver'}];
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
  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <h2>내 견적서</h2>
            <div className='viewBox subView'>
                <div className='tvs'>
                    <article>
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
                            <div className='mBack rowCase'>
                                <h4><strong>납품 가능일</strong></h4>
                                <div className='deliveryDate'>
                                    <span className="time">
                                        2024. 05. 14 <span>18:30</span>
                                    </span>
                                </div>
                            </div>
                            <div className='mBack'>
                                <h4><strong>상세내용</strong></h4>
                                <div className='paragraph'>
                                    이 상세내용은 치자이너가 의뢰인에게 추가로 선택 작성하는 것으로, <br/>
                                    참고로 전달해야할 사항이 있을 시 작성해도 되고 없으면 하지 않아도 된다.
                                </div>
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
                        <h3 className='lineCase'>의뢰인 요청서 정보</h3>
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

export default MyEstimatePage ;
