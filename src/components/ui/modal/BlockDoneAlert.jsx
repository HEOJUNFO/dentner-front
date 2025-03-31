import React from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const BlockDoneAlert = ({onClose}) => {
    const { t } = useTranslation();

    return (
        <div className='alertPop' style={{display:'block'}}>
            <h1 className='pt'>{t('base.noti')}</h1>
            <div className='pBack'>
                {t('version2_1.text1')}
            </div>
            <div className='pBtn'>
                <BaseButton label={t('base.confirm')} className={'btnB'} onClick={() => onClose()} />
            </div>
        </div>
    )
}

export default BlockDoneAlert;
