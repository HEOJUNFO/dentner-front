import React, { useEffect, useRef, useState, useCallback } from 'react';
import sampleProfile from '@assets/images/sample/sample1.jpeg';
import sampleProfile2 from '@assets/images/sample/sample4.jpeg';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { BaseInput, ItemTag, BaseButton, ImageSettingEx } from '@components/common';
import ReqAddModal from '../../../components/ui/modal/ReqAddModal';
import { ModalPresent } from '@components/common';

const ReViewPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [imgFileList, setImgFileList] = useState([]);
  useEffect(() => {
    //console.log(imgFileList);
  }, [imgFileList]);

  const [ratingValue, setRating] = useState(0);
  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleReset = () => {
    setRating(0);
  };

  return (
    <>
      <section>
        <div className='mSubPrev'>
            <Link to='' className='bMP'>이전</Link>
        </div>
        <h2>리뷰작성</h2>
        <div className="writeBox withInfo">
          <div className="tws">
            <form>
              <div className="infoNotes">
                <dl>
                  <dt>리뷰 작성 안내</dt>
                  <dd>고생한 치자이너에게 리뷰를 작성해주세요. 잘못된 정보와 비방글은 지양해 주세요.</dd>
                </dl>
              </div>
              <div className="detail mt40">
                <div className="reviewUser">
                  <span className="profileImg">
                    <img src={sampleProfile2} />
                  </span>
                  <span className="nick">
                    <span>치자이너</span>
                    <strong>clwkdlsj</strong>
                  </span>
                </div>
                <dl>
                  <dt>
                    치자이너님과의 거래는 어떠셨나요?
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <div className="ratingArea big pcCase">
                      <Rating allowFraction initialValue={3.5} onClick={function noRefCheck() {}} size={50} fillColor="#FFB525" emptyColor="#F7EFDE" showTooltip />
                      <div>괜찮았어요!</div>
                    </div>
                    <div className="ratingArea big mCase">
                      <Rating allowFraction initialValue={3.5} onClick={function noRefCheck() {}} size={32} fillColor="#FFB525" emptyColor="#F7EFDE" />
                      <div><span>3.5 / </span>괜찮았어요!</div>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    솔직한 리뷰를 작성해주세요
                    <sup>필수항목</sup>
                  </dt>
                  <dd>
                    <textarea placeholder="자세하고 솔직한 리뷰는 다른 의뢰인에게 도움이 됩니다. (최소 5자 이상)"></textarea>
                  </dd>
                </dl>
                <dl>
                  <dt className="etc">
                    <span>
                      사진첨부
                      <sup>필수항목</sup>
                    </span>
                    <em className="fileNum">
                      (<strong>0</strong>/5)
                    </em>
                  </dt>
                  <dd>
                    <ImageSettingEx imgFileList={imgFileList} setImgFileList={setImgFileList} />
                  </dd>
                </dl>
              </div>
              <div className="btnArea">
                {/* <BaseButton label={'작성완료'} className={'btnB'} /> */}
                <Link to="/payment" className="btnB">
                  작성완료
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
      {isModal && (
        <ModalPresent>
          <ReqAddModal
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalPresent>
      )}
    </>
  );
};

export default ReViewPage;
