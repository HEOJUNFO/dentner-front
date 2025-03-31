import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseSelect, ItemTag, BaseButton } from '@components/common';
import ItemTypeModal from '@components/ui/modal/ItemTypeModal';
import { ModalPresent } from '@components/common';

const RequestOpenPage = () => {
  const [isModal, setIsModal] = useState(false);
  const stss = [
    { name: '진행상태 전체', value: 0 },
    { name: '견적 요청중', value: 1 },
    { name: '거래중', value: 2 },
    { name: '거래완료', value: 3 },
  ];
  const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];

  return (
    <>
      <article>
        {/* 필터 */}
        <div className="reQuestSorting">
          <span>
            <input type="radio" id="sorting001" name="sorting0" />
            <label htmlFor="sorting001">크라운</label>
          </span>
          <span>
            <input type="radio" id="sorting002" name="sorting0" />
            <label htmlFor="sorting002">캡</label>
          </span>
          <span>
            <input type="radio" id="sorting003" name="sorting0" />
            <label htmlFor="sorting003">어버트먼트</label>
          </span>
          <span>
            <input type="radio" id="sorting004" name="sorting0" />
            <label htmlFor="sorting004">인레이/온레이</label>
          </span>
          <span>
            <input type="radio" id="sorting005" name="sorting0" />
            <label htmlFor="sorting005">의치</label>
          </span>
          <span>
            <input type="radio" id="sorting006" name="sorting0" />
            <label htmlFor="sorting006">스프린트/서지컬가이드</label>
          </span>
          <span>
            <input type="radio" id="sorting007" name="sorting0" />
            <label htmlFor="sorting007">개인트레이</label>
          </span>
          <span>
            <input type="radio" id="sorting008" name="sorting0" />
            <label htmlFor="sorting008">프레임</label>
          </span>
          <span>
            <input type="radio" id="sorting009" name="sorting0" />
            <label htmlFor="sorting009">교정</label>
          </span>
          <span>
            <input type="radio" id="sorting010" name="sorting0" />
            <label htmlFor="sorting010">기타</label>
          </span>
        </div>
        {/* 목록 */}
        <div className="listBox">
          <div className="listTit keyword reqOpen">
            <BaseSelect items={stss} placeholder={'진행상태 전체'} onChange={(e) => console.log(e)} />
            <div className='right sortingSet'>
              <span className='sArea'>
                <span className="searchSet mini">
                  <input type="text" className="txt" placeholder="요청서와 연관된 내용 검색" />
                  <input type="submit" value="검색" className="icon" />
                </span>
                <span className="sorting">
                  <span className='myPost'>
                    <input type="checkbox" id="sorting2" />
                    <label htmlFor="sorting2">내 요청글만 보기</label>
                  </span>
                  <div className='fillter'>
                    <em>최신순</em>
                    <div>
                      <span>
                        <input type="radio" id="sorting1" name="sorting1" defaultChecked />
                        <label htmlFor="sorting1">최신순</label>
                      </span>
                      <span>
                        <input type="radio" id="sorting3" name="sorting1" />
                        <label htmlFor="sorting3">오래된 순</label>
                      </span>
                    </div>
                  </div>
                </span>
              </span>
            </div>
          </div>
          <div className="requesrList">
            <ul>
              <li>
                <div className="stsSum">
                  <span>
                    <strong className="iSts">견적 요청중</strong>
                    <span className="reQNum">
                      <i>견적서</i>
                      <strong>3</strong>
                    </span>
                  </span>
                  <strong className="time">
                    2024. 05. 14 <strong>18:30</strong>
                  </strong>
                </div>
                <div className="listDt">
                  <div className="left">
                    <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라 (의뢰자시점)</strong>
                    <span>덴**</span>
                    <ItemTag items={cadss} className="itemTag" />
                    <dl className="deadlineSet">
                      <dt>
                        <em>견적요청 만료일</em>
                      </dt>
                      <dd>
                        <span className="time">
                          2024. 05. 14 <span>18:30</span>
                        </span>
                      </dd>
                      <dt>
                        <em>납품 마감일</em>
                      </dt>
                      <dd>
                        <span className="time">
                          2024. 05. 14 <span>18:30</span>
                        </span>
                      </dd>
                    </dl>
                  </div>
                  <div className="right">
                    <BaseButton label={'보철종류 보기'} className={'bIT'} onClick={() => setIsModal(true)} />
                    <Link className="bMR" to="/requestView">
                      <span><em>더</em> 자세히보기</span>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="stsSum">
                  <span>
                    <strong className="iSts ing">거래중</strong>
                    <span className="reQNum">
                      <i>견적서</i>
                      <strong>3</strong>
                    </span>
                  </span>
                  <strong className="time">
                    2024. 05. 14 <strong>18:30</strong>
                  </strong>
                </div>
                <div className="listDt">
                  <div className="left">
                    <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라 (다른의뢰자시점)</strong>
                    <span>덴**</span>
                    <ItemTag items={cadss} className="itemTag" />
                    <dl className="deadlineSet">
                      <dt>
                        <em>견적요청 만료일</em>
                      </dt>
                      <dd>
                        <span className="time">
                          2024. 05. 14 <span>18:30</span>
                        </span>
                      </dd>
                      <dt>
                        <em>납품 마감일</em>
                      </dt>
                      <dd>
                        <span className="time">
                          2024. 05. 14 <span>18:30</span>
                        </span>
                      </dd>
                    </dl>
                  </div>
                  <div className="right">
                    <BaseButton label={'보철종류 보기'} className={'bIT'} onClick={() => setIsModal(true)} />
                    <Link className="bMR" to="/requestView3">
                      <span><em>더</em> 자세히보기</span>
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <div className="stsSum">
                  <span>
                    <strong className="iSts end">거래완료</strong>
                    <span className="reQNum">
                      <i>견적서</i>
                      <strong>3</strong>
                    </span>
                  </span>
                  <strong className="time">
                    2024. 05. 14 <strong>18:30</strong>
                  </strong>
                </div>
                <div className="listDt">
                  <div className="left">
                    <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라 (치자이너시점)</strong>
                    <span>덴**</span>
                    <ItemTag items={cadss} className="itemTag" />
                    <dl className="deadlineSet">
                      <dt>
                        <em>견적요청 만료일</em>
                      </dt>
                      <dd>
                        <span className="time">
                          2024. 05. 14 <span>18:30</span>
                        </span>
                      </dd>
                      <dt>
                        <em>납품 마감일</em>
                      </dt>
                      <dd>
                        <span className="time">
                          2024. 05. 14 <span>18:30</span>
                        </span>
                      </dd>
                    </dl>
                  </div>
                  <div className="right">
                    <BaseButton label={'보철종류 보기'} className={'bIT'} onClick={() => setIsModal(true)} />
                    <Link className="bMR" to="/requestView4">
                      <span><em>더</em> 자세히보기</span>
                    </Link>
                  </div>
                </div>
              </li>
              <li className="noList search">검색 결과가 없습니다.</li>
              <li className="noList">등록된 목록이 없습니다.</li>
            </ul>
          </div>
          <Pagenation />
        </div>
      </article>
      {isModal && (
        <ModalPresent>
          <ItemTypeModal
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default RequestOpenPage;
