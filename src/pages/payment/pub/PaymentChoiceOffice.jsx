import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, ItemTag, BaseButton } from '@components/common';
import CancelModal from '../../../components/ui/modal/CancelModal';
import CancelCallModal from '../../../components/ui/modal/CancelCallModal';
import ReportModal from '../../../components/ui/modal/ReportModal';
import {ModalPresent} from '@components/common';
import sampleProfile2 from '@assets/images/sample/sample4.jpeg';

const PaymentTotalPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const stss = [{ name: '진행상태 전체', value: 0 }, { name: '요청 대기중', value: 1 }, { name: '요청거절', value: 2 }, { name: '거래중', value: 3 }, { name: '납품완료', value: 4 }, { name: '거래완료', value: 5 }, { name: '거래취소', value: 6 }, { name: '거래취소 승인 대기중', value: 7 }];
  const tems = [{ name: '전체', value: 0 }, { name: '1개월', value: 1 }, { name: '3개월', value: 2 }, { name: '6개월', value: 3 }, { name: '1년', value: 4 }, { name: '기간 지정', value: 5 }];

  return (
    <>
        <article>
            {/* 목록 */}
            <div className='listBox'>
                <div className='listTit paymentCase'>
                    <BaseSelect items={stss} placeholder={'진행상태 전체'} onChange={(e) => console.log(e)} />
                    <div className='right sortingSet'>
                        <span className='sArea'>
                            <BaseSelect items={tems} placeholder={'전체'} onChange={(e) => console.log(e)} />
                            <BaseInput  type="text" value={'2023-05-01 ~ 2023-05-07'} />
                            <BaseButton label={'검색'} className={'btnB ss'} />
                        </span>
                    </div>
                </div>
                <div className='paymentList'>
                    <ul>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className='iSts'>요청 검토중</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress'>
                                                <div><span style={{width: '5%'}}></span></div>
                                                <ol>
                                                    <li className='on'>요청 검토</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                    <span role="img" aria-label="guide">💬</span> 의뢰인이 회원님을 지정요청 했어요! 요청서 확인 후, 요청을 수락해주세요.
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            <div className="btnArea">
                                <Link to="" className="btnB">요청서 보기</Link>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className='iSts ing'>거래중</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>요청 결제 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress'>
                                                <div><span style={{width: '51%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                <span role="img" aria-label="technologist">🧑🏻‍💻</span> 지정요청을 수락했어요! 의뢰인이 의뢰서를 결제할 때까지 대기해 주세요.
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6'>
                                                <li>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            <div className='listStsBtn'>
                                <BaseButton label={'거래취소'} className={'btnW'} onClick={() => setIsModal(true)} />
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className='iSts ing'>거래중</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>결제 완료 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress'>
                                                <div><span style={{width: '51%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                    <span role="img" aria-label="sparkles">✨️</span> 의뢰인이 의뢰서를 결제했어요! 계약 요청서 확인 후, 수락해주세요.
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6'>
                                                <li className='ing'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            <div className='listStsBtn'>
                                <BaseButton label={'거래취소'} className={'btnW'} onClick={() => setIsModal(true)} />
                            </div>
                            <div className="btnArea">
                                <Link to="" className="btnB">계약 요청서 보기</Link>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className='iSts ing'>거래중</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>결제 완료 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress'>
                                                <div><span style={{width: '51%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                    <span role="img" aria-label="sparkles">✨️</span> 의뢰서 수령 버튼을 클릭하고, 의뢰서를 수령해 주세요!
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6'>
                                                <li className='end'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='ing'>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            <div className='listStsBtn'>
                                <BaseButton label={'거래취소'} className={'btnW'} onClick={() => setIsModal(true)} />
                            </div>
                            <div className="btnArea">
                                <Link to="" className="btnB">의뢰서 수령하기</Link>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className='iSts ing'>거래중</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>결제 완료 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress'>
                                                <div><span style={{width: '51%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                    <span role="img" aria-label="receive">🤲🏻</span>  의뢰서 수령 버튼을 클릭하고, 의뢰서를 수령해 주세요!
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6'>
                                                <li className='end'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            <div className='listStsBtn'>
                                <BaseButton label={'거래취소'} className={'btnW'} onClick={() => setIsModal(true)} />
                            </div>
                            <div className="btnArea">
                                <button className="btnW">건너뛰고 다음단계로</button>
                                <Link to="" className="btnB">3D 뷰어 소통하기</Link>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className='iSts ing'>거래중</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>결제 완료 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress'>
                                                <div><span style={{width: '51%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                    <span role="img" aria-label="start">👀️</span> 의뢰인과의 3D 뷰어 소통이 시작되었어요.
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6'>
                                                <li className='end'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='ing'>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            <div className='listStsBtn'>
                                <BaseButton label={'거래취소 요청'} className={'btnW'} onClick={() => setIsModal2(true)} />
                            </div>
                            <div className="btnArea">
                                <Link to="" className="btnB">3D 뷰어 소통하기</Link>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className='iSts ing'>거래중</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>결제 완료 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress'>
                                                <div><span style={{width: '51%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                <span role="img" aria-label="waring">❗️️️</span> CAD파일을 업로드 해주세요! 만약 추가금이 있다면, 추가금을 함께 요청해주세요.
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6'>
                                                <li className='end'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='ing'>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            <div className='listStsBtn'>
                                <BaseButton label={'거래취소 요청'} className={'btnW'} onClick={() => setIsModal2(true)} />
                            </div>
                            <div className="btnArea">
                                <Link to="" className="btnB">CAD파일 업로드하기</Link>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className='iSts complet'>납품완료</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>결제 완료 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                                <span>
                                                    <label>추가 요청결제 마일리지</label>
                                                    <strong>
                                                        <strong>-30,000</strong>P(￦)
                                                    </strong>
                                                </span>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress'>
                                                <div><span style={{width: '51%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                <span role="img" aria-label="waring">❗️️️</span> 의뢰인에게 추가금을 요청했어요. 의뢰인이 결제할 때까지 대기해주세요.
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6'>
                                                <li className='end'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='ing'>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
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
                                            <div className="right listStsBtn">
                                            <BaseButton label={'추가금 요청철회'} className={'btnW'} />
                                            <BaseButton label={'추가금 수정'} className={'btnW'} />
                                            <BaseButton label={'내역 상세보기'} className={'btnL'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className='iSts ing'>거래중</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>결제 완료 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress'>
                                                <div><span style={{width: '51%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                <span role="img" aria-label="waring">❗️️️</span> 의뢰인이 CAD파일 재제작을 요청했어요! 재제작 요청내역 확인 후, CAD파일을 재 업로드해주세요. 재제작 추가금이 있다면 요청해주세요.
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6'>
                                                <li className='end'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='ing'>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
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
                                                <BaseButton label={'내역 상세보기'} className={'btnL'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            <div className="btnArea">
                                <Link to="/paymentView" className="btnB">
                                    CAD파일 업로드하기
                                </Link>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong className="iSts end">거래완료</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>결제 완료 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress done'>
                                                <div><span style={{width: '100%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래완료</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                    <span role="img" aria-label="done">✔️</span> 거래가 완료되었어요!
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6'>
                                                <li className='end'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
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
                                                <BaseButton label={'내역 상세보기'} className={'btnL'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong class="iSts cing">거래취소 승인 대기중</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>결제 완료 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress done'>
                                                <div><span style={{width: '51%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래취소 승인 대기중</li> {/* 51% */}
                                                    <li>거래취소</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                    <span role="img" aria-label="guide">💬</span> 의뢰인이 거래취소 요청을 검토중이에요 ...
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6 stop'>
                                                <li className='end'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='ing'>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong class="iSts cancel">거래취소</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage'>
                                                <label>최종 결제 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress done'>
                                                <div><span style={{width: '100%'}}></span></div>
                                                <ol>
                                                    <li>요청 수락</li> {/* 5% */}
                                                    <li>거래취소 승인 대기중</li> {/* 51% */}
                                                    <li>거래취소</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                    <span role="img" aria-label="cancel">⛔</span> 거래가 취소되었어요.
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6 stop'>
                                                <li className='end'>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='end'>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li className='ing'>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            {/*  */}
                            <div className="listStsBtn">
                                <BaseButton label={'내역삭제'} className={'btnW'} />
                            </div>
                        </li>
                        {/*  */}
                        <li>
                            <div className='stsSum'>
                                <span>
                                    <strong class="iSts cancel">거래취소</strong>
                                </span>
                                <strong className='time'>2024. 05. 14 <strong>18:30</strong></strong>
                            </div>
                            <div className='subject'>
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라</strong>
                            </div>
                            {/*  */}
                            <div className='mBack'>
                                <div className='mReverse'>
                                    <div className='choiceDt'>
                                        <div className='left'>
                                            <span className='profileSet'>
                                                <span className='profileImg'>
                                                    <img src={sampleProfile2} />
                                                </span>
                                                <span className='nick'>
                                                    <span>의뢰인</span>
                                                    <strong>soft navy</strong>
                                                </span>
                                            </span>
                                            <span className='mileage done'>
                                                <label>요청 결제 마일리지</label>
                                                <strong>
                                                    <strong>-30,000</strong>P(￦)
                                                </strong>
                                            </span>
                                        </div>
                                        <div>
                                            <span className='postEdit'>
                                                <BaseButton label={'신고하기'} className={'bRP'} onClick={() => setIsModal3(true)}/>
                                                <span>
                                                    <Link to="">요청서 보기</Link>
                                                </span>
                                            </span>
                                            <span className='twinBtn small'>
                                                <BaseButton label={'프로필 보기'} className='mShort' />
                                                <span>
                                                    <BaseButton label={'채팅하기'} />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className='stepBox'>
                                        <div className='totalStep'>
                                            <div className='progress done'>
                                                <div><span style={{width: '100%'}}></span></div>
                                                <ol>
                                                    <li>요청 거절</li> {/* 5% */}
                                                    <li>거래중</li> {/* 51% */}
                                                    <li>거래취소</li> {/* 100% */}
                                                </ol>
                                            </div>
                                            <div className='infoNd'>
                                                <p>
                                                    <span role="img" aria-label="cancel">⛔</span> 거래가 취소되었어요.
                                                </p>
                                                <dl className='deadlineSet mReact'>
                                                    <dt><em>납품 마감일</em></dt>
                                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                                </dl>
                                            </div>
                                        </div>
                                        <div className='detailStep'>
                                            <button className='bDSToggle'>거래현황 접기</button> {/* 클릭 시 className='bPSToggle on' */}
                                            <ol className='step6 stop'>
                                                <li>
                                                    <em>1</em>
                                                    <span>계약 요청서</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>2</em>
                                                    <span>의뢰서 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>3</em>
                                                    <span>3D 뷰어 소통</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>4</em>
                                                    <span>CAD파일 업로드</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>5</em>
                                                    <span>추가금 결제</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                                <li>
                                                    <em>6</em>
                                                    <span>CAD파일 수령</span>
                                                    <Link to=''>상세보기</Link>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <dl className="deadlineSet mReact">
                                    <dt><em>납품 마감일</em></dt>
                                    <dd><span className='time red'>2024. 05. 14 <span>18:30</span></span></dd>
                                </dl>
                            </div>
                            {/*  */}
                            <div className="listStsBtn">
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
        {isModal && 
            <ModalPresent >
                <CancelModal onClose={() => {setIsModal(false)}}/>
            </ModalPresent>
        }
        {isModal2 && 
            <ModalPresent >
                <CancelCallModal onClose={() => {setIsModal2(false)}}/>
            </ModalPresent>
        }
        {isModal3 && 
            <ModalPresent >
                <ReportModal onClose={() => {setIsModal3(false)}}/>
            </ModalPresent>
        }
    </>
  );
};

export default PaymentTotalPage;
