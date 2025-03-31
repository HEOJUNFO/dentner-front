import React from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const ModifyAlert = ({onClose}) => {
    const { t } = useTranslation();
    return (
        <div className='alertPop modifyPop' style={{display:'block'}}>
            <h1 className='pt'>{t('disigner.copy_link')}</h1>
            <div className='pBack'>
                {t('version2_3.text52')}
            </div>
            <div className='pBtn'>
                <BaseButton label={t('version2_3.text53')} className={'btnL ss'} onClick={() => onClose()} />
                <BaseButton label={t('version2_3.text53')} className={'btnB ss'} onClick={() => onClose()} />
            </div>
            <div className='pBtn'>
                <BaseButton label={t('version2_3.text53')} className={'btnB ss'} onClick={() => onClose()} />
            </div>
        </div>
    )
}

export default ModifyAlert;
