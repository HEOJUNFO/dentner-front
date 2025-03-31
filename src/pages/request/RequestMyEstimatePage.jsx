import React, { useEffect, useRef, useState, useCallback } from 'react';

import sampleProfile from '@assets/images/sample/sample2.png';
import sampleProfile2 from '@assets/images/sample/sample6.jpeg';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import DOMPurify from 'dompurify';
import { ImageThumbs, ThreeDPotViewModal } from '@components/ui';
import { ItemTag, PostsMore, BaseButton, ModalFullPresent } from '@components/common';

import { useRequestMyEstimatePage } from './hooks/useRequestMyEstimatePage';
import { withCommas, replaceToBr } from '@utils/common';
import ModalStore from '@store/ModalStore';
import { useTranslation } from 'react-i18next';

const RequestMyEstimatePage = () => {
  const { t } = useTranslation();

  const { isLoading, data, handleDetail, setFile, handleThreeDView, isModal4, setModal4 } = useRequestMyEstimatePage();

  if (isLoading) return <></>;

  const { title, desc, sw, registerDt, typeList, fileList, estimateAmount, estimateCn, imageList, estimateDate, estimateTimeHour, estimateTimeMin } = data || { title: null };

  return (
    <>
      <section>
        <h2>{t('version2_2.text64')}</h2>
        <div className="viewBox subView">
          <div className="tvs">
            <article>
              <div className="detail">
                <div className="mBack">
                  <h4>
                    <strong>{`${t('base.prosthesistype')}/${t('version2_2.text65')}`}</strong>
                  </h4>
                  <div className="orderCase">
                    <div className="itemList">
                      {typeList?.map((item, idx) => {
                        const sdt = (item?.requestTypeName && item?.requestTypeName?.split(' > ')) || [];
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
                                <span>{withCommas(total)}</span> {item?.unit === 'B' ? 'P($)' : 'P(￦)'}
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
                    <strong>{withCommas(estimateAmount)}</strong> <em>{typeList[0].unit === 'B' ? 'P($)' : 'P(￦)'}</em>
                  </strong>
                </div>
                <div className="mBack">
                  <h4>
                    <strong>{t('version2_2.text66')}</strong>
                  </h4>
                  <div className="deliveryDate">
                    <span className="time">
                      {estimateDate}{' '}
                      <span>
                        {estimateTimeHour}:{estimateTimeMin}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="mBack">
                  <h4>
                    <strong>{t('mileage.detail')}</strong>
                  </h4>
                  <div className="paragraph" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(estimateCn)) }}></div>
                </div>
                <div className="mBack">
                  <h4>
                    <strong>{t('version2_2.text67')}</strong>
                  </h4>
                  <ImageThumbs items={imageList} imgName={'fileUrl'} />
                </div>

                {fileList?.length > 0 && (
                  <div className="mBack">
                    <h4>
                      <strong>3D {t('version2_2.text67')}</strong>
                    </h4>
                    <ImageThumbs
                      items={fileList}
                      imgName={'fileUrl'}
                      onSelected={(el) => {
                        setFile(el);
                      }}
                    />
                    <div className="btnArea mCase">{/* <BaseButton label={`${t('version2_2.text67')} ${t('version2_2.text68')}`} className={'btnB'} onClick={handle3d} /> */}</div>
                  </div>
                )}
              </div>
              {fileList?.length > 0 && (
                <div className="btnArea pcCase">
                  <BaseButton label={`${t('version2_2.text67')} ${t('version2_2.text68')}`} className={'btnB'} onClick={handleThreeDView} />
                </div>
              )}

              <h3 className="lineCase">{t('version2_2.text51')}</h3>
              <div className="detail reQMinInfo">
                <div className="left">
                  <ItemTag items={sw} className="itemTag" />
                  <strong>{title}</strong>
                  <p>{desc}</p>
                </div>
                <div className="right">
                  <strong className="time">
                    {registerDt?.split(' ')[0]} <strong>{registerDt?.split(' ')[1].substring(0, 5)}</strong>
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

export default RequestMyEstimatePage;
