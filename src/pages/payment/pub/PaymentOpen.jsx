import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, ItemTag, BaseButton } from '@components/common';
import CancelModal from '../../../components/ui/modal/CancelModal';
import CancelCallModal from '../../../components/ui/modal/CancelCallModal';
import ReportModal from '../../../components/ui/modal/ReportModal';
import { ModalPresent } from '@components/common';
import sampleProfile2 from '@assets/images/sample/sample4.jpeg';

const PaymentTotalPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const stss = [
    { name: '진행상태 전체', value: 0 },
    { name: '견적 요청중', value: 1 },
    { name: '치자이너 선택중', value: 2 },
    { name: '거래중', value: 3 },
    { name: '거래완료', value: 4 },
    { name: '거래취소', value: 5 },
    { name: '거래취소 승인 대기중', value: 6 },
    { name: '요청마감', value: 7 },
  ];
  const tems = [
    { name: '전체', value: 0 },
    { name: '1개월', value: 1 },
    { name: '3개월', value: 2 },
    { name: '6개월', value: 3 },
    { name: '1년', value: 4 },
    { name: '기간 지정', value: 5 },
  ];

  return (
    <>
      <article>
        {/* 목록 */}
        <div className="listBox">
          <div className="listTit paymentCase">
            <BaseSelect items={stss} placeholder={'진행상태 전체'} onChange={(e) => console.log(e)} />
            <div className="right sortingSet">
              <span className="sArea">
                <BaseSelect items={tems} placeholder={'전체'} onChange={(e) => console.log(e)} />
                <BaseInput type="text" value={'2023-05-01 ~ 2023-05-07'} />
                <BaseButton label={'검색'} className={'btnB ss'} />
              </span>
            </div>
          </div>
          <div className="paymentList">
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
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                </div>
                {/* 20240804 모바일 대응을 위한 구조 변경 */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress">
                          <div>
                            <span style={{ width: '5%' }}></span>
                          </div>
                          <ol>
                            <li className="on">견적 요청</li> {/* 5% */}
                            <li>치자이너 선택</li> {/* 37% */}
                            <li>거래중</li> {/* 67% */}
                            <li>거래완료</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="guide">
                              💬
                            </span>
                            견적을 요청하고 있어요 ...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet mReact notDesign">
                    {' '}
                    {/* 디자인 확정 전 */}
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/* end 20240804 */}
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                  <BaseButton label={'거래취소'} className={'btnW'} onClick={() => setIsModal(true)} />
                </div>
              </li>
              <li>
                <div className="stsSum">
                  <span>
                    <strong className="iSts select">치자이너 선택중</strong>
                    <span className="reQNum">
                      <i>견적서</i>
                      <strong>3</strong>
                    </span>
                  </span>
                  <strong className="time">
                    2024. 05. 14 <strong>18:30</strong>
                  </strong>
                </div>
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                </div>
                {/*  */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress">
                          <div>
                            <span style={{ width: '37%' }}></span>
                          </div>
                          <ol>
                            <li>견적 요청</li> {/* 5% */}
                            <li className="on">치자이너 선택</li> {/* 37% */}
                            <li>거래중</li> {/* 67% */}
                            <li>거래완료</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="technologist">
                              🧑🏻‍💻
                            </span>
                            견적이 도착했어요! 치자이너를 선택해주세요.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet mReact notDesign">
                    {' '}
                    {/* 디자인 확정 전 */}
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/*  */}
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                  <BaseButton label={'거래취소'} className={'btnW'} onClick={() => setIsModal(true)} />
                </div>
                <div className="btnArea">
                  <Link to="/designerChoice" className="btnB">
                    치자이너 선택
                  </Link>
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
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                </div>
                {/*  */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="choiceDt">
                      <div className="left">
                        <span className="profileSet">
                          <span className="profileImg">
                            <img src={sampleProfile2} />
                          </span>
                          <span className="nick">
                            <span>치자이너</span>
                            <strong>clwkdlsj</strong>
                          </span>
                        </span>
                        <span className="mileage">
                          <label>예상 결제 마일리지</label>
                          <strong>
                            <strong>-30,000</strong>P(￦)
                          </strong>
                        </span>
                      </div>
                      <div>
                        <span className="postEdit">
                          <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)} />
                          <span>
                            <Link to="/designerChoiceEnd">치자이너 견적 리스트</Link>
                          </span>
                        </span>
                        <span className="twinBtn small">
                          <BaseButton label={'프로필 보기'} className="mShort" />
                          <span>
                            <BaseButton label={'채팅하기'} />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress">
                          <div>
                            <span style={{ width: '67%' }}></span>
                          </div>
                          <ol>
                            <li>견적 요청</li> {/* 5% */}
                            <li>치자이너 선택</li> {/* 37% */}
                            <li className="on">거래중</li> {/* 67% */}
                            <li>거래완료</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="sparkles">
                              ✨️
                            </span>
                            거래가 진행되고 있어요! 전자계약서를 작성하고 결제를 진행해주세요.
                          </p>
                        </div>
                      </div>
                      <div className="detailStep">
                        <button className="bDSToggle">거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                        <ol>
                          <li className="end">
                            <em>1</em>
                            <span>견적서</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="ing">
                            <em>2</em>
                            <span>의뢰서 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>3</em>
                            <span>의뢰서 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>4</em>
                            <span>3D 뷰어 소통</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>5</em>
                            <span>CAD파일 업로드</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>6</em>
                            <span>추가금 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>7</em>
                            <span>CAD파일 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>8</em>
                            <span>리뷰작성</span>
                            <Link to="">상세보기</Link>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet mReact">
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/*  */}
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                  <BaseButton label={'거래취소 요청'} className={'btnW'} onClick={() => setIsModal2(true)} />
                </div>
                <div className="btnArea">
                  <Link to="/paymentView" className="btnB">
                    전자계약하고 결제하기
                  </Link>
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
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                </div>
                {/*  */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="choiceDt">
                      <div className="left">
                        <span className="profileSet">
                          <span className="profileImg">
                            <img src={sampleProfile2} />
                          </span>
                          <span className="nick">
                            <span>치자이너</span>
                            <strong>clwkdlsj</strong>
                          </span>
                        </span>
                        <span className="mileage">
                          <label>결제 완료 마일리지</label>
                          <strong>
                            <strong>-30,000</strong>P(￦)
                          </strong>
                        </span>
                      </div>
                      <div>
                        <span className="postEdit">
                          <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)} />
                          <span>
                            <Link to="/designerChoiceEnd">치자이너 견적 리스트</Link>
                          </span>
                        </span>
                        <span className="twinBtn small">
                          <BaseButton label={'프로필 보기'} className="mShort" />
                          <span>
                            <BaseButton label={'채팅하기'} />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress">
                          <div>
                            <span style={{ width: '67%' }}></span>
                          </div>
                          <ol>
                            <li>견적 요청</li> {/* 5% */}
                            <li>치자이너 선택</li> {/* 37% */}
                            <li className="on">거래중</li> {/* 67% */}
                            <li>거래완료</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="payment">
                              💳️
                            </span>
                            치자이너가 추가금을 요청했어요. 추가금 요청사유를 확인하고, 결제를 진행해주세요!
                          </p>
                        </div>
                      </div>
                      <div className="detailStep">
                        <button className="bDSToggle">거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                        <ol>
                          <li className="end">
                            <em>1</em>
                            <span>견적서</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>2</em>
                            <span>의뢰서 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>3</em>
                            <span>의뢰서 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>4</em>
                            <span>3D 뷰어 소통</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>5</em>
                            <span>CAD파일 업로드</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="ing">
                            <em>6</em>
                            <span>추가금 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>7</em>
                            <span>CAD파일 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>8</em>
                            <span>리뷰작성</span>
                            <Link to="">상세보기</Link>
                          </li>
                        </ol>
                      </div>
                      <div className="addData">
                        <dl>
                          <dt>추가금 요청내역</dt>
                          <dd className="txt">
                            <span>추가금 요청사유</span>
                            <p>이러저러한 이유로 인해 추가금을 요청함</p>
                          </dd>
                          <dd>
                            <span className="time">
                              2024. 05. 20 <span>14:30</span>
                            </span>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet mReact">
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/*  */}
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                </div>
                <div className="btnArea">
                  <Link to="/paymentAddView" className="btnB">
                    추가금 결제하기
                  </Link>
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
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                </div>
                {/*  */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="choiceDt">
                      <div className="left">
                        <span className="profileSet">
                          <span className="profileImg">
                            <img src={sampleProfile2} />
                          </span>
                          <span className="nick">
                            <span>치자이너</span>
                            <strong>clwkdlsj</strong>
                          </span>
                        </span>
                        <span className="mileage">
                          <label>결제 완료 마일리지</label>
                          <strong>
                            <strong>-30,000</strong>P(￦)
                          </strong>
                        </span>
                      </div>
                      <div>
                        <span className="postEdit">
                          <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)} />
                          <span>
                            <Link to="/designerChoiceEnd">치자이너 견적 리스트</Link>
                          </span>
                        </span>
                        <span className="twinBtn small">
                          <BaseButton label={'프로필 보기'} className="mShort" />
                          <span>
                            <BaseButton label={'채팅하기'} />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress">
                          <div>
                            <span style={{ width: '67%' }}></span>
                          </div>
                          <ol>
                            <li>견적 요청</li> {/* 5% */}
                            <li>치자이너 선택</li> {/* 37% */}
                            <li className="on">거래중</li> {/* 67% */}
                            <li>거래완료</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="sparkles">
                              ✨️
                            </span>
                            치자이너가 CAD파일을 재 업로드 했어요. 파일 수령을 완료 해주세요!
                          </p>
                        </div>
                      </div>
                      <div className="detailStep">
                        <button className="bDSToggle">거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                        <ol>
                          <li className="end">
                            <em>1</em>
                            <span>견적서</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>2</em>
                            <span>의뢰서 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>3</em>
                            <span>의뢰서 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>4</em>
                            <span>3D 뷰어 소통</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>5</em>
                            <span>CAD파일 업로드</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="jump">
                            <em>6</em>
                            <span>추가금 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="ing">
                            <em>7</em>
                            <span>CAD파일 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>8</em>
                            <span>리뷰작성</span>
                            <Link to="">상세보기</Link>
                          </li>
                        </ol>
                      </div>
                      <div className="addData">
                        <dl>
                          <dt>재제작 요청내역</dt>
                          <dd className="txt">
                            <span>재제작 요청사유</span>
                            <p>파일이 훼손됨, 열리지 않음</p>
                          </dd>
                          <dd>
                            <span className="time">
                              2024. 05. 20 <span>14:30</span>
                            </span>
                          </dd>
                        </dl>
                        <div className="right listStsBtn">
                          <BaseButton label={'재제작 요청철회'} className={'btnW'} />
                          <BaseButton label={'내역 상세보기'} className={'btnL'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet mReact">
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/*  */}
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                </div>
                <div className="btnArea">
                  <Link to="/cadView" className="btnB">
                    CAD파일 수령하기
                  </Link>
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
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라 (의뢰자시점)</strong>
                </div>
                {/*  */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="choiceDt">
                      <div className="left">
                        <span className="profileSet">
                          <span className="profileImg">
                            <img src={sampleProfile2} />
                          </span>
                          <span className="nick">
                            <span>치자이너</span>
                            <strong>clwkdlsj</strong>
                          </span>
                        </span>
                        <span className="mileage">
                          <label>결제 완료 마일리지</label>
                          <strong>
                            <strong>-30,000</strong>P(￦)
                          </strong>
                          <span>
                            <label>추가 결제 마일리지</label>
                            <strong>
                              <strong>-30,000</strong>P(￦)
                            </strong>
                          </span>
                        </span>
                      </div>
                      <div>
                        <span className="postEdit">
                          <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)} />
                          <span>
                            <Link to="/designerChoiceEnd">치자이너 견적 리스트</Link>
                          </span>
                        </span>
                        <span className="twinBtn small">
                          <BaseButton label={'프로필 보기'} className="mShort" />
                          <span>
                            <BaseButton label={'채팅하기'} />
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress">
                          <div>
                            <span style={{ width: '67%' }}></span>
                          </div>
                          <ol>
                            <li>견적 요청</li> {/* 5% */}
                            <li>치자이너 선택</li> {/* 37% */}
                            <li className="on">거래중</li> {/* 67% */}
                            <li>거래완료</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="payment">
                              💳️
                            </span>
                            요청하신 재제작에 대한 추가금 결제를 해주세요!
                          </p>
                        </div>
                      </div>
                      <div className="detailStep">
                        <button className="bDSToggle">거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                        <ol>
                          <li className="end">
                            <em>1</em>
                            <span>견적서</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>2</em>
                            <span>의뢰서 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>3</em>
                            <span>의뢰서 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>4</em>
                            <span>3D 뷰어 소통</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>5</em>
                            <span>CAD파일 업로드</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="ing">
                            <em>6</em>
                            <span>추가금 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>7</em>
                            <span>CAD파일 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>8</em>
                            <span>리뷰작성</span>
                            <Link to="">상세보기</Link>
                          </li>
                        </ol>
                      </div>
                      <div className="addData">
                        <dl>
                          <dt>재제작 요청내역</dt>
                          <dd className="txt">
                            <span>재제작 요청사유</span>
                            <p>파일이 훼손됨, 열리지 않음</p>
                          </dd>
                          <dd>
                            <span className="time">
                              2024. 05. 20 <span>14:30</span>
                            </span>
                          </dd>
                        </dl>
                        <div className="right listStsBtn">
                          <BaseButton label={'재제작 요청철회'} className={'btnW'} />
                          <BaseButton label={'내역 상세보기'} className={'btnL'} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet mReact">
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/*  */}
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                </div>
                <div className="btnArea">
                  <Link to="/paymentAddView" className="btnB">
                    재제작 추가금 결제하기
                  </Link>
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
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                </div>
                {/*  */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="choiceDt">
                      <div className="left">
                        <span className="profileSet">
                          <span className="profileImg">
                            <img src={sampleProfile2} />
                          </span>
                          <span className="nick">
                            <span>치자이너</span>
                            <strong>clwkdlsj</strong>
                          </span>
                        </span>
                        <span className="mileage">
                          <label>최종 결제 마일리지</label>
                          <strong>
                            <strong>-30,000</strong>P(￦)
                          </strong>
                        </span>
                      </div>
                      <div>
                        <span className="postEdit">
                          <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)} />
                          <span>
                            <Link to="/designerChoiceEnd">치자이너 견적 리스트</Link>
                          </span>
                        </span>
                        <span className="twinBtn small">
                          <BaseButton label={'프로필 보기'} className="mShort" />
                          <span>
                            <BaseButton label={'채팅하기'} />
                          </span>
                          <span className="notM">
                            <Link to="/reView">리뷰작성</Link>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress done">
                          <div>
                            <span style={{ width: '100%' }}></span>
                          </div>
                          <ol>
                            <li>견적 요청</li> {/* 5% */}
                            <li>치자이너 선택</li> {/* 37% */}
                            <li>거래중</li> {/* 67% */}
                            <li className="on">거래완료</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="done">
                              ✔️
                            </span>
                            거래가 완료되었어요. 리뷰 작성을 해주세요!
                          </p>
                        </div>
                      </div>
                      <div className="detailStep">
                        <button className="bDSToggle">거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                        <ol>
                          <li className="end">
                            <em>1</em>
                            <span>견적서</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>2</em>
                            <span>의뢰서 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>3</em>
                            <span>의뢰서 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>4</em>
                            <span>3D 뷰어 소통</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>5</em>
                            <span>CAD파일 업로드</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>6</em>
                            <span>추가금 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="ing">
                            <em>7</em>
                            <span>CAD파일 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>8</em>
                            <span>리뷰작성</span>
                            <Link to="">상세보기</Link>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet mReact">
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/*  */}
                <p className="goDetail">
                  치자이너가 마음에 드시나요? <strong>프로필에서 관심 치자이너로 등록 후, 지정요청으로 견적없이 간편하게 의뢰해 보세요!😃</strong>
                </p>
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                </div>
                <div className="btnArea">
                  <Link to="/reRequestWrite" className="btnW">
                    재제작 요청
                  </Link>
                  <Link to="/reView" className="btnB">
                    리뷰작성
                  </Link>
                </div>
              </li>
              <li>
                <div className="stsSum">
                  <span>
                    <strong className="iSts cancel">거래취소</strong>
                    <span className="reQNum">
                      <i>견적서</i>
                      <strong>3</strong>
                    </span>
                  </span>
                  <strong className="time">
                    2024. 05. 14 <strong>18:30</strong>
                  </strong>
                </div>
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라 (의뢰자시점)</strong>
                </div>
                {/*  */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress done">
                          <div>
                            <span style={{ width: '100%' }}></span>
                          </div>
                          <ol>
                            <li>견적 요청</li> {/* 5% */}
                            <li>치자이너 선택</li> {/* 37% */}
                            <li>거래중</li> {/* 67% */}
                            <li className="on">거래취소</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="cancel">
                              ⛔
                            </span>
                            거래가 취소되었어요. 취소된 요청서에 대한 의뢰서는 의뢰서 바구니에 다시 저장돼요.
                          </p>
                        </div>
                      </div>
                      <div className="detailStep">
                        <button className="bDSToggle">거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                        <ol>
                          <li>
                            <em>1</em>
                            <span>견적서</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>2</em>
                            <span>의뢰서 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>3</em>
                            <span>의뢰서 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>4</em>
                            <span>3D 뷰어 소통</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>5</em>
                            <span>CAD파일 업로드</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>6</em>
                            <span>추가금 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>7</em>
                            <span>CAD파일 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>8</em>
                            <span>리뷰작성</span>
                            <Link to="">상세보기</Link>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet mReact notDesign">
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/*  */}
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                  <BaseButton label={'내역삭제'} className={'btnW'} />
                </div>
              </li>
              <li>
                <div className="stsSum">
                  <span>
                    <strong className="iSts cing">거래취소 승인 대기중</strong>
                    <span className="reQNum">
                      <i>견적서</i>
                      <strong>3</strong>
                    </span>
                  </span>
                  <strong className="time">
                    2024. 05. 14 <strong>18:30</strong>
                  </strong>
                </div>
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                </div>
                {/*  */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="choiceDt">
                      <div className="left">
                        <span className="profileSet">
                          <span className="profileImg">
                            <img src={sampleProfile2} />
                          </span>
                          <span className="nick">
                            <span>치자이너</span>
                            <strong>clwkdlsj</strong>
                          </span>
                        </span>
                        <span className="mileage">
                          <label>결제 완료 마일리지</label>
                          <strong>
                            <strong>-30,000</strong>P(￦)
                          </strong>
                        </span>
                      </div>
                      <div>
                        <span className="postEdit">
                          <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)} />
                          <span>
                            <Link to="/designerChoiceEnd">치자이너 견적 리스트</Link>
                          </span>
                        </span>
                        <span className="twinBtn small">
                          <BaseButton label={'프로필 보기'} className="mShort" />
                          <span>
                            <BaseButton label={'채팅하기'} />
                          </span>
                          <span className="notM">
                            <Link to="/reView">리뷰작성</Link>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress done">
                          <div>
                            <span style={{ width: '67%' }}></span>
                          </div>
                          <ol>
                            <li>견적 요청</li> {/* 5% */}
                            <li>치자이너 선택</li> {/* 37% */}
                            <li className="on">거래취소 승인 대기중</li> {/* 67% */}
                            <li>거래취소</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="guide">
                              💬
                            </span>
                            치자이너가 거래취소 요청을 검토중이에요 ...
                          </p>
                        </div>
                      </div>
                      <div className="detailStep">
                        <button className="bDSToggle">거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                        <ol className="stop">
                          <li className="end">
                            <em>1</em>
                            <span>견적서</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>2</em>
                            <span>의뢰서 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>3</em>
                            <span>의뢰서 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="end">
                            <em>4</em>
                            <span>3D 뷰어 소통</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li className="ing">
                            <em>5</em>
                            <span>CAD파일 업로드</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>6</em>
                            <span>추가금 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>7</em>
                            <span>CAD파일 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>8</em>
                            <span>리뷰작성</span>
                            <Link to="">상세보기</Link>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet  mReact">
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/*  */}
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                </div>
              </li>
              <li>
                <div className="stsSum">
                  <span>
                    <strong className="iSts done">요청마감</strong>
                    <span className="reQNum">
                      <i>견적서</i>
                      <strong>0</strong>
                    </span>
                  </span>
                  <strong className="time">
                    2024. 05. 14 <strong>18:30</strong>
                  </strong>
                </div>
                <div className="subject">
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                </div>
                {/*  */}
                <div className="mBack">
                  <div className="mReverse">
                    <div className="stepBox">
                      <div className="totalStep">
                        <div className="progress done">
                          <div>
                            <span style={{ width: '100%' }}></span>
                          </div>
                          <ol>
                            <li>견적 요청</li> {/* 5% */}
                            <li>치자이너 선택</li> {/* 37% */}
                            <li>거래중</li> {/* 67% */}
                            <li className="on">거래취소</li> {/* 100% */}
                          </ol>
                        </div>
                        <div className="infoNd">
                          <p>
                            <span role="img" aria-label="cancel">
                              ⛔
                            </span>
                            견적요청 만료일이 되어 요청이 마감됐어요. 취소된 요청서에 대한 의뢰서는 의뢰서 바구니에 다시 저장돼요.
                          </p>
                        </div>
                      </div>
                      <div className="detailStep">
                        <button className="bDSToggle">거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                        <ol>
                          <li>
                            <em>1</em>
                            <span>견적서</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>2</em>
                            <span>의뢰서 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>3</em>
                            <span>의뢰서 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>4</em>
                            <span>3D 뷰어 소통</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>5</em>
                            <span>CAD파일 업로드</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>6</em>
                            <span>추가금 결제</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>7</em>
                            <span>CAD파일 수령</span>
                            <Link to="">상세보기</Link>
                          </li>
                          <li>
                            <em>8</em>
                            <span>리뷰작성</span>
                            <Link to="">상세보기</Link>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                  <dl className="deadlineSet mReact notDesign">
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
                      <span className="time red">
                        2024. 05. 14 <span>18:30</span>
                      </span>
                    </dd>
                  </dl>
                </div>
                {/*  */}
                <div className="listStsBtn">
                  <Link to="/RequestView" className="btnL">
                    내 요청서
                  </Link>
                  <BaseButton label={'내역삭제'} className={'btnW'} />
                </div>
              </li>
              {/* <li className='noList search'>검색 결과가 없습니다.</li>
                        <li className='noList'>등록된 목록이 없습니다.</li> */}
            </ul>
          </div>
          <Pagenation />
        </div>
      </article>
      {isModal && (
        <ModalPresent>
          <CancelModal
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
      {isModal2 && (
        <ModalPresent>
          <CancelCallModal
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalPresent>
      )}
      {isModal3 && (
        <ModalPresent>
          <ReportModal
            onClose={() => {
              setIsModal3(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default PaymentTotalPage;
