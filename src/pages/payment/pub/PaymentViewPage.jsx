import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ItemTag, PostsMore, BaseButton } from '@components/common';
import PayModal from '../../components/ui/modal/PayModal';
import {ModalPresent} from '@components/common';

const PaymentViewPage = () => {
    const [isModal, setIsModal] = useState(false);
    const infoItems = [{ name: '의뢰서 a'}];
  return (
    <>
        <section>
            <h2>의뢰서 결제</h2>
            <div className='viewBox subView line'>
                <div className='tvs'>
                    <article>
                        <div className='detail'>
                            <h4 className='noLine'><strong>요청사항 <strong>(선택입력)</strong></strong></h4>
                            <textarea defaultValue={'치자이너에게 요청할 사항을 작성해주세요. (최대 200자)'}>
                            </textarea>
                        </div>
                        <h3 className='pt60 lineCase'>내 요청서 정보</h3>
                        <div className='detail reQMinInfo'>
                            <div className='left'>
                                <ItemTag items={infoItems} className='itemTag' />
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5/ 하악 프레임 크라</strong>
                                <p>크라운 15 / 어비트먼트 10</p>
                            </div>
                            <div className='right'>
                                <strong className='time'>2024. 06. 30 <strong>18:30</strong></strong>
                                <Link className='bMR' to='/requestView'><span><em>더</em> 자세히보기</span></Link>
                            </div>
                        </div>
                        <h3 className='pt60 lineCase'>결제 내역</h3>
                        <div className='detail'>
                            <div className='mBack'>
                                <h4><strong>보철종류/금액</strong></h4>
                                <div className='orderCase'>
                                    <div className='itemList'>
                                        <div><strong><strong>크라운 &gt; </strong>Zirconia &gt; 일반 (Hole X)</strong> <em>100,000 <i>2</i> = <span><span>200,000</span> 원</span></em></div>
                                        <div><strong><strong>스프린트/서지컬가이드 &gt; </strong>Surgical Guide &gt; Partital &gt; 1~3 Holes</strong> <em>100,000 <i>3</i> = <span><span>300,000</span> 원</span></em></div>
                                    </div>
                                </div>
                            </div>
                            <div className='priceSet'>
                                <span>
                                    총 결제 금액
                                </span>
                                <strong className='right'>
                                    <strong>500,000</strong> <em>P(￦)</em>
                                </strong>
                            </div>
                            <div className='priceSet'>
                                <span>
                                    최종 결제금액
                                </span>
                                <strong className='right'>
                                    <strong>500,000</strong> <em>P(￦)</em>
                                </strong>
                            </div>
                        </div>
                        <div className='infoNotes'>
                            <dl>
                                <dt>
                                결제하기 이후 거래 취소 시, 마일리지 차감안내
                                </dt>
                                <dd>
                                    ▪️ 치자이너 요청서 접수 전 → 마일리지 전액 환불 <br/>
                                    ▪ 치자이너 요청서 접수 후 → 치자이너 취소 승인 후, 마일리지 50% 차감 및 환불 <br/>
                                    &nbsp;&nbsp;&nbsp;* 치자이너와 소통해주세요 <br/>
                                    ▪ 치자이너 CAD파일 업로드 후 → 취소 불가
                                </dd>
                            </dl>
                            <span className='checkSet'>
                                <input type='checkbox' id='checkbox1' />
                                <label htmlFor='checkbox1'><sup>필수항목</sup> 유의 사항을 확인 하였습니다.</label>
                            </span>
                        </div>
                        <div className='btnArea pb0'>
                            <BaseButton label={'결제하기'} className={'btnB'} onClick={() => setIsModal(true)}/>
                        </div>
                    </article>
                </div>
            </div>
        </section>
        {isModal && 
            <ModalPresent >
                <PayModal onClose={() => {setIsModal(false)}}/>
            </ModalPresent>
        }
    </>
  );
};

export default PaymentViewPage;
