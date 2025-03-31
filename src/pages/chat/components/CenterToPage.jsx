import React, { useState } from 'react';

import { BaseButton, ItemTag, PostsMore, ModalAlertPresent, ModalPresent } from '@components/common';
import { useOutletContext } from 'react-router-dom';

import { BlockAlert, LeaveAlert, ReportModal } from '@components/ui';

import sampleProfile2 from '@assets/images/no_user.png';
import { replaceToBr } from '@utils/common';
import DOMPurify from 'dompurify';
import useCenterToPage from '../hooks/useCenterToPage';
import { useTranslation } from 'react-i18next';

const CenterToPage = () => {
  const { t } = useTranslation();
  const typeProps = useOutletContext();
  const {
    fetchChatRoom,
    total,
    items,
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
    listEditor,
    setListEditor,
  } = useCenterToPage({
    typeProps,
  });

  return (
    <>
      {/* 목록 */}
      <article>
        {/* 목록 없을 경우 */}
        {/* 진행중인 채팅목록이 없습니다. */}
        {items.length === 0 && <div className="noList chat line">{t('version2_1.text7')}</div>}
        {/*  */}

        {items.length > 0 && (
          <>
            <div className="listTopSorting chatCase">
              <div>
                <span>
                  <span className="checkSet" style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }}>
                    <input type="checkbox" id="checkbox" onChange={(e) => handleAllChecked(e.target.checked)} />
                    <label htmlFor="checkbox">{t('base.select_all')}</label>
                  </span>
                </span>
                <span className="postEdit">
                  {/* 채팅 편집 */}
                  <BaseButton
                    label={t('chat.edit')}
                    style={{ display: `${listEditor ? 'none' : 'inline-flex'}` }}
                    onClick={() => {
                      setListEditor(true);
                    }}
                  />
                  {/* 선택한 채팅방 나가기' */}
                  <BaseButton label={t('chat.exit')} style={{ display: `${listEditor ? 'inline-flex' : 'none'}` }} onClick={handleLeave} />
                </span>
              </div>
            </div>
            <div className="listBox">
              <div className="chatList">
                <ul>
                  {items?.map((item, idx) => {
                    const cad = item?.swName?.split(',') ?? [];
                    if (item?.swEtc) cad.push(item?.swEtc);
                    const cads = cad.map((el) => ({ name: el }));
                    return (
                      <li key={`DesignerToPage_${idx}`}>
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
                              handleNav(`/centerchat/view/${item?.roomNo}`, { ...item, targetType: 'A', targetSe: 'A' });
                            }}
                          >
                            <strong className="nickName">
                              {item?.memberNickName}
                              <em>{item?.lastMessageTime}</em>
                            </strong>
                            <ItemTag items={cads} className="itemTag" />
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
                                {item?.lastMessage}
                              </p>
                              <span>
                                <span>{Number(item?.unreadMessageCount) > 0 && <em>{Number(item?.unreadMessageCount) > 99 ? '+99' : item?.unreadMessageCount}</em>}</span>
                              </span>
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
              {/* 더 보기 */}
              {total > items.length && <BaseButton label={t('base.view_more')} className="listMore" />}
            </div>
          </>
        )}
      </article>

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
            type={'C'}
            targetType={'A'}
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

export default CenterToPage;
