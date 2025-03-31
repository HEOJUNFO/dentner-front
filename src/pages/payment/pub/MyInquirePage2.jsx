import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ItemTag, PostsMore, BaseButton, CategoryTag } from '@components/common';

const MyInquirePage  = () => {
    const infoItems = [{ name: '의뢰서 a'}];
    const categorys = [{ name: '@8321430183048173057' }];
    const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];
    const kind = [{ name: 'Milling [Zirconia]' }];
    const numVal = [{ name: '디자이너 수치값 사용' }];
  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <h2>내 의뢰서 정보</h2>
            <div className='inquireTab viewCase'>
                <nav>
                    <ul>
                        <li className='on'>
                            <span>의뢰서 <em>a</em></span>
                        </li>
                        <li>
                            <span>의뢰서 <em>b</em></span> {/* span 영역을 클릭 시 li on class 추가 */}
                        </li>
                        <li>
                            <span>의뢰서 <em>c</em></span>
                        </li>
                        <li>
                            <span>의뢰서 <em>d</em></span>
                        </li>
                        <li>
                            <span>의뢰서 <em>e</em></span>
                        </li>
                        <li>
                            <span>의뢰서 <em>f</em></span>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='viewBox inquireBox'>
                <div className='tvs inqDCase'>
                    <article>
                        <div className='detail'>
                            <span className="postEdit">
                                <Link to="">수정</Link>
                                <span>
                                    <BaseButton label={'삭제'} />
                                </span>
                            </span>
                            <h4><strong>의뢰번호</strong></h4>
                            <div>
                                <CategoryTag items={categorys} />
                            </div>
                            <h4><strong>보철종류/수량</strong></h4>
                            <div className='itemList'>
                                <div><strong><strong>크라운 &gt; </strong>Zirconia &gt; 일반 (Hole X)</strong> <em>4개</em></div>
                                <div><strong><strong>스프린트/서지컬가이드 &gt; </strong>Surgical Guide &gt; Partital &gt; 1~3 Holes</strong> <em>4개</em></div>
                            </div>
                            <h4><strong>선택된 치식</strong></h4>
                            <div className="dUnitSet">
                                <span className="dUnit">
                                    개별 <strong>26</strong>
                                </span>
                                <span className="dUnit">
                                    개별 <strong>33</strong>
                                </span>
                                <span className="dUnit">
                                    브릿지 <strong>33~34</strong>
                                </span>
                                <span className="dUnit">
                                    (상악)묶음 <strong>26,27,28</strong>
                                </span>
                                <span className="dUnit">
                                    (하악)묶음 <strong>26~33</strong>
                                </span>
                            </div>
                            <h4><strong>가공방법</strong></h4>
                            <div>
                                <ItemTag items={kind} className='itemTag sm' />
                            </div>
                            <h4><strong>수치값</strong></h4>
                            <div>
                                <ItemTag items={numVal} className='itemTag category sm' />
                            </div>
                            <h4><strong>Pontic 디자인</strong></h4>
                            <div className="pontic vCase">
                                <span className="radioSet d1">
                                    <label htmlFor="radio1">Saddle pontic</label>
                                </span>
                                {/* <span className="radioSet d2">
                                    <label htmlFor="radio2">Ridge lap pontic</label>
                                </span>
                                <span className="radioSet d3">
                                    <label htmlFor="radio3">Modified ridge<br />lap pontic</label>
                                </span> 
                                <span className="radioSet d4">
                                    <label htmlFor="radio4">Ovate pontic</label>
                                </span>
                                <span className="radioSet d5">
                                    <label htmlFor="radio5">Conical pontic</label>
                                </span>
                                <span className="radioSet d6">
                                    <label htmlFor="radio5">Spheroidal pontic</label>
                                </span> */}
                            </div>
                            <h4><strong>선호 CAD S/W</strong></h4>
                            <div>
                                <ItemTag items={cadss} className='itemTag' />
                            </div>
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
                            <h4><strong>첨부파일</strong></h4>
                            <div className='fileSet'>
                                <ul className='mt0'>
                                    <li>
                                        <span className='fileLoad'>
                                            <span>
                                                환자8337_스캔 파일.zip
                                                <em>328.36 mb</em>
                                            </span>
                                            <button className='bFD'>Download</button>
                                        </span>
                                    </li>
                                    <li>
                                        <span className='fileLoad'>
                                            <span>
                                                환자8337_스캔 파일.zip
                                                <em>328.36 mb</em>
                                            </span>
                                            <button className='bFD'>Download</button>
                                        </span>
                                    </li>
                                </ul>
                                <div className='allDownload'>
                                    <BaseButton label={'첨부파일 전체 다운로드'} className={'btnG'} />
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    </>
  );
};

export default MyInquirePage ;
