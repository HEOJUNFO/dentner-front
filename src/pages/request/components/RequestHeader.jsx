import React from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const RequestHeader = ({ isMine, requestFormSe, requestDocCnt, requestFormSj, requestStatus, requestStatusName, registerNo, registerDt, onModify, onRemove, setIsModal2 }) => {
  const { t } = useTranslation();
  const dt = registerDt.split(' ');
  const date = dt[0];
  const time = dt[1]?.substring(0, 5);
//console.log(requestStatusName)
  return (
    <div className="reQInfo">
      <div className="stsSum">
        <span>
          <strong className={`iSts ${requestStatus === 'C' ? 'ing' : ''} ${requestStatus === 'D' ? 'end' : ''}`}>{t(`status.${requestStatusName}`)}</strong>
          {requestFormSe === 'A' && (
            <span className="reQNum">
              <i>{t('base.estimate')}</i>
              <strong>{requestDocCnt}</strong>
            </span>
          )}
        </span>
        <strong className="time">
          {date} <strong>{time}</strong>
        </strong>
      </div>
      <div>
        <strong>{requestFormSj}</strong>

        <span className="postEdit">
          {/* {isMine && requestDocCnt === 0 && (
            <>
              <BaseButton label={'수정'} onClick={onModify} />
              <span>
                <BaseButton label={'삭제'} onClick={onRemove} />
              </span>
            </>
          )} */}
          {requestFormSe === 'A' &&
            (requestStatus === 'A' || requestStatus === 'B') &&
            isMine &&
            (requestDocCnt === 0 ? (
              <>
                <BaseButton label={t('version2_2.text2')} onClick={onModify} />
                <span>
                  <BaseButton label={t('version2_2.text3')} onClick={onRemove} />
                </span>
              </>
            ) : (
              <BaseButton label={t('version2_2.text3')} onClick={onRemove} />
            ))}

          {/* 지정요청 */}
          {isMine && requestFormSe === 'B' && requestStatus === 'I' && (
            <>
              <BaseButton label={t('version2_2.text2')} onClick={onModify} />
              <span>
                <BaseButton label={t('version2_2.text3')} onClick={onRemove} />
              </span>
            </>
          )}

          {!isMine && <BaseButton label={t('version2_2.text4')} className={'bRP'} onClick={() => setIsModal2(true)} />}
        </span>
      </div>
    </div>
  );
};

export default RequestHeader;
