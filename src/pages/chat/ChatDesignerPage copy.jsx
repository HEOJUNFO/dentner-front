import React, { useEffect, useRef, useState, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import sampleProfile2 from '@assets/images/sample/sample7.png';
import { Link } from 'react-router-dom';
import { BaseButton, ItemTag, PostsMore } from '@components/common';
import LeaveAlert from '../../components/ui/modal/LeaveAlert';
import BlockAlert from '../../components/ui/modal/BlockAlert';
import ReportModal from '../../components/ui/modal/ReportModal';
import { ModalAlertPresent } from '@components/common';
import { ModalPresent } from '@components/common';

import useChatDesignerPage from './hooks/useChatDesignerPage';

const ChatPage = () => {
  const { items } = useChatDesignerPage();

  const [isModal, setIsModal] = useState(false);
  const [isModal2, setIsModal2] = useState(false);
  const [isModal3, setIsModal3] = useState(false);
  const [listEditor, setListEditor] = useState(false);
  const [chatDetail, setChatDetail] = useState(false);
  // const items = [{ name: 'EXOCAD' }, { name: '3Shape-2024ver' }];
  const moreItems = [
    {
      name: '나가기',
      onClick: () => {
        setIsModal(true);
      },
    },
    {
      name: '차단하기',
      onClick: () => {
        setIsModal2(true);
      },
    },
    {
      name: '신고하기',
      onClick: () => {
        setIsModal3(true);
      },
    },
  ];

  return (
    <>
      <section>
        <div className={`${chatDetail ? 'fotMView on' : 'fotMView'}`}>
          <h2 className="pb50">채팅</h2>
        </div>
        {/* 목록 */}
        <article style={{ display: `${chatDetail ? 'none' : 'block'}` }}>
          {/* 목록 없을 경우 */}
          <div className="noList chat line" style={{ display: 'none' }}>
            진행중인 채팅목록이 없습니다.
          </div>
          {/*  */}
          <div className="listTopSorting chatCase">
            <div>
              <span>
                <span className="checkSet" style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }}>
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox">전체 선택</label>
                </span>
              </span>
              <span className="postEdit">
                <BaseButton
                  label="채팅 편집"
                  style={{ display: `${listEditor ? 'none' : 'inline-flex'}` }}
                  onClick={() => {
                    setListEditor(true);
                  }}
                />
                <BaseButton
                  label="선택한 채팅방 나가기"
                  style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }}
                  onClick={() => {
                    setListEditor(false);
                  }}
                />
              </span>
            </div>
          </div>
          <div className="listBox">
            <div className="chatList">
              <ul>
                <li>
                  <input type="checkbox" id="check01" style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }} />
                  <div className="chatInfo">
                    <span className="profileImg">
                      <img src={sampleProfile} />
                    </span>
                    <div
                      className="listD"
                      onClick={() => {
                        setChatDetail(true);
                      }}
                    >
                      <strong className="nickName">
                        저쩌구 의뢰잉
                        <em>오후 6:10</em>
                      </strong>
                      <ItemTag items={items} className="itemTag" />
                      <div>
                        <p>
                          안녕하세요. <br />
                          문의 가능한 시간은 평일 오전 9시부터 입니다. 문의해주시면 평일 오전 9시부터 오후 6시까지 평균 24시간 내 답변드립니다.
                        </p>
                        <span>
                          <em>+99</em>
                        </span>
                      </div>
                    </div>
                    <span className="right">
                      <PostsMore items={moreItems} />
                    </span>
                  </div>
                </li>
                <li>
                  <input type="checkbox" id="check01" style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }} />
                  <div className="chatInfo">
                    <span className="profileImg">
                      <img src={sampleProfile} />
                    </span>
                    <div className="listD">
                      <strong className="nickName">
                        저쩌구 의뢰잉
                        <em>오후 6:10</em>
                      </strong>
                      <ItemTag items={items} className="itemTag" />
                      <div>
                        <p>
                          안녕하세요. <br />
                          문의 가능한 시간은 평일 오전 9시부터 입니다. 문의해주시면 평일 오전 9시부터 오후 6시까지 평균 24시간 내 답변드립니다.
                        </p>
                        <span>
                          <em>10</em>
                        </span>
                      </div>
                    </div>
                    <span className="right">
                      <PostsMore items={moreItems} />
                    </span>
                  </div>
                </li>
                <li>
                  <input type="checkbox" id="check01" style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }} />
                  <div className="chatInfo">
                    <span className="profileImg">
                      <img src={sampleProfile} />
                    </span>
                    <div className="listD">
                      <strong className="nickName">
                        저쩌구 의뢰잉
                        <em>2024년 5월 4일</em>
                      </strong>
                      <ItemTag items={items} className="itemTag" />
                      <div>
                        <p>네, 확인해보고 다시 말씀 드릴게요.</p>
                        <span>
                          <em>2</em>
                        </span>
                      </div>
                    </div>
                    <span className="right">
                      <PostsMore items={moreItems} />
                    </span>
                  </div>
                </li>
                <li>
                  <input type="checkbox" id="check01" style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }} />
                  <div className="chatInfo">
                    <span className="profileImg">
                      <img src={sampleProfile} />
                    </span>
                    <div className="listD">
                      <strong className="nickName">
                        저쩌구 의뢰잉
                        <em>2024년 5월 4일</em>
                      </strong>
                      <ItemTag items={items} className="itemTag" />
                      <div>
                        <p>네, 확인해보고 다시 말씀 드릴게요.</p>
                      </div>
                    </div>
                    <span className="right">
                      <PostsMore items={moreItems} />
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <BaseButton label="더보기" className="listMore" />
          </div>
        </article>
        {/* 상세 */}
        <article className="onlyCD" style={{ display: `${chatDetail ? 'block' : 'none'}` }}>
          <div className="mSubPrev">
            <button
              className="bMP"
              onClick={() => {
                setChatDetail(false);
              }}
            >
              이전
            </button>
          </div>
          <div className="listTopSorting chatCase mEtc">
            <div>
              <span></span>
              <span className="postEdit">
                <BaseButton label="거래취소하기" />
              </span>
            </div>
          </div>
          <div className="chatDetail">
            <div className="back">
              <div className="chatInfo">
                <span className="profileImg">
                  <img src={sampleProfile} />
                </span>
                <div className="listD">
                  <strong>저쩌구 의뢰잉</strong>
                  <ItemTag items={items} className="itemTag" />
                </div>
                <span className="right">
                  <PostsMore items={moreItems} />
                </span>
              </div>
              <div className="chatData">
                <div className="cDate">
                  <em>2024년 5월 1일 의뢰인입장</em>
                </div>
                <div className="dialogBack me">
                  <div className="dialog">
                    <ul>
                      <li>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청</dt>
                            <dd>치자이너에게 요청서를 전송했습니다.</dd>
                            <dd>
                              <BaseButton label="요청 취소하기" className="btnB ss" />
                            </dd>
                          </dl>
                        </div>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청</dt>
                            <dd>치자이너에게 요청서를 전송했습니다.</dd>
                            <dd>
                              <BaseButton label="요청 취소 됨" className="btnB ss" disabled />
                            </dd>
                          </dl>
                        </div>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청 취소</dt>
                            <dd>치자이너에게 보낸 요청서를 취소하였습니다. </dd>
                          </dl>
                        </div>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청</dt>
                            <dd>치자이너에게 요청서를 전송했습니다.</dd>
                            <dd>
                              <BaseButton label="요청 취소하기" className="btnB ss" disabled />
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
                <div className="dialogBack">
                  <div className="dialog">
                    <ul>
                      <li>
                        <strong className="nickName">네이처치과치과기공소</strong>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청 수락</dt>
                            <dd>치자이너에게 보낸 요청서를 취소하였습니다. </dd>
                          </dl>
                        </div>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청 거절</dt>
                            <dd>치자이너가 요청을 거절했습니다.</dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
                <div className="cDate">
                  <em>2024년 5월 1일 치자이너입장</em>
                </div>
                <div className="dialogBack">
                  <div className="dialog">
                    <ul>
                      <li>
                        <strong className="nickName">의뢰인</strong>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청</dt>
                            <dd>의뢰인이 지정 요청을 보냈습니다.</dd>
                            <dd>
                              <span className="fileLoad go">
                                <span>
                                  요청서 확인하기
                                  <em>선택 시 페이지로 이동됩니다.</em>
                                </span>
                              </span>
                              <BaseButton label="요청 수락하기" className="btnB ss" />
                              <BaseButton label="요청 거절하기" className="btnL ss" />
                            </dd>
                          </dl>
                        </div>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청</dt>
                            <dd>의뢰인이 지정 요청을 보냈습니다.</dd>
                            <dd>
                              <span className="fileLoad go">
                                <span>
                                  요청서 확인하기
                                  <em>선택 시 페이지로 이동됩니다.</em>
                                </span>
                              </span>
                              <BaseButton label="요청 취소 됨" className="btnB ss" disabled />
                            </dd>
                          </dl>
                        </div>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청 취소</dt>
                            <dd>의뢰인이 지정 요청을 취소했습니다.</dd>
                          </dl>
                        </div>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청</dt>
                            <dd>치자이너에게 요청서를 전송했습니다.</dd>
                            <dd>
                              <BaseButton label="요청 취소하기" className="btnB ss" disabled />
                            </dd>
                          </dl>
                        </div>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청</dt>
                            <dd>의뢰인이 지정 요청을 보냈습니다.</dd>
                            <dd>
                              <span className="fileLoad go">
                                <span>
                                  요청서 확인하기
                                  <em>선택 시 페이지로 이동됩니다.</em>
                                </span>
                              </span>
                              <BaseButton label="요청 수락하기" className="btnB ss" disabled />
                              <BaseButton label="요청 거절하기" className="btnL ss" disabled />
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
                <div className="dialogBack me">
                  <div className="dialog">
                    <ul>
                      <li>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청 수락</dt>
                            <dd>의뢰인 요청에 수락했습니다.</dd>
                          </dl>
                        </div>
                        <div className="chatReQ">
                          <dl>
                            <dt>지정 요청 거절</dt>
                            <dd>의뢰인 요청에 거절했습니다.</dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
                <div className="cDate">
                  <em>2024년 5월 1일 공개요청 시</em>
                </div>
                <div className="dialogBack">
                  <div className="dialog">
                    <ul>
                      <li>
                        <strong className="nickName">우수리 치자이너</strong>
                        <div className="chatReQ">
                          <dl>
                            <dt>견적서 전송</dt>
                            <dd>치자이너가 견적서를 보냈습니다.</dd>
                            <dd>
                              <span className="fileLoad go">
                                <span>
                                  견적서 확인하기
                                  <em>선택 시 페이지로 이동됩니다.</em>
                                </span>
                              </span>
                              <BaseButton label="치자이너 선택" className="btnB ss" />
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
                <div className="dialogBack me">
                  <div className="dialog">
                    <ul>
                      <li>
                        <div className="chatReQ">
                          <dl>
                            <dt>견적서 전송</dt>
                            <dd>의뢰인에게 견적서를 보냈습니다.</dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
                <div className="cDate">
                  <em>2024년 5월 1일 결제 의뢰인</em>
                </div>
                <div className="dialogBack me">
                  <div className="dialog">
                    <ul>
                      <li>
                        <div className="chatReQ">
                          <dl>
                            <dt>의뢰서 결제완료</dt>
                            <dd>의뢰서 결제가 완료되었습니다.</dd>
                            <dd>
                              <span className="fileLoad go">
                                <span>
                                  내 의뢰서 결제내역 확인하기
                                  <em>선택 시 페이지로 이동됩니다.</em>
                                </span>
                              </span>
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
                <div className="dialogBack">
                  <div className="dialog">
                    <ul>
                      <li>
                        <strong className="nickName">우수리 치자이너</strong>
                        <div className="chatReQ">
                          <dl>
                            <dt>계약요청 수락</dt>
                            <dd>
                              치자이너가 계약요청을 수락했습니다.
                              <br />
                              다음단계를 진행해 주세요!
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
                <div className="cDate">
                  <em>2024년 5월 1일 결제치자이너</em>
                </div>
                <div className="dialogBack">
                  <div className="dialog">
                    <ul>
                      <li>
                        <div className="chatReQ">
                          <dl>
                            <dt>의뢰서 결제완료</dt>
                            <dd>의뢰인이 의뢰서 결제를 완료했습니다.</dd>
                            <dd>
                              <span className="fileLoad go">
                                <span>
                                  내 의뢰서 결제내역 확인하기
                                  <em>선택 시 페이지로 이동됩니다.</em>
                                </span>
                              </span>
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                  <div className="dialog">
                    <ul>
                      <li>
                        <div className="chatReQ">
                          <dl>
                            <dt>거래 취소</dt>
                            <dd>의뢰인이 거래를 취소하였습니다.</dd>
                            <dd className="cancel">
                              <span>
                                <strong>[거래 취소사유]</strong> 어쩌고때문에 거절합니다.
                              </span>
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
                <div className="dialogBack me">
                  <div className="dialog">
                    <ul>
                      <li>
                        <div className="chatReQ">
                          <dl>
                            <dt>거래 취소</dt>
                            <dd>
                              의뢰인의 계약요청에 거절하여
                              <br />
                              거래가 취소되었습니다.
                            </dd>
                            <dd className="cancel">
                              <span>
                                <strong>[거절사유]</strong> 어쩌고때문에 거절합니다.
                              </span>
                            </dd>
                          </dl>
                        </div>
                      </li>
                    </ul>
                    <span className="cTime">
                      <strong>읽음</strong>
                      <span>오전 09:31</span>
                    </span>
                  </div>
                </div>
              </div>
              {/* 등록 */}
              <div className="chatInput">
                <div>
                  <span className="fileFind icon">
                    <input type="file" id="file1" />
                    <label htmlFor="file1">파일 첨부하기</label>
                  </span>
                  <TextareaAutosize minRows={1} maxRows={3} placeholder="메세지를 입력해주세요." />
                </div>
                <BaseButton label="전송" className="btnB" />
              </div>
              {/* end 등록 */}
            </div>
          </div>
        </article>
        {isModal && (
          <ModalAlertPresent>
            <LeaveAlert
              onClose={() => {
                setIsModal(false);
              }}
            />
          </ModalAlertPresent>
        )}
        {isModal2 && (
          <ModalAlertPresent>
            <BlockAlert
              onClose={() => {
                setIsModal2(false);
              }}
            />
          </ModalAlertPresent>
        )}
        {isModal3 && (
          <ModalPresent>
            <ReportModal
              onClose={() => {
                setIsModal3(false);
              }}
            />
          </ModalPresent>
        )}
      </section>
    </>
  );
};

export default ChatPage;
