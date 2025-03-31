import { BaseButton, BaseSelect, ModalAlertPresent } from '@components/common';
import React, { useEffect, useState } from 'react';
import CancelDoneAlert from './CancelDoneAlert';
import { deleteTransactionCancel } from '@api/Payment';
import CodeStore from '@store/CodeStore';
import { useNavigate } from 'react-router-dom';
import UserStore from '@store/UserStore';
import { useTranslation } from 'react-i18next';
/**
 * 거래취소 모달
 * @param {*} param0
 * @returns
 */
const CancelModal = ({ onClose, target, onFetch, onConfirm }) => {
  const { t } = useTranslation();
  const { getters } = CodeStore();
  const { user } = UserStore();
  const [member, setMember] = useState({ memberNo: '', profileImage: '', memberName: '' });
  const [isModal, setIsModal] = useState(false);
  const [requestCancelNo, setRequestCancelNo] = useState();
  const [requestCancelEtcCn, setRequestCancelEtcCn] = useState();
  const [requestStatus, setRequestStatus] = useState();
  const [cancelArr, setCancelArr] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e, item) => {
    // e.preventDefault();
    if (item?.codeNo !== 914) {
      setRequestCancelNo(item?.codeNo);
      setRequestCancelEtcCn('');
    } else {
      setRequestCancelNo(item?.codeNo);
    }
  };

  const cancel = async () => {
    const { requestFormNo, status, dealStatus } = target;
    // 거래취소는 무조건 E
    // let checkRequestStatus;
    // if (['C'].includes(status) && ['A', 'B'].includes(dealStatus)) {
    //   checkRequestStatus = 'E';
    // } else if (['C'].includes(status) && ['C', 'D'].includes(dealStatus)) {
    //   checkRequestStatus = 'F';
    // }

    // if (checkRequestStatus !== requestStatus) return;

    const body = {
      requestCancelNo: requestCancelNo,
      requestCancelEtcCn: requestCancelEtcCn,
      requestStatus: 'E',
    };

    try {
      const r = await deleteTransactionCancel({ requestFormNo, body });
      const { data } = r;
      if (Boolean(Number(data))) {
        if (onFetch) onFetch();
        setIsModal(true);
      }
      // navigate('/payment');

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useEffect(() => {
    if (target) {
      setMember(target);

      /** 의뢰서 수령전(910) 수령후(915) */
      if (['C'].includes(target.status) && ['A', 'B'].includes(target.dealStatus)) {
        const arr = getters.getFilterCode(910);
        console.log(arr);

        setCancelArr(
          arr?.value?.map((e) => {
            if (user?.memberSe === 'C' || user?.memberSe === 'B') {
              return { ...e, codeName: e.codeName.replace('치자이너가', '의뢰인이') };
            } else {
              return { ...e, codeName: e.codeName.replace('의뢰인이', '치자이너가') };
            }
          })
        );
        setRequestStatus('E');
      } else if (['C'].includes(target.status) && ['C', 'D'].includes(target.dealStatus)) {
        const arr = getters.getFilterCode(915);
        console.log(arr);
        setCancelArr(
          arr?.value?.map((e) => {
            if (user?.memberSe === 'C' || user?.memberSe === 'B') {
              return { ...e, codeName: e.codeName.replace('치자이너가', '의뢰인이') };
            } else {
              return { ...e, codeName: e.codeName.replace('의뢰인이', '치자이너가') };
            }
          })
        );
        setRequestStatus('F');
      }
    }
  }, [target]);

  return (
    <>
      <div className="basicPop cancelPop" style={{ display: 'block' }}>
        <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('status.cancel')}</h1>
        <div className="pBack">
          <div className="userInfo">
            <h2>{t('version2_3.text23')}</h2>
            <div>
              <span className="profileImg">
                <img src={member.profileImage} />
              </span>
              <strong>{member.memberName}</strong>
            </div>
          </div>
          <div className="prostheticsMType">
            <BaseSelect
              items={cancelArr?.map((e) => {
                return { ...e, name: e?.codeName };
              })}
              placeholder={t('version2_3.text24')}
              valueName={'codeName'}
              onChange={(e) => handleChange(undefined, e)}
            />
          </div>
          <div className="checkList">
            {/* <span className="checkSet">
              <input type="radio" id="checkbox1" name="checkbox" />
              <label htmlFor="checkbox1">다른 방법으로 해결했어요</label>
            </span>
            <span className="checkSet">
              <input type="radio" id="checkbox2" name="checkbox" />
              <label htmlFor="checkbox2">디자인할 필요가 없어졌어요</label>
            </span>
            <span className="checkSet">
              <input type="radio" id="checkbox3" name="checkbox" />
              <label htmlFor="checkbox3">원하는 치자이너가 없어요</label>
            </span>
            <span className="checkSet">
              <input type="radio" id="checkbox4" name="checkbox" />
              <label htmlFor="checkbox4">기타(하단 내용 작성)</label>
            </span> */}
            <div className="pCheck">
              {cancelArr.length > 0 &&
                cancelArr?.map((el, idx) => (
                  <span className="checkSet" key={idx}>
                    <input type="radio" id={`cancel_${idx}`} name="cancel" onChange={(e) => handleChange(e, el)} />
                    <label htmlFor={`cancel_${idx}`}>{el.codeName}</label>
                  </span>
                ))}
            </div>
            {
              <textarea
                className="mPopCn"
                placeholder={t('version2_3.text25')}
                disabled={!(requestCancelNo === 914 || requestCancelNo === 919)}
                onChange={(e) => setRequestCancelEtcCn(e.target.value)}
              ></textarea>
            }
            {(requestCancelNo === 914 || requestCancelNo === 919) && (
              <textarea className="pPopCn" placeholder={t('version2_3.text25')} onChange={(e) => setRequestCancelEtcCn(e.target.value)}></textarea>
            )}
          </div>
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={t('version2_2.text9')} className={'btnB'} onClick={() => cancel()} />
        </div>
      </div>
      {isModal && (
        <ModalAlertPresent>
          <CancelDoneAlert
            onClose={() => {
              setIsModal(false);
              onClose();
            }}
          />
        </ModalAlertPresent>
      )}
    </>
  );
};

export default CancelModal;
