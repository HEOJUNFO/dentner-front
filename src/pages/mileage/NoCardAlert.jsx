import React, {useState} from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const NoCardAlert = ({onClose}) => {
    const { t } = useTranslation();
    return (
        <>
        <div className='alertPop' style={{display:'block'}}>
            <h1 className='pt'>{t('base.noti')}</h1>
            <div className='pBack'>
                {t('charge_modal.not_registered_card')} <br/>
                {t('charge_modal.register_card')}
            </div>
            <div className='pBtn'>
                <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
            </div>
        </div>
        </>
    )
}

export default NoCardAlert;
