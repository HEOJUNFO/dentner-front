// 약관

import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import { Pagenation, ItemTag, BaseButton } from '@components/common';
import { Link } from 'react-router-dom';
import {getTerms} from "@api/Login.js";
import parse from "html-react-parser";

const ServicePage2 = () => {
  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };
  const tabRef = useRef();

  const [data, setData] = useState()


  useEffect(() => {

    const getData = async () => {
      const result = await getTerms()
      console.log(result)
      setData(result?.data)
    }

    getData()
    //console.log()

  },[])

  return (
    <>
      <section>
        <h2>개인정보 처리방침</h2>
        <article className='serviceRules'>
          {
              data?.useTerms?.termsCn && parse(data?.useTerms?.termsCn)
          }

          {/*<p>*/}
          {/*  ‘덴트너(https://dentner.com)’ 서비스를 제공하는 ㈜덴트너(이하 ‘회사’)는 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」및 관계 법령이 정한바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「 개인정보 보호법 」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이에 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.<br/><br/>*/}
          {/*  ○ 이 개인정보처리방침은 2022년 4월 18일부터 적용됩니다.*/}
          {/*</p>*/}
          {/*<h3>제1조 (개인정보의 처리 목적)</h3>*/}
          {/*<div>*/}
          {/*  <p>*/}
          {/*    회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이 외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「 개인정보 보호법 」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.*/}
          {/*  </p>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      1. 홈페이지 회원가입 및 이용 관리<br/>*/}
          {/*      회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 만14세 미만 아동의 개인정보 처리 시 법정대리인의 동의여부 확인, 서비스 이용관련 각종 고지·통지, 고충처리, 분쟁조정을 위한 기록보존 등을 목적으로 개인정보를 처 리합니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      2. 민원사무 처리<br/>*/}
          {/*      민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.*/}
          {/*      </li>*/}
          {/*    <li>*/}
          {/*      3. 재화 또는 서비스 제공<br/>*/}
          {/*      서비스 제공, 계약서·청구서 발송, 맞춤서비스 제공, 콘텐츠 제공, 본인인증, 전문가 인증, 요금결제·정산, 채권추심 등을 목적으로 개인정보를 처리합니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      4. 마케팅 및 광고에의 활용<br/>*/}
          {/*      신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 , 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.*/}
          {/*      </li>*/}
          {/*    <li>*/}
          {/*      5. 서비스 개선<br/>*/}
          {/*      회사 서비스 개선 목적으로 고객의 서비스 이용 기록, 접속 빈도 및 서비스 이용에 대한 통계 정보를 수집하고 있으며, 고객의 프라이버시 보호 측면의 서비스 환경 구축하기 위한 자료로 사용될 수 있음을 안내 드립니다.*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제2조 (개인정보의 처리 및 보유 기간)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</li>*/}
          {/*    <li>*/}
          {/*      ② 각각의 개인정보 처리 및 보유기간은 다음과 같습니다.*/}
          {/*      <ol>*/}
          {/*        <li>*/}
          {/*          1. 홈페이지 회원 가입 및 관리 : 회사 홈페이지 탈퇴 시까지 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지*/}
          {/*          <ol>*/}
          {/*            <li>가. 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료시까지 </li>*/}
          {/*            <li>나. 홈페이지 이용에 따른 채권·채무관계 잔존 시에는 해당 채권·채무관계 정산 시까지</li>*/}
          {/*          </ol>*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          2. 재화 또는 서비스 제공 : 재화·서비스 공급완료 및 요금결제·정산 완료시까지 다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료 시까지*/}
          {/*          <ol>*/}
          {/*            <li>*/}
          {/*              가. 「전자상거래 등에서의 소비자 보호에 관한 법률」에 따른 표시·광고, 계약내용 및 이행 등 거래에 관한 기록<br/>*/}
          {/*              - 표시·광고에 관한 기록 : 6개월<br/>*/}
          {/*              - 계약 또는 청약철회, 대금결제, 재화 등의 공급기록 : 5년<br/>*/}
          {/*              - 소비자 불만 또는 분쟁처리에 관한 기록 : 3년 대금 결제 및 재화 등의 공급에 관한 기록 : 5년<br/>*/}
          {/*            </li>*/}
          {/*            <li>*/}
          {/*              나. 「통신비밀보호법」에 따른 통신사실확인자료 보관<br/>*/}
          {/*              - 가입자 전기통신일시, 개시·종료시간, 상대방 가입자번호, 사용도수, 발신기지국 위치추 적자료 : 1년<br/>*/}
          {/*              - 컴퓨터 통신, 인터넷 로그기록자료, 접속지 추적자료 : 3개월*/}
          {/*            </li>*/}
          {/*            <li>다. 「국세기본법」이 규정하는 모든 거래에 관한 장부 및 증빙서류 : 5년</li>*/}
          {/*            <li>라. 「전자금융거래법」에 따른 전자금융 거래에 관한 기록 : 5년</li>*/}
          {/*            <li>마. 「전자문서 및 전자거래 기본법」에 따른 공인전자주소를 통한 전자문서 유통에 관한 기록 : 10년</li>*/}
          {/*            <li>바. 「의료기사 등에 관한 법률」에 따른 치과기공물제작의뢰서 : 2년</li>*/}
          {/*          </ol>*/}
          {/*        </li>*/}
          {/*      </ol>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제3조 (개인정보 수집항목 및 수집방법)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      ① 회사는 텍스트, 이미지, 음성 등의 개인정보를 수집 및 이용할 수 있습니다. 회사가 수집하는 정보 및 보유기간에 대한 상세한 내용은 다음과 같습니다.*/}
          {/*      <table>*/}
          {/*        <colgroup>*/}
          {/*          <col width={15} />*/}
          {/*          <col width={25} />*/}
          {/*          <col width={25} />*/}
          {/*          <col width={10} />*/}
          {/*          <col width={15} />*/}
          {/*        </colgroup>*/}
          {/*        <thead>*/}
          {/*          <tr>*/}
          {/*            <th>서비스 이용단계</th>*/}
          {/*            <th>수집목적</th>*/}
          {/*            <th>수집항목</th>*/}
          {/*            <th>보유 및 이용기간</th>*/}
          {/*            <th>수집방법</th>*/}
          {/*          </tr>*/}
          {/*        </thead>*/}
          {/*        <tbody>*/}
          {/*          <tr>*/}
          {/*            <td>회원가입 및 관리</td>*/}
          {/*            <td>*/}
          {/*              회원가입 의사확인,<br/>*/}
          {/*              회원제 서비스 제공에 따른 본인 식별·인증,<br/>*/}
          {/*              회원자격 유지·관리,<br/>*/}
          {/*              서비스 부정이용 방지, <br/>*/}
          {/*              만 14세 미만 회원 가입 방지,<br/>*/}
          {/*              각종 고지·통지,<br/>*/}
          {/*              고충처리 목적*/}
          {/*            </td>*/}
          {/*            <td className='tLeft'>*/}
          {/*              〔의뢰인(치과의사,치과위생사,치과기공사)회원의 경우〕<br/>*/}
          {/*              필수 : 이름, 주소, 아이디, 이메일주소, 비밀번호, 회원구분, 휴대전화번호, 직업, 면허증, 면허증번호, 업종, 사업자등록번호, 상호, 사업장주소, 사업자등록증,<br/><br/>*/}
          {/*              〔치자이너(치과의사,치과기공사)회원의 경우〕<br/>*/}
          {/*              필수 : 이름, 주소, 아이디, 이메일주소, 비밀번호, 회원구분, 휴대전화번호, 직업, 면허증, 면허증번호, 계좌번호, 업종, 사업자등록번호, 상호, 사업장주소,	사업자등록증, 계좌번호(예금주, 은행명)*/}
          {/*            </td>*/}
          {/*            <td>*/}
          {/*              회원 탈퇴 시까지<br/>*/}
          {/*              ※ 단, 관계 법령 위반에 따른 수사,	조사 등이 진행중인 경우에는 해당 수사, 조사 종료시 까지*/}
          {/*            </td>*/}
          {/*            <td>회원가입</td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>견적석 의뢰</td>*/}
          {/*            <td>서비스 제공 및 운영	</td>*/}
          {/*            <td className='tLeft'>필수 : 아이디, 닉네임, 플랫폼내 거래정보	</td>*/}
          {/*            <td>서비스 공급완료 및 요금결제·정산 완료시까지	</td>*/}
          {/*            <td>서비스 이용과정, 전자양식 등을 통하여 수집</td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>견적 입찰</td>*/}
          {/*            <td rowSpan={4}>서비스 제공 및 구매이력 관리</td>*/}
          {/*            <td className='tLeft'>필수 : 아이디, 닉네임, 플랫폼내 거래정보</td>*/}
          {/*            <td></td>*/}
          {/*            <td>서비스 이용과정, 전자양식 등을 통하여 수집</td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>전자계약 체결</td>*/}
          {/*            <td className='tLeft'>필수 : 아이디, 닉네임, 플랫폼내 거래정보, 전자치과기공물의뢰서</td>*/}
          {/*            <td>5년</td>*/}
          {/*            <td>서비스 이용과정, 전자양식 등을 통하여 수집</td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>결제 및 환불 단계</td>*/}
          {/*            <td className='tLeft'>*/}
          {/*              신용카드 결제시 : 카드번호, 카드사명, 유효기간만료일, 비밀번호 앞 두자리<br/>*/}
          {/*              휴대전화번호 결제시 : 휴대전화번호, 결제승인번호<br/>*/}
          {/*              계좌이체시: 예금주명, 계좌번호, 계좌은행*/}
          {/*            </td>*/}
          {/*            <td>5년</td>*/}
          {/*            <td>서비스 이용과정, 전자양식 등을 통하여 수집</td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>세금계산서 및 현금영수 증 발행</td>*/}
          {/*            <td className='tLeft'>*/}
          {/*              세금계산서 발행 : 기업 형태, 사업자명(상호명), 대표자명, 업태, 종목<br/>*/}
          {/*              전자 세금계산서 발급용 이메일<br/>*/}
          {/*              현금영수증발행 : 휴대폰번호, 현금영수증 카드번호, 주민등록번호*/}
          {/*            </td>*/}
          {/*            <td>5년</td>*/}
          {/*            <td>서비스 이용과정, 전자양식 등을 통하여 수집</td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>고객센터 이용단계</td>*/}
          {/*            <td>문의에 대한 답변</td>*/}
          {/*            <td className='tLeft'>1:1 문의 시 : 이메일주소, 휴대전화번호</td>*/}
          {/*            <td>회원탈퇴시까지</td>*/}
          {/*            <td>고객센터를 통한 상담과정에서 웹페이지, 메일, 팩스, 전화 등으로 수집</td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>자동수집</td>*/}
          {/*            <td>서비스 이용</td>*/}
          {/*            <td className='tLeft'>접속로그, IP주소, 쿠키, MAC주소</td>*/}
          {/*            <td>6개월</td>*/}
          {/*            <td>자동수집</td>*/}
          {/*          </tr>*/}
          {/*        </tbody>*/}
          {/*      </table>*/}
          {/*    </li>*/}
          {/*    <li>② 수집한 개인정보는 법령에 따른 개인정보 이용·보유기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 이용·보유기간 내에서 처리 및 보관합니다.</li>*/}
          {/*    <li>③ 회사는 전자상거래 등에서의 소비자보호에 관한 법률, 국세기본법, 전자금융거래법 등 관련 법령에 따라 주민등록번호 및 은행 계좌번호의 수집·보관이 불가피한 경우에는 회원에게 사전 고지하여 정보를 수집할 수 있습니다.</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제4조 (개인정보의 제3자 제공)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>① 회사는 정보주체의 개인정보를 개인정보의 처리 목적에서 명시한 범위 내에서만 처리하며, 정 보주체의 동의, 법률의 특별한 규정 등 「 개인정보 보호법 」 제17조 및 제18조에 해당하는 경 우에만 개인정보를 제3자에게 제공하고 이외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.</li>*/}
          {/*    <li>*/}
          {/*      ② 회사는 원활한 서비스 제공을 위해 다음의 경우 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다.*/}
          {/*      <table>*/}
          {/*        <thead>*/}
          {/*          <tr>*/}
          {/*            <th>제공받는 자</th>*/}
          {/*            <th>제공목적</th>*/}
          {/*            <th>제공항목</th>*/}
          {/*            <th>보유 및 이용기간</th>*/}
          {/*          </tr>*/}
          {/*        </thead>*/}
          {/*        <tbody>*/}
          {/*          <tr>*/}
          {/*            <td>덴트너 클라이언트</td>*/}
          {/*            <td>전문가 정보 확인</td>*/}
          {/*            <td>전무가 프로필, 경력, 후기, 제공 사진</td>*/}
          {/*            <td>계약 종료시</td>*/}
          {/*          </tr>*/}
          {/*        </tbody>*/}
          {/*      </table>*/}
          {/*    </li>*/}
          {/*    <li>③ 회사는 정부 관계부처가 합동으로 발표한 「긴급상황 시 개인정보 처리 및 보호수칙」에 따라 재난, 감영병, 급박한 생명·신체 위험을 초래하는 사건·사고, 급박한 재산손실 등의 긴급상황이 발생하는 경우 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다. 자세한 사항은 여기*를 눌러 확인하시기 바랍니다.</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제5조 (개인정보처리 위탁)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      ① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.*/}
          {/*      <table>*/}
          {/*        <thead>*/}
          {/*          <tr>*/}
          {/*            <th>수탁업체</th>*/}
          {/*            <th>위탁업무내용</th>*/}
          {/*            <th>개인정보의 보유 및 이용기간</th>*/}
          {/*          </tr>*/}
          {/*        </thead>*/}
          {/*        <tbody>*/}
          {/*          <tr>*/}
          {/*            <td></td>*/}
          {/*            <td>신용카드결제 서비스</td>*/}
          {/*            <td rowSpan={2}>*/}
          {/*              회원탈퇴시 혹은 위탁계약 종료시까지, 법령이 정한 시점*/}
          {/*            </td>*/}
          {/*          </tr>*/}
          {/*          <tr>*/}
          {/*            <td>㈜링크허브</td>*/}
          {/*            <td>본인인증 서비스</td>*/}
          {/*          </tr>*/}
          {/*        </tbody>*/}
          {/*      </table>*/}
          {/*    </li>*/}
          {/*    <li>② 회사는 위탁계약 체결시 「 개인정보 보호법 」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임 에 관한 사항을 계약서등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.</li>*/}
          {/*    <li>③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공 개하도록 하겠습니다.</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제6조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.</li>*/}
          {/*    <li>② 제1항에 따른 권리 행사는 사에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠 습니다.</li>*/}
          {/*    <li>③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>*/}
          {/*    <li>④ 개인정보 열람 및 처리정지 요구는 「 개인정보 보호법 」 제35조 제4항, 제37조 제2항에 의하 여 정보주체의 권리가 제한될 수 있습니다.</li>*/}
          {/*    <li>⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.</li>*/}
          {/*    <li>⑥ 회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제7조 (개인정보의 파기)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</li>*/}
          {/*    <li>② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구 하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.</li>*/}
          {/*    <li>*/}
          {/*      ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.*/}
          {/*      <ol>*/}
          {/*        <li>*/}
          {/*          1. 파기절차<br/>*/}
          {/*          회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받 아 개인정보를 파기합니다.*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          2. 파기방법<br/>*/}
          {/*          회사는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종 이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.*/}
          {/*        </li>*/}
          {/*      </ol>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제8조 (미이용자의 개인정보 파기 등에 관한 조치)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>① 회사는 1년간 서비스를 이용하지 않은 이용자의 정보를 파기하고 있습니다. 다만, 다른 법령에서 정한 보존기간이 경과할 때까지 다른 이용자의 개인정보와 분리하여 별도 저장·관리할 수 있습니다.</li>*/}
          {/*    <li>② 회사는 개인정보의 파기 30일 전까지 개인정보가 파기되는 사실, 기간만료일 및 파기되는 개인정보의 항목을 이메일, 문자 등 이용자에게 통지 가능한 방법으로 알리고 있습니다.</li>*/}
          {/*    <li>③ 개인정보의 파기를 원하지 않으시는 경우, 기간 만료 전 서비스 로그인을 하시면 됩니다.</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제9조 (개인정보의 안전성 확보 조치)</h3>*/}
          {/*<div>*/}
          {/*  <p>회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      1. 정기적인 자체 감사 실시<br/>*/}
          {/*      개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      2. 개인정보 취급 직원의 최소화 및 교육<br/>*/}
          {/*      개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      3. 내부관리계획의 수립 및 시행<br/>*/}
          {/*      개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      4. 해킹 등에 대비한 기술적 대책<br/>*/}
          {/*      회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로 그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설 치하고 기술적/물리적으로 감시 및 차단하고 있습니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      5. 개인정보의 암호화<br/>*/}
          {/*      이용자의 개인정보는 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      6. 접속기록의 보관 및 위변조 방지<br/>*/}
          {/*      개인정보처리시스템에 접속한 기록을 최소 1년 이상 보관, 관리하고 있으며, 다만, 5만명 이상의 정보주체에 관하여 개인정보를 추가하거나, 고유식별정보 또는 민감정보를 처리하는 경우에는 2년이상 보관, 관리하고 있습니다.<br/>*/}
          {/*      또한, 접속기록이 위변조 및 도난, 분실되지 않도록 보안기능을 사용하고 있습니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      7. 개인정보에 대한 접근 제한<br/>*/}
          {/*      개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정 보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로 부터의 무단 접근을 통제하고 있습니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      8. 문서보안을 위한 잠금장치 사용<br/>*/}
          {/*      개인정보가 포함된 서류, 보조저장매체 등을 잠금 장치가 있는 안전한 장소에 보관하고 있습니다.*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      9. 비인가자에 대한 출입 통제<br/>*/}
          {/*      개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제10조 (개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.</li>*/}
          {/*    <li>*/}
          {/*      ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.*/}
          {/*      <ol>*/}
          {/*        <li>1.쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</li>*/}
          {/*        <li>2.쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구	&gt;인터넷 옵션	&gt;개인정보 메뉴의 옵션 정을 통해 쿠키 저장을 거부 할 수 있습니다.</li>*/}
          {/*        <li>3.쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>*/}
          {/*      </ol>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제11조 (행태정보의 수집·이용 및 거부 등에 관한 사항)</h3>*/}
          {/*<div>회사는 온라인 맞춤형 광고 등을 위한 행태정보를 수집·이용·제공하지 않습니다.</div>*/}
          {/*<h3>제12조 (개인정보 보호책임자)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      ① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.*/}
          {/*      <p>*/}
          {/*        ▶ 개인정보 보호책임자<br/>*/}
          {/*        부서명 : 대표 <br/>*/}
          {/*        담당자 : 남원욱<br/>*/}
          {/*        연락처 : 070-7174-2377*/}
          {/*      </p>*/}
          {/*    </li>*/}
          {/*    <li>② 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.</li>*/}
          {/*    <li>③ 이용자 개인정보와 관련한 아이디(ID)의 비밀번호에 대한 보안유지책임은 해당 이용자 자신에게 있습니다. 회사는 비밀번호에 대해 어떠한 방법으로도 이용자에게 직접적으로 질문하는 경우는 없으므로 타인에게 비밀번호가 유출되지 않도록 각별히 주의하시기 바랍니다. 특히 공공장소에서 온라인상에서 접속해 있을 경우에는 더욱 유의하셔야 합니다.</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제13조 (가명정보의 처리)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>① 가명정보는 개인정보의 일부를 삭제하거나 일부 또는 전부를 대체하는 등의 방법으로 추가 정보가 없이는 특정 개인을 알아볼 수 없도록 처리한 정보를 말합니다.</li>*/}
          {/*    <li>*/}
          {/*      ② 회사는 개인정보보호법 제28조의 2에 의해 통계작성, 과학적 연구 등을 위하여 개인정보를 가명 처리할 수 있습니다.*/}
          {/*      <ol>*/}
          {/*        <li>1.가명정보의 처리 목적 : 통계작성(상업적 목적 포함), 과학적 연구</li>*/}
          {/*        <li>2.가명정보의 처리 및 보유기간 : 가명처리 계획 시 수립한 목적달성시까지 보유</li>*/}
          {/*        <li>3.가명처리하는 개인정보의 항목 : 이름, 전화번호, 성별, 서비스 이용실적 정보</li>*/}
          {/*        <li>*/}
          {/*          4.법 제28조의4(가명정보에 대한 안전조치 의무 등)에 따른 가명정보의 안전성 확보조치에 관한 사항*/}
          {/*          <ol>*/}
          {/*            <li>가. 가명정보, 추가정보의 안전한 관리를 위한 내부관리 계획 수립·운영 나. 가명정보와 추가정보는 별도 분리 보관</li>*/}
          {/*            <li>다. 가명정보 및 추가정보에 접근할 수 있는 권한자 지정 및 최소화, 인사이동 발생 시 지체없이 권한 변경/말소, 필요한 접근통제 조치 적용, 접근권한 부여/변경 등 기록을 최소 3년간 보관</li>*/}
          {/*            <li>라. 가명정보처리자에 대해 연1회 이상 교육 실시</li>*/}
          {/*            <li>마. 가명정보 처리 기록 작성 및 그 기록을 최소 3년간 보관</li>*/}
          {/*            <li>바. 가명정보의 재식별 금지하고 있으며, 가명정보 처리 과정에 재식별을 하게 된 경우 즉 시 개인정보 보호책임자 및 관리부서에 통지하고 해당 정보를 즉시 삭제</li>*/}
          {/*            <li>사. 기타 법규상 필요한 안전정 확보 조치</li>*/}
          {/*          </ol>*/}
          {/*        </li>*/}
          {/*      </ol>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제14조 (추가적인 이용·제공 판단기준)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      ① 회사는 ｢개인정보 보호법｣ 제15조제3항 및 제17조제4항에 따라 ｢개인정보 보호법 시행령｣ 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.*/}
          {/*      <table>*/}
          {/*        <thead>*/}
          {/*          <tr>*/}
          {/*            <th>항목</th>*/}
          {/*            <th>이용·제공 목적</th>*/}
          {/*            <th>보유 및 이용기간</th>*/}
          {/*          </tr>*/}
          {/*        </thead>*/}
          {/*        <tbody>*/}
          {/*          <tr>*/}
          {/*            <td>이름, 연락처, 주소</td>*/}
          {/*            <td>정기적으로 제공하는 서비스 관련 추가 안내물 발송</td>*/}
          {/*            <td>목적달성 즉시 파기</td>*/}
          {/*          </tr>*/}
          {/*        </tbody>*/}
          {/*      </table>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      ② 이에 따라 회사가 정보주체의 동의없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.*/}
          {/*      <ol>*/}
          {/*        <li>1. 개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부</li>*/}
          {/*        <li>2. 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부</li>*/}
          {/*        <li>3. 개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부</li>*/}
          {/*        <li>4. 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부</li>*/}
          {/*      </ol>*/}
          {/*    </li>*/}
          {/*    <li>※ 추가적인 이용·제공 시 고려사항에 대한 판단기준은 사업자/단체 스스로 자율적으로 판단하여 작성·공개함</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제15조 (정보주체와 법정대리인의 권리·의무 및 행사방법)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      ① 정보주체는 ｢개인정보 보호법｣ 제35조, 제36조, 제37조에 따라 언제든지 개인정보의 열람· 정정·삭제·처리정지 요구 등의 권리를 아래의 부서에 행사할 수 있습니다.<br/>*/}
          {/*      ※ 만 14세 미만 아동에 관한 개인정보의 열람 등 요구는 법정대리인이 직접 해야 하며, 만 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여 미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도 있습니다.*/}
          {/*      <p>*/}
          {/*        ▶ 개인정보 열람청구 접수·처리<br/>*/}
          {/*        부서명 : 대표 <br/>*/}
          {/*        담당자 : 담당자 남원욱<br/>*/}
          {/*        연락처 : 이메일 dentnerkorea@gmail.com*/}
          {/*      </p>*/}
          {/*    </li>*/}
          {/*    <li>② 권리 행사는 제1항에 기재된 개인정보 처리 부서에 대해 「 개인정보 보호법 」 시행령 제41 조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.</li>*/}
          {/*    <li>③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있 습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.</li>*/}
          {/*    <li>④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」제35조 제4항, 제37조 제2항에 의하 여 정보주체의 권리가 제한 될 수 있습니다.</li>*/}
          {/*    <li>⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있 는 경우에는 그 삭제를 요구할 수 없습니다.</li>*/}
          {/*    <li>⑥ 회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제16조 (권익침해 구제방법)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      ① 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진 흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.*/}
          {/*      <ol>*/}
          {/*        <li>1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</li>*/}
          {/*        <li>2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>*/}
          {/*        <li>3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>*/}
          {/*        <li>4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)</li>*/}
          {/*      </ol>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      ② 회사는 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이 필요한 경우 아래의 담당부서로 연락해 주시기 바 랍니다.*/}
          {/*      <p>*/}
          {/*        ▶개인정보보호 관련 고객상담 및 신고<br/>*/}
          {/*        부서명 : 부서명 대표<br/>*/}
          {/*        담당자 : 담당자 남원욱<br/>*/}
          {/*        연락처 : 이메일 dentnerkorea@gmail.com*/}
          {/*      </p>*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      ③ 「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보 의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인 하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.*/}
          {/*      <p>▶ 중앙행정심판위원회 : (국번없이)110(www.simpan.go.kr)</p>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<h3>제17조 (개인정보 처리방침 변경)</h3>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*  <li>① 이 개인정보처리방침은 2022년 4월 18부터 적용됩니다.</li>*/}
          {/*  <li>② 법령 개정 및 회사의 정책 변경 등의 사유로 개인정보처리방침을 변경하는 경우 버전번호 등을 부여하여 개정된 사항을 쉽게 알아보실 수 있도록 홈페이지에 지속적으로 게시합니다.</li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
        </article>
      </section>
    </>
    );
};

export default ServicePage2;
