import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BaseInput, ItemTag, BaseButton } from '@components/common';
import { useSnack } from '@components/hooks';

const ComponentPage = () => {
  const { showSnackbar } = useSnack();
  const [certVisible, setCertVisible] = useState(false);
  const [dmoreVisible, setDmoreVisible] = useState(false);
  const [pwVisible, setPwVisible] = useState(false);
  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };
  const tabRef = useRef();

  return (
    <>
      <section>
        <article>
          <button className="btnB" onClick={() => showSnackbar('test test')}>
            showSnackbar
          </button>
          &nbsp;&nbsp;
          <h2 style={{ display: 'none' }}>
            <strong>컴포넌트</strong> & 워크리스트
          </h2>
          <div className="titNbtn" style={{ display: 'none' }}>
            <div>
              <h2>컴포넌트 & 워크리스트</h2>
              <span>
                <Link className="btnL ss">버튼1</Link>
                <Link className="btnL ss">버튼2</Link>
              </span>
            </div>
          </div>
        </article>
        <article>
          <div className="componentLayout">
            <div className="cptTable">
              <table>
                <tbody>
                  <tr>
                    <th>Text</th>
                  </tr>
                  <tr>
                    <td>
                      <p style={{ fontWeight: '300' }}> Pretendard-Light &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;font-weight:300; </p>
                      <p style={{ fontWeight: '400' }}> Pretendard-Regular &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;font-weight:400; </p>
                      <p style={{ fontWeight: '500' }}> Pretendard-Medium &nbsp; &nbsp; &nbsp; &nbsp;font-weight:500; </p>
                      <p style={{ fontWeight: '600' }}> Pretendard-SemiBold &nbsp; &nbsp; font-weight:600; </p>
                      <p style={{ fontWeight: '700' }}> Pretendard-Bold &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;font-weight:700; </p>
                    </td>
                  </tr>
                  <tr>
                    <th>Button</th>
                  </tr>
                  <tr>
                    <td>
                      <button className="btnB">BUTTON - Main</button>
                      <button className="btnB" disabled>
                        Disabeld
                      </button>
                      &nbsp;&nbsp;
                      <button className="btnL">BUTTON - Line</button>
                      <button className="btnL" disabled>
                        Disabeld
                      </button>
                      &nbsp;&nbsp;
                      <button className="btnW">BUTTON - White</button>
                      <button className="btnW" disabled>
                        Disabeld
                      </button>
                      <br />
                      <br />
                      <button className="btnB sm">Btn 50</button> <button className="btnL sm">Btn 50</button> <button className="btnW sm">Btn 50</button> &nbsp;&nbsp;
                      <button className="btnB ss">Btn 24</button> <button className="btnL ss">Btn 24</button> <button className="btnW ss">Btn 24</button>
                      <br />
                      <br />
                      <button className="bID">Del</button> {/* btn Item Delete */}
                      <button className="bFD">Download</button> {/* btn File Download */}
                      <Link className="bChat">채팅</Link>
                      <Link className="bChat on">채팅</Link>
                      <Link className="bNoty">
                        <em>알림</em>
                      </Link>
                      <Link className="bNoty">
                        <em>알림</em>
                        <i>8</i>
                      </Link>
                      <Link className="bMypage">마이페이지</Link>
                      <br />
                      <br />
                      <Link className="bMR"><span><em>더</em> 자세히보기</span></Link> &nbsp;&nbsp;
                      <Link className="bCG">채팅하기</Link> &nbsp;&nbsp;
                      <Link className="bEV">견적서 보기</Link> &nbsp;&nbsp;
                      <Link className="bIT">보철종류 보기</Link> <br />
                      <br />
                      <button className="bDC">치자이너 선택</button> &nbsp;&nbsp;
                      <button className="bDC" disabled>
                        치자이너 선택
                      </button>
                      &nbsp;&nbsp;
                      <button className="bBU">관심 치과기공소</button> &nbsp;&nbsp;
                      <span className={`postsMore ${dmoreVisible ? 'on' : ''}`}>
                        <button className="bDM" onClick={() => setDmoreVisible(!dmoreVisible)}>
                          더보기
                        </button>
                        <span>
                          <button>링크복사</button>
                          <button>차단하기</button>
                          <button>신고하기</button>
                        </span>
                      </span>
                      <span className="postEdit">
                        <button>수정</button>
                        <span>
                          <button>삭제</button>
                        </span>
                        <span>
                          <BaseButton label={'신고하기'} className={'bRP'} />
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Input</th>
                  </tr>
                  <tr>
                    <td className="cBasicInput">
                      <input type="text" placeholder="Placeholder" />
                      <input type="text" placeholder="Placeholder" defaultValue="Value" />
                      <input type="text" placeholder="Readonly" defaultValue="Readonly" readOnly />
                      <input type="text" placeholder="Disabled" defaultValue="Disabled" disabled />
                      <input type="text" placeholder="Error Case" className="error" />
                      <br />
                      <br />
                      <input type="checkbox" id="checkbox00" />
                      <input type="checkbox" id="checkbox01" /> &nbsp; &nbsp;
                      <span className="checkSet">
                        <input type="checkbox" id="checkbox1" />
                        <label htmlFor="checkbox1">checkSet</label>
                      </span>
                      <span className="checkSet">
                        <input type="checkbox" id="checkbox2" defaultChecked />
                        <label htmlFor="checkbox2">checkSet</label>
                      </span>
                      <span className="checkSet">
                        <input type="checkbox" id="checkbox3" disabled />
                        <label htmlFor="checkbox3">checkSet</label>
                      </span>
                      <span className="checkSet">
                        <input type="checkbox" id="checkbox4" defaultChecked disabled />
                        <label htmlFor="checkbox4">checkSet</label>
                      </span>
                      <br />
                      <br />
                      <input type="radio" name="radio00" id="radio01" />
                      <input type="radio" name="radio00" id="radio02" /> &nbsp; &nbsp;
                      <span className="radioSet">
                        <input type="radio" name="radio1" id="radio1" />
                        <label htmlFor="radio1">radioSet</label>
                      </span>
                      <span className="radioSet">
                        <input type="radio" name="radio1" id="radio2" defaultChecked />
                        <label htmlFor="radio2">radioSet</label>
                      </span>
                      <span className="radioSet">
                        <input type="radio" name="radio2" id="radio3" disabled />
                        <label htmlFor="radio3">radioSet</label>
                      </span>
                      <span className="radioSet">
                        <input type="radio" name="radio2" id="radio4" defaultChecked disabled />
                        <label htmlFor="radio4">radioSet</label>
                      </span>
                      <br />
                      <br />
                      <span className="toggleSet">
                        <input type="checkbox" id="push" />
                      </span>
                      <span className="toggleSet">
                        <input type="checkbox" id="push1" defaultChecked />
                      </span>
                      <br />
                      <br />
                      <span className="toggleSet label">
                        <input type="checkbox" id="toggleLabel" defaultChecked />
                        <label>
                          <span>선택</span>
                          <em>미선택</em>
                        </label>
                      </span>
                      <br />
                      <br />
                      <input type="checkbox" className="likeSet" />
                      <input type="checkbox" className="likeSet" defaultChecked />
                      <br />
                      <br />
                      <div className="sorting">
                        <span>
                          <input type="radio" id="sorting1" name="sorting1" />
                          <label htmlFor="sorting1">sorting 1</label>
                        </span>
                        <span>
                          <input type="radio" id="sorting2" name="sorting1" defaultChecked />
                          <label htmlFor="sorting2">sorting 2</label>
                        </span>
                        <div className='fillter'>
                          <em>최신순</em>
                          <div>
                            <span>
                              <input type="radio" id="sorting1" name="sorting1" defaultChecked />
                              <label htmlFor="sorting1">최신순</label>
                            </span>
                            <span>
                              <input type="radio" id="sorting3" name="sorting1" />
                              <label htmlFor="sorting3">견적만료 시간순</label>
                            </span>
                          </div>
                        </div>
                      </div>
                      &nbsp; &nbsp; &nbsp;
                      <div className="sorting sts">
                        <span>
                          <input type="radio" id="sortingSts1" name="sortingSts1" />
                          <label htmlFor="sortingSts1">sortingSts 1</label>
                        </span>
                        <span>
                          <input type="radio" id="sortingSts2" name="sortingSts1" defaultChecked />
                          <label htmlFor="sortingSts2">sortingSts 2</label>
                        </span>
                      </div>
                      <br />
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className={`pwSet ${pwVisible ? 'on' : ''}`}>
                        <input type={`${pwVisible ? 'text' : 'password'}`} placeholder="비밀번호를 입력하세요." />
                        <button onClick={() => setPwVisible(!pwVisible)}>Password View</button>
                      </span>
                      <br /> <br />
                      <span className="ipBtn">
                        <input type="text" placeholder="수치값의 제목을 입력해주세요" />
                        <button>수치값 제목 불러오기</button>
                      </span>
                      <br /> <br />
                      <span className="ipBBtn">
                        <BaseInput type="text" placeholder="관심 치자이너로 등록되어 있는 치자이너를 선택할 수 있어요." />
                        <button>지정 치자이너 선택하기</button>
                      </span>
                      <br /> <br />
                      <span className="unit">
                        <input type="text" defaultValue="0.00" />
                        <em>mm</em>
                      </span>
                      &nbsp; &nbsp;
                      <span className="calUnit ">
                        <em>날짜</em>
                        <input type="text" defaultValue="24.03.02.월" />
                      </span>
                      &nbsp; &nbsp;
                      <span className="calUnit time">
                        <em>시간</em>
                        <input type="text" defaultValue="11:30" />
                      </span>
                      <br /> <br />
                      <div style={{ background: '#4B72FE' }}>
                        <span className="searchSet">
                          <input type="text" className="txt" placeholder="본문, 제목 검색" />
                          <input type="submit" value="검색" className="icon" />
                        </span>
                      </div>
                      <br /> <br />
                      <span className="dUnit">
                        개별 <strong>26</strong> <BaseButton label="Del" className="bID" />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>Select & File Upload</th>
                  </tr>
                  <tr>
                    <td>
                      {/* cSelect : custerm select */}
                      <span className={`cSelect ${certVisible ? 'on' : ''}`} id="cSelect">
                        <em className="sValue" onClick={() => setCertVisible(!certVisible)}>
                          선택하세요
                        </em>
                        <span className="cArea">
                          <span className="on">항목 1</span>
                          <span>항목 2</span>
                        </span>
                      </span>
                      <br />
                      <br />
                      <div className="fileSet">
                        <span className="fileFind">
                          <input type="file" id="file1" />
                          <label htmlFor="file1">파일 첨부하기</label>
                        </span>
                        <em className="guide">
                          [파일형식] <i>pdf, jpg, png</i> (500MB 이하)
                        </em>
                        <span className="fileLoad">
                          <span>
                            면허증.pdf
                            <em>328.36 mb</em>
                          </span>
                          <button className="bID">Del</button>
                        </span>
                        <span className="fileLoad">
                          <span>
                            면허증.pdf
                            <em>328.36 mb</em>
                          </span>
                          <button className="bFD">Download</button>
                        </span>
                      </div>
                      <span className="fileIng">
                        <span>
                          파일업로드 중...(<em>25</em>%)
                        </span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>icon</th>
                  </tr>
                  <tr>
                    <td>
                      <span className="localTag">
                        <em>대전</em>
                        <em>충남</em>
                        <em>세종</em>
                      </span>
                      <br />
                      <br />
                      <span className="itemTag">
                        <em>지르코니아</em>
                        <em>Bar type</em>
                        <em>투명교정</em>
                        <em>Framework</em>
                        <em>All on X &#40;Porcelain&#41;</em>
                      </span>
                      <br />
                      <br />
                      <strong className="iSts">견적 요청중</strong>
                      <strong className="iSts">요청 대기중</strong>
                      <strong className="iSts select">치자이너 선택중</strong>
                      <strong className="iSts reject">요청거절</strong>
                      <strong className="iSts ing">거래중</strong>
                      <strong className="iSts complet">납품완료</strong>
                      <strong className="iSts end">거래완료</strong>
                      <strong className="iSts cancel">거래취소</strong>
                      <strong className="iSts cing">거래취소 승인 대기중</strong>
                      <strong className="iSts done">요청마감</strong> <br />
                      <br />
                      <span className="reQNum">
                        <i>견적서</i>
                        <strong>3</strong>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>paginate</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="paginate">
                        <span>
                          <a className="first">처음</a>
                          <a className="prev">이전</a>
                          <strong>1</strong>
                          <a>2</a>
                          <a>3</a>
                          <a>4</a>
                          <a>5</a>
                          <a className="next">다음</a>
                          <a className="last">마지막</a>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>TAB</th>
                  </tr>
                  <tr>
                    <td>
                      <div className="tabNav" ref={tabRef}>
                        <nav>
                          <ul>
                            <li className={`${tab === 1 ? 'on' : ''}`}>
                              <button onClick={() => handleTab(1)}>공개요청</button>
                            </li>
                            <li className={`${tab === 2 ? 'on' : ''}`}>
                              <button onClick={() => handleTab(2)}>콘텐츠</button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      {/* -- */}
                      {tab === 1 && '<공개요청 URL />'}
                      {tab === 2 && '<콘텐츠 URL />'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </article>
        <article>
          <div className="worklistLayout">
            <table>
              <thead>
                <tr>
                  <th width="4%">ID</th>
                  <th width="130">1 depth</th>
                  <th width="130">2 depth</th>
                  <th width="180">3 depth</th>
                  <th width="320">URL</th>
                  <th width="70">PC</th>
                  <th width="70">Mobile</th>
                  <th>History & Descration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan="8" className="title">
                    치과기공소 & 치자이너
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <td rowSpan={2} className="first">
                    Member
                  </td>
                  <td>Find ID/Pw</td>
                  <td></td>
                  <td>
                    <Link to="/login/idInquiry2" target="_blank">
                      find ID
                    </Link>  <br />
                    <Link to="/login/pwInquiry2" target="_blank">
                      find Pw
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>Join</td>
                  <td></td>
                  <td>
                    <Link to="/login/join/office" target="_blank">
                      Join Office - 치과기공소
                    </Link>  <br />
                    <Link to="/login/join/designer" target="_blank">
                      Join Designer - 치자이너
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong><br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">Main</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/mainOffice" target="_blank">
                      MainOfficePage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">요청서 보기</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/requestOffice" target="_blank">
                      RequestOfficePage - 목록
                    </Link>  <br />
                    <Link to="/request/estimate" target="_blank">
                      RequestEstimate - 견적서 작성하기
                    </Link>  <br />
                    <Link to="/requestOfficeView" target="_blank">
                      RequestOfficeViewPage - 상세보기 공개 (댓글영역 수정)
                    </Link>  <br />
                    <Link to="/requestOfficeView2" target="_blank">
                      RequestOfficeViewPage2 - 상세보기 공개 (댓글영역 수정)
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">치과기공소 찾기</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/centerOffice" target="_blank">
                      CenterOfficePage
                    </Link>  <br />
                    <Link to="/centerOfficeView" target="_blank">
                      CenterOfficeViewPage - 남
                    </Link>  <br />
                    <Link to="/centerOfficeView2" target="_blank">
                      CenterOfficeView2Page - 나
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">치자이너 찾기</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/designerOffice" target="_blank">
                      DesignerOfficePage
                    </Link>  <br />
                    <Link to="/designerOfficeView" target="_blank">
                      DesignerOfficeViewPage - 남
                    </Link>  <br />
                    <Link to="/designerOfficeView2" target="_blank">
                      DesignerOfficeView2Page - 나
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">거래내역</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/payment2" target="_blank">
                      PaymentPage2 - 목록
                    </Link>  <br />
                    <Link to="/myEstimate" target="_blank">
                      MyEstimatePage - 내 견적서
                    </Link>  <br />
                    <Link to="/contractRequest" target="_blank">
                      ContractRequestPage - 계약 요청서
                    </Link>  <br />
                    <Link to="/officeInquire" target="_blank">
                      OfficeInquirePage - 의뢰서 수령
                    </Link>  <br />
                    <Link to="/clientInquire" target="_blank">
                      ClientInquirePage - 의뢰인 의뢰서 정보
                    </Link>  <br />
                    <Link to="/cADUpload" target="_blank">
                      CADUploadPage - CAD파일 업로드
                    </Link>  <br />
                    <Link to="/paymentAddRequest" target="_blank">
                      PaymentAddRequestPage - 추가금 수정
                    </Link>  <br />
                    <Link to="/cADModify" target="_blank">
                      CADModifyPage - CAD파일 수정
                    </Link>  <br />
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">마일리지</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/mileageOffice" target="_blank">
                      MileageOfficePage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">챗팅</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/chatCenter" target="_blank">
                      ChatCenterPage
                    </Link>  <br />
                    <Link to="/chatDesigner" target="_blank">
                      ChatDesignerPage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first" rowSpan={2}>
                    마이페이지
                  </td>
                  <td>마이페이지</td>
                  <td></td>
                  <td>
                    <Link to="/myPageCenterPub" target="_blank">
                      MyPageCenterPage - 치과기공소
                    </Link>  <br />
                    <Link to="/myPageDesignerPub" target="_blank">
                      MyPageDesignerPage - 치자이너
                    </Link>  <br />
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>프로필 관리</td>
                  <td></td>
                  <td>
                    <Link to="profileModify2" target="_blank">
                      ProfileModify2Page - 치자이너
                    </Link>  <br />
                    <Link to="profileModify3" target="_blank">
                      ProfileModify3Page - 치과기공소
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th colSpan="8" className="title">
                    의뢰인
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <td rowSpan="2" className="first">
                    common
                  </td>
                  <td>Component</td>
                  <td></td>
                  <td>
                    <Link to="/component">Component</Link>
                  </td>
                  <td></td>
                  <td>
                    <strong className="new"></strong> 
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>Error</td>
                  <td></td>
                  <td></td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td rowSpan={3} className="first">
                    Member
                  </td>
                  <td>login</td>
                  <td></td>
                  <td>
                    <Link to="/login" target="_blank">
                      login
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>Find ID/Pw</td>
                  <td></td>
                  <td>
                    <Link to="/findId" target="_blank">
                      find ID
                    </Link>  <br />
                    <Link to="/findPw" target="_blank">
                      find Pw
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>Join</td>
                  <td></td>
                  {/* <td><Link to='/join' target="_blank">Join</Link></td> */}
                  <td>
                    <Link to="/login/join/" target="_blank">
                      Join
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">Main</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/" target="_blank">
                      MainPage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">서비스 소개</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/service" target="_blank">
                      ServicePage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new"></strong> 
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">요청서 보기</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/request" target="_blank">
                      RequestPage
                    </Link>  <br />
                    <Link to="/requestView" target="_blank">
                      RequestViewPage - 공개 의뢰인
                    </Link>  <br />
                    <Link to="/requestView2" target="_blank">
                      RequestViewPage2 - 지정 의뢰인
                    </Link>  <br />
                    <Link to="/requestView3" target="_blank">
                      RequestViewPage3 - 다른 의뢰인
                    </Link>  <br />
                    <Link to="/requestView4" target="_blank">
                      RequestViewPage4 - 공개 치자이너
                    </Link>  <br />
                    <Link to="/requestView5" target="_blank">
                      RequestViewPage5 - 지정 치자이너
                    </Link>  <br />
                    <Link to="/requestWrite" target="_blank">
                      RequestWritePage - 공개요청
                    </Link>  <br />
                    <Link to="/requestWrite2" target="_blank">
                      RequestWritePage2 - 지정요청
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">치과기공소 찾기</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/center" target="_blank">
                      CenterPage
                    </Link>  <br />
                    <Link to="/centerView" target="_blank">
                      CenterViewPage
                    </Link>  <br />
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">치자이너 찾기</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/designer" target="_blank">
                      DesignerPage
                    </Link>  <br />
                    <Link to="/designerView" target="_blank">
                      DesignerViewPage
                    </Link>  <br />
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">거래내역</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/payment" target="_blank">
                      PaymentPage
                    </Link>  <br />
                    <Link to="/designerChoice" target="_blank">
                      DesignerChoicePage - 디자이너 선택
                    </Link>  <br />
                    <Link to="/designerChoiceEnd" target="_blank">
                      DesignerChoiceEndPage - 치자이너 견적 리스트
                    </Link>  <br />
                    <Link to="/estimate" target="_blank">
                      EstimatePage - 견적서 (공개요청 시에만)
                    </Link>  <br />
                    <Link to="/paymentView" target="_blank">
                      PaymentViewPage - 의뢰서 결제
                    </Link>  <br />
                    <Link to="/myInquire" target="_blank">
                      MyInquirePage - 내 의뢰서 정보 (간편)
                    </Link>  <br />
                    <Link to="/myInquire2" target="_blank">
                      MyInquirePage2 - 내 의뢰서 정보 (상세)
                    </Link>  <br />
                    <Link to="/designerInquire" target="_blank">
                      DesignerInquirePage - 의뢰서 수령
                    </Link>  <br />
                    <Link to="/paymentAddView" target="_blank">
                      PaymentAddViewPage - 추가금 결제하기
                    </Link>  <br />
                    <Link to="/cadView" target="_blank">
                      CADViewPage - CAD 파일 수령
                    </Link>  <br />
                    <Link to="/reRequestWrite" target="_blank">
                      ReRequestWritePage - 재제작 요청하기
                    </Link>  <br />
                    <Link to="/reRequestView" target="_blank">
                      ReRequestViewPage - 재제작 요청내역
                    </Link>  <br />
                    <Link to="/reView" target="_blank">
                      ReViewPage - 리뷰작성
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">의뢰서 바구니</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/inquire" target="_blank">
                      InquirePage
                    </Link>  <br />
                    <Link to="/inquireWrite" target="_blank">
                      InquireWritePage - 간편
                    </Link>  <br />
                    <Link to="/inquireDetailWrite" target="_blank">
                      InquireDetailWritePage - 상세
                    </Link>  <br />
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                  </td>
                  <td>
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                    <strong className="new">Done</strong>  <br />
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">마일리지</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/mileage" target="_blank">
                      MileagePage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> 
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">챗팅</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/chat" target="_blank">Chat</Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> 
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td className="first">알림</td>
                  <td></td>
                  <td></td>
                  <td>
                    <Link to="/notiy" target="_blank">
                      Notiy
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td rowSpan={8} className="first">
                    마이페이지
                  </td>
                  <td rowSpan={7}>마이페이지</td>
                  <td></td>
                  <td>
                    <Link to="/myPage" target="_blank">
                      Mypage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong> 
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>개인정보 관리</td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>치과기공소 관리</td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>치자이너 관리</td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>거래이력 관리</td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                {/* <tr>
                  <th></th>
                  <td>개인정보 업무위탁 계약 관리</td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td></td>
                </tr> */}
                <tr>
                  <th></th>
                  <td>리뷰 관리</td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>알림 설정</td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>프로필 관리</td>
                  <td></td>
                  <td>
                    <Link to="/profileModify" target="_blank">
                      ProfileModifyPage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td rowSpan={9} className="first">
                    기타
                  </td>
                  <td>이용방법</td>
                  <td></td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>공지사항</td>
                  <td></td>
                  <td>
                    <Link to="/notice" target="_blank">
                      NoticePage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>FAQ</td>
                  <td></td>
                  <td>
                    <Link to="/faq" target="_blank">
                      FaqPage
                    </Link>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td>
                    <strong className="new">Done</strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>개인정보처리방침</td>
                  <td></td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <th></th>
                  <td>이용약관</td>
                  <td></td>
                  <td>
                    <Link to="/" target="_blank"></Link>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td>
                    <strong className="new"></strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </>
  );
};

export default ComponentPage;
