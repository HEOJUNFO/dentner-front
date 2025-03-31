import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { BaseButton, ItemTag, PostsMore } from '@components/common';

import { ModalAlertPresent, ModalPresent } from '@components/common';
import { BlockAlert, LeaveAlert, ReportModal } from '@components/ui';

import { useTranslation } from 'react-i18next';

import sampleProfile2 from '@assets/images/no_user.png';

import useDesignerToViewPage from '../hooks/useDesignerToViewPage';
import Chat from './Chat';
import ChatInput from './ChatInput';
import { useNavigate } from 'react-router-dom';

const DesignerToViewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    items,
    target,
    input,
    setInput,
    sendMessage,
    handleFileChange,
    selectedFile,
    setSelectedFile,
    fileInput,
    messageEndRef,
    handleNav,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    roomMember,
    fetchChatRoomDetail,
    handleDetailProfile,
  } = useDesignerToViewPage();

  const [chatDetail, setChatDetail] = useState(false);


  return (
    <>
      <article className="onlyCD">
        <div className="mSubPrev">
          <button
            className="bMP"
            onClick={() => {
              navigate(-1);
            }}
          >
            {/* 이전 */}
            {t('base.back')}
          </button>
        </div>
        <div className="listTopSorting chatCase mEtc">
          <div>
            <span></span>
            <span className="postEdit">{/* <BaseButton label="거래취소하기" /> */}</span>
          </div>
        </div>
        <div className="chatDetail">
          <div className="back">
            <div className="chatInfo">
              <span className="profileImg">
                <img src={target?.memberProfileImage || sampleProfile2} />
              </span>
              <div className="listD">
                <strong style={{ cursor: 'pointer' }} onClick={() => handleDetailProfile(target)}>
                  {target ? target?.memberNickName : '탈퇴한 회원입니다.'}
                </strong>
                <ItemTag items={target?.cads} className="itemTag" />
              </div>
              <span className="right">
                <PostsMore items={target?.moreItems} />
              </span>
            </div>
            <div className="chatData">
              <div className="chatDataBack">
                <Chat target={target} onFetch={fetchChatRoomDetail} items={items} roomMember={roomMember} />
              </div>
            </div>

            <ChatInput
              fileInput={fileInput}
              onFileChange={handleFileChange}
              input={input}
              setInput={setInput}
              sendMessage={sendMessage}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </div>
        </div>
      </article>

      {isModal.visible && (
        <ModalAlertPresent>
          <LeaveAlert
            roomNo={isModal.roomNo}
            onFetch={() => handleNav('/designerchat')}
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

export default DesignerToViewPage;
