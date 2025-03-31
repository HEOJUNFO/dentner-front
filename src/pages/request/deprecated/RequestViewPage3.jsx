import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import sampleProfile2 from '@assets/images/sample/sample4.jpeg';
import { Link } from 'react-router-dom';
import { ItemTag, CategoryTag, BaseButton } from '@components/common';

const RequestViewPage = () => {
    const items = [{ name: 'EXOCAD' }, { name: '3Shape (2024)' }];
    const infoItems = [{ name: '[Zirconia]' }];
    const categorys = [{ name: '크라운' }, { name: '어비트먼트' }];
  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <div className='viewBox'>
                <h2>요청서 상세</h2>
                <div className='reQInfo'>
                    <div className='stsSum'>
                        <span>
                            <strong className='iSts'>견적 요청중</strong>
                            <span className='reQNum'><i>견적서</i><strong>3</strong></span>
                        </span>
                        <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                    </div>
                    <div>
                        <strong>
                            크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라
                        </strong>
                        <span className='postEdit'>
                            <BaseButton label={'신고하기'} className={'bRP'} />
                        </span>
                    </div>
                </div>
                <div className='tvs'>
                    <article>
                        <div className='reQSummery'>
                            <div className='order'>
                                <span className='back'>
                                    <span className='profileImg'>
                                        <img src={sampleProfile} />
                                    </span>
                                    <span className='nick'>
                                        <strong>선미니</strong>
                                        <ItemTag items={items} className='itemTag' />
                                    </span>
                                </span>
                                <Link to='' className='btnB'>프로필 보기</Link>
                            </div>
                            <div className='deadline'>
                                <span>
                                    <em>견적요청 만료일</em>
                                    <strong className='time'>2024. 05. 30 <strong>18:30</strong></strong>
                                </span>
                                <span>
                                    <em>납품 마감일</em>
                                    <strong className='time'>2024. 06. 30 <strong>18:30</strong></strong>
                                </span>
                            </div>
                        </div>
                        <div className='detail'>
                            <h4><strong>카테고리</strong></h4>
                            <div>
                                <CategoryTag items={categorys} />
                            </div>
                            <h4><strong>보철종류/수량</strong></h4>
                            <div className='itemList'>
                                <div><strong><strong>크라운 &gt; </strong>Zirconia &gt; 일반 (Hole X)</strong> <em>4개</em></div>
                                <div><strong><strong>스프린트/서지컬가이드 &gt; </strong>Surgical Guide &gt; Partital &gt; 1~3 Holes</strong> <em>4개</em></div>
                            </div>
                        </div>
                        <div className='detail'>
                            <h4><strong>요청사항</strong></h4>
                            <div className='paragraph'>
                                대통령은 국가의 독립·영토의 보전·국가의 계속성과 헌법을 수호할 책무를 진다.<br/>
                                선거에 있어서 최고득표자가 2인 이상인 때에는 국회의 재적의원 과반수가 출석한 공개회의에서 다수표를 얻은 자를 당선자로 한다.<br/>
                                정부는 예산에 변경을 가할 필요가 있을 때에는 추가경정예산안을 편성하여 국회에 제출할 수 있다.<br/>
                                탄핵소추의 의결을 받은 자는 탄핵심판이 있을 때까지 그 권한행사가 정지된다.<br/><br/>
                                모든 국민은 행위시의 법률에 의하여 범죄를 구성하지 아니하는 행위로 소추되지 아니하며, 동일한 범죄에 대하여 거듭 처벌받지 아니한다.<br/>
                                국회의원의 수는 법률로 정하되, 200인 이상으로 한다. 대통령은 취임에 즈음하여 다음의 선서를 한다.<br/>
                                국가의 세입·세출의 결산, 국가 및 법률이 정한 단체의 회계검사와 행정기관 및 공무원의 직무에 관한 감찰을 하기 위하여
                                헌법개정은 국회재적의원 과반수 또는 대통령의 발의로 제안된다.
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </>
  );
};

export default RequestViewPage;
