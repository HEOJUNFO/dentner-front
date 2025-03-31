import React, {useState} from 'react';
import { BaseButton } from '@components/common';

const NoCardAlert = ({onClose}) => {
    return (
        <>
        <div className='alertPop' style={{display:'block'}}>
            <h1 className='pt'>알림</h1>
            <div className='pBack'>
                등록된 카드 정보가 없습니다. <br/>
                내 카드 정보를 등록해주세요.
            </div>
            <div className='pBtn'>
                <BaseButton label={'취소'} className={'btnL'} onClick={() => onClose()} />
            </div>
        </div>
        </>
    )
}

export default NoCardAlert;
