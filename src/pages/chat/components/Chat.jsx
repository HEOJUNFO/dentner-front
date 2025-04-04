import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { replaceToBr, getByteSize } from '@utils/common';
import { fileChatDownload } from '@api/Common';
import { ConfirmModal, CancelModal, CancelCallModal, RejectModal } from '@components/ui';
import { BaseButton, ModalAlertPresent, ModalPresent } from '@components/common';
import DOMPurify from 'dompurify';
import UserStore from '@store/UserStore';
import ModalStore from '@store/ModalStore';
import { useNav, useSnack } from '@components/hooks';
import { postTransaction, putContract, putTransactionCancelConfirm, putTransactionCancelReject } from '@api/Payment';

// 1. 메세지
// 2. 파일첨부
// 3. 이미지
// 4. 지정요청서 전송
// 5. 지정요청 취소
// 6. 지정요청 수락
// 7. 지정요청 거절
// 8. 공개요청 견적서 전송
// 9. 의뢰서 결제완료
// 10. 계약요청 수락
// 11. 거래 취소
// 12. 거래 취소 요청
// 13. 거래 취소 승인
// 14. 거래 취소 거절
const Chat = ({ target, items, roomMember, onFetch }) => {
  const { t } = useTranslation();
  const { user } = UserStore();
  const { actions, callback } = ModalStore();
  const { handleNav, state } = useNav();
  const { showSnackbar, showWarnSnackbar } = useSnack();

  const [isModal, setIsModal] = useState({ visible: false, value: '' });
  const [isRejectModal, setIsRejectModal] = useState({ visible: false, value: '' });
  // const [rejectContent, setRejectContent] = useState('');

  const [isCancelModal, setCancelModal] = useState({
    visible: false,
    value: '',
  });

  // 치자이너 선택
  const handleDesigner = async (requestFormNo, memberNo) => {
    if (requestFormNo && memberNo) {
      const r = await postTransaction({ requestFormNo, memberNo });
      const { data } = r;
      if (Boolean(Number(data))) {
        setIsModal({ visible: false, value: '' });
        actions.setDoneAlert({
          isVisible: true,
          title: t('base.noti'), // 알림
          contents: t('version2_1.text8'), // 치자이너 선택이 완료되었습니다.
          btnName: t('base.confirm'),
        });
        return true;
      } else {
        actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text9'), btnName: t('base.confirm'), callback: () => fetchData() });
        return true;
      }
    }
    return false;
  };

  const handleDesignerModal = (requestFormNo) => {
    setIsModal({
      visible: true,
      value: {
        title: t('status.select_dental'), // 치자이너 선택
        doneContents: t('version2_1.text8'),
        failContents: t('version2_1.text9'),
        contents: t('version2_1.text10'),
        btnCancel: t('version2_1.text3'), // 취소
        btnConfirm: t('version2_1.text11'), // 선택하기
        onConfirm: () => handleDesigner(requestFormNo, target?.targetNo),
      },
    });
  };

  const handleRequestConfirmCancelModal = (requestFormNo) => {
    setIsModal({
      visible: true,
      value: {
        title: t('version2_1.text12'),
        doneContents: t('version2_1.text13'),
        failContents: t('version2_1.text14'),
        contents: t('version2_1.text15'),
        btnCancel: t('version2_1.text3'), // 취소
        btnConfirm: t('base.confirm'), // 확인
        onConfirm: () => handleConfirmCancelReq(requestFormNo),
      },
    });
  };

  const handleRequestConfirmCancelRejectModal = (requestFormNo) => {
    setIsModal({
      visible: true,
      value: {
        title: t('version2_1.text16'), // 거래 취소 요청 거절
        doneContents: t('version2_1.text17'), //'거래 취소 요청이 거절되었습니다.',
        failContents: t('version2_1.text18'), //'거래 취소 요청 거절 오류',
        contents: t('version2_1.text19'), //'거래 취소를 거절하시겠습니까?',
        btnCancel: t('version2_1.text3'), // 취소
        btnConfirm: t('base.confirm'), //'확인',
        onConfirm: () => handleConfirmCancelRejectReq(requestFormNo),
      },
    });
  };

  const handleConfirmCancelRejectReq = async (requestFormNo) => {
    try {
      const r = await putTransactionCancelReject({ requestFormNo });

      const { data } = r;
      if (Number(data) > 0) {
        if (onFetch) onFetch();
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleConfirmCancelReq = async (requestFormNo) => {
    try {
      const r = await putTransactionCancelConfirm({ requestFormNo });

      const { data } = r;
      if (Number(data) > 0) {
        if (onFetch) onFetch();
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // 계약요청 수락 모달
  const handleRequestConfirmModal = (requestFormNo) => {
    setIsModal({
      visible: true,
      value: {
        title: t('version2_1.text20'), //'계약요청 수락',
        doneContents: t('version2_1.text21'), //'계약이 완료 되었습니다!\n다음단계를 진행해 주세요!.',
        failContents: t('version2_1.text22'), //'계약 오류',
        contents: t('version2_1.text23'), //'의뢰인의 계약요청을 수락 하시겠습니까?',
        btnCancel: t('version2_1.text3'), // 취소
        btnConfirm: t('version2_1.text11'), // 선택하기
        onConfirm: () => handleRequestConfirm(requestFormNo),
      },
    });
  };

  const handleRequestConfirm = async (requestFormNo) => {
    // requestContactSe A:수락, B:거절
    const p = {
      requestRefuseCn: '',
      requestContactSe: 'A',
    };

    try {
      const r = await putContract({ requestFormNo, body: p });
      const { data } = r;
      if (Number(data) > 0) {
        if (onFetch) onFetch();
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const handleCancel = (requestFormNo) => {
    if (!requestFormNo) return;
    // 취소모달
    setCancelModal({
      visible: true,
      value: {
        target: {
          memberNo: target?.targetNo,
          memberName: target?.memberNickName,
          profileImage: target?.memberProfileImage,
          requestFormNo: requestFormNo,
          // status: item?.status,
          // dealStatus: item?.dealStatus,
        },
        onClose: () => {
          setCancelModal({ visible: false, value: null });
        },
      },
    });
  };

  const rejectContentRef = useRef('');
  const handleRejectModal = (requestFormNo) => {
    setIsRejectModal({
      visible: true,
      value: {
        onChange: (e) => {
          rejectContentRef.current = e.target.value;
        },
        member: { nickName: target?.memberNickName, profileImg: target?.memberProfileImage },
        onClose: () => {
          rejectContentRef.current = '';

          setIsRejectModal(false);
        },
        onReject: () => {
          const currentRejectContent = rejectContentRef.current;
          handleReject(requestFormNo, currentRejectContent);
        },
      },
    });
  };

  // 지정 요청 거절하기
  const handleReject = async (requestFormNo, rejectContent) => {
    if (!requestFormNo) return;
    try {
      if (!rejectContent) {
        showWarnSnackbar(t('version2_1.text24'));
        return;
      }

      const p = {
        requestRefuseCn: rejectContent,
        requestContactSe: 'B',
      };

      const r = await putContract({ requestFormNo, body: p });

      const { data } = r;

      if (Number(data) > 0) {
        setIsRejectModal(false);
        actions.setDoneAlert({
          isVisible: true,
          title: t('base.noti'),
          contents: t('version2_1.text25'), //거래가 취소 되었습니다.
          btnName: t('base.confirm'),
          callback: () => {
            if (onFetch) onFetch();
          },
        });
      } else {
        showWarnSnackbar(t('version2_1.text25')); //이미 처리된 계약요청입니다.
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileDownload = async (e, fileNo, fileName) => {
    e.preventDefault();

    // await fileChatDownload(fileNo)
    //   .then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data], { type: response.data.type }));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', `${fileName}`);
    //     document.body.appendChild(link);
    //     link.click();
    //   })
    //   .catch((error) => {
    //     console.error('There was a problem with your fetch operation:', error);
    //   });

    e.preventDefault();

    actions.setLoading(true);
    const token = localStorage.getItem('token');
    
    //console.log(token,  fileNo)
    fetch(`${import.meta.env.VITE_API_URL_SUB}/api/v1/common/download/chat/${fileNo}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('파일 다운로드 실패');
        }

        // 스트림을 읽기 위한 리더
        const reader = response.body.getReader();
        const contentLength = +response.headers.get('Content-Length') || 0;

        // 다운로드 진행 상황을 추적하기 위한 변수
        let receivedLength = 0;
        const chunks = []; // 다운로드한 데이터를 저장할 배열

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          chunks.push(value);
          receivedLength += value.length;

          // 진행률 업데이트 (여기서는 예시로 콘솔에 출력)
          if (contentLength) {
            // console.log(`Received ${(receivedLength / contentLength) * 100}%`);
            // actions.setReceived(Math.round((receivedLength / contentLength) * 100));
          }
        }

        // 모든 청크를 하나의 Uint8Array로 결합
        const blob = new Blob(chunks, { type: 'application/octet-stream' });

        // 다운로드 링크 생성 및 클릭
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${fileName}`);
        document.body.appendChild(link);
        link.click();

        // 메모리 해제
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error('파일 다운로드 오류:', error);
      })
      .finally(() => {
        actions.setLoading(false);
        // actions.setReceived(0);
      });
  };
  return (
    <>
      {/* <div className="cDate">
                <em>2024년 5월 1일</em>
              </div> */}
      {items?.map((item, idx) => {
        let params = '';
        try {
          params = JSON.parse(item?.msg);
        } catch (e) {
          // console.log(e);
        }

        if (item?.msgType !== '0')
          return (
            <div key={`CHAT_${idx}`} className={`${item.postType === 'me' ? 'me' : ''} dialogBack`}>
              <div className="dialog">
                <ul>
                  <li>
                    {item.postType !== 'me' && <strong className="nickName">{item.memberNickName}</strong>}

                    {item?.fileUrl && item?.msgType === '3' && (
                      <span className="fileImg">
                        <span>
                          <img src={item?.fileUrl} />
                        </span>
                      </span>
                    )}
                    {item?.fileUrl && item?.msgType === '2' && (
                      <span className="fileLoad">
                        <span>
                          {item?.fileRealName}
                          <em>{getByteSize(item?.fileSize)}</em>
                        </span>
                        <button className="bFD" onClick={(e) => handleFileDownload(e, item?.chatNo, item?.fileRealName)}>
                          Download
                        </button>
                      </span>
                    )}

                    {user?.memberSe === 'A' && item?.msgType === '8' && (
                      <>
                        <div className="chatReQ">
                          <dl>
                            <dt>견적서 전송</dt>
                            <dd>치자이너가 견적서를 보냈습니다.</dd>
                            <dd>
                              <span className="fileLoad go" onClick={() => handleNav(`/payment/estimate/${params?.requestEstimateNo}`)}>
                                <span>
                                  견적서 확인하기
                                  <em>선택 시 페이지로 이동됩니다.</em>
                                </span>
                              </span>
                              <BaseButton label="치자이너 선택" className="btnB ss" onClick={(e) => handleDesignerModal(params?.requestFormNo)} />
                            </dd>
                          </dl>
                        </div>
                      </>
                    )}
                    {user?.memberSe === 'C' && item?.msgType === '8' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>견적서 전송</dt>
                          <dd>의뢰인에게 견적서를 보냈습니다.</dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'C' && item?.msgType === '4' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>지정 요청</dt>
                          <dd>의뢰인이 지정 요청을 보냈습니다.</dd>
                          <dd>
                            <span className="fileLoad go" onClick={() => handleNav(`/payment/contract/${params?.requestFormNo}`)}>
                              <span>
                                요청서 확인하기
                                <em>선택 시 페이지로 이동됩니다.</em>
                              </span>
                            </span>
                            <BaseButton label="요청 수락하기" className="btnB ss" onClick={() => handleRequestConfirmModal(params?.requestFormNo)} />
                            <BaseButton label="요청 거절하기" className="btnL ss" onClick={() => handleRejectModal(params?.requestFormNo)} />
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'A' && item?.msgType === '4' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>지정 요청</dt>
                          <dd>치자이너에게 요청서를 전송했습니다.</dd>
                          <dd>
                            <BaseButton label="거래 취소하기" className="btnB ss" onClick={() => handleCancel(params?.requestFormNo)} />
                            {/* <BaseButton label="요청 취소하기" className="btnB ss" onClick={() => handleCancel(params?.requestFormNo)} /> */}
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'C' && item?.msgType === '6' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>지정 요청 수락</dt>
                          <dd>의뢰인 요청에 수락했습니다.</dd>
                        </dl>
                      </div>
                    )}
                    {user?.memberSe === 'C' && item?.msgType === '7' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>지정 요청 거절</dt>
                          <dd>의뢰인 요청에 거절했습니다.</dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'A' && item?.msgType === '6' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>지정 요청 수락</dt>
                          <dd>치자이너가 요청을 수락했습니다.</dd>
                        </dl>
                      </div>
                    )}
                    {user?.memberSe === 'A' && item?.msgType === '7' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>지정 요청 거절</dt>
                          <dd>치자이너가 요청을 거절했습니다.</dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'C' && item?.msgType === '11' && item.postType === 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소</dt>
                          <dd>치자이너가 거래를 취소하였습니다.</dd>
                          <dd className="cancel">
                            <span>
                              <strong>[거래 취소사유]</strong> {params?.requestCancelMsg || params?.requestCancelEtcCn}
                            </span>
                          </dd>
                        </dl>
                      </div>
                    )}
                    {user?.memberSe === 'C' && item?.msgType === '11' && item.postType !== 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소</dt>
                          <dd>의뢰인이 거래를 취소하였습니다.</dd>
                          <dd className="cancel">
                            <span>
                              <strong>[거래 취소사유]</strong> {params?.requestCancelMsg || params?.requestCancelEtcCn}
                            </span>
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'A' && item?.msgType === '11' && item.postType === 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소</dt>
                          <dd>의뢰인이 거래를 취소하였습니다.</dd>
                          {(params?.requestCancelMsg || params?.requestCancelEtcCn) && (
                            <dd className="cancel">
                              <span>
                                <strong>[거래 취소사유]</strong> {params?.requestCancelMsg || params?.requestCancelEtcCn}
                              </span>
                            </dd>
                          )}
                        </dl>
                      </div>
                    )}
                    {user?.memberSe === 'A' && item?.msgType === '11' && item.postType !== 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소</dt>
                          <dd>치자이너가 거래를 취소하였습니다.</dd>
                          <dd className="cancel">
                            <span>
                              <strong>[거래 취소사유]</strong> {params?.requestCancelMsg || params?.requestCancelEtcCn}
                            </span>
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'C' && item?.msgType === '12' && item.postType === 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청</dt>
                          <dd>의뢰인에게 거래 취소를 요청하였습니다.</dd>
                          <dd className="cancel">
                            <strong>[거래 취소사유]</strong> {params?.requestCancelMsg || params?.requestCancelEtcCn}
                          </dd>
                        </dl>
                      </div>
                    )}
                    {user?.memberSe === 'C' && item?.msgType === '12' && item.postType !== 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청</dt>
                          <dd>의뢰인이 거래 취소 요청하였습니다.</dd>
                          <dd className="cancel">
                            <strong>[거래 취소사유]</strong> {params?.requestCancelMsg || params?.requestCancelEtcCn}
                            <BaseButton label="요청 수락하기" className="btnB ss" onClick={() => handleRequestConfirmCancelModal(params?.requestFormNo)} />
                            <BaseButton label="요청 거절하기" className="btnL ss" onClick={() => handleRequestConfirmCancelRejectModal(params?.requestFormNo)} />
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'A' && item?.msgType === '12' && item.postType === 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청</dt>
                          <dd>치자이너에게 거래 취소를 요청하였습니다.</dd>
                          <dd className="cancel">
                            <strong>[거래 취소사유]</strong> {params?.requestCancelMsg || params?.requestCancelEtcCn}
                          </dd>
                        </dl>
                      </div>
                    )}
                    {user?.memberSe === 'A' && item?.msgType === '12' && item.postType !== 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청</dt>
                          <dd>치자이너가 거래 취소 요청하였습니다.</dd>
                          <dd className="cancel">
                            <strong>[거래 취소사유]</strong> {params?.requestCancelMsg || params?.requestCancelEtcCn}
                            <BaseButton label="요청 수락하기" className="btnB ss" onClick={() => handleRequestConfirmCancelModal(params?.requestFormNo)} />
                            <BaseButton label="요청 거절하기" className="btnL ss" onClick={() => handleRequestConfirmCancelRejectModal(params?.requestFormNo)} />
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'A' && item?.msgType === '13' && item.postType === 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청 수락</dt>
                          <dd>
                            치자이너의 거래 취소 요청에 수락하여 거래가 취소 되었습니다.
                            <br />
                            <br />
                            취소된 거래에 대한 마일리지는 각 50%씩 지급됩니다.
                            <br />
                            <br />
                            협의 사항이 필요 시, 채널톡으로 문의 주세요.
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'A' && item?.msgType === '14' && item.postType === 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청 거절</dt>
                          <dd>
                            치자이너의 거래 취소 요청에 거절하여
                            <br />
                            <br /> 거래가 계속 진행됩니다.
                            <br />
                            <br />
                            협의 사항이 필요 시, 채널톡으로 문의 주세요.
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'A' && item?.msgType === '13' && item.postType !== 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청 수락</dt>
                          <dd>
                            의뢰인의 거래 취소 요청에 수락하여 거래가 취소 되었습니다.
                            <br />
                            <br />
                            취소된 거래에 대한 마일리지는 각 50%씩 지급됩니다.
                            <br />
                            <br />
                            협의 사항이 필요 시, 채널톡으로 문의 주세요.
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'A' && item?.msgType === '14' && item.postType !== 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청 거절</dt>
                          <dd>
                            의뢰인의 거래 취소 요청에 거절하여
                            <br />
                            <br /> 거래가 계속 진행됩니다.
                            <br />
                            <br />
                            협의 사항이 필요 시, 채널톡으로 문의 주세요.
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'C' && item?.msgType === '13' && item.postType !== 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청 수락</dt>
                          <dd>
                            치자이너의 거래 취소 요청에 수락하여 거래가 취소 되었습니다.
                            <br />
                            <br />
                            취소된 거래에 대한 마일리지는 각 50%씩 지급됩니다.
                            <br />
                            <br />
                            협의 사항이 필요 시, 채널톡으로 문의 주세요.
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'C' && item?.msgType === '14' && item.postType !== 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청 거절</dt>
                          <dd>
                            치자이너의 거래 취소 요청에 거절하여
                            <br />
                            <br /> 거래가 계속 진행됩니다.
                            <br />
                            <br />
                            협의 사항이 필요 시, 채널톡으로 문의 주세요.
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'C' && item?.msgType === '14' && item.postType === 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청 거절</dt>
                          <dd>
                            의뢰인의 거래 취소 요청에 거절하여
                            <br />
                            <br /> 거래가 계속 진행됩니다.
                            <br />
                            <br />
                            협의 사항이 필요 시, 채널톡으로 문의 주세요.
                          </dd>
                        </dl>
                      </div>
                    )}

                    {user?.memberSe === 'C' && item?.msgType === '13' && item.postType === 'me' && (
                      <div className="chatReQ">
                        <dl>
                          <dt>거래 취소 요청 수락</dt>
                          <dd>
                            의뢰인의 거래 취소 요청에 수락하여 거래가 취소 되었습니다.
                            <br />
                            <br />
                            취소된 거래에 대한 마일리지는 각 50%씩 지급됩니다.
                            <br />
                            <br />
                            협의 사항이 필요 시, 채널톡으로 문의 주세요.
                          </dd>
                        </dl>
                      </div>
                    )}

                    {item?.msg && !['8', '4', '6', '7', '11', '12', '13', '14'].includes(item.msgType) && (
                      <p
                        style={{
                          maxWidth: 400,
                          wordWrap: 'break-word', // 단어가 길면 자동 줄바꿈
                          wordBreak: 'break-word', // 단어를 강제로 나눔
                          overflow: 'hidden',
                        }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(item?.msg)) }}
                      ></p>
                    )}
                  </li>
                </ul>
                <span className="cTime">
                  {(item.readYn === 'Y' || roomMember.length === 2) && <strong>{t('base.read')}</strong>}
                  {item.readYn === 'N' && roomMember.length !== 2 && <strong>{t('version2_4.text90')}</strong>}
                  <span>{item.messageTime}</span>
                </span>
              </div>
            </div>
          );
      })}

      {isModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal
            {...isModal.value}
            onClose={() => {
              setIsModal({ visible: false, value: null });
            }}
          />
        </ModalAlertPresent>
      )}

      {isCancelModal.visible && (
        <ModalPresent>
          <CancelModal onFetch={onFetch} {...isCancelModal.value} />
        </ModalPresent>
      )}

      {/* 지정요청 거절 */}
      {isRejectModal.visible && (
        <ModalPresent>
          <RejectModal {...isRejectModal.value} />
        </ModalPresent>
      )}
    </>
  );
};

export default Chat;
