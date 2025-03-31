import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample3.png';
import sampleProfile2 from '@assets/images/sample/sample2.png';
import sampleProfile3 from '@assets/images/sample/sample6.jpeg';
import { Link } from 'react-router-dom';
import { ItemTag, PostsMore } from '@components/common';
import { SwiperImage, SwiperImageThumbs } from '@components/common/Swiper';
import LinkAlert from '../../../components/ui/modal/LinkAlert';
import BlockAlert from '../../../components/ui/modal/BlockAlert';
import ReportModal from '../../../components/ui/modal/ReportModal';
import {ModalAlertPresent} from '@components/common';
import {ModalPresent} from '@components/common';

const CenterViewPage = () => {
    const [isModal, setIsModal] = useState(false);
    const [isModal2, setIsModal2] = useState(false);
    const [isModal3, setIsModal3] = useState(false);
    const items = [{ name: '지르코니아' }, { name: 'Bar type' }, { name: '투명교정' }, { name: 'Framework' }, { name: 'All on X (Porcelain)' }];
    const [thumbsSwiper, setThumbsSwiper] = useState();
    const img_file_list = [{ file_path: sampleProfile2}, { file_path: sampleProfile3}, { file_path: sampleProfile2}, { file_path: sampleProfile3}, { file_path: sampleProfile2}, { file_path: sampleProfile3}];
    const img_file_list2 = [{ file_path: ''}, { file_path: ''}, { file_path: ''}, { file_path: ''}, { file_path: ''}, { file_path: ''}];
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

  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <div className='viewBox subView'>
                <h2>치과기공소 상세</h2>
                <div className='cdInfo office'> {/* Office일 경우 class 추가 */}
                    <div className='back'>
                        <div className='infoD'>
                            <span className='profileImg'>
                                <img src={sampleProfile2} />
                            </span>
                            <div>
                                <strong>Apple 치카푸카</strong>
                                <span className='mLocal'>부산/울산/경남</span>
                            </div>
                        </div>
                        <p>
                            Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다.
                            넓은 공간에서 최고의 의료진에게 소중한 치아를 믿고 맡겨보세요!
                        </p>
                        <span className='mSkills'><ItemTag items={items} className='itemTag' /></span>
                    </div>
                    <span className='right'>
                        <PostsMore items={moreItems} />
                    </span>
                </div>
                <div className='tvs'>
                    <article>
                        <div className='cdSummery'>
                            <strong className='mTit'>상세내용</strong>
                            <div className='centerCase'>
                                <dl>
                                    <dt>지역</dt>
                                    <dd>부산/울산/경남</dd>
                                </dl>
                                <dl>
                                    <dt>사업자명</dt>
                                    <dd>김치카푸카</dd>
                                </dl>
                                <dl>
                                    <dt>사업자 주소</dt>
                                    <dd>서울 금천구 디지털로 121, 에이스가산타워 3층, 307호</dd>
                                </dl>
                                <dl>
                                    <dt>치과기공사 수</dt>
                                    <dd>20인 이상</dd>
                                </dl>
                                <dl>
                                    <dt>설립연도</dt>
                                    <dd>2000년</dd>
                                </dl>
                            </div>
                        </div>
                        <div className='detail'>
                            <div className='mBack notM'>
                                <h4><strong>보철 종류</strong></h4>
                                <ItemTag items={items} className='itemTag' />
                            </div>
                            <div className='mBack'>
                                <h4><strong>회사 소개</strong></h4>
                                <p className='paragraph'>
                                    우수리 치자이너는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다.
                                    넓은 공간에서 최고의 의료진에게 소중한 치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요!치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요! 치아를 믿고 맡겨보세요!
                                </p>
                            </div>
                            <div className='mBack'>
                                <h4><strong>포트폴리오</strong></h4>
                                <div className='portfolioImg'>
                                    <div className='pfMainSwiper'>
                                        {/* <SwiperImage
                                            items={img_file_list.map((el, idx) => {
                                            return (
                                                <img key={`${idx}pimgSet`} src={el.file_path} />
                                            );
                                            })}
                                            thumbsSwiper={thumbsSwiper}
                                            pagination={true}
                                        /> */}
                                        <p className='noList image'>등록한 이미지가 없습니다.</p>
                                    </div>
                                    <div className='pfThumbsSwiper'>
                                        <SwiperImageThumbs
                                        space={0}
                                        items={img_file_list2.map((el, idx) => {
                                            // return <span><img key={`${idx}SwiperImageThumbs`} src={el.file_path} /></span>;
                                            return <span key={`${idx}SwiperImageThumbs`}></span>;
                                        })}
                                        perview={'auto'}
                                        setThumbsSwiper={setThumbsSwiper}
                                        navigation={true}
                                        />
                                    </div>
                                </div>
                            </div>
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

export default CenterViewPage;
