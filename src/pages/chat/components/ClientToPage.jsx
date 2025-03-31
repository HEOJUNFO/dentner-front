import React, { useEffect, useRef, useState, useCallback } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import sampleProfile from '@assets/images/sample/sample1.jpeg';

import { Link } from 'react-router-dom';
import { BaseButton, ItemTag, PostsMore, ModalAlertPresent, ModalPresent } from '@components/common';
import { BlockAlert, LeaveAlert, ReportModal } from '@components/ui';

import { useTranslation } from 'react-i18next';
import useClientToPage from '../hooks/useClientToPage';

import { replaceToBr, withCommas } from '@utils/common';
import DOMPurify from 'dompurify';
import sampleProfile2 from '@assets/images/no_user.png';

const ClientToCenterPage = () => {
  const { t } = useTranslation();
  const {
    fetchChatRoom,
    total,
    items,
    target,
    handleNav,
    moreItems,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    checkedItems,
    handleChecked,
    handleAllChecked,
    handleLeave,
    all,
  } = useClientToPage();

  const [listEditor, setListEditor] = useState(false);
  const [chatDetail, setChatDetail] = useState(false);

  return (
    <>
      <>
        {/* 목록 */}
        <article style={{ display: `${chatDetail ? 'none' : 'block'}` }}>
          <div className="listTopSorting chatCase">
            <div>
              <span>
                <span className="checkSet" style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }}>
                  <input type="checkbox" id="checkbox" checked={all} onChange={(e) => handleAllChecked(e.target.checked)} />
                  <label htmlFor="checkbox">{t('base.select_all')}</label>
                </span>
              </span>

              <span className="postEditBack">
                {listEditor && (
                  // <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  //   <span style={{ position: 'relative', fontSize: 13, fontWeight: '600', color: '#222222' }}>
                  //     {/* 선택 개 */}
                  //     {t('base.select')}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t('base.count')}
                  //     <span style={{ position: 'absolute', right: 13, top: 0, fontSize: 13, fontWeight: '600', color: '#4B72FE', marginLeft: 10 }}>{checkedItems?.length || 0}</span>
                  //   </span>
                  //   <span style={{ width: 1, backgroundColor: '#C2C6DD', height: 10 }} />
                  // </span>
                  <span className="checkNum">
                    {t('base.select')} <strong>{checkedItems?.length || 0}</strong> {t('base.count')}
                  </span>
                )}
                <span className="postEdit">
                  <BaseButton
                    label={t('chat.edit')}
                    style={{ display: `${listEditor ? 'none' : 'inline-flex'}` }}
                    onClick={() => {
                      setListEditor(true);
                    }}
                  />
                  <BaseButton label={t('chat.exit')} style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }} onClick={handleLeave} />
                </span>
              </span>
            </div>
          </div>
          {items.length > 0 && (
            <div className="listBox">
              <div className="chatList">
                <ul>
                  {items?.map((item, idx) => {
                    //console.log('11111---> ' , item)
                    const prostheticsArray = item?.prostheticsName?.split(',');

                    const displayedProsthetics = prostheticsArray
                      ?.slice(0, 2) // 처음 두 개만 선택
                      ?.map((el) => ({ name: el }));

                    if (prostheticsArray?.length > 2) {
                      displayedProsthetics.push({ name: '...' }); // 2개 이상인 경우 '...' 추가
                    }
                    return (
                      <li key={`chatList_${idx}`}>
                        <input
                          type="checkbox"
                          id="check01"
                          style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }}
                          checked={checkedItems.includes(item?.roomNo)}
                          onChange={(e) => handleChecked(e.target.checked, item?.roomNo)}
                        />
                        <div className="chatInfo">
                          <span className="profileImg">
                            <img src={item?.memberProfileImage || sampleProfile2} />
                          </span>
                          <div
                            className="listD"
                            onClick={() => {
                              handleNav(`/chat/view/${item?.roomNo}`, { ...item, targetType: target, targetSe: target });
                            }}
                          >
                            <strong className="nickName">
                              {item?.memberOutAt === 'Y' ? '탈퇴한 회원입니다' : item?.memberNickName}
                              <em>{item?.lastMessageTime}</em>
                            </strong>
                            {target === 'B' && item?.memberOutAt !== 'Y' && <span className="localTag blue">{item?.memberAreaName && <em>{item?.memberAreaName}</em>}</span>}
                            {target === 'C' && item?.memberOutAt !== 'Y' && <ItemTag items={displayedProsthetics} className="itemTag" />}
                            <div>
                              <p
                                style={{
                                  maxWidth: 140,
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                                // dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(item?.lastMessage)) }}
                              >
                                { item?.memberOutAt !== 'Y' && item?.lastMessage}
                              </p>

                              <span>{Number(item?.unreadMessageCount) > 0 && <em>{Number(item?.unreadMessageCount) > 99 ? '+99' : item?.unreadMessageCount}</em>}</span>
                            </div>
                          </div>
                          <span className="right">
                            <PostsMore items={moreItems(item)} />
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* 더보기 */}
              {total > items.length && <BaseButton label={t('base.view_more')} className="listMore" />}
            </div>
          )}

          {items.length === 0 && <div className="noList chat">{t('chat.not_exist')}</div>}
        </article>
      </>

      {isModal.visible && (
        <ModalAlertPresent>
          <LeaveAlert
            roomNo={isModal.roomNo}
            onFetch={fetchChatRoom}
            onClose={() => {
              setIsModal({ visible: false });
            }}
          />
        </ModalAlertPresent>
      )}

      {isModal2.visible && (
        <ModalAlertPresent>
          <BlockAlert
            onBlock={isModal2.onBlock}
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalAlertPresent>
      )}

      {isModal3.visible && (
        <ModalPresent>
          <ReportModal
            targetType={'A'}
            type={isModal3.target.memberSe}
            target={{ ...isModal3.target }}
            onClose={() => {
              setIsModal3(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default ClientToCenterPage;
