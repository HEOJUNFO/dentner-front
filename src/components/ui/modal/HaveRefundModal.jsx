import React, {useState} from 'react';
import { BaseButton, BaseInput, BaseSelect, ModalAlertPresent} from '@components/common';
import { useTranslation } from 'react-i18next';

const HaveRefundModal = ({onClose}) => {
    const { t } = useTranslation();
    const [isModal, setIsModal] = useState(false);  
    const cards = [
      { name: '환불 사유', value: 0 },
      { name: '환불 사유', value: 1 },
    ];

    return (
        <>
        <div className='basicPop refundPop' style={{display:'block'}}>
            <BaseButton label={t('base.close')} className={'btnPClose'} onClick={() => onClose()} />
            <h1 className='pt'>{t('version2_3.text36')}</h1>
            <div className='pBack'>
                <form>
                    <div className='info'>
                        <div>
                            {t('mileage.own_mileage')}
                            <strong><strong>450,000,000</strong> P(￦)</strong>
                        </div>
                    </div>
                    <div className='tws'>
                        <textarea placeholder={t('version2_3.text29')}></textarea>
                    </div>
                </form>
            </div>
            <div className='pBtn'>
                <BaseButton label={t('version2_1.text3')} className={'btnL'} onClick={() => onClose()} />
                <BaseButton label={t('version2_3.text32')} className={'btnB'} onClick={() => setIsModal(true)} />
            </div>
        </div>
        {isModal && 
            <ModalAlertPresent >
                <div className='alertPop' style={{display:'block'}}>
                    <h1 className='pt'>{t('base.noti')}</h1>
                    <div className='pBack'>
                        {t('version2_3.text33')}
                    </div>
                    <div className='pBtn'>
                        <BaseButton label={t('base.confirm')} className={'btnB'} onClick={() => setIsModal(false)} />
                    </div>
                </div>
            </ModalAlertPresent>
        }
        </>
    )
}

export default HaveRefundModal;
