import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, ItemTag, BaseButton } from '@components/common';
import ChargeModal from '../../../components/ui/modal/ChargeModal';
import CardModal from '../../../components/ui/modal/CardModal';
import PayRefundModal from '../../../components/ui/modal/PayRefundModal';
import ChargeRefundModal from '../../../components/ui/modal/ChargeRefundModal';
import HaveRefundModal from '../../../components/ui/modal/HaveRefundModal';
import {ModalPresent} from '@components/common';
import {ModalAlertPresent} from '@components/common';

const MileagePage = () => {
  const tems = [{ name: '전체', value: 0 }, { name: '1개월', value: 1 }, { name: '3개월', value: 2 }, { name: '6개월', value: 3 }, { name: '1년', value: 4 }, { name: '기간 지정', value: 5 }];
  const [isModal, setIsModal] = useState(false);  
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [isModal4, setIsModal4] = useState(false);
  const [isModal5, setIsModal5] = useState(false);
  const [isModal6, setIsModal6] = useState(false);
  const [cardOn, setCardOn] = useState(false);
  const [tab , setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  }
  
  return (
    <>
        <section>
            <h2>마일리지</h2>
            <div className='mileageWrap'> 
                <div className='mileageTop'>
                    <div className='mSummery'>
                        <div>
                            <dl>
                                <dt>보유 마일리지</dt>
                                <dd>
                                    <span><em>0</em>P(￦)</span>
                                </dd>
                            </dl>
                            <span className='right'>
                                <BaseButton label={'잔액환불'} className={'ttb'} />
                                <BaseButton label={'충전하기'} className={'btnB ss'} onClick={() => setIsModal(true)} />
                            </span>
                        </div>
                        <div>
                            <dl>
                                <dt>내 카드</dt>
                                <dd>
                                    <span style={{display: `${cardOn ? 'none' : 'block'}`}}><em>미등록</em></span> 
                                    <span className='myCard' style={{display: `${cardOn ? 'block' : 'none'}`}}><i>KB 신용카드</i><em>1234-****-****-5678</em></span>
                                </dd>
                            </dl>
                            <span className='right'>
                                <BaseButton label={'등록하기'} className={'btnB ss'} style={{display: `${cardOn ? 'none' : 'block'}`}} onClick={() => {setIsModal3(true); setCardOn(true);}} />
                                <BaseButton label={'카드변경'} className={'btnL ss'} style={{display: `${cardOn ? 'block' : 'none'}`}} onClick={() => {setIsModal3(true); setCardOn(true);}} />
                            </span>
                        </div>
                    </div>
                    <div className='infoNotes'>
                        <dl>
                            <dt>마일리지 충전ㆍ환불ㆍ사용안내</dt>
                            <dd>
                                <strong>[충전 마일리지 환불]</strong>
                                영업일 기준 10일 이내에 결제한 마일리지는 동일한 결제 수단으로 환불요청이 가능합니다. <span>(환불 처리기간 영업일 기준 10일 이내 소요)</span>
                            </dd>
                            <dd>
                                <strong>[보유 마일리지 환불]</strong>
                                충전한 마일리지는 부분 취소가 불가능합니다.
                            </dd>
                            <dd>
                                <strong>[사용한 마일리지 환불]</strong>
                                치자이너에게 사용한 마일리지 환불은 치자이너와 소통 후 신중히 요청해주세요. <span>(경위 파악 후 환불이 불가능할 수 있습니다.)</span>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div className='tabNav mileageTab'>
                    <nav className='center'>
                        <ul>
                            <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>마일리지 충전내역</button></li>
                            <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>마일리지 결제내역</button></li>
                        </ul>
                    </nav>
                </div>
                <article className={`${tab === 1 ? 'mOn' : ''}`}>
                    <div className='listBox'>
                        <div className='listTit lCase'>
                            <h3>마일리지 충전내역</h3>
                            <div className='back'>
                                <div className='sorting sts'>
                                    <span>
                                        <input type='radio' id='sortingSts1' name='sortingSts1' defaultChecked />
                                        <label htmlFor='sortingSts1'>전체</label>
                                    </span>
                                    <span>
                                        <input type='radio' id='sortingSts2' name='sortingSts1'  />
                                        <label htmlFor='sortingSts2'>충전내역</label>
                                    </span>
                                    <span>
                                        <input type='radio' id='sortingSts3' name='sortingSts1' />
                                        <label htmlFor='sortingSts3'>환불내역</label>
                                    </span>
                                </div>
                                <div className='right sortingSet'>
                                    <span className='sArea'>
                                        <BaseSelect items={tems} placeholder={'전체'} onChange={(e) => console.log(e)} />
                                        <BaseInput  type="text" value={'2023-05-01 ~ 2023-05-07'} />
                                        <BaseButton label={'검색'} className={'btnB ss'} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='mileageList chargeCase'>
                            <table>
                                <colgroup>
                                    <col width={65} />
                                    <col width={238} />
                                    <col width={218} />
                                    <col />
                                    <col width={100} />
                                    <col width={100} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>마일리지</th>
                                        <th>결제내역</th>
                                        <th>상세 내용</th>
                                        <th>결제일자</th>
                                        <th>환불요청</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='refund'>
                                        <td><em>충전 환불</em></td>
                                        <td>- 100,000,000 P(￦)</td>
                                        <td>100,000,000원</td>
                                        <td>충전한 마일리지 환불</td>
                                        <td className='date'>2024.05.05</td>
                                        <td className='sts'></td>
                                    </tr>
                                    <tr>
                                        <td><em>충전</em></td>
                                        <td>+ 1,000,000 P(￦)</td>
                                        <td>1,000,000원 </td>
                                        <td>마일리지 충전</td>
                                        <td className='date'>2024.05.04</td>
                                        <td className='sts'><span>환불완료</span></td>
                                    </tr>
                                    <tr>
                                        <td><em>충전</em></td>
                                        <td>+ 1,000 P(￦)</td>
                                        <td>1,000원</td>
                                        <td>마일리지 충전</td>
                                        <td className='date'>2024.05.02</td>
                                        <td className='sts'><em>환불진행중</em></td>
                                    </tr>
                                    <tr>
                                        <td><em>충전</em></td>
                                        <td>+ 1,000 P(￦)</td>
                                        <td>1,000원</td>
                                        <td>마일리지 충전</td>
                                        <td className='date'>2024.05.01</td>
                                        <td className='sts'><BaseButton label={'환불요청'} onClick={() => setIsModal5(true)} /></td>
                                    </tr>
                                    {/* <tr className='mNoLine'>
                                        <td colSpan={6}><div className='noList search'>검색 결과가 없습니다.</div></td>
                                    </tr>
                                    <tr className='mNoLine'>
                                        <td colSpan={6}><div className='noList'>충전내역이 없습니다.</div></td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                        <Pagenation />
                    </div>
                </article>
                <article className={`${tab === 2 ? 'mOn' : ''}`}>
                    <div className='listBox'>
                        <div className='listTit lCase'>
                            <h3>마일리지 결제내역</h3>
                            <div className='back'>
                                <div className='sorting sts'>
                                    <span>
                                        <input type='radio' id='sortingSts21' name='sortingSts12' defaultChecked />
                                        <label htmlFor='sortingSts21'>전체</label>
                                    </span>
                                    <span>
                                        <input type='radio' id='sortingSts22' name='sortingSts12'  />
                                        <label htmlFor='sortingSts22'>결제내역</label>
                                    </span>
                                    <span>
                                        <input type='radio' id='sortingSts23' name='sortingSts12' />
                                        <label htmlFor='sortingSts23'>환불내역</label>
                                    </span>
                                </div>
                                <div className='right sortingSet'>
                                    <span className='sArea'>
                                        <BaseSelect items={tems} placeholder={'전체'} onChange={(e) => console.log(e)} />
                                        <BaseInput  type="text" value={'2023-05-01 ~ 2023-05-07'} />
                                        <BaseButton label={'검색'} className={'btnB ss'} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='mileageList payCase'>
                            <table>
                                <colgroup>
                                    <col width={65} />
                                    <col width={238} />
                                    <col />
                                    <col width={100} />
                                    <col width={100} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>마일리지</th>
                                        <th>상세 내용</th>
                                        <th>결제일자</th>
                                        <th>환불요청</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='refund'>
                                        <td><em>결제 환불</em></td>
                                        <td>+ 450,000,000 P(￦)</td>
                                        <td>김은지 치자이너 / 요청서 제목</td>
                                        <td className='date'>2024.05.05</td>
                                        <td className='sts'></td>
                                    </tr>
                                    <tr>
                                        <td><em>결제</em></td>
                                        <td>- 900,000,000 P(￦)</td>
                                        <td>김은지 치자이너 / 요청서 제목</td>
                                        <td className='date'>2024.05.04</td>
                                        <td className='sts'><BaseButton label={'환불요청'} onClick={() => setIsModal4(true)} /></td>
                                    </tr>
                                    {/* <tr className='mNoLine'>
                                        <td colSpan={6}><div className='noList search'>검색 결과가 없습니다.</div></td>
                                    </tr>
                                    <tr className='mNoLine'>
                                        <td colSpan={6}><div className='noList'>결제내역이 없습니다.</div></td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                        <Pagenation />
                    </div>
                </article>
            </div>
        </section>
        {isModal && 
            <ModalAlertPresent >
                <div className='alertPop' style={{display:'block'}}>
                    <h1 className='pt'>알림</h1>
                    <div className='pBack'>
                        등록된 카드 정보가 없습니다. <br/>
                        내 카드 정보를 등록해주세요.
                    </div>
                    <div className='pBtn'>
                        <BaseButton label={'확인'} className={'btnB'} 
                        onClick={() => {
                            setIsModal(false); 
                            setIsModal2(true); 
                            setCardOn(true);
                        }} />
                    </div>
                </div>
            </ModalAlertPresent>
        }
        {isModal2 && 
            <ModalPresent >
                <ChargeModal onClose={() => {setIsModal2(false)}}/>
            </ModalPresent>
        }
        {isModal3 && 
            <ModalPresent >
                <CardModal onClose={() => {setIsModal3(false)}}/>
            </ModalPresent>
        }
        {isModal4 && 
            <ModalPresent >
                <PayRefundModal onClose={() => {setIsModal4(false)}}/>
            </ModalPresent>
        }
        {isModal5 && 
            <ModalPresent >
                <ChargeRefundModal onClose={() => {setIsModal5(false)}}/>
            </ModalPresent>
        }
        {isModal6 && 
            <ModalPresent >
                <HaveRefundModal onClose={() => {setIsModal6(false)}}/>
            </ModalPresent>
        }
    </>
  );
};

export default MileagePage;
