import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample6.jpeg';
import { Link } from 'react-router-dom';
import { Pagenation, PostsMore, ItemTag, BaseButton } from '@components/common';

const DesignerChoicePage = () => {
  const items = [{ name: '지르코니아' }, { name: 'Bar type' }, { name: '투명교정' }, { name: 'Framework' }, { name: 'All on X (Porcelain)' }];
  const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];

  return (
    <>
      <section>
        <h2>치자이너 선택</h2>
        {/* 목록 */}
        <article>
          <div className='listBox dcCase mt30'>
            <div className='listTit pt0'>
              <h3>나에게 견적 보낸 치자이너 (5)</h3>
            </div>
            <div className='searchList choiceCase'>
              <ul>
                <li>
                  <span className='profileImg'>
                    <img src={sampleProfile} />
                  </span>
                  <div className='listD'>
                    <strong>Apple 치카푸카</strong>
                    <span className='dRating'>
                      <span>
                        <i>평가</i>
                        <em>3.5</em>
                      </span>
                      <span>
                        리뷰 수<em>215개</em>
                      </span>
                      <span>거래 총 금액<em>900,000,000P<em>(￦)</em></em><em>900,000P<em>($)</em></em></span>
                    </span>
                    <p>
                      Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                      소중한 치아를 믿고 맡겨보세요!
                    </p>
                    <dl>
                      <dt>보철 종류</dt>
                      <dd>
                        <ItemTag items={items} className='itemTag' />
                      </dd>
                    </dl>
                    <dl>
                      <dt>선호 CAD</dt>
                      <dd>
                        <ItemTag items={cadss} className='itemTag' />
                      </dd>
                    </dl>
                    <div>
                      <span>
                        <Link to='/estimate' className='bEV'>견적서 보기</Link>
                        <Link to='/designerChoiceEnd' className='bDC'>치자이너 선택</Link>
                      </span>
                      <Link className='bMR' to='/designerView'>프로필 상세</Link>
                    </div>
                  </div>
                  <span className='right'>
                    <Link to='' className='btnG'>채팅하기</Link>
                  </span>
                </li>
                <li>
                  <span className='profileImg'>
                    <img src={sampleProfile} />
                  </span>
                  <div className='listD'>
                    <strong>Apple 치카푸카</strong>
                    <span className='dRating'>
                      <span>
                        <i>평가</i>
                        <em>3.5</em>
                      </span>
                      <span>
                        리뷰 수<em>215개</em>
                      </span>
                      <span>거래 총 금액<em>900,000,000P<em>(￦)</em></em><em>900,000P<em>($)</em></em></span>
                    </span>
                    <p>
                      Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                      소중한 치아를 믿고 맡겨보세요!
                    </p>
                    <dl>
                      <dt>보철 종류</dt>
                      <dd>
                        <ItemTag items={items} className='itemTag' />
                      </dd>
                    </dl>
                    <dl>
                      <dt>선호 CAD</dt>
                      <dd>
                        <ItemTag items={cadss} className='itemTag' />
                      </dd>
                    </dl>
                    <div>
                      <span>
                        <Link to='/estimate' className='bEV'>견적서 보기</Link>
                        <Link to='/designerChoiceEnd' className='bDC'>치자이너 선택</Link>
                      </span>
                      <Link className='bMR' to='/designerView'>프로필 상세</Link>
                    </div>
                  </div>
                  <span className='right'>
                    <Link to='' className='btnG'>채팅하기</Link>
                  </span>
                </li>
                <li>
                  <span className='profileImg'>
                    <img src={sampleProfile} />
                  </span>
                  <div className='listD'>
                    <strong>Apple 치카푸카</strong>
                    <span className='dRating'>
                      <span>
                        <i>평가</i>
                        <em>3.5</em>
                      </span>
                      <span>
                        리뷰 수<em>215개</em>
                      </span>
                      <span>거래 총 금액<em>900,000,000P<em>(￦)</em></em><em>900,000P<em>($)</em></em></span>
                    </span>
                    <p>
                      Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                      소중한 치아를 믿고 맡겨보세요!
                    </p>
                    <dl>
                      <dt>보철 종류</dt>
                      <dd>
                        <ItemTag items={items} className='itemTag' />
                      </dd>
                    </dl>
                    <dl>
                      <dt>선호 CAD</dt>
                      <dd>
                        <ItemTag items={cadss} className='itemTag' />
                      </dd>
                    </dl>
                    <div>
                      <span>
                        <Link to='/estimate' className='bEV'>견적서 보기</Link>
                        <Link to='/designerChoiceEnd' className='bDC'>치자이너 선택</Link>
                      </span>
                      <Link className='bMR' to='/designerView'>프로필 상세</Link>
                    </div>
                  </div>
                  <span className='right'>
                    <Link to='' className='btnG'>채팅하기</Link>
                  </span>
                </li>
                <li>
                  <span className='profileImg'>
                    <img src={sampleProfile} />
                  </span>
                  <div className='listD'>
                    <strong>Apple 치카푸카</strong>
                    <span className='dRating'>
                      <span>
                        <i>평가</i>
                        <em>3.5</em>
                      </span>
                      <span>
                        리뷰 수<em>215개</em>
                      </span>
                      <span>거래 총 금액<em>900,000,000P<em>(￦)</em></em><em>900,000P<em>($)</em></em></span>
                    </span>
                    <p>
                      Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                      소중한 치아를 믿고 맡겨보세요!
                    </p>
                    <dl>
                      <dt>보철 종류</dt>
                      <dd>
                        <ItemTag items={items} className='itemTag' />
                      </dd>
                    </dl>
                    <dl>
                      <dt>선호 CAD</dt>
                      <dd>
                        <ItemTag items={cadss} className='itemTag' />
                      </dd>
                    </dl>
                    <div>
                      <span>
                        <Link to='/estimate' className='bEV'>견적서 보기</Link>
                        <Link to='/designerChoiceEnd' className='bDC'>치자이너 선택</Link>
                      </span>
                      <Link className='bMR' to='/designerView'>프로필 상세</Link>
                    </div>
                  </div>
                  <span className='right'>
                    <Link to='' className='btnG'>채팅하기</Link>
                  </span>
                </li>
                <li>
                  <span className='profileImg'>
                    <img src={sampleProfile} />
                  </span>
                  <div className='listD'>
                    <strong>Apple 치카푸카</strong>
                    <span className='dRating'>
                      <span>
                        <i>평가</i>
                        <em>3.5</em>
                      </span>
                      <span>
                        리뷰 수<em>215개</em>
                      </span>
                      <span>거래 총 금액<em>900,000,000P<em>(￦)</em></em><em>900,000P<em>($)</em></em></span>
                    </span>
                    <p>
                      Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                      소중한 치아를 믿고 맡겨보세요!
                    </p>
                    <dl>
                      <dt>보철 종류</dt>
                      <dd>
                        <ItemTag items={items} className='itemTag' />
                      </dd>
                    </dl>
                    <dl>
                      <dt>선호 CAD</dt>
                      <dd>
                        <ItemTag items={cadss} className='itemTag' />
                      </dd>
                    </dl>
                    <div>
                      <span>
                        <Link to='/estimate' className='bEV'>견적서 보기</Link>
                        <Link to='/designerChoiceEnd' className='bDC'>치자이너 선택</Link>
                      </span>
                      <Link className='bMR' to='/designerView'>프로필 상세</Link>
                    </div>
                  </div>
                  <span className='right'>
                    <Link to='' className='btnG'>채팅하기</Link>
                  </span>
                </li>
                {/* <li className='noList'>견적 보낸 치자이너가 없습니다.</li> */}
              </ul>
            </div>
            <Pagenation />
          </div>
        </article>
      </section>
    </>
  );
};

export default DesignerChoicePage;
