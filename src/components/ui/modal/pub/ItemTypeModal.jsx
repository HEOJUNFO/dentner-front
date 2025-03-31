import React, {useState} from 'react';
import { BaseButton } from '@components/common';

const ItemTypeModal = ({onClose}) => {
    return (
        <>
        <div className='basicPop itemTypePop' style={{display:'block'}}>
            <BaseButton label={'닫기'} className={'btnPClose'} onClick={() => onClose()} />
            <h1 className='pt'>보철종류 보기</h1>
            <div className='pBack'>
                <ul>
                    <li>
                        <span>의뢰서 a</span>
                        <em>크라운 3</em>
                    </li>
                    <li>
                        <span>의뢰서 b</span>
                        <em>크라운 1, 스프린트/서지컬가이드 5</em>
                    </li>
                </ul>
                <dl>
                    <dt>
                        <strong>보철종류/수량</strong>
                    </dt>
                    <dd className='itemList'>
                        <div><strong><strong>크라운 &gt; </strong>Zirconia &gt; 일반 (Hole X)</strong> <em>4개</em></div>
                        <div><strong><strong>스프린트/서지컬가이드 &gt; </strong>Surgical Guide &gt; Partital &gt; 1~3 Holes</strong> <em>4개</em></div>
                    </dd>
                </dl>
            </div>
        </div>
        </>
    )
}

export default ItemTypeModal;
