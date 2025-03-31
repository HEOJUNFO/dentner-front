import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, ItemTag, BaseButton } from '@components/common';
import CancelModal from '../../components/ui/modal/CancelModal';
import CancelCallModal from '../../components/ui/modal/CancelCallModal';
import ReportModal from '../../components/ui/modal/ReportModal';
import {ModalPresent} from '@components/common';
import sampleProfile2 from '@assets/images/sample/sample4.jpeg';

const PaymentTotalPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const stss = [{ name: '진행상태 전체', value: 0 }, { name: '견적 요청중', value: 1 }, { name: '치자이너 선택중', value: 2 }, { name: '거래중', value: 3 }, { name: '거래완료', value: 4 }, { name: '거래취소', value: 5 }, { name: '거래취소 승인 대기중', value: 6 }, { name: '요청마감', value: 7 }];
  const tems = [{ name: '전체', value: 0 }, { name: '1개월', value: 1 }, { name: '3개월', value: 2 }, { name: '6개월', value: 3 }, { name: '1년', value: 4 }, { name: '기간 지정', value: 5 }];

  return (
    <>
        <article>
            {/* 목록 */}
            <div className='listBox'>
                <div className='listTit'>
                    <BaseSelect items={stss} placeholder={'진행상태 전체'} onChange={(e) => console.log(e)} />
                    <div className='right'>
                        <BaseSelect items={tems} placeholder={'전체'} onChange={(e) => console.log(e)} />
                        <BaseInput  type="text" value={'2023-05-01 ~ 2023-05-07'} />
                        <BaseButton label={'검색'} className={'btnB ss'} />
                    </div>
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
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5 / 하악 프레임 크라 (의뢰자시점)</strong>
                                <div className='right listStsBtn'>
                                    <Link to='/RequestView' className='btnL'>내 요청서</Link>
                                    <BaseButton label={'거래취소'} className={'btnW'} onClick={() => setIsModal(true)} />
                                    <BaseButton label={'거래취소 요청'} className={'btnW'} onClick={() => setIsModal2(true)} />
                                    <BaseButton label={'내역삭제'} className={'btnW'} />
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
                                            <Link to='/designerChoiceEnd'>치자이너 견적 리스트</Link>
                                        </span>
                                    </span>
                                    <span className='twinBtn small'>
                                        <BaseButton label={'프로필 보기'} />
                                        <span>
                                            <BaseButton label={'채팅하기'} />
                                        </span>
                                        <span>
                                            <Link to='/reView'>리뷰작성</Link>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className='stepBox'>
                                <div className='totalStep'>
                                    <div className='progress'>
                                        <div><span style={{width: '5%'}}></span></div>
                                        <ol>
                                            <li>견적 요청</li> {/* 5% */}
                                            <li>치자이너 선택</li> {/* 37% */}
                                            <li>거래중</li> {/* 67% */}
                                            <li>거래완료</li> {/* 100% */}
                                        </ol>
                                    </div>
                                    <div className='progress done'>
                                        <div><span style={{width: '100%'}}></span></div>
                                        <ol>
                                            <li>견적 요청</li> {/* 5% */}
                                            <li>치자이너 선택</li> {/* 37% */}
                                            <li>거래중</li> {/* 67% */}
                                            <li>거래완료</li> {/* 100% */}
                                        </ol>
                                    </div>
                                    <div className='progress done'>
                                        <div><span style={{width: '100%'}}></span></div>
                                        <ol>
                                            <li>견적 요청</li> {/* 5% */}
                                            <li>치자이너 선택</li> {/* 37% */}
                                            <li>거래중</li> {/* 67% */}
                                            <li>거래취소</li> {/* 100% */}
                                        </ol>
                                    </div>
                                    <div className='progress done'>
                                        <div><span style={{width: '67%'}}></span></div>
                                        <ol>
                                            <li>견적 요청</li> {/* 5% */}
                                            <li>치자이너 선택</li> {/* 37% */}
                                            <li>거래취소 승인 대기중</li> {/* 67% */}
                                            <li>거래취소</li> {/* 100% */}
                                        </ol>
                                    </div>
                                    <div className='progress'>
                                        <div><span style={{width: '51%'}}></span></div>
                                        <ol>
                                            <li>요청 수락</li> {/* 5% */}
                                            <li>거래중</li> {/* 51% */}
                                            <li>거래완료</li> {/* 100% */}
                                        </ol>
                                    </div>
                                    <div className='progress done'>
                                        <div><span style={{width: '100%'}}></span></div>
                                        <ol>
                                            <li>요청 수락</li> {/* 5% */}
                                            <li>거래중</li> {/* 51% */}
                                            <li>거래완료</li> {/* 100% */}
                                        </ol>
                                    </div>
                                    <div className='progress done'>
                                        <div><span style={{width: '100%'}}></span></div>
                                        <ol>
                                            <li>요청 수락</li> {/* 5% */}
                                            <li>거래중</li> {/* 51% */}
                                            <li>거래취소</li> {/* 100% */}
                                        </ol>
                                    </div>
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
                                    <ol className='stop'>
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
                                    <ol className='step7'>
                                        <li className='end'>
                                            <em>1</em>
                                            <span>의뢰서 결제</span>
                                        </li>
                                        <li className='ing'>
                                            <em>2</em>
                                            <span>의뢰서 수령</span>
                                        </li>
                                        <li>
                                            <em>3</em>
                                            <span>3D 뷰어 소통</span>
                                        </li>
                                        <li>
                                            <em>4</em>
                                            <span>CAD파일 업로드</span>
                                        </li>
                                        <li>
                                            <em>5</em>
                                            <span>추가금 결제</span>
                                        </li>
                                        <li>
                                            <em>6</em>
                                            <span>CAD파일 수령</span>
                                        </li>
                                        <li>
                                            <em>7</em>
                                            <span>리뷰작성</span>
                                        </li>
                                    </ol>
                                    <ol className='step7 stop'>
                                        <li className='end'>
                                            <em>1</em>
                                            <span>의뢰서 결제</span>
                                        </li>
                                        <li className='end'>
                                            <em>2</em>
                                            <span>의뢰서 수령</span>
                                        </li>
                                        <li className='end'>
                                            <em>3</em>
                                            <span>3D 뷰어 소통</span>
                                        </li>
                                        <li className='ing'>
                                            <em>4</em>
                                            <span>CAD파일 업로드</span>
                                        </li>
                                        <li>
                                            <em>5</em>
                                            <span>추가금 결제</span>
                                        </li>
                                        <li>
                                            <em>6</em>
                                            <span>CAD파일 수령</span>
                                        </li>
                                        <li>
                                            <em>7</em>
                                            <span>리뷰작성</span>
                                        </li>
                                    </ol>
                                </div>
                                <div className='addData'>
                                    <dl>
                                        <dt>추가금 요청내역</dt>
                                        <dd className='txt'>
                                            <span>추가금 요청사유</span>
                                            <p>이러저러한 이유로 인해 추가금을 요청함</p>
                                        </dd>
                                        <dd>
                                            <span className='time'>2024. 05. 20 <span>14:30</span></span>
                                        </dd>
                                    </dl>
                                </div>
                                <div className='addData'>
                                    <dl>
                                        <dt>재제작 요청내역</dt>
                                        <dd className='txt'>
                                            <span>재제작 요청사유</span>
                                            <p>파일이 훼손됨, 열리지 않음</p>
                                        </dd>
                                        <dd>
                                            <span className='time'>2024. 05. 20 <span>14:30</span></span>
                                        </dd>
                                    </dl>
                                    <div className='right listStsBtn'>
                                        <BaseButton label={'재제작 요청철회'} className={'btnW'} />
                                        <BaseButton label={'내역 상세보기'} className={'btnL'} />
                                    </div>
                                </div>
                            </div>
                            <p className='goDetail'>
                                치자이너가 마음에 드시나요? <strong>프로필에서 관심 치자이너로 등록 후, 지정요청으로 견적없이 간편하게 의뢰해 보세요!😃</strong> 
                            </p>
                            <div className='btnArea'>
                                <Link to='/designerChoice' className='btnB'>치자이너 선택</Link>
                            </div>
                            <div className='btnArea'>
                                <Link to='/paymentView' className='btnB'>전자계약하고 결제하기</Link>
                            </div>
                            <div className='btnArea'>
                                <Link to='/paymentAddView' className='btnB'>추가금 결제하기</Link>
                            </div>
                            <div className='btnArea'>
                                <Link to='/cadView' className='btnB'>CAD파일 수령하기</Link>
                            </div>
                            <div className='btnArea'>
                                <Link to='/paymentAddView' className='btnB'>재제작 추가금 결제하기</Link>
                            </div>
                            <div className='btnArea'>
                                <Link to='/reRequestWrite' className='btnW'>재제작 요청</Link>
                                <Link to='/reView' className='btnB'>리뷰작성</Link>
                            </div>
                        </li>
                        <li className='noList search'>검색 결과가 없습니다.</li>
                        <li className='noList'>등록된 목록이 없습니다.</li>
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
