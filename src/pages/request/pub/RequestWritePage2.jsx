import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import sampleProfile2 from '@assets/images/sample/sample4.jpeg';
import { Link } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton, BaseSelect } from '@components/common';
import ReqAddModal from '../../../components/ui/modal/ReqAddModal';
import DesignerChoiceModal from '../../../components/ui/modal/DesignerChoiceModal';
import {ModalPresent} from '@components/common';

const RequestWritePage = () => {
    const [isModal, setIsModal] = useState(false);
    const [isModal2, setIsModal2] = useState(false);
    const cadss = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }, { name: '기타 : 입력한 내용이 출력됨' }];
    const way = [{ name: 'Milling [Zirconia]' }, { name: 'Milling [Zirconia]' }, { name: 'Milling [Zirconia]' }];

  return (
    <>
        <section>
            <div className='writeBox'>
                <h2><strong>지정 요청서</strong> 작성하기</h2>
                <div className='tws'>
                    <form>
                        <div className="detail">
                            <dl>
                                <dt>
                                    지정할 치자이너를 선택해주세요
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <span className='ipBBtn'>
                                        <BaseInput type='text' placeholder='관심 치자이너로 등록되어 있는 치자이너를 선택할 수 있어요.' />
                                        <BaseButton label='지정 치자이너 선택하기' onClick={() => setIsModal2(true)}/>
                                    </span>
                                </dd>
                            </dl>
                            <dl>
                                <dt className='etc'>
                                    <span>
                                        미리 저장해둔 의뢰서를 추가하세요
                                        <sup>필수항목</sup>
                                    </span>
                                    <em className='fileNum'>
                                        (<strong>2</strong>/10)
                                    </em>
                                </dt>
                                <dd>
                                    <BaseButton label='의뢰서 추가하기' className='bFl' onClick={() => setIsModal(true)} />
                                    <ol className="reQfileLoad">
                                        <li>
                                            <span>
                                                <em>의뢰서 1</em>
                                                <em>@8321430183048173057</em>
                                                <em>교정 32</em>
                                            </span>
                                            <button className='bID'>Del</button>
                                        </li>
                                        <li>
                                            <span>
                                                <em>의뢰서 6</em>
                                                <em>@8321~430187</em>
                                                <em>교정 32 / 인레이 8</em>
                                            </span>
                                            <button className='bID'>Del</button>
                                        </li>
                                    </ol>
                                    <div className='priceSet'>
                                        <span>
                                            총 결제 금액
                                        </span>
                                        <strong className='right'>
                                            <strong>500,000</strong> <em>P(￦)</em>
                                        </strong>
                                    </div>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    제목
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <BaseInput type="text" placeholder="요청하는 보철물 종류와 개수를 작성하세요 (공백 미포함 30자)" />
                                    <p className='guide'>[예시] 크라운 3 인레이 5 / 하악 프레임</p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    불러온 의뢰서 안에 포함된 <strong>보철종류를 모두 선택해주세요 <sup>필수항목</sup></strong>
                                </dt>
                                <dd className='itemSelect'>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox1' />
                                        <label htmlFor='checkbox1'>크라운</label>
                                    </span>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox2' />
                                        <label htmlFor='checkbox2'>캡</label>
                                    </span>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox3' />
                                        <label htmlFor='checkbox3'>어비트먼트</label>
                                    </span>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox4' />
                                        <label htmlFor='checkbox4'>인레이/온레이</label>
                                    </span>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox5' />
                                        <label htmlFor='checkbox5'>의치</label>
                                    </span>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox6' />
                                        <label htmlFor='checkbox6'>스프린트/서지컬가이드</label>
                                    </span>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox7' />
                                        <label htmlFor='checkbox7'>개인트레이</label>
                                    </span>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox8' />
                                        <label htmlFor='checkbox8'>프레임</label>
                                    </span>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox9' />
                                        <label htmlFor='checkbox9'>교정</label>
                                    </span>
                                    <span className='checkSet'>
                                        <input type='checkbox' id='checkbox10' />
                                        <label htmlFor='checkbox10'>기타</label>
                                    </span>
                                </dd>
                                <dd className="itemMSelect">
                                    <BaseSelect items={way} placeholder={'크라운'} onChange={(e) => console.log(e)} />
                                    <input type="text" placeholder="보철종류 입력하세요" />
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    견적요청 만료시간
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <span className='calUnit '>
                                        <em>날짜</em>
                                        <input type='text' defaultValue='24.03.02.월' />
                                    </span>
                                    <span className='calUnit time'>
                                        <em>시간</em>
                                        <input type='text' defaultValue='11:30' />
                                    </span> 
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    납품 마감시간
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <span className='calUnit '>
                                        <em>날짜</em>
                                        <input type='text' defaultValue='24.03.02.월' />
                                    </span>
                                    <span className='calUnit time'>
                                        <em>시간</em>
                                        <input type='text' defaultValue='11:30' />
                                    </span> 
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    선호 CAD S/W
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <ItemTag items={cadss} className='itemTag' />
                                    <p className='guide'>선호 CAD S/W는 프로필에서 수정해주세요.</p>
                                </dd>
                            </dl>
                            <dl>
                                <dt>
                                    요청사항
                                    <sup>필수항목</sup>
                                </dt>
                                <dd>
                                    <textarea placeholder='치자이너가 작업 시 참고해야할 요청사항을 작성해주세요 (최대 1,000자)'></textarea>
                                </dd>
                            </dl>
                        </div>
                        <div className='btnArea'>
                            <BaseButton label={'작성완료'} className={'btnB'} />
                        </div>
                    </form>
                </div>
            </div>
        </section>
        {isModal && 
            <ModalPresent >
                <ReqAddModal onClose={() => {setIsModal(false)}}/>
            </ModalPresent>
        }
        {isModal2 && 
            <ModalPresent >
                <DesignerChoiceModal onClose={() => {setIsModal2(false)}}/>
            </ModalPresent>
        }
    </>
  );
};

export default RequestWritePage;
