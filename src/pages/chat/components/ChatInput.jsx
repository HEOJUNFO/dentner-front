import { BaseButton } from '@components/common';
import { getByteSize } from '@utils/common';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TextareaAutosize from 'react-textarea-autosize';

const ChatInput = ({ fileInput, onFileChange, input, setInput, sendMessage, selectedFile, setSelectedFile }) => {
  const { t } = useTranslation();

  return (
    <div className="chatInputBack">
      <div className="chatInput">
        <div>
          <span className="fileFind icon">
            <input type="file" accept="*" ref={fileInput} id="file1" onChange={onFileChange} />
            <label htmlFor="file1">
              {/* 파일 첨부하기 */}
              {/* {t('version2_1.text27')} */}
            </label>
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
    </div>
  );
};

export default ChatInput;
