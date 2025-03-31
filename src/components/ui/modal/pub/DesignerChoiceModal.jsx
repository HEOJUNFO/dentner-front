import React, {useState} from 'react';
import { BaseButton } from '@components/common';
import { Link } from 'react-router-dom';
import sampleProfile from '@assets/images/sample/sample4.jpeg';

const DesignerChoiceModal = ({onClose}) => {
    return (
        <>
        <div className='basicPop dChoicePop' style={{display:'block'}}>
            <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => onClose()} />
            <h1 className='pt'>지정 치자이너 선택하기</h1>
            <div className='pBack'>
                <ul>
                    <li className='on'>
                        <div>
                            <span className='profileImg'>
                                <img src={sampleProfile} />
                            </span>
                            <span className='nick'>
                                <span>치자이너</span>
                                <strong>clwkdlsj</strong>
                            </span>
                        </div>
                        <Link className='bMR' to='/designerView'>프로필 보기</Link>
                    </li>
                    <li>
                        <div>
                            <span className='profileImg'>
                                <img src={sampleProfile} />
                            </span>
                            <span className='nick'>
                                <span>치자이너</span>
                                <strong>선미니피그코알라몽키</strong>
                            </span>
                        </div>
                        <Link className='bMR' to='/designerView'>프로필 보기</Link>
                    </li>
                    <li>
                        <div>
                            <span className='profileImg'>
                                <img src={sampleProfile} />
                            </span>
                            <span className='nick'>
                                <span>치자이너</span>
                                <strong>안녕하세요안녕하세요</strong>
                            </span>
                        </div>
                        <Link className='bMR' to='/designerView'>프로필 보기</Link>
                    </li>
                    <li>
                        <div className='left'>
                            <span className='profileImg'>
                                <img src={sampleProfile} />
                            </span>
                            <span className='nick'>
                                <span>치자이너</span>
                                <strong>안녕하세요안녕하세요</strong>
                            </span>
                        </div>
                        <Link className='bMR' to='/designerView'>프로필 보기</Link>
                    </li>
                    {/*
                    <li className='noList'>
                        지정할 치자이너가 없어요. <br/>
                        치자이너 프로필에서 관심 치자이너를 등록해주세요!
                    </li> */}
                </ul>
            </div>
            <div className='pBtn'>
                <BaseButton label={'선택하기'} className={'btnB'} onClick={() => onClose()} />
            </div>
        </div>
        </>
    )
}

export default DesignerChoiceModal;
