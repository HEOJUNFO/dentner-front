import React from 'react';
import { BaseButton } from '@components/common';

const PrivacyMgtPage = () => {
  return (
    <>
        <article>
          <div className='mypageBox'>
            <div className='listTit'>
              <h3>약관내용</h3>
            </div>
            <div className='privacyAgree'>
              [의뢰인]은, [환자]의 의료정보, 민감정보 또는 개인정보인 [보철물 의뢰에 필요한 의뢰서, 3D File]을 개인정보 보호법 제17조에 따라
              [환자]로부터 제3자인 주식회사 덴트너에 제공하는 것에 대하여 명시적이고 구체적인 동의를 받았음을 확인합니다.
            </div>
            <div className='btnArea'>
                <BaseButton label={'개인정보 업무위탁 계약 요청하기'} className={'btnB'} />
            </div>
          </div>
        </article>
    </>
  );
};

export default PrivacyMgtPage;
