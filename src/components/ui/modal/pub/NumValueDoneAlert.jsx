import React, {useState} from 'react';
import { BaseButton } from '@components/common';

const NumValueDoneAlert = ({onClose}) => {

    return (
        <>
        <div className='alertPop' style={{display:'block'}}>
            <div className='pBack pt0'>
                수치값 제목을 삭제 하시겠습니까?
            </div>
            <div className='pBtn'>
                <BaseButton label={'취소'} className={'btnL'} onClick={() => onClose()} />
                <BaseButton label={'삭제하기'} className={'btnB'} onClick={() => onClose()} />
            </div>
        </div>
        </>
    )
}

export default NumValueDoneAlert;
