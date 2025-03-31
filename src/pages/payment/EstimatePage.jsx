import React, { useEffect, useRef, useState, useCallback } from 'react';
import defaultImg from '@assets/images/no_user.png';
import { Link, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import DOMPurify from 'dompurify';
import { replaceToBr, withCommas } from '@utils/common';

import sampleProfile from '@assets/images/no_user.png';

import { ItemTag, PostsMore, BaseButton, ModalAlertPresent, ModalPresent, BaseInput, ModalFullPresent } from '@components/common';
import { Designer, ConfirmModal, ReportModal, BlockAlert, ImageThumbs, ThreeDPotViewModal } from '@components/ui';
import { SwiperImage, SwiperImageThumbs } from '@components/common/Swiper';
import { useEstimatePage } from './hooks/useEstimatePage';
import ModalStore from '@store/ModalStore';

import useChat from '@components/hooks/useChat';
import { useTranslation } from 'react-i18next';

/**
 * path: /payment/estimate/{}
 * 치자이너 견적서 보기
 * @returns
 */
const EstimatePage = () => {
  const navigate = useNavigate();
  const { actions } = ModalStore();
  const { handleRoom } = useChat();
  const { t } = useTranslation();
  const {
    isLoading,
    error,
    isModal,
    setIsModal,
    isModal2,
    setIsModal2,
    isModal3,
    setIsModal3,
    data,
    designer,
    cads,
    handleImageError,
    handleDetail,
    handleSelectedDesigner,
    handleDesigner,
    handleAddBlock,
    handleInterestChange,
    interest,
    files,
    file,
    setFile,
    isModal4,
    setModal4,
    handleThreeDView,
  } = useEstimatePage();

  const moreItems = [
    {
      name: t('disigner.block'),
      onClick: () => {
        setIsModal2(true);
      },
    },
    {
      name: t('disigner.report'),
      onClick: () => {
        setIsModal3(true);
      },
    },
  ];

  // const handle3d = () => {
  //   actions.setDoneAlert({ isVisible: true, title: t('base.noti'), contents: t('version2_2.text108'), btnName: t('base.confirm') });
  // };

  if (isLoading) return <></>;

  const { title, desc, sw, registerDt, typeList, estimateAmount, estimateCn, imageList, estimateDate, estimateTimeHour, estimateTimeMin, requestStatus, estimateSe } = data;

  return (
    <>
      <section>
        <div className="mSubPrev">
          <Link to="" onClick={() => navigate(-1)} className="bMP">
            이전
          </Link>
        </div>
        <div className="viewBox subView">
          <h2>{t('service_page.term_quote_form')}</h2>
          <div className="cdInfo">
            <div className="back">
              <div className="infoD designCase">
                <span className="profileImg">
                  <img src={designer.memberProfileImage || sampleProfile} onError={handleImageError} />
                </span>
                <div>
                  <strong>{designer.memberNickName}</strong>
                  <span className="mDRating">
                    <span>
                      <i>{t('version2_2.text109')}</i>
                      <em>{designer.reviewAvg}</em>
                    </span>
                    <span>
                      {t('disigner.review_num')}
                      <em>{designer.reviewCnt}개</em>
                    </span>
                    <span>
                      {t('info_area.total_amount')}
                      <em>{withCommas(designer.wonPrice)}원</em>
                    </span>
                  </span>
                  <span className="sorting">
                    <span>
                      <BaseInput type="checkbox" id="sorting5" label={t('designer.interest')} checked={interest} onChange={handleInterestChange} />
                    </span>
                  </span>
                </div>
              </div>
              <p>{designer.oneIntroduction}</p>
            </div>
            <span className="right">
              {requestStatus === 'B' && <BaseButton label={t('status.select_dental')} className={'bDC'} onClick={handleSelectedDesigner} />}

              {requestStatus !== 'B' && estimateSe === 'A' && <BaseButton label={t('version2_2.text110')} className={'bDC'} disabled={true} />}

              <BaseButton label={t('base.do_chat')} className={'bCG'} onClick={() => handleRoom(designer?.memberNo, 'C')} />
              <PostsMore items={moreItems} />
            </span>
          </div>
          <div className="tvs">
            <article>
              <div className="cdSummery">
                <strong className="mTit">{t('mileage.detail')}</strong>
                <div className="designerCase">
                  <dl className="notM">
                    <dt>{t('version2_2.text111')}</dt>
                    <dd className="ratingArea">
                      <Rating
                        allowFraction
                        initialValue={designer.reviewAvg}
                        onClick={function noRefCheck() {}}
                        size={15}
                        fillColor="#FFB525"
                        emptyColor="#F7EFDE"
                        readonly
                        showTooltip={designer.reviewAvg > 0}
                      />
                    </dd>
                  </dl>
                  <dl className="notM">
                    <dt>{t('disigner.review_num')}</dt>
                    <dd>{designer.reviewCnt}개</dd>
                  </dl>
                  <dl className="notM">
                    <dt>{t('info_area.total_amount')}</dt>
                    <dd>
                      {withCommas(designer.wonPrice)} P(￦) / {withCommas(designer?.dollarPrice)} P($)
                    </dd>
                  </dl>
                  <dl>
                    <dt>{t('version2_2.text112')}</dt>
                    <dd>{designer.modifyCnt}회</dd>
                  </dl>
                  <dl>
                    <dt>{t('version2_2.text113')}</dt>
                    <dd>{designer.modifyDay}일</dd>
                  </dl>
                </div>
              </div>

              <div className="cdSummery twin">
                <div>
                  <dl>
                    <dt>{t('version2_2.text114')}</dt>
                    <dd>
                      <ItemTag items={cads} className="itemTag" />
                    </dd>
                  </dl>
                </div>
                <div className="notM">
                  <dl>
                    <dt>{t('version2_2.text66')}</dt>
                    <dd>
                      <strong className="time">
                        {estimateDate}{' '}
                        <strong>
                          {estimateTimeHour}:{estimateTimeMin}
                        </strong>
                      </strong>
                    </dd>
                  </dl>
                </div>
              </div>

              <h3 className="lineCase">{t('base.estimate')}</h3>
              <div className="detail">
                <div className="mBack">
                  <h4>
                    <strong>{`${t('base.estimate')}/${t('version2_2.text65')}`}</strong>
                  </h4>
                  <div className="orderCase">
                    <div className="itemList">
                      {typeList.map((item, idx) => {
                        const sdt = item?.requestTypeName?.split(' > ') || [];
                        const cnt = Number(item.count) || 0;
                        const amount = Number(item.amount) || 0;
                        const total = cnt * amount;
                        return (
                          <div key={`orderCase_itemList_${idx}`}>
                            <strong>
                              {sdt.map((ele, idxx) => {
                                if (idxx === 0) {
                                  return <strong key={`RequestEstimate__strong_${idx}_${idxx}`}>{ele} &gt; </strong>;
                                } else if (sdt.length - 1 === idxx) {
                                  return ele;
                                } else {
                                  return <React.Fragment key={`RequestEstimates__fragment_${idx}_${idxx}`}>{ele} &gt;</React.Fragment>;
                                }
                              })}
                            </strong>{' '}
                            <em>
                              {withCommas(amount)} <i>{cnt}</i> ={' '}
                              <span>
                                <span>{withCommas(total)}</span> {t('base.won')}
                              </span>
                            </em>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="priceSet">
                  <span>{t('request_target.total')}</span>
                  <strong className="right">
                    <strong>{withCommas(estimateAmount)}</strong> <em>P(￦)</em>
                  </strong>
                </div>

                {/* 모바일인 경우
                <div className="mBack mCase">
                  <dl>
                    <dt>납품 가능일</dt>
                    <dd>
                      <strong className="time">
                        {estimateDate}{' '}
                        <strong>
                          {estimateTimeHour}:{estimateTimeMin}
                        </strong>
                      </strong>
                    </dd>
                  </dl>
                </div> */}
                <div className="mBack">
                  <h4>
                    <strong>{t('version2_2.text67')}</strong>
                  </h4>
                  <ImageThumbs items={imageList} imgName={'fileUrl'} />
                  {/* <div className="btnArea mCase">
                    <BaseButton label={`${t('version2_2.text67')} ${t('version2_2.text68')}`} className={'btnB'} onClick={handle3d} />
                  </div> */}
                </div>

                {files?.length > 0 && (
                  <div className="mBack">
                    <h4>
                      <strong>
                        {/* 3D 포트폴리오 */}
                        3D {t('version2_1.text47')}
                      </strong>
                    </h4>
                    <ImageThumbs
                      items={files}
                      imgName={'fileUrl'}
                      onSelected={(el) => {
                        setFile(el);
                      }}
                    />
                    {/* <div className="btnArea mCase">
                                      <BaseButton label={t('version2_1.text48')} className={'btnB'} onClick={handle3d} />
                                    </div> */}
                  </div>
                )}
              </div>

              {files?.length > 0 && (
                <div className="btnArea pcCase">
                  <BaseButton label={`${t('version2_2.text67')} ${t('version2_2.text68')}`} className={'btnB'} onClick={handleThreeDView} />
                </div>
              )}

              <h3 className="lineCase">{t('version2_2.text115')}</h3>
              <div className="detail reQMinInfo">
                <div className="left">
                  <ItemTag items={sw} className="itemTag" />
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
                <div className="right">
                  <strong className="time">
                    {registerDt.split(' ')[0]} <strong>{registerDt.split(' ')[1].substring(0, 5)}</strong>
                  </strong>
                  <BaseButton
                    className="bMR enCase"
                    label={
                      <span>
                        <em>{t('version2_2.text52')}</em> {t('version2_2.text53')}
                      </span>
                    }
                    onClick={handleDetail}
                  />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {isModal.visible && (
        <ModalAlertPresent>
          <ConfirmModal
            title={t('status.select_dental')}
            doneContents={t('version2_1.text8')}
            failContents={t('version2_1.text9')}
            contents={t('version2_1.text10')}
            btnCancel={t('version2_1.text3')}
            btnConfirm={t('version2_1.text11')}
            onConfirm={handleDesigner}
            onClose={() => {
              setIsModal({ visible: false, value: '' });
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
            target={{ memberNo: designer.memberNo, memberName: designer.memberNickName, profileImage: designer.memberProfileImage || defaultImg }}
            onClose={() => {
              setIsModal3(false);
            }}
          />
        </ModalPresent>
      )}

      {/* 3d 뷰어 */}
      {isModal4?.isVisible && (
        <ModalFullPresent>
          <ThreeDPotViewModal
            {...isModal4}
            onClose={() => {
              setModal4({ isVisible: false });
            }}
          />
        </ModalFullPresent>
      )}
    </>
  );
};

export default EstimatePage;
