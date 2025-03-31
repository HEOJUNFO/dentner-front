import React from 'react';
import { BaseButton } from '@components/common';

const LinkAlert = ({onClose}) => {

    return (
        <div className='alertPop' style={{display:'block'}}>
            <h1 className='pt'>링크복사</h1>
            <div className='pBack'>
                링크가 복사되었습니다.
            </div>
            <div className='pBtn'>
                <BaseButton label={'확인'} className={'btnB'} onClick={() => onClose()} />
            </div>
        </div>
    )
}

export default LinkAlert;
