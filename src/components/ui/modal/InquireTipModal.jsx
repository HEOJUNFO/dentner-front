import React, {useRef, useState} from 'react';
import { BaseButton } from '@components/common';
import tipImage11 from '@assets/images/img_popModeTip11.png';
import tipImage11en from '@assets/images/img_popModeTip11_en.png';
import tipImage12 from '@assets/images/img_popModeTip12.png';
import tipImage12en from '@assets/images/img_popModeTip12_en.jpg';
import tipImage13 from '@assets/images/img_popModeTip13.png';
import tipImage13en from '@assets/images/img_popModeTip13_en.png';
import tipImage14 from '@assets/images/img_popModeTip14.png';
import tipImage14en from '@assets/images/img_popModeTip14_en.png';
import tipImage15 from '@assets/images/img_popModeTip15.png';
import tipImage15en from '@assets/images/img_popModeTip15_en.png';
import tipImage23 from '@assets/images/img_popModeTip23.png';
import tipImage23en from '@assets/images/img_popModeTip23_en.png';
import tipImage24 from '@assets/images/img_popModeTip24.png';
import tipImage24en from '@assets/images/img_popModeTip24_en.png';
import tipImage25 from '@assets/images/img_popModeTip25.png';
import tipImage25en from '@assets/images/img_popModeTip25_en.png';
import tipImage27 from '@assets/images/img_popModeTip27.png';
import tipImage27en from '@assets/images/img_popModeTip27_en.png';
import {useTranslation} from "react-i18next";
import parse from "html-react-parser";

const InquireTipModal = ({onClose}) => {
    const { t,i18n } = useTranslation();

    const [tab , setTab] = useState(1);
    const handleTab = (tab) => {
      setTab(tab);
    }
    const tabRef = useRef();

    return (
        <>
        <div className='basicPop inquireTipPop' style={{display:'block'}}>
            <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => onClose()} />
            <h1 className='pt'>{t('main_tip.tab_nav.title')} tip!</h1>
            <div className='tabNav popCase' ref={tabRef} >
                <nav>
                    <ul style={{display: 'flex', width: '100%'}}>
                        <li className={`${tab === 1 ? 'on' : ''}`} style={{flex: 1, textAlign: 'center'}}><button onClick={() => handleTab(1)} style={{width: '100%'}}>{t('main_tip.tab_nav.simple_mode')}</button></li>
                        <li className={`${tab === 2 ? 'on' : ''}`} style={{flex: 1, textAlign: 'center'}}><button onClick={() => handleTab(2)} style={{width: '100%'}}>{t('main_tip.tab_nav.detail_mode')}</button></li>
                    </ul>
                </nav>
            </div>
            {tab === 1 && 
            <div>
                <div className='pBack'>
                    <div style={{paddingTop: 45, paddingBottom: 45}}>
                        <dl>
                            <dt>
                                <strong>01</strong>
                                <span>
                                    {parse(t('tips_easy.tips_1'))}
                                </span>
                            </dt>
                            <dd><span><img src={i18n.language === 'ko' ? tipImage11 : tipImage11en} /></span></dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>02</strong>
                                <span>
                                    {parse(t('tips_easy.tips_2'))}
                                </span>
                            </dt>
                            <dd><span><img src={i18n.language === 'ko' ? tipImage12 : tipImage12en} /></span></dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>03</strong>
                                <span>
                                    {parse(t('tips_easy.tips_3'))}
                                </span>
                            </dt>
                            <dd><span><img src={i18n.language === 'ko' ? tipImage13 : tipImage13en} /></span></dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>04</strong>
                                <span>
                                    {parse(t('tips_easy.tips_4'))}
                                </span>
                            </dt>
                            <dd><span><img src={i18n.language === 'ko' ? tipImage14 : tipImage14en} /></span></dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>05</strong>
                                <span>
                                    {parse(t('tips_easy.tips_5'))}
                                </span>
                            </dt>
                            <dd><span><img src={i18n.language === 'ko' ? tipImage15 : tipImage15en} /></span></dd>

                        </dl>
                    </div>
                </div>
            </div>
            }
            {tab === 2 && 
            <div>
                <div className='pBack'>
                    <div style={{paddingTop: 45, paddingBottom: 45}}>
                        <dl>
                            <dt>
                                <strong>01</strong>
                                <span>
                                   {parse(t('tips_easy.tips_1'))}
                                </span>
                            </dt>
                            <dd><span><img src={i18n.language === 'ko' ? tipImage11 : tipImage11en} /></span></dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>02</strong>
                                <span>
                                     {parse(t('tips_easy.tips_6'))}
                                </span>
                            </dt>
                            <dd>
                                <span><img src={i18n.language === 'ko' ? tipImage12 : tipImage12en} /></span>
                                <span><img src={i18n.language === 'ko' ? tipImage23 : tipImage23en} /></span>
                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>03</strong>
                                <span>
                                     {parse(t('tips_easy.tips_7'))}
                                </span>
                            </dt>
                            <dd>
                                <span><img src={i18n.language === 'ko' ? tipImage24 : tipImage24en} /></span>
                                <span><img src={i18n.language === 'ko' ? tipImage25 : tipImage25en} /></span>

                            </dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>04</strong>
                                <span>
                                     {parse(t('tips_easy.tips_4'))}
                                </span>
                            </dt>
                            <dd><span><img src={i18n.language === 'ko' ? tipImage14 : tipImage14en} /></span></dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>05</strong>
                                <span>
                                     {parse(t('tips_easy.tips_8'))}
                                </span>
                            </dt>
                            <dd><span><img src={i18n.language === 'ko' ? tipImage27 : tipImage27en} /></span></dd>
                        </dl>
                        <dl>
                            <dt>
                                <strong>06</strong>
                                <span>
                                     {parse(t('tips_easy.tips_5'))}
                                </span>
                            </dt>
                            <dd><span><img src={i18n.language === 'ko' ? tipImage15 : tipImage15en} /></span></dd>
                        </dl>
                    </div>
                </div>
            </div>
            }
        </div>
        </>
    )
}

export default InquireTipModal;