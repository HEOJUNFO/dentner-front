import defaultImg from '@assets/images/no_user.png';
import {
  BaseButton,
  BaseInput,
  ItemTag,
  ModalAlertPresent,
  ModalPresent,
  PostsMore,
  ModalFullPresent,
  Pagenation
} from '@components/common';
import { ImageThumbs, ProstheticsPrice } from '@components/ui';
import ThreeDViewer from '../payment/ThreeDViewer';
import {nameMaskingFormat, replaceToBr, withCommas} from '@utils/common';
import DOMPurify from 'dompurify';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import sampleProfile2 from '@assets/images/no_user.png';
import ModalStore from '@store/ModalStore';
import BlockAlert from '../../components/ui/modal/BlockAlert';
import LinkAlert from '../../components/ui/modal/LinkAlert';
import ReportModal from '../../components/ui/modal/ReportModal';
import useDesignerViewPage from './hooks/useDesignerViewPage';
import { useTranslation } from 'react-i18next';
import useChat from '@components/hooks/useChat';
import sampleProfile from "@assets/images/no_user.png";
import ReviewMsg from "@pages/mypage/components/ReviewMsg.jsx";
// Import ChannelService if needed, similar to CADCommsPage
import ChannelService from '../../ChannelService';
// Import NotiContext if needed
import { NotiContext } from '../../components/ui/layout/hooks/useContext'; // Adjust path as necessary

const DesignerViewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { actions } = ModalStore();
  const { handleRoom } = useChat();
  // Add NotiContext if needed, similar to CADCommsPage
  const { setIsModalOpen } = useContext(NotiContext);
  
  const {
    isLoading,
    user,
    data,
    cads,
    interest,
    moreItems,
    handleInterestChange,
    handleImageError,
    handleAddBlock,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    isMine,
    isModal4,
    setModal4,
    setFile,
    handleThreeDView,
    items,
    total, currentPage, perPage,
    setCurrentPage
  } = useDesignerViewPage();

  // Add effect to handle modal visibility for ChannelTalk, similar to CADCommsPage
  useEffect(() => {
    if (isModal4?.isVisible) {
      ChannelService.hideChannelButton();
      setIsModalOpen(true); // Hide PWA banner when modal is open
    } else {
      ChannelService.showChannelButton();
      setIsModalOpen(false); // Show PWA banner when modal is closed
    }
  }, [isModal4?.isVisible, setIsModalOpen]);

  const handleIsInterest = (e) => {
    if (!interest) {
      actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_1.text32'), btnName: t('base.confirm') }); //알림 관심 치자이너로 등록해주세요! 확인
      e.preventDefault();
    }
  };


  if (isLoading) return <></>;
  return (
    <>
      <section>
        <article>
          <div className="mSubPrev">
            <Link to="" onClick={() => navigate(-1)} className="bMP">
              {t('base.back')}
            </Link>
          </div>
          <div className="viewBox subView">
            <h2>
              {/* 치자이너 상세 */}
              {t('version2_1.text33')}
            </h2>
            <div className="cdInfo">
              <div className="back">
                <div className="infoD designCase">
                  <span className="profileImg">
                    <img src={data.memberProfileImage || sampleProfile2} onError={handleImageError} />
                  </span>
                  <div>
                    <strong>{data.memberNickName || data.memberDentistryName}</strong>
                    <span className="mDRating">
                      <span>
                        {/* 평가 */}
                        <i>{t('version2_1.text33')}</i>
                        <em>{data.reviewAvg}</em>
                      </span>
                      <span>
                        {/* 리뷰수 개 */}
                        {t('disigner.review_num')}
                        <em>
                          {data.reviewCnt}
                          {t('base.count')}
                        </em>
                      </span>
                      <span>
                        {/* 거래 총 금액 */}
                        {t('info_area.total_amount')}
                        <em>
                          {withCommas(data?.wonPrice)} <em>P(￦)</em>
                        </em>
                        <em>
                          {withCommas(data?.dollarPrice)} <em>P($)</em>
                        </em>
                      </span>
                    </span>
                    {user.memberSe === 'A' && (
                      <span className="sorting">
                        <span>
                          {/* 관심 치자이너 */}
                          <BaseInput type="checkbox" id="sorting5" label={t('designer.interest')} checked={interest} onChange={handleInterestChange} />
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                <p>{data.oneIntroduction}</p>
              </div>
              <span className="right">
                {user.memberSe === 'A' && (
                  <>
                    <Link to="/request/target/write" state={{ desi: { memberNo: data?.memberNo, memberNickName: data?.memberNickName } }} onClick={handleIsInterest} className="btnL sm">
                      {/* 1:1 지정 요청하기 */}
                      {t('request.submit_target')}
                    </Link>
                    <BaseButton label={t('base.do_chat')} className={'bCG'} onClick={() => handleRoom(data?.memberNo, 'C')} />
                  </>
                )}

                {!isMine && <PostsMore items={moreItems} />}
                {isMine && (
                  <Link to="/mypage/modify" className="btnL sm">
                    {/* 프로필 수정하기 */}
                    {t('version2_1.text35')}
                  </Link>
                )}
              </span>
            </div>
            <div className="tvs">
              <article>
                <div className="cdSummery">
                  <strong className="mTit">
                    {/* 상세내용 */}
                    {t('mileage.detail')}
                  </strong>
                  <div className="designerCase">
                    <dl className="notM">
                      <dt>
                        {/* 평점 */}
                        {t('version2_1.text36')}
                      </dt>
                      <dd className="ratingArea">
                        <Rating
                          allowFraction
                          initialValue={data.reviewAvg}
                          onClick={function noRefCheck() {}}
                          size={15}
                          fillColor="#FFB525"
                          emptyColor="#F7EFDE"
                          readonly
                          showTooltip={data.reviewAvg > 0}
                        />
                      </dd>
                    </dl>
                    <dl className="notM">
                      <dt>
                        {/* 리뷰수 */}
                        {t('version2_1.text37')}
                      </dt>
                      <dd>
                        {data.reviewCnt}
                        {t('base.count')}
                      </dd>
                    </dl>
                    <dl className="notM">
                      <dt>
                        {/* 거래 총 금액 */}
                        {t('info_area.total_amount')}
                      </dt>
                      <em>
                        {withCommas(data?.wonPrice)} <em>P(￦)</em>
                      </em>{' '}
                      {` / `}
                      <em>
                        {withCommas(data?.dollarPrice)} <em>P($)</em>
                      </em>
                    </dl>
                    <dl>
                      <dt>
                        {/* 수정 가능 횟수 */}
                        {t('version2_1.text38')}
                      </dt>
                      <dd>
                        {data.modifyCnt}
                        {t('version2_1.text39')}
                      </dd>
                    </dl>
                    <dl>
                      <dt>
                        {/* 수정 보증 기간 */}
                        {t('version2_1.text40')}
                      </dt>
                      <dd>
                        {data.modifyDay}
                        {t('version2_1.text41')}{' '}
                      </dd>
                    </dl>
                  </div>
                </div>
                <h3>
                  {/* 보철 정보 */}
                  {t('version2_1.text42')}
                </h3>
                <div className="detail">
                  <div className="mBack">
                    <h4>
                      <strong>
                        {/* 구동 가능한 CAD S/W */}
                        {t('version2_1.text43')}
                      </strong>
                    </h4>
                    <ItemTag items={cads} className="itemTag" />
                  </div>
                </div>
                <div className="detail">
                  <div className="mBack">
                    <h4>
                      <strong>
                        {/* 보철 종류와 그에 따른 수가표 */}
                        {t('version2_1.text44')}
                      </strong>
                    </h4>
                    <ProstheticsPrice typeList={data.typeList} />
                  </div>
                </div>
                <h3>
                  {/* 상세설명 */}
                  {t('version2_1.text45')}
                </h3>
                <div className="detail">
                  <div className="mBack">
                    <h4>
                      <strong>
                        {/* 참고사항 */}
                        {t('version2_1.text46')}
                      </strong>
                    </h4>
                    <p className="paragraph" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data.note)) }}></p>
                  </div>
                     {/* 포트폴리오 */}
                  <div className="mBack">
                    <h4>
                      <strong>
                        {t('version2_1.text47')}
                      </strong>
                    </h4>
                    <ImageThumbs items={data.imageList} imgName={'fileUrl'} />
                  </div>

                  {data?.fileList?.length > 0 && (
                    <div className="mBack">
                      <h4>
                        <strong>
                          {/* 3D 포트폴리오 */}
                          3D {t('version2_1.text47')}
                        </strong>
                      </h4>
                      <ImageThumbs
                        items={data?.fileList}
                        imgName={'fileUrl'}
                        onSelected={(el) => {
                          setFile(el);
                        }}
                      />
                    </div>
                  )}
                </div>

                {data?.fileList?.length > 0 && (
                  <div className="btnArea pb0 pcCase">
                    <BaseButton label={t('version2_1.text48')} className={'btnB'} onClick={handleThreeDView} />
                  </div>
                )}

                <br/>

                {/* 리뷰 추가 */}
                <h3>
                  {/* 상세설명 */}
                  {t('mypage.review_2')}
                </h3>
                <div className="detail mypageBox">
                  <div className="reviewList">
                    <ul>
                      {
                        items?.length === 0 &&
                          <li >
                            <div className="back">
                              리뷰가 없습니다.
                            </div>
                          </li>
                      }
                      {items.map((item, idx) => {
                        const datePart = item.registerDt ? item.registerDt.split(' ')[0] : '';
                        const timePart = item.registerDt ? item.registerDt.split(' ')[1].substring(0, 5) : '';

                        return (
                            <li key={`reviewList_${idx}`}>
                              <span className="profileImg">
                                <img src={item.memberProfileImage || sampleProfile} />
                              </span>
                              <div className="back">
                                <div className="userInfo">
                                  <span className="nick">
                                    <span>{user?.memberSe === 'A' ? t('base.dental_designer') : t('faq.client')}</span>
                                    <strong>{nameMaskingFormat(item?.memberNickName)}</strong>
                                  </span>
                                  <span className="time">
                                    {datePart} <span>{timePart}</span>
                                  </span>
                                </div>
                                <div className="historyInfo">
                                  <div>
                                    <span className="dRating">
                                      <span>
                                        {/* <i>평가</i> */}
                                        <i>{t('version2_1.text34')}</i>
                                        <em>{item.reviewRate}</em>
                                      </span>
                                      <ReviewMsg rating={item.reviewRate}/>
                                    </span>
                                    <p>{item.reviewCn}</p>
                                    {item.fileList.length > 0 && (
                                        <ol>
                                          {item.fileList.map((el, idx) => {
                                            return (
                                                <li key={`fileList_${idx}`}>
                                                  <img src={el.fileUrl} />
                                                </li>
                                            );
                                          })}
                                        </ol>
                                    )}
                                  </div>

                                </div>
                              </div>
                            </li>
                        );
                      })}
                    </ul>
                  </div>
                  <Pagenation total={total} perPage={perPage} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
                </div>
              </article>
            </div>
          </div>
        </article>
      </section>

      {/* 링크복사 */}
      {isModal && (
        <ModalAlertPresent>
          <LinkAlert
            url={window.location.href}
            onClose={() => {
              setIsModal(false);
            }}
          />
        </ModalAlertPresent>
      )}

      {/* 차단하기 */}
      {isModal2 && (
        <ModalAlertPresent>
          <BlockAlert
            onBlock={handleAddBlock}
            onClose={() => {
              setIsModal2(false);
            }}
          />
        </ModalAlertPresent>
      )}

      {/* 신고하기 */}
      {isModal3 && (
        <ModalPresent>
          <ReportModal
            type={'C'}
            targetType={'A'}
            target={{ memberNo: data.memberNo, memberName: data.memberNickName, profileImage: data.memberProfileImage || defaultImg }}
            onClose={() => {
              setIsModal3(false);
            }}
          />
        </ModalPresent>
      )}

      {/* 3d 뷰어 - Updated to use ThreeDViewer instead of ThreeDPotViewModal */}
      {isModal4?.isVisible && (
        <ModalFullPresent>
          <ThreeDViewer
            fileList={isModal4.fileList}
            isMemo={false}
            onClose={() => {
              setModal4({ isVisible: false });
            }}
          />
        </ModalFullPresent>
      )}
    </>
  );
};

export default DesignerViewPage;