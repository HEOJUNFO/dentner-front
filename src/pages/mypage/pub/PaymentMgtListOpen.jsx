import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, ItemTag, BaseButton } from '@components/common';
import sampleProfile2 from '@assets/images/sample/sample4.jpeg';

const PaymentMgtPage = () => {
  const stss = [{ name: '진행상태 전체', value: 0 }, { name: '견적 요청중', value: 1 }, { name: '치자이너 선택중', value: 2 }, { name: '거래중', value: 3 }, { name: '거래완료', value: 4 }, { name: '거래취소', value: 5 }, { name: '거래취소 승인 대기중', value: 6 }, { name: '요청마감', value: 7 }];
  const tems = [{ name: '전체', value: 0 }, { name: '1개월', value: 1 }, { name: '3개월', value: 2 }, { name: '6개월', value: 3 }, { name: '1년', value: 4 }, { name: '기간 지정', value: 5 }];

  return (
    <>
      <div className='listTit myPayment'>
          <h3>거래이력 관리</h3>
          <BaseSelect items={stss} placeholder={'진행상태 전체'} onChange={(e) => console.log(e)} />
      </div>
      <div className='paymentList'>
          <ul>
              <li>
                  <div className='stsSum'>
                      <span>
                          <strong className='iSts'>견적 요청중</strong>
                          <span className='reQNum'><i>견적서</i><strong>3</strong></span>
                      </span>
                      <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                  </div>
                  <div className='subject'>
                      <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                      <div className='right listStsBtn'>
                          <Link to='/RequestView' className='btnL'>내 요청서</Link>
                          <BaseButton label={'거래취소'} className={'btnW'} onClick={() => setIsModal(true)} />
                      </div>
                  </div>
                  <div className='stepBox'>
                      <div className='totalStep'>
                          <div className='progress'>
                              <div><span style={{width: '5%'}}></span></div>
                              <ol>
                                  <li className='on'>견적 요청</li> {/* 5% */}
                                  <li>치자이너 선택</li> {/* 37% */}
                                  <li>거래중</li> {/* 67% */}
                                  <li>거래완료</li> {/* 100% */}
                              </ol>
                          </div>
                          <div className='infoNd'>
                              <p>
                                  💬 견적을 요청하고 있어요 ...
                              </p>
                              <dl className='deadlineSet'>
                                  <dt><em>견적요청 만료일</em></dt>
                                  <dd><span className='time'>2024. 05. 14 <span>18:30</span></span></dd>
                                  <dt><em>납품 마감일</em></dt>
                                  <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                              </dl>
                          </div>
                      </div>
                  </div>
              </li>
              <li>
                  <div className='stsSum'>
                      <span>
                          <strong className='iSts select'>치자이너 선택중</strong>
                          <span className='reQNum'><i>견적서</i><strong>3</strong></span>
                      </span>
                      <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                  </div>
                  <div className='subject'>
                      <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                      <div className='right listStsBtn'>
                          <Link to='/RequestView' className='btnL'>내 요청서</Link>
                          <BaseButton label={'거래취소'} className={'btnW'} onClick={() => setIsModal(true)} />
                      </div>
                  </div>
                  <div className='stepBox'>
                      <div className='totalStep'>
                          <div className='progress'>
                              <div><span style={{width: '37%'}}></span></div>
                              <ol>
                                  <li>견적 요청</li> {/* 5% */}
                                  <li className='on'>치자이너 선택</li> {/* 37% */}
                                  <li>거래중</li> {/* 67% */}
                                  <li>거래완료</li> {/* 100% */}
                              </ol>
                          </div>
                          <div className='infoNd'>
                              <p>
                                  🧑🏻‍💻 견적이 도착했어요! 치자이너를 선택해주세요.
                              </p>
                              <dl className='deadlineSet'>
                                  <dt><em>견적요청 만료일</em></dt>
                                  <dd><span className='time'>2024. 05. 14 <span>18:30</span></span></dd>
                                  <dt><em>납품 마감일</em></dt>
                                  <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                              </dl>
                          </div>
                      </div>
                  </div>
                  <div className='btnArea'>
                      <Link to='/designerChoice' className='btnB'>치자이너 선택</Link>
                  </div>
              </li>
              <li>
                  <div className='stsSum'>
                      <span>
                          <strong className='iSts ing'>거래중</strong>
                          <span className='reQNum'><i>견적서</i><strong>3</strong></span>
                      </span>
                      <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                  </div>
                  <div className='subject'>
                      <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                      <div className='right listStsBtn'>
                          <Link to='/RequestView' className='btnL'>내 요청서</Link>
                          <BaseButton label={'거래취소 요청'} className={'btnW'} onClick={() => setIsModal2(true)} />
                      </div>
                  </div>
                  <div className='choiceDt'>
                      <div className='left'>
                        <span className='profileSet'>
                            <span className='profileImg'>
                                <img src={sampleProfile2} />
                            </span>
                            <span className='nick'>
                                <span>치자이너</span>
                                <strong>clwkdlsj</strong>
                            </span>
                        </span>
                        <span className='mileage'>
                            <label>예상 결제 마일리지</label>
                            <strong>
                                <strong>-30,000</strong>P(￦)
                            </strong>
                        </span>
                      </div>
                      <div>
                          <span className='postEdit'>
                              <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                              <span>
                                  <Link to='/designerChoiceEnd'>치자이너 견적 리스트</Link>
                              </span>
                          </span>
                          <span className='twinBtn small'>
                              <BaseButton label={'프로필 보기'} />
                              <span>
                                  <BaseButton label={'채팅하기'} />
                              </span>
                          </span>
                      </div>
                  </div>
                  <div className='stepBox'>
                      <div className='totalStep'>
                          <div className='progress'>
                              <div><span style={{width: '67%'}}></span></div>
                              <ol>
                                  <li>견적 요청</li> {/* 5% */}
                                  <li>치자이너 선택</li> {/* 37% */}
                                  <li className='on'>거래중</li> {/* 67% */}
                                  <li>거래완료</li> {/* 100% */}
                              </ol>
                          </div>
                          <div className='infoNd'>
                              <p>
                                  ✨️ 거래가 진행되고 있어요! 전자계약서를 작성하고 결제를 진행해주세요.
                              </p>
                              <dl className='deadlineSet'>
                                  <dt><em>견적요청 만료일</em></dt>
                                  <dd><span className='time'>2024. 05. 14 <span>18:30</span></span></dd>
                                  <dt><em>납품 마감일</em></dt>
                                  <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                              </dl>
                          </div>
                      </div>
                      <div className='detailStep'>
                          <ol>
                              <li className='end'>
                                  <em>1</em>
                                  <span>견적서</span>
                              </li>
                              <li className='ing'>
                                  <em>2</em>
                                  <span>의뢰서 결제</span>
                              </li>
                              <li>
                                  <em>3</em>
                                  <span>의뢰서 수령</span>
                              </li>
                              <li>
                                  <em>4</em>
                                  <span>3D 뷰어 소통</span>
                              </li>
                              <li>
                                  <em>5</em>
                                  <span>CAD파일 업로드</span>
                              </li>
                              <li>
                                  <em>6</em>
                                  <span>추가금 결제</span>
                              </li>
                              <li>
                                  <em>7</em>
                                  <span>CAD파일 수령</span>
                              </li>
                              <li>
                                  <em>8</em>
                                  <span>리뷰작성</span>
                              </li>
                          </ol>
                      </div>
                  </div>
                  <div className='btnArea'>
                      <Link to='/paymentView' className='btnB'>전자계약하고 결제하기</Link>
                  </div>
              </li>
              {/* <li className='noList'>등록된 목록이 없습니다.</li> */}
          </ul>
      </div>
      <Pagenation />
    </>
  );
};

export default PaymentMgtPage;
