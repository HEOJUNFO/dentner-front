import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample6.jpeg';
import { Link } from 'react-router-dom';
import { Pagenation, PostsMore, ItemTag } from '@components/common';
import LinkAlert from '../../../components/ui/modal/LinkAlert';
import BlockAlert from '../../../components/ui/modal/BlockAlert';
import ReportModal from '../../../components/ui/modal/ReportModal';
import {ModalAlertPresent} from '@components/common';
import {ModalPresent} from '@components/common';

const DesignerPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const items = [{ name: '지르코니아' }, { name: 'Bar type' }, { name: '투명교정' }, { name: 'Framework' }, { name: 'All on X (Porcelain)' }];
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

  return (
    <>
      <section>
        <h2>치자이너 찾기</h2>
        {/* 검색 */}
        <fieldset className='searchArea designerCase'>
          <div className='searchTab'>
            <button className='on'>분야로 찾기</button>
          </div>
          <div className='searchInput'>
            <div>
              <p>
                원하는 보철 종류를 선택하고, <br />
                <strong>맞춤 치자이너를 찾아보세요!</strong>
              </p>
              <span className='searchSet'>
                <input type='text' className='txt' placeholder='치자이너와 연관된 내용 검색' />
                <input type='submit' value='검색' className='icon' />
              </span>
            </div>
          </div>
          <div className='searchFillter'>
            <div>
              <dl>
                <dt>보철 종류</dt>
                <dd>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>크라운</label>
                  </span>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>캡</label>
                  </span>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>어버트먼트</label>
                  </span>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>인레이/온레이</label>
                  </span>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>의치</label>
                  </span>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>스프린트/서지컬가이드</label>
                  </span>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>개인트레이</label>
                  </span>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>프레임</label>
                  </span>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>교정</label>
                  </span>
                  <span>
                    <input type='radio' name='radio0' />
                    <label>기타</label>
                  </span>
                </dd>
              </dl>
            </div>
          </div>
        </fieldset>
        {/* 목록 */}
        <article>
          <div className='listBox'>
            <div className='listTit searchChoice'>
              <h3>전체 치자이너</h3>
              <div className='sorting'>
                <div className='fillter'>
                  <em>최신순</em>
                  <div>
                    <span>
                      <input type='radio' id='sorting1' name='sorting1' defaultChecked />
                      <label htmlFor='sorting1'>최신순</label>
                    </span>
                    <span>
                      <input type='radio' id='sorting2' name='sorting1' />
                      <label htmlFor='sorting2'>리뷰순</label>
                    </span>
                    <span>
                      <input type='radio' id='sorting3' name='sorting1' />
                      <label htmlFor='sorting3'>평점순</label>
                    </span>
                    <span>
                      <input type='radio' id='sorting4' name='sorting1' />
                      <label htmlFor='sorting4'>거래 총 금액순</label>
                    </span>
                  </div>
                </div>
                <span className='onlyCheck'>
                  <input type='checkbox' id='sorting5' />
                  <label htmlFor='sorting5'>관심 치자이너</label>
                </span>
              </div>
            </div>
            <div className='searchList'>
              <ul className='office'>
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
                      <span>
                        거래 총 금액<em>900,000,000P<em>(￦)</em></em><em>900,000P<em>($)</em></em>
                      </span>
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
                    <div className='designerPF'>
                      <Link className='bMR' to='/designerView'>프로필 상세</Link>
                    </div>
                  </div>
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
                      <span>
                        거래 총 금액<em>900,000,000P<em>(￦)</em></em><em>900,000P<em>($)</em></em>
                      </span>
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
                    <div className='designerPF'>
                      <Link className='bMR' to='/designerView'>프로필 상세</Link>
                    </div>
                  </div>
                  <span className='right'>
                    <PostsMore items={moreItems} />
                  </span>
                </li>
                <li className='noList search'>검색 결과가 없습니다.</li>
                <li className='noList'>관심 치자이너가 없습니다.</li>
              </ul>
            </div>
            <Pagenation />
          </div>
        </article>
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

export default DesignerPage;
