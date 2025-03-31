import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { ItemTag, PostsMore, BaseButton } from '@components/common';
import RejectModal from '../../../components/ui/modal/RejectModal';
import CancelCallModal from '../../../components/ui/modal/CancelCallModal';
import ReportModal from '../../../components/ui/modal/ReportModal';
import { ModalPresent } from '@components/common';


const ContractRequestPage  = () => {
    const infoItems = [{ name: 'EXOCAD'}, { name: '3Shape-2024ver'}];
    const [isModal, setIsModal] = useState(false);
  return (
    <>
        <section>
            <div className='mSubPrev'>
                <Link to='' className='bMP'>이전</Link>
            </div>
            <h2>계약 요청서</h2>
            <div className='viewBox subView'>
                <div className='tvs'>
                    <article>
                        <div className='detail'>
                          <div className='mBack'>
                            <h4><strong>요청사항</strong></h4>
                            <div className='paragraph'>
                                재제작 횟수, 금액에 대한 조건은 ***입니다. <br/>
                                작업진행 중 불가피하게 발생하는 추가 결제건은 채팅으로 합의 후에 진행해주세요.
                            </div>
                          </div>
                        </div>
                        <h3 className='pt60 lineCase'>의뢰인 요청서 정보</h3>
                        <div className='detail reQMinInfo'>
                            <div className='left'>
                                <ItemTag items={infoItems} className='itemTag' />
                                <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5/ 하악 프레임 크라</strong>
                                <p>크라운 15 / 어비트먼트 10</p>
                            </div>
                            <div className='right'>
                                <strong className='time'>2024. 06. 30 <strong>18:30</strong></strong>
                                <Link className='bMR' to='/requestView'><span><em>더</em> 자세히보기</span></Link>
                            </div>
                        </div>
                        <div className='btnArea'>
                            <BaseButton label={'거절하기'} className={'btnW'}  onClick={() => setIsModal(true)}/>
                            <BaseButton label={'수락하기'} className={'btnB'}/>
                        </div>
                    </article>
                </div>
            </div>
        </section>
      {isModal && (
        <ModalPresent>
          <RejectModal
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default ContractRequestPage ;
