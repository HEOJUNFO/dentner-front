import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BaseButton } from '@components/common';
import sampleProfile from '@assets/images/sample/sample8.png';
import samplePartner from '@assets/images/sample/sample5.png';
import tipImage11 from '@assets/images/img_modeTip11.png';
import tipImage12 from '@assets/images/img_modeTip12.png';
import tipImage13 from '@assets/images/img_modeTip13.png';
import tipImage14 from '@assets/images/img_modeTip14.png';
import tipImage21 from '@assets/images/img_modeTip21.png';
import tipImage22 from '@assets/images/img_modeTip22.png';
import tipImage23 from '@assets/images/img_modeTip23.png';
import tipImage24 from '@assets/images/img_modeTip24.png';
import stepImage1 from '@assets/images/img_request_step1.png';
import stepImage2 from '@assets/images/img_request_step2.png';
import stepImage3 from '@assets/images/img_request_step3.png';
import stepImage4 from '@assets/images/img_request_step4.png';
import serviceImg1 from '@assets/images/img_service01.png';
import serviceImg2 from '@assets/images/img_service02.png';

const ServicePage = () => {
  const [tab , setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  }
  const [tab2 , setTab2] = useState(1);
  const handleTab2 = (tab2) => {
    setTab2(tab2);
  }
  const [tab3 , setTab3] = useState(1);
  const handleTab3 = (tab3) => {
    setTab3(tab3);
  }
  const tabRef = useRef();

  return (
    <>
      {/* 서비스소개 메인비주얼 */}
      <div className='serviceVisual'>
        <img src={serviceImg1} />
      </div>
      {/* CAD 디자인 */}
      <div className='mainCad serviceCase'>
        <div className='infoAreaTit'>
          <em>CAD 디자인 파일이 필요하세요?</em>
          <strong>
            덴트너에서 <strong>CAD File</strong>을 의뢰하고,<br/>
            한국 디자이너를 만나보세요!
          </strong>
          <span className='subT'>덴트너는 <strong>다양한 File</strong>을 제공합니다</span>
        </div>
        <div className='go'>
          <BaseButton label={'크라운&캡'} />
          <BaseButton label={'인레이(온레이)'} />
          <BaseButton label={'프레임'} />
          <BaseButton label={'의치 및 배열'} />
          <BaseButton label={'스프린트 및 서지컬 가이드'} />
          <BaseButton label={'교정'} />
          <BaseButton label={'어비트먼트'} />
          <BaseButton label={'기타'} />
        </div>
      </div>
      {/* 비용안내 */}
      <div className='serviceCostInfo'>
        <img src={serviceImg2} />
      </div>
      {/* 추천 */}
      <div className='serviceSuggest'>
        <div className='infoAreaTit'>
          <em>Check!</em>
          <strong>
            <strong>덴트너,</strong> 이런 사람에게 추천해요!<br/>
          </strong>
        </div>
        <ul>
          <li>3D프린터, 밀링머신은 있는데, 디자이너가 없는 경우</li>
          <li>디자인을 어디에 의뢰 할지 모르는 경우</li>
          <li>매번 같은 말을 반복할 필요 없는 나만의 CAD 디자이너를 원하는 경우</li>
          <li>디자이너 인건비가 부담스러운 경우</li>
          <li>계산서 발행이 가능한 디자이너를 찾는 경우</li>
        </ul>
      </div>
      {/* 치과기공소 */}
      <div className='mainCenterMapBack'>
        <div className='mainCenterMap'>
          <div className='infoAreaTit'>
            <em>치과보철물 제작이 필요하세요?</em>
            <strong>
              전국 각지에 흩어져있는<br/>
              <strong>치과기공소</strong>를 소개합니다!
            </strong>
            <span className='subT'>덴트너는 <strong>다양한 소통을 지향</strong>합니다</span>
            <span className='infoTxt'>지역 선택하고 치과기공소 찾아보기<span></span></span>
          </div>
          <div className='centerMap'>
            <Link to=''>서울</Link>
            <Link to=''>경기</Link>
            <Link to=''>인천<span>부천</span></Link>
            <Link to=''>춘천<span>강원</span></Link>
            <Link to=''>대전<span>충남</span><span>세종</span></Link>
            <Link to=''>청주<span>충북</span></Link>
            <Link to=''>대구<span>경북</span></Link>
            <Link to=''>전주<span>전북</span></Link>
            <Link to=''>광주<span>전남</span></Link>
            <Link to=''>부산<span>울산</span><span>경남</span></Link>
            <Link to=''>제주</Link>
          </div>
        </div>
      </div>
      {/* 용어 */}
      <div className='serviceKeyTerms'>
        <div className='infoAreaTit'>
          <strong>
            <strong>덴트너</strong>의 주요 용어를 알아볼까요?<br/>
          </strong>
        </div>
        <div className='key'>
          <dl>
            <dt>의뢰서</dt>
            <dd>
              의뢰인이 <em>환자에 대한<br/>
              정보</em>를 작성하는 문서에요
            </dd>
          </dl>
          <dl>
            <dt>요청서</dt>
            <dd>
              의뢰인이 이전에 작성한 의뢰서를 한번에<br/>
              <em>치자이너에게 요청</em>하는 문서에요
            </dd>
          </dl>
          <dl>
            <dt>견적서</dt>
            <dd>
              치자이너가 의뢰인의 요청서를 받고<br/>
              <em>거래 금액에 대한 견적</em>을 주는 문서에요<br/>
              <i>* 지정요청은 견적없이 바로 의뢰가 가능합니다!</i>
            </dd>
          </dl>
        </div>
      </div>
      {/* 의뢰서 작성 TIP */}
      <div className='mainTip'>
        <div className='infoAreaTit'>
          <em>이것만 알면 쉬워요!</em>
          <strong>
            상황에 따라 달라지는<br/>
            모드별 의뢰서 작성 <strong>TIP!</strong>
          </strong>
        </div>
        <div className='tabNav mainCase' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab === 1 ? 'on' : ''}`}><button onClick={() => handleTab(1)}>간편모드</button></li>
                    <li className={`${tab === 2 ? 'on' : ''}`}><button onClick={() => handleTab(2)}>상세모드</button></li>
                </ul>
            </nav>
        </div>
        {/* -- */}
        {tab === 1 && 
          <div>
            <div className='topSlogan'>
              <div>
                <span>
                  <em>여러 명의 환자</em>를 <br/>
                  <em>한꺼번에 의뢰</em>할 수 있어요.
                </span>
              </div>
            </div>
            <div className='mReqStep'>
              <dl>
                <dt><strong>01</strong>  의뢰번호 작성</dt>
                <dd className='txt'>
                  환자의 개인정보를 위해 이름 대신<br/>
                  <strong>숫자 또는 기호로 의뢰번호를 작성</strong>해 주세요
                </dd>
                <dd><span><img src={tipImage11} /></span></dd>
              </dl>
              <dl>
                <dt><strong>02</strong>  보철종류 선택</dt>
                <dd className='txt'>
                  “보철종류” 선택을 눌러<br/>
                  <strong>원하는 보철종류를 선택</strong>해주세요
                </dd>
                <dd><span><img src={tipImage12} /></span></dd>
              </dl>
              <dl>
                <dt><strong>03</strong>  보철종류 별 개수 입력</dt>
                <dd className='txt'>
                  선택한 각 보철종류마다<br/>
                  <strong>필요한 보철물 개수를 입력</strong>해주세요
                </dd>
                <dd><span><img src={tipImage13} /></span></dd>
              </dl>
              <dl>
                <dt><strong>04</strong>  파일 첨부</dt>
                <dd className='txt'>
                  "파일 첨부하기"를 눌러<br/>
                  <strong>스캔파일을 업로드</strong> 해주세요
                </dd>
                <dd><span><img src={tipImage14} /></span></dd>
              </dl>
            </div>
          </div>
        }
        {tab === 2 && 
          <div>
            <div className='topSlogan detailCase'>
              <div>
                <span>
                  <em>한 명의</em>를 <br/>
                  <em>상세하게 의뢰</em>할 수 있어요.
                </span>
              </div>
            </div>
            <div className='mReqStep'>
              <dl>
                <dt><strong>01</strong>  의뢰번호 작성</dt>
                <dd className='txt'>
                  환자의 개인정보를 위해 이름 대신<br/>
                  <strong>숫자 또는 기호로 의뢰번호를 작성</strong>해 주세요
                </dd>
                <dd><span><img src={tipImage21} /></span></dd>
              </dl>
              <dl>
                <dt><strong>02</strong>  보철종류 및 치식 선택</dt>
                <dd className='txt'>
                  <strong>“보철종류” 선택</strong>을 눌러<br/>
                  <strong>원하는 "치식"을 선택</strong>해주세요
                </dd>
                <dd><span><img src={tipImage22} /></span></dd>
              </dl>
              <dl>
                <dt><strong>03</strong>  상세 내용 작성</dt>
                <dd className='txt'>
                  수치값, 디자인 내용등<br/>
                  <strong>상세 내용을 작성</strong>해 주세요
                </dd>
                <dd><span><img src={tipImage23} /></span></dd>
              </dl>
              <dl>
                <dt><strong>04</strong>  파일 첨부</dt>
                <dd className='txt'>
                  "파일 첨부하기"를 눌러<br/>
                  <strong>스캔파일을 업로드</strong> 해주세요
                </dd>
                <dd><span><img src={tipImage24} /></span></dd>
              </dl>
            </div>
          </div>
        }
      </div>
      {/* 요청 */}
      <div className='mainRequest'>
        <div className='infoAreaTit'>
          <em>지정요청으로 견적없이 간편하게!</em>
          <strong>
            덴트너에서는 디자이너에게<br/>
            <strong>공개요청</strong>과 <strong>지정요청</strong>을 할 수 있어요!
          </strong>
        </div>
        <div className='tabNav mainCase' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab2 === 1 ? 'on' : ''}`}><button onClick={() => handleTab2(1)}>공개요청</button></li>
                    <li className={`${tab2 === 2 ? 'on' : ''}`}><button onClick={() => handleTab2(2)}>지정요청</button></li>
                </ul>
            </nav>
        </div>
        {/* -- */}
        {tab2 === 1 && 
          <div className='mRStep'>
            <div>
              <dl>
                <dt>
                  <strong>STEP<strong>1</strong></strong>
                  의뢰서를<br/>미리 작성하세요
                </dt>
                <dd>
                  의뢰서를 미리 작성하고,<br/>
                  의뢰서 바구니에 저장하세요
                </dd>
              </dl>
              <span><img src={stepImage1} /></span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>STEP<strong>2</strong></strong>
                  의뢰서를 불러온 후<br/>요청서를 작성하세요
                </dt>
                <dd>
                  공개 요청하기에서 미리 작성한<br/>
                  의뢰서를 불러온 후,<br/>
                  나머지 필수 항목들을 작성하세요 
                </dd>
              </dl>
              <span><img src={stepImage2} /></span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>STEP<strong>3</strong></strong>
                  치자이너에게<br/>견적서를 받으세요
                </dt>
                <dd>
                  견적서를 준 치자이너 중,<br/>
                  마음에 드는 치자이너를 선택하세요!
                </dd>
              </dl>
              <span><img src={stepImage3} /></span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>STEP<strong>4</strong></strong>
                  매칭완료! <br/> 거래를 진행하세요
                </dt>
                <dd>
                  매칭이 완료되어,<br/>
                  거래를 진행할 수 있어요!
                </dd>
              </dl>
              <span><img src={stepImage4} /></span>
            </div>
            <Link to='/request' className='goReQuest' >더 알아보기</Link>
          </div>
        }
        {tab2 === 2 && 
          <div className='mRStep'>
            <div>
              <dl>
                <dt>
                  <strong>STEP<strong>1</strong></strong>
                  의뢰서를<br/>미리 작성하세요
                </dt>
                <dd>
                  의뢰서를 미리 작성하고,<br/>
                  의뢰서 바구니에 저장하세요
                </dd>
              </dl>
              <span><img src={stepImage1} /></span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>STEP<strong>2</strong></strong>
                  의뢰서를 불러온 후<br/>요청서를 작성하세요
                </dt>
                <dd>
                  공개 요청하기에서 미리 작성한<br/>
                  의뢰서를 불러온 후,<br/>
                  나머지 필수 항목들을 작성하세요 
                </dd>
              </dl>
              <span><img src={stepImage2} /></span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>STEP<strong>3</strong></strong>
                  원하는 치자이너를 <br/>선택하고, <br/>바로 요청하세요
                </dt>
                <dd>
                  기존 거래 이력이 있거나,<br/>
                  프로필에서 마음에 드는<br/>
                  치자이너에게 견적 요청 없이,<br/>
                  바로 의뢰할 수 있어요!
                </dd>
              </dl>
              <span><img src={stepImage3} /></span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>STEP<strong>4</strong></strong>
                  매칭완료! <br/> 거래를 진행하세요
                </dt>
                <dd>
                  매칭이 완료되어,<br/>
                  거래를 진행할 수 있어요!
                </dd>
              </dl>
              <span><img src={stepImage4} /></span>
            </div>
            <Link to='/request' className='goReQuest' >더 알아보기</Link>
          </div>
        }
      </div>
      {/* 덴트너 이용 */}
      <div className='mainUsed'>
        <div className='infoAreaTit'>
          <strong className='big'>
            <span>많은 사람들이</span> 덴트너를 이용하고 있어요!
          </strong>
        </div>
        <div className='num'>
          <span>
            <strong><strong>120</strong>명</strong>
            가입자 수
          </span>
          <span>
            <strong><strong>526</strong>개</strong>
            의뢰 수
          </span>
          <span>
            <strong><strong>7,613,849</strong>원</strong>
            거래 총 금액
          </span>
        </div>
      </div>
      {/* 고객사 */}
      <div className='mainPartner'>
        <div className='infoAreaTit'>
          <strong>
            <span>덴트너는 국내외 여러</span><br/>
            고객사와 함께하고 있어요!
          </strong>
        </div>
        <ul>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
          <li><Link to=''><img src={samplePartner} /></Link></li>
        </ul>
      </div>
      {/* FAQ */}
      <div className='mainFaq'>
        <div className='infoAreaTit'>
          <em>더 궁금한 점이 있으신가요?</em>
          <strong>FAQ</strong>
        </div>
        <div className='tabNav faqCase mainCase' ref={tabRef} >
            <nav>
                <ul>
                    <li className={`${tab3 === 1 ? 'on' : ''}`}><button onClick={() => handleTab3(1)}>공통</button></li>
                    <li className={`${tab3 === 2 ? 'on' : ''}`}><button onClick={() => handleTab3(2)}>의뢰인</button></li>
                    <li className={`${tab3 === 3 ? 'on' : ''}`}><button onClick={() => handleTab3(3)}>치과기공소</button></li>
                    <li className={`${tab3 === 4 ? 'on' : ''}`}><button onClick={() => handleTab3(4)}>치자이너</button></li>
                </ul>
            </nav>
        </div>
        {/* -- */}
        {tab3 === 1 && 
          <div className="fqalsBack">
            <div className="fqals">
              <div>
                <dl>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    등록된 답변 내용이 노출됩니다
                  </dd>
                </dl>
                <dl className='on'>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.
                  </dd>
                </dl>
                <dl>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    등록된 답변 내용이 노출됩니다
                  </dd>
                </dl>
              </div>
            </div>
            <div className='btn'>
              <Link to='/request'>더보기</Link>
            </div>
          </div>
        }
        {tab3 === 2 && 
          <div className="fqalsBack">
            <div className="fqals">
              <div>
                <dl>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    등록된 답변 내용이 노출됩니다
                  </dd>
                </dl>
                <dl className='on'>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.
                  </dd>
                </dl>
                <dl>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    등록된 답변 내용이 노출됩니다
                  </dd>
                </dl>
              </div>
            </div>
            <div className='btn'>
              <Link to='/request'>더보기</Link>
            </div>
          </div>
        }
        {tab3 === 3 && 
          <div className="fqalsBack">
            <div className="fqals">
              <div>
                <dl>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    등록된 답변 내용이 노출됩니다
                  </dd>
                </dl>
                <dl className='on'>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.
                  </dd>
                </dl>
                <dl>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    등록된 답변 내용이 노출됩니다
                  </dd>
                </dl>
              </div>
            </div>
            <div className='btn'>
              <Link to='/request'>더보기</Link>
            </div>
          </div>
        }
        {tab3 === 4 && 
          <div className="fqalsBack">
            <div className="fqals">
              <div>
                <dl>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    등록된 답변 내용이 노출됩니다
                  </dd>
                </dl>
                <dl className='on'>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어어쩌구저쩌꾸워워이니앙르이이얄대어입니다.
                  </dd>
                </dl>
                <dl>
                  <dt>
                    덴트너는 어떤 서비스 인가요?
                  </dt>
                  <dd>
                    등록된 답변 내용이 노출됩니다
                  </dd>
                </dl>
              </div>
            </div>
            <div className='btn'>
              <Link to='/request'>더보기</Link>
            </div>
          </div>
        }
      </div>
      {/*  */}
      <div className='sampleBox'>
        <div>규제샌드박스 실종특례 명시 코멘트로 위치 요청 부탁드립니다.</div>
      </div>
    </>
  );
};

export default ServicePage;
