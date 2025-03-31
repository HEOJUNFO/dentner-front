import React from 'react';
import { Pagenation, BaseInput, ItemTag, BaseButton, } from '@components/common';
import sampleProfile from '@assets/images/sample/sample4.jpeg';
import sampleImg from '@assets/images/sample/sample2.png';

const ReviewMgtPage = () => {
  return (
    <>
        <article>
          <div className='mypageBox'>
            <div className='listTit'>
              <h3>리뷰 관리</h3>
            </div>
            <div className='reviewList'>
              <ul>
                <li>
                  <span className='profileImg'>
                      <img src={sampleProfile} />
                  </span>
                  <div className='back'>
                    <div className='userInfo'>
                      <span className='nick'>
                          <span>치자이너</span>
                          <strong>clwkdlsj</strong>
                      </span>
                      <span className='time'>2024. 05. 14 <span>18:30</span></span>
                    </div>
                    <div className='historyInfo'>
                      <div>
                        <span className='dRating'>
                          <span>
                            <i>평가</i>
                            <em>3.5</em>
                          </span>
                          <strong>괜찮았어요!</strong>
                        </span>
                        <p>
                          Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                          소중한 치아를 믿고 맡겨보세요!
                        </p>
                      </div>
                      <span className='postEdit'>
                          <BaseButton label={'수정'} />
                          <span><BaseButton label={'삭제'} /></span>
                      </span>
                    </div>
                  </div>
                </li>
                <li>
                  <span className='profileImg'>
                      <img src={sampleProfile} />
                  </span>
                  <div className='back'>
                    <div className='userInfo'>
                      <span className='nick'>
                          <span>치자이너</span>
                          <strong>clwkdlsj</strong>
                      </span>
                      <span className='time'>2024. 05. 14 <span>18:30</span></span>
                    </div>
                    <div className='historyInfo'>
                      <div>
                        <span className='dRating'>
                          <span>
                            <i>평가</i>
                            <em>3.5</em>
                          </span>
                          <strong>괜찮았어요!</strong>
                        </span>
                        <p>
                          Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                          소중한 치아를 믿고 맡겨보세요!
                        </p>
                        <ol>
                          <li><img src={sampleImg} /></li>
                          <li><img src={sampleImg} /></li>
                          <li><img src={sampleImg} /></li>
                          <li><img src={sampleImg} /></li>
                          <li><img src={sampleImg} /></li>
                          <li><img src={sampleImg} /></li>
                        </ol>
                      </div>
                      <span className='postEdit'>
                          <BaseButton label={'수정'} />
                          <span><BaseButton label={'삭제'} /></span>
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <Pagenation />
          </div>
        </article>
    </>
  );
};

export default ReviewMgtPage;
