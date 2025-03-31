import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample3.png';
import { Link } from 'react-router-dom';
import { BaseButton, ItemTag, PostsMore, BaseSelect } from '@components/common';

const ChatCenterPage = ({}) => {
  const [listEditor, setListEditor] = useState(false);
  const stss = [{ name: '전체', value: 0 }, { name: '채팅', value: 1 }, { name: '치과기공소/치자이너에게 받은 견적', value: 2 }, { name: '거래 중 적용 알림', value: 3 }, { name: '가입 승인/거절 알림', value: 4 }, { name: '마일리지 충전/사용내역/환불승인', value: 5 }];

  return (
    <>
        {/* 목록 */}
        <article>
            <div className='listBox'>
                <div className='listTit notiyCase'>
                    <BaseSelect items={stss} placeholder={'전체'} onChange={(e) => console.log(e)} />
                    <span className='notiySorting'>
                        <span className='txtSorting'>
                            <span>
                                <input type='radio' id='sorting1' name='sorting1' defaultChecked />
                                <label htmlFor='sorting1'>전체</label>
                            </span>
                            <span>
                                <input type='radio' id='sorting2' name='sorting1' />
                                <label htmlFor='sorting2'>읽지않음</label>
                            </span>
                        </span>
                        <BaseButton label='알림 전체 읽음' className='allRead' />
                    </span>
                </div>
                <div className='notiyList'>
                    <ul>
                        <li className='new'>
                            <em>새 소식</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다. </p>
                        </li>
                        <li className='new'>
                            <em>견적확인</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>
                                안내 내용이 이곳에 출력됩니다. <br/>
                                클릭 시, 관련 페이지로 이동됩니다.
                            </p>
                        </li>
                        <li>
                            <em>알림</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>거래취소</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>거래중</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>거래매치</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>채팅알림</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                        <li>
                            <em>견적확인</em>
                            <strong>알림 타이틀이 이곳에 출력됩니다.</strong>
                            <p>안내 내용이 이곳에 출력됩니다.  클릭 시, 관련 페이지로 이동됩니다.</p>
                        </li>
                    </ul>
                </div>
                <BaseButton label='더보기' className='listMore' />
            </div>
        </article>
    </>
  );
};

export default ChatCenterPage;
