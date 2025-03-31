import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ItemTag, PostsMore, BaseButton } from '@components/common';
import PayModal from '../../../components/ui/modal/PayModal';
import { ModalPresent } from '@components/common';

const PaymentAddViewPage = () => {
  const [isModal, setIsModal] = useState(false);
  const infoItems = [{ name: '의뢰서 a' }];
  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" className="bMP">
            이전
          </Link>
        </div>
        <h2>추가금 결제하기</h2>
        <div className="viewBox subView">
          <div className="tvs">
            <article>
              <div className="infoNotes mt0">
                <dl>
                  <dt>추가금 결제 안내사항</dt>
                  <dd>
                    의뢰서와 실제 디자인 업무가 다를 경우, 디자인 중 상호 협의하에 디자인이 수정된 경우 등에 추가요금을 결제하게 됩니다.
                    <br />
                    자세한 내용은 하단에 치자이너가 작성한 '추가금 요청사유'를 확인해주세요!
                  </dd>
                </dl>
              </div>
              <h3 className="pt60 lineCase">추가금 결제 요청내역</h3>
              <div className="detail reQMinInfo">
                <div className="left">
                  <ItemTag items={infoItems} className="itemTag" />
                  <strong>크라운 3 인레이 5 / 하악 프레임 크라운 3 인레이 5/ 하악 프레임 크라</strong>
                  <p>크라운 15 / 어비트먼트 10</p>
                </div>
                <div className="right">
                  <strong className="time">
                    2024. 06. 30 <strong>18:30</strong>
                  </strong>
                  <Link className="bMR" to="/requestView">
                    <span>
                      <em>더</em> 자세히보기
                    </span>
                  </Link>
                </div>
              </div>
              <div className="detail">
                <div className="mBack">
                  <h4>
                    <strong>추가금 요청사유</strong>
                  </h4>
                  <div className="orderCase">
                    <p>이 의뢰서에서 이러이러한 부분이 이 정도의 추가금이 붙는 걸로 측정되어 요청 드립니다.</p>
                  </div>
                </div>
                <div className="priceSet">
                  <span>추가 결제금액</span>
                  <strong className="right">
                    <strong>500,000</strong> <em>P(￦)</em>
                  </strong>
                </div>
              </div>
              <div className="btnArea pb0">
                <BaseButton label={'추가금 결제하기'} className={'btnB'} onClick={() => setIsModal(true)} />
              </div>
            </article>
          </div>
        </div>
      </section>
      {isModal && (
        <ModalPresent>
          <PayModal
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default PaymentAddViewPage;
