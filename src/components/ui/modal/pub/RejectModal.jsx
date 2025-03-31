import React, {useState} from 'react';
import { BaseButton } from '@components/common';
import sampleProfile from '@assets/images/sample/sample3.png';
import CancelDoneAlert from './CancelDoneAlert';
import {ModalAlertPresent} from '@components/common';

const RejectModal = ({onClose}) => {
    const [isModal, setIsModal] = useState(false);  

    return (
        <>
        <div className='basicPop rejectPop' style={{display:'block'}}>
            <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => onClose()} />
            <h1 className='pt'>계약요청 거절</h1>
            <div className='pBack'>
                <div className='userInfo'>
                    <h2>거절 대상</h2>
                    <div>
                        <span className='profileImg'>
                            <img src={sampleProfile} />
                        </span>
                        <strong>가나다 의뢰인</strong>
                    </div>
                </div>
                <textarea placeholder='거절 사유를 입력하세요.' ></textarea>
            </div>
            <div className='pBtn'>
                <BaseButton label={'취소'} className={'btnL'} onClick={() => onClose()} />
                <BaseButton label={'거절하기'} className={'btnB'} onClick={() => setIsModal(true)} />
            </div>
        </div>
        {isModal && 
            <ModalAlertPresent >
                <CancelDoneAlert onClose={() => {setIsModal(false)}}/>
            </ModalAlertPresent>
        }
        </>
    )
}

export default RejectModal;
