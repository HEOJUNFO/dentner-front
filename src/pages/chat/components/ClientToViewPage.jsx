import React, { useEffect, useRef, useState, useCallback } from 'react';

import { BaseButton, ItemTag, PostsMore, ModalPresent, ModalAlertPresent } from '@components/common';
import { BlockAlert, LeaveAlert, ReportModal } from '@components/ui';

import { useTranslation } from 'react-i18next';

import { replaceToBr, withCommas, getByteSize } from '@utils/common';

import sampleProfile2 from '@assets/images/no_user.png';
import useClientToViewPage from '../hooks/useClientToViewPage';

import Chat from './Chat';
import ChatInput from './ChatInput';
import { useNavigate } from 'react-router-dom';

const ClientToViewPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    handleNav,
    items,
    target,
    input,
    setInput,
    sendMessage,
    messageEndRef,
    handleFileChange,
    selectedFile,
    setSelectedFile,
    fileInput,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    handleInterest,
    roomMember,
    fetchChatRoomDetail,
    handleDetailProfile,
  } = useClientToViewPage();

  const [chatDetail, setChatDetail] = useState(false);

  //console.log(target)
  return (
    <>
      {/* 상세 */}
      <article>
        <div className="mSubPrev">
          <button
            className="bMP"
            onClick={() => {
              navigate(-1);
            }}
          >
            {t('base.back')}
          </button>
        </div>
        <div className="chatDetail">
          <div className="back">
            <div className="chatInfo">
              <span className="profileImg">
                <img src={target?.memberProfileImage || sampleProfile2} />
              </span>
              <div className="listD">
                <strong className="nickName" style={{ cursor: 'pointer' }} onClick={() => handleDetailProfile(target)}>
                  {target?.memberOutAt === 'Y' ? '탈퇴한 회원입니다.' : target?.memberNickName  }
                </strong>

                {target?.targetType === 'B' && target?.memberOutAt !== 'Y' && <span className="localTag blue">{target?.memberAreaName && <em>{target?.memberAreaName}</em>}</span>}
                {target?.targetType === 'C' && target?.memberOutAt !== 'Y' && <ItemTag items={target?.prostheticsName?.split(',')?.map((el) => ({ name: el }))} className="itemTag" />}
              </div>
              <span className="right">
                <input type="checkbox" className="likeSet" checked={target?.interestYn === 'Y' ? true : false} onChange={(e) => handleInterest(e.target.checked)} />
                <PostsMore items={target?.moreItems} />
              </span>
            </div>
            {/* <div className="chatData" ref={messageEndRef}> */}
            <div className="chatData">
              <div className="chatDataBack">
                {/* <div className="cDate">
                  <em>2024년 5월 1일</em>
                </div> */}

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
            {/* <div className="chatInputBack">
              <div className="chatInput">
                <div>
                  <span className="fileFind icon">
                    <input type="file" accept="image/*,video/*,application/pdf" ref={fileInput} id="file1" onChange={handleFileChange} />
                    <label htmlFor="file1">파일 첨부하기</label>
                  </span>
                  <TextareaAutosize minRows={1} maxRows={3} placeholder={t('chat.enter')} value={input} onChange={(e) => setInput(e.target.value)} />
                </div>
                <BaseButton label={t('base.send')} className="btnB" onClick={sendMessage} />
              </div>
              {selectedFile && (
                <div className="fileSet">
                  <ul>
                    <li>
                      <span className="fileLoad">
                        <span>
                          {selectedFile?.name}
                          <em>{getByteSize(selectedFile?.size)}</em>
                        </span>
                        <button className="bID" onClick={() => setSelectedFile(null)}>
                          Del
                        </button>
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </article>

      {isModal.visible && (
        <ModalAlertPresent>
          <LeaveAlert
            roomNo={isModal.roomNo}
            onFetch={() => handleNav('/chat')}
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

export default ClientToViewPage;
