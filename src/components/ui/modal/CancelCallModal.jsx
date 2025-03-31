import React, { useEffect, useState } from 'react';
import { BaseButton } from '@components/common';
import sampleProfile from '@assets/images/sample/sample3.png';
import CancelCallDoneAlert from './CancelCallDoneAlert';
import { BaseSelect, ModalAlertPresent } from '@components/common';
import { deleteTransactionCancel } from '@api/Payment';
import CodeStore from '@store/CodeStore';
import UserStore from '@store/UserStore';
import { useTranslation } from 'react-i18next';

const CancelCallModal = ({ onClose, target, onConfirm, onFetch }) => {
  const { t } = useTranslation();
  const { user } = UserStore();
  const { getters } = CodeStore();
  const [member, setMember] = useState({ memberNo: '', profileImage: '', memberName: '' });
  const [isModal, setIsModal] = useState(false);
  const [requestCancelNo, setRequestCancelNo] = useState();
  const [requestCancelEtcCn, setRequestCancelEtcCn] = useState();
  const [requestStatus, setRequestStatus] = useState();
  const [cancelArr, setCancelArr] = useState([]);

  const handleChange = (e, item) => {
    // e.preventDefault();
    if (item?.codeNo !== 919) {
      setRequestCancelNo(item?.codeNo);
      setRequestCancelEtcCn('');
    } else {
      setRequestCancelNo(item?.codeNo);
    }
  };

  const cancel = async () => {
    const { requestFormNo, status, dealStatus } = target;
    // 거래취소요청은 무조건 F
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
      requestStatus: 'F',
    };

    console.log('데이터 확인 될때까지 뒤 프로세스 주석처리 ========>', { requestFormNo, body });
    try {
      const r = await deleteTransactionCancel({ requestFormNo, body });
      const { data } = r;
      if (Boolean(Number(data))) {
        if (onFetch) onFetch();
        setIsModal(true);
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  useEffect(() => {
    if (target) {
      setMember(target);
      const arr = getters.getFilterCode(915);
      console.log('getFilterCode --> ', user);
      setCancelArr(arr.value);
      setRequestStatus('F');
    }
  }, [target]);

  return (
    <>
      <div className="basicPop cancelPop" style={{ display: 'block' }}>
        <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
        <h1 className="pt">{t('status.cancel')}</h1>
        <div className="pBack">
          <p>
            {t('version2_3.text20')}
            <br />
            {`${user.memberSe === 'A' ? t('version2_3.text21') : t('version2_3.text22')} `}
          </p>
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
            {/* <span className='checkSet'>
                            <input type='radio' id='checkbox1' name='checkbox' />
                            <label htmlFor='checkbox1'>다른 방법으로 해결했어요</label>
                        </span>
                        <span className='checkSet'>
                            <input type='radio' id='checkbox2' name='checkbox' />
                            <label htmlFor='checkbox2'>디자인할 필요가 없어졌어요</label>
                        </span>
                        <span className='checkSet'>
                            <input type='radio' id='checkbox3' name='checkbox' />
                            <label htmlFor='checkbox3'>치자이너가 마음에 들지 않아요</label>
                        </span>
                        <span className='checkSet'>
                            <input type='radio' id='checkbox4' name='checkbox' />
                            <label htmlFor='checkbox4'>기타(하단 내용 작성)</label>
                        </span> */}
            <div className="pCheck">
              {cancelArr.length > 0 &&
                cancelArr?.map((el, idx) => (
                  <span className="checkSet" key={idx}>
                    <input type="radio" id={`cancel_${idx}`} name="cancel" onChange={(e) => handleChange(e, el)} />
                    <label htmlFor={`cancel_${idx}`}>
                      {el?.codeName?.includes('치자이너가') ? (user?.memberSe === 'C' ? el?.codeName?.replace('치자이너가', '의뢰인이') : el?.codeName) : el?.codeName}
                    </label>
                  </span>
                ))}
            </div>
          </div>
          {<textarea className="mPopCn" placeholder={t('version2_3.text25')} disabled={requestCancelNo !== 919} onChange={(e) => setRequestCancelEtcCn(e.target.value)}></textarea>}
          {requestCancelNo === 919 && <textarea className="pPopCn" placeholder={t('version2_3.text25')} onChange={(e) => setRequestCancelEtcCn(e.target.value)}></textarea>}
          {/* <textarea placeholder='거래취소 사유를 입력하세요.' ></textarea> */}
        </div>
        <div className="pBtn">
          <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
          <BaseButton label={t('version2_3.text26')} className={'btnB'} onClick={() => cancel()} />
        </div>
      </div>
      {isModal && (
        <ModalAlertPresent>
          <CancelCallDoneAlert
            memberSe={user?.memberSe}
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

export default CancelCallModal;
