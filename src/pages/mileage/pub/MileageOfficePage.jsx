import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Pagenation, BaseInput, BaseSelect, ItemTag, BaseButton } from '@components/common';
import HoldingModal from '../../components/ui/modal/HoldingModal';
import SettlementModal from '../../components/ui/modal/SettlementModal';
import {ModalPresent} from '@components/common';

const MileageOfficePage = () => {
  const tems = [{ name: '전체', value: 0 }, { name: '1개월', value: 1 }, { name: '3개월', value: 2 }, { name: '6개월', value: 3 }, { name: '1년', value: 4 }, { name: '기간 지정', value: 5 }];
  const [isModal, setIsModal] = useState(false);  
  const [isModal2, setIsModal2] = useState(false);  
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
                    <div className='mSummery officeCase'>
                        <div>
                            <dl>
                                <dt>정산 마일리지</dt>
                                <dd>
                                    <span><em>0</em>P(￦)</span>
                                    <span><em>0</em>P($)</span>
                                </dd>
                            </dl>
                        </div>
                        <div>
                            <dl>
                                <dt>보유 마일리지</dt>
                                <dd>
                                    <span><em>0</em>P(￦)</span>
                                    <span><em>0</em>P($)</span>
                                </dd>
                            </dl>
                            <span className='right'>
                                <BaseButton label={'잔액 정산'} className={'btnB ss'} onClick={() => setIsModal(true)} />
                            </span>
                        </div>
                    </div>
                    <div className='infoNotes'>
                        <dl>
                            <dt>마일리지 정산안내</dt>
                            <dd> 
                                마일리지 정산은 당월 요청건에 한하여, 익월 영업일 기준 10일이내에 처리됩니다. <br />
                                정산 요청 시, 덴트너로 전자계산서 발행이 완료된 건에 한하여 정산이 가능합니다.
                            </dd>
                        </dl>
                        <dl className='bill'>
                            <dt>[전자계산서 항목]</dt>
                            <dd> 
                                사업자등록번호 : 231-86-02630 <br />
                                상호 : 주식회사 덴트너 <br />
                                사업장 주소 : 광주광역시 북구 첨단과기로123, B동 501-5 <br />
                                업태 : 정보통신업 <br />
                                종목 : 응용소프트웨어 개발 및 공급 <br />
                                이메일 : support@dentner.com <br />
                                품목 : CAD file <br />
                                공급가액 : 실 예정 정산금액 <br />
                            </dd>
                        </dl>
                        <p><span>❗️ </span>의뢰인의 환불 요청이 들어온 거래의 경우, 치자이너와 덴트너의 승인이 필요합니다. 덴트너에게 연락주시길 바랍니다.</p>
                    </div>
                </div>
                <div className='tabNav mileageTab'>
                    <nav className='center'>
                        <ul>
                            <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>마일리지 입금내역</button></li>
                            <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>마일리지 정산내역</button></li>
                        </ul>
                    </nav>
                </div>
                <article className={`${tab === 1 ? 'mOn' : ''}`}>
                    <div className='listBox'>
                        <div className='mOSRBack'>
                            <div className='listTit lCase'>
                                <h3>마일리지 입금내역</h3>
                                <div className='back'>
                                    <div className='sorting sts'>
                                        <span>
                                            <input type='radio' id='sortingSts1' name='sortingSts1' defaultChecked />
                                            <label htmlFor='sortingSts1'>전체</label>
                                        </span>
                                        <span>
                                            <input type='radio' id='sortingSts2' name='sortingSts1'  />
                                            <label htmlFor='sortingSts2'>원화 P(￦)</label>
                                        </span>
                                        <span>
                                            <input type='radio' id='sortingSts3' name='sortingSts1' />
                                            <label htmlFor='sortingSts3'>달러 P($)</label>
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
                            <div className='settlementRule'>
                                <p>
                                    <span>
                                        <strong>[국내] 원화 P(￦) <i>:</i></strong> PG사 수수료 2.8%(VAT포함 3.08)를 제외한 금액이 입금됩니다.<br/>
                                        <span><em>&lt;정산식&gt;</em> 원화 마일리지 - PG수수료(PG부가세 포함) <span>= 실 예정 정산금액 (원)</span></span>
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        <strong>[국외] 달러 P($) <i>:</i></strong> 덴트너 수수료(PG사 수수료 포함) 10%를 차감한 금액이 입금됩니다.<br/>
                                        <span><em>&lt;정산식&gt;</em> 달러 마일리지 x 90% x 환율  <span>= 실 예정 정산금액 (원)</span></span>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className='mileageList depositCase'>
                            <table>
                                <colgroup>
                                    <col width={60} />
                                    <col width={180} />
                                    <col width={137} />
                                    <col width={190} />
                                    <col />
                                    <col width={100} />
                                    <col width={100} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>마일리지</th>
                                        <th>이체내역</th>
                                        <th>실 예정 정산금액</th>
                                        <th>상세 내용</th>
                                        <th>결제일자</th>
                                        <th>정산요청</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><em>달러</em></td>
                                        <td>+ 100 P($)</td>
                                        <td>138,550원 </td>
                                        <td>450,000,000원 </td>
                                        <td>의뢰인 명 / 요청서 제목</td>
                                        <td className='date'>2024.05.05</td>
                                        <td className='sts'><span>정산완료</span></td>
                                    </tr>
                                    <tr className='won'>
                                        <td><em>원화</em></td>
                                        <td>+ 10,000 P(￦)</td>
                                        <td>10,000원</td>
                                        <td>450,000원</td>
                                        <td>의뢰인 명 / 요청서 제목</td>
                                        <td className='date'>2024.05.04</td>
                                        <td className='sts'><em>정산진행중</em></td>
                                    </tr>
                                    <tr className='won'>
                                        <td><em>원화</em></td>
                                        <td>+ 10,000 P(￦)</td>
                                        <td>10,000원</td>
                                        <td>450,000원</td>
                                        <td>의뢰인 명 / 요청서 제목</td>
                                        <td className='date'>2024.05.04</td>
                                        <td className='sts'><BaseButton label={'정산요청'}  onClick={() => setIsModal2(true)} /></td>
                                    </tr>
                                    {/* <tr className='mNoLine'>
                                        <td colSpan={7}><div className='noList search'>검색 결과가 없습니다.</div></td>
                                    </tr>
                                    <tr className='mNoLine'>
                                        <td colSpan={7}><div className='noList'>입금내역이 없습니다.</div></td>
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
                            <h3>마일리지 정산내역</h3>
                            <div className='back'>
                                <div className='sorting sts'>
                                    <span>
                                        <input type='radio' id='sortingSts21' name='sortingSts12' defaultChecked />
                                        <label htmlFor='sortingSts21'>전체</label>
                                    </span>
                                    <span>
                                        <input type='radio' id='sortingSts22' name='sortingSts12'  />
                                        <label htmlFor='sortingSts22'>정산요청</label>
                                    </span>
                                    <span>
                                        <input type='radio' id='sortingSts23' name='sortingSts12' />
                                        <label htmlFor='sortingSts23'>정산진행</label>
                                    </span>
                                    <span>
                                        <input type='radio' id='sortingSts24' name='sortingSts12' />
                                        <label htmlFor='sortingSts24'>정산완료</label>
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
                        <div className='mileageList calculateCase'>
                            <table>
                                <colgroup>
                                    <col width={65} />
                                    <col width={242} />
                                    <col width={183} />
                                    <col />
                                    <col width={108} />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th>구분</th>
                                        <th>마일리지</th>
                                        <th>정산금액</th>
                                        <th>상세 내용</th>
                                        <th>요청일자</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className='ing'>
                                        <td><em>정산 진행</em></td>
                                        <td>450,000,000 P(￦)</td>
                                        <td>138,550원 </td>
                                        <td>의뢰인 명 / 요청서 제목</td>
                                        <td className='date'>2024.05.07</td>
                                    </tr>
                                    <tr className='end'>
                                        <td><em>정산 완료</em></td>
                                        <td>90,000,000 P(￦)</td>
                                        <td>1,385,500원 </td>
                                        <td>의뢰인 명 / 요청서 제목</td>
                                        <td className='date'>2024.05.04</td>
                                    </tr>
                                    <tr>
                                        <td><em>정산 요청</em></td>
                                        <td>1,000 P($)</td>
                                        <td>10,000원</td>
                                        <td>의뢰인 명 / 요청서 제목</td>
                                        <td className='date'>2024.05.04</td>
                                    </tr>
                                    {/* <tr className='mNoLine'>
                                        <td colSpan={5}><div className='noList search'>검색 결과가 없습니다.</div></td>
                                    </tr>
                                    <tr className='mNoLine'>
                                        <td colSpan={5}><div className='noList'>정산내역 없습니다.</div></td>
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
            <ModalPresent >
                <HoldingModal onClose={() => {setIsModal(false)}}/>
            </ModalPresent>
        }
        {isModal2 && 
            <ModalPresent >
                <SettlementModal onClose={() => {setIsModal2(false)}}/>
            </ModalPresent>
        }
    </>
  );
};

export default MileageOfficePage;