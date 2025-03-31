import defaultImg from '@assets/images/no_user.png';
import {BaseButton, BaseInput, BaseTextArea, ModalAlertPresent, ModalPresent} from '@components/common';
import { ConfirmAlert, ReportModal } from '@components/ui';
import { nameMaskingFormat, replaceToBr } from '@utils/common';
import DOMPurify from 'dompurify';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRequestComment } from '../hooks/useRequestComment';

const RequestComment = ({ replyList, requestFormNo }) => {
  const { t } = useTranslation();
  const {
    isLoading,
    items,
    user,
    params,
    handleChange,
    handleSumbit,
    handleDelete,
    handleModify,
    handleUpdate,
    handleChilds,
    handleModifyChild,
    handleSumbitChild,
    isModal,
    setIsModal,
    handleReport,
    report,
    isDeleteModal,
  } = useRequestComment({ replyList });
  // console.log(replyList)
  // console.log(user)
  if (isLoading) return <></>;
  return (
    <div className="commentSet" style={{ borderTop: 'none' }}>
      <div className="cnum">
        {t('version2_2.text14')} <strong>{items.length}</strong>
      </div>
      {/* <!----> */}
      <div className="cList">
        <ul>
          {items.map((el, idx) => {
            const dt = el.registerDt.split(' ');
            const date = dt[0];
            const time = dt[1]?.substring(0, 5);
            return (
              <li key={`commentSet_${idx}`}>
                <div className="cBox">
                  <div className="uerLine">
                    <strong>
                      <em>{user?.memberNo === el?.registerNo ? el.memberNickName : nameMaskingFormat(el.memberNickName)}</em>
                      <span className="time">
                        {date} <span>{time}</span>
                      </span>
                    </strong>

                    {user?.memberNo === el.registerNo && (
                      <span className="postEdit">
                        {el?.state === 'modify' ? (
                          <>
                            <BaseButton label={t('version2_1.text3')} onClick={() => handleModify(idx, 'state', 'read')} />
                          </>
                        ) : (
                          <>
                            <BaseButton label={t('version2_2.text2')} onClick={() => handleModify(idx, 'state', 'modify')} />
                            <span>
                              <BaseButton label={t('version2_2.text3')} onClick={() => handleDelete(el)} />
                            </span>
                          </>
                        )}
                      </span>
                    )}
                    {user?.memberNo !== el.registerNo && (
                      <span className="postEdit">
                        <BaseButton label={t('version2_2.text4')} className={'bRP'} onClick={() => handleReport(el)} />
                      </span>
                    )}
                  </div>
                  {el?.state === 'modify' ? (
                    <div className="mWrite">
                      <div>
                        <textarea id="newAnswerCn" placeholder={t('version2_2.text15')} defaultValue={el.newAnswerCn} onChange={(e) => handleModify(idx, e.target.id, e.target.value)} />
                      </div>
                      <BaseButton label={t('version2_2.text16')} className="btnB" onClick={() => handleUpdate(el)} />
                    </div>
                  ) : (
                    <div className="cTxt">
                      <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(el.answerCn)) }}></p>
                      <BaseButton label={t('version2_2.text17')} className={'btnW'} onClick={() => handleChilds(idx, 'add', el)} />
                    </div>
                  )}
                </div>
                {el.childs.length > 0 && (
                  <ol>
                    {el.childs.map((ele, idxx) => {
                      let dt;
                      let date;
                      let time;
                      if (ele.state !== 'write') {
                        dt = ele.registerDt?.split(' ');
                        date = dt[0];
                        time = dt[1]?.substring(0, 5);
                      }
                      return (
                        <li key={`commentSet_child_${idx}_${idxx}`}>
                          <div className="cBox">
                            {ele.state !== 'write' && (
                              <div className="uerLine">
                                <strong>
                                  <em>{user?.memberNo === ele?.registerNo ? ele.memberNickName : nameMaskingFormat(ele.memberNickName)}</em>
                                  <span className="time">
                                    {date} <span>{time}</span>
                                  </span>
                                </strong>
                                {user?.memberNo === ele.registerNo && (
                                  <span className="postEdit">
                                    {ele?.state === 'modify' ? (
                                      <>
                                        <BaseButton label={t('version2_1.text3')} onClick={() => handleModifyChild(idx, idxx, 'state', 'read')} />
                                      </>
                                    ) : (
                                      <>
                                        <BaseButton label={t('version2_2.text2')} onClick={() => handleModifyChild(idx, idxx, 'state', 'modify')} />
                                        <span>
                                          <BaseButton label={t('version2_2.text3')} onClick={() => handleDelete(ele)} />
                                        </span>
                                      </>
                                    )}
                                  </span>
                                )}
                                {user?.memberNo !== ele.registerNo && (
                                  <span className="postEdit">
                                    <BaseButton label={t('version2_2.text4')} className={'bRP'} onClick={() => handleReport(ele)} />
                                  </span>
                                )}
                              </div>
                            )}
                            {ele?.state === 'modify' ? (
                              <div className="mWrite">
                                <div>
                                  <textarea
                                    id="newAnswerCn"
                                    placeholder={t('version2_2.text15')}
                                    defaultValue={ele.newAnswerCn}
                                    onChange={(e) => handleModifyChild(idx, idxx, e.target.id, e.target.value)}
                                    maxLength={100}
                                  />
                                </div>
                                <BaseButton label={t('version2_2.text16')} className="btnB" onClick={() => handleUpdate(ele)} />
                              </div>
                            ) : ele?.state === 'write' ? (
                              <div className="mWrite">
                                <div>
                                  <textarea
                                    placeholder={t('version2_2.text18')}
                                    id="answerCn"
                                    defaultValue={ele.answerCn}
                                    onChange={(e) => handleModifyChild(idx, idxx, e.target.id, e.target.value)}
                                    maxLength={100}
                                  ></textarea>
                                </div>
                                <span className="right">
                                  <BaseButton label={t('version2_2.text19')} className="btnB" onClick={() => handleSumbitChild(ele)} />
                                  <span className="postEdit">
                                    <BaseButton label={t('version2_1.text3')} onClick={() => handleChilds(idx, 'remove', el)} />
                                  </span>
                                </span>
                              </div>
                            ) : (
                              <div className="cTxt">
                                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(ele.answerCn)) }}></p>
                              </div>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {/**/}

      <div className="cWrite">
        <div>
          <BaseTextArea
            onFocus={(e) => {
              //alert()
            }}
            id="answerCn"
            error={params.answerCn.error}
            value={params.answerCn.value}
            placeholder={params.answerCn.placeholder}
            onChange={(e) => handleChange(e.target.id, e.target.value)}
          />
          <BaseButton label={t('version2_2.text19')} onClick={() => handleSumbit(requestFormNo)} />
        </div>
      </div>

      {isModal && (
        <ModalPresent>
          <ReportModal
            type={'A'}
            targetType={'C'}
            target={{ memberNo: report?.registerNo, memberName: nameMaskingFormat(report?.memberNickName || report?.memberDentistryName), profileImage: report?.memberProfileImage || defaultImg }}
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}

      {isDeleteModal.visible && (
        <ModalAlertPresent>
          <ConfirmAlert {...isDeleteModal.value} />
        </ModalAlertPresent>
      )}
    </div>
  );
};

export default RequestComment;
