import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample3.png';
import { Link } from 'react-router-dom';
import { Pagenation, ItemTag, PostsMore } from '@components/common';
import LinkAlert from '../../components/ui/modal/LinkAlert';
import BlockAlert from '../../components/ui/modal/BlockAlert';
import ReportModal from '../../components/ui/modal/ReportModal';
import {ModalAlertPresent} from '@components/common';
import {ModalPresent} from '@components/common';

const CenterPage = () => {
  const [sStep, setSearchTab] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [dmoreVisible, setDmoreVisible] = useState(false);
  const handleSearchTab = (sStep) => {
    setSearchTab(sStep);
  };
  const items = [{ name: '지르코니아' }, { name: 'Bar type' }, { name: '투명교정' }, { name: 'Framework' }, { name: 'All on X (Porcelain)' }];
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
        <h2>치과기공소 찾기</h2>
        {/* 검색 */}
        <fieldset className='searchArea'>
          <div className='searchTab'>
            <button className={`${sStep === 1 ? 'on' : ''}`} onClick={() => handleSearchTab(1)}>
              분야로 찾기
            </button>
            <button className={`${sStep === 2 ? 'on' : ''}`} onClick={() => handleSearchTab(2)}>
              지역으로 찾기
            </button>
          </div>
          <div className='searchInput'>
            <div>
              <p>
                최대 4가지 항목을 선택하고, <br />
                <strong>맞춤 치과기공소를 찾아보세요!</strong>
              </p>
              <span className='searchSet'>
                <input type='text' className='txt' placeholder='치과기공소와 연관된 내용 검색' />
                <input type='submit' value='검색' className='icon' />
              </span>
            </div>
          </div>
          <div className='searchFillter'>
            {sStep === 1 && (
              <div>
                <dl>
                  <dt>고정성 보철물</dt>
                  <dd>
                    <span>
                      <input type='radio' name='radio0' />
                      <label>모델리스</label>
                    </span>
                    <span>
                      <input type='radio' name='radio0' />
                      <label>지르코니아</label>
                    </span>
                    <span>
                      <input type='radio' name='radio0' />
                      <label>PFM(PFZ)</label>
                    </span>
                    <span>
                      <input type='radio' name='radio0' />
                      <label>커스텀 어버트먼트</label>
                    </span>
                    <span>
                      <input type='radio' name='radio0' />
                      <label>Gold&#40;Metal&#41; Crown</label>
                    </span>
                    <span>
                      <input type='radio' name='radio0' />
                      <label>Surveyed Crown</label>
                    </span>
                    <span>
                      <input type='radio' name='radio0' />
                      <label>기타</label>
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt>가철성 보철물</dt>
                  <dd>
                    <span>
                      <input type='radio' name='radio1' />
                      <label>Framework</label>
                    </span>
                    <span>
                      <input type='radio' name='radio1' />
                      <label>배열&큐어링</label>
                    </span>
                    <span>
                      <input type='radio' name='radio1' />
                      <label>Flexible Denture</label>
                    </span>
                    <span>
                      <input type='radio' name='radio1' />
                      <label>BPS</label>
                    </span>
                    <span>
                      <input type='radio' name='radio1' />
                      <label>Bar type</label>
                    </span>
                    <span>
                      <input type='radio' name='radio1' />
                      <label>Telescopic</label>
                    </span>
                    <span>
                      <input type='radio' name='radio1' />
                      <label>Attachment</label>
                    </span>
                    <span>
                      <input type='radio' name='radio1' />
                      <label>기타</label>
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt>교정</dt>
                  <dd>
                    <span>
                      <input type='radio' name='radio2' />
                      <label>장치</label>
                    </span>
                    <span>
                      <input type='radio' name='radio2' />
                      <label>투명교정</label>
                    </span>
                    <span>
                      <input type='radio' name='radio2' />
                      <label>스프린트</label>
                    </span>
                  </dd>
                </dl>
                <dl>
                  <dt>All on X</dt>
                  <dd>
                    <span>
                      <input type='radio' name='radio3' />
                      <label>All on X &#40;Zirconia&#41;</label>
                    </span>
                    <span>
                      <input type='radio' name='radio3' />
                      <label>All on X &#40;Porcelain&#41;</label>
                    </span>
                    <span>
                      <input type='radio' name='radio3' />
                      <label>All on X &#40;Denture&#41;</label>
                    </span>
                  </dd>
                </dl>
              </div>
            )}
            {sStep === 2 && (
              <div>
                <dl>
                  <dt>지역</dt>
                  <dd className='local'>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>서울</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>인천/부천</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>경기</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>춘천/강원</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>청주/충북</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>대전/충남/세종</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>전주/전북</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>광주/전남</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>대구/경북</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>부산/울산/경남</label>
                    </span>
                    <span>
                      <input type='radio' name='radio4' />
                      <label>제주</label>
                    </span>
                  </dd>
                </dl>
              </div>
            )}
          </div>
        </fieldset>
        {/* 목록 */}
        <article>
          <div className='listBox'>
            <div className='listTit searchChoice'>
              <h3>전체 치과기공소</h3>
              <div className='sorting'>
                <span>
                  <input type='radio' id='sorting1' name='sorting1' defaultChecked />
                  <label htmlFor='sorting1'>최신순</label>
                </span>
                <span>
                  <input type='radio' id='sorting2' name='sorting1' />
                  <label htmlFor='sorting2'>관심 치과기공소</label>
                </span>
              </div>
            </div>
            <div className='searchList'>
              <ul>
                <li>
                  <span className='profileImg'>
                    <img src={sampleProfile} />
                  </span>
                  <div className='listD'>
                    <strong>Apple 치카푸카</strong>
                    <span className='localTag'>
                      <em>대전</em>
                      <em>충남</em>
                      <em>세종</em>
                    </span>
                    <p>
                      Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
                      소중한 치아를 믿고 맡겨보세요!
                    </p>
                    <ItemTag items={items} className='itemTag' />
                    <div>
                      <Link className='bCG'>채팅하기</Link>
                      <Link className='bMR' to='/centerView'><span><em>더</em> 자세히보기</span></Link>
                    </div>
                  </div>
                  <span className='right'>
                    <input type='checkbox' className='likeSet' />
                    <PostsMore items={moreItems} />
                  </span>
                </li>
                <li className='noList search'>검색 결과가 없습니다.</li>
                <li className='noList'>관심 치과기공소가 없습니다.</li>
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

export default CenterPage;
