import { SwiperImage, BaseButton } from '@components/common';
import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

import { ProstheticsPrice } from '@components/ui';
import { replaceToBr, withCommas } from '@utils/common';
import DOMPurify from 'dompurify';

import sampleProfile from '@assets/images/no_user.png';
import useMypageTopDesigner from '../hooks/useMypageTopDesigner';
import { useTranslation } from 'react-i18next';

/**
 * 치자이너 마이페이지 상단
 * @returns
 */
const MypageTopDesigner = () => {
  const { t } = useTranslation();
  const { data, files, cadfiles, profileImg, cads, isDollar, setIsDollar } = useMypageTopDesigner();

  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };

  return (
    <>
      <article className="mTopOffice">
        <span className="profileImg">
          <img src={profileImg || sampleProfile} />
        </span>
        <div className="mTOBack">
          <div className="bIBack">
            <div className="baseInfoBack">
              <div className="baseInfo">
                <div>
                  <strong>{data?.memberNickName}</strong>
                  <span className="mDRating">
                    <span>
                      <i>평가</i>
                      <em>{data?.reviewAvg}</em>
                    </span>
                    <span>
                      {t('disigner.review_num')}
                      <em>
                        {data?.reviewCnt}
                        <em>{t('base.count')}</em>
                      </em>
                    </span>
                    <span>
                      {t('info_area.total_amount')}
                      <em>
                        {withCommas(data?.wonPrice)} <em>P(￦)</em>
                      </em>
                      <em>
                        {withCommas(data?.dollarPrice)} <em>P($)</em>
                      </em>
                    </span>
                  </span>
                </div>
                <div>
                  <div className="itemTag line">
                    {cads?.map((cad, idx) => {
                      return <span key={`itemTag${idx}`}>{cad?.name}</span>;
                    })}
                  </div>
                </div>
                <p className="notM" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data?.oneIntroduction)) }}></p>
              </div>
            </div>
            <div className="rankSet notM">
              <div className="col">
              {t('version2_1.text36')}
                <span className="ratingArea">
                  {/* <Rating allowFraction initialValue={3.5} size={18} fillColor="#FFB525" emptyColor="#F7EFDE" readonly />
                  <em>3.5</em> */}

                  <Rating
                    allowFraction
                    initialValue={data?.reviewAvg}
                    onClick={function noRefCheck() {}}
                    size={18}
                    fillColor="#FFB525"
                    emptyColor="#F7EFDE"
                    readonly
                    showTooltip={data?.reviewAvg > 0}
                  />
                </span>
              </div>
              <div className="col">
                {t('disigner.review_num')}
                <strong>{data?.reviewCnt} {t('base.count')}</strong>
              </div>
            </div>
          </div>
          <div className="cdSummery notM">
            <div>
              <dl>
                <dt>{t('info_area.total_amount')}</dt>
                <dd>
                  {withCommas(data?.wonPrice)} <strong>P(￦)</strong> / {withCommas(data?.dollarPrice)} <strong>P($)</strong>
                </dd>
              </dl>
              <dl>
                <dt>{t('version2_1.text38')}</dt>
                <dd>{data?.modifyCnt} {t('version2_1.text39')}</dd>
              </dl>
              <dl>
                <dt>{t('version2_1.text40')}</dt>
                <dd>{data?.modifyWarrantyDay} {t('version2_1.text41')}</dd>
              </dl>
            </div>
          </div>
          <div className="tabNav mypageSummery">
            <nav>
              <ul>
                <li className={`${tab === 1 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(1)}>{t('version2_3.text2')}</button>
                </li>
                <li className={`${tab === 2 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(2)}>{t('mileage.detail')}</button>
                </li>
                <li className={`${tab === 3 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(3)}>{t('version2_3.text12')}</button>
                </li>
                <li className={`${tab === 4 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(4)}>{t('version2_2.text67')}</button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="dIBack">
            <dl className={`${tab === 1 ? 'mCase mOn' : 'mCase'}`}>
              <dt className="notM">
                <strong>{t('version2_3.text2')}</strong>
              </dt>
              <dd className="paragraph" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data?.oneIntroduction)) }}></dd>
            </dl>
            <dl className={`${tab === 3 ? 'mOn' : ''}`}>
              <dt className="notM">
                <strong>{t('version2_1.text44')}</strong>
              </dt>
              <dd>
                <ProstheticsPrice typeList={data?.typeList} isDollar={isDollar} />

                {/* <div className="prostheticsMType">
                  <BaseSelect items={cate} placeholder={'1차 카테고리 '} onChange={(e) => console.log(e)} />
                  <BaseSelect items={cate} placeholder={'2차 카테고리 '} onChange={(e) => console.log(e)} />
                  <BaseSelect items={cate} placeholder={'3차 카테고리 '} onChange={(e) => console.log(e)} />
                  <BaseSelect items={cate} placeholder={'4차 카테고리 '} onChange={(e) => console.log(e)} />
                  <div className="choice">
                    <div>
                      크라운 &gt; 국소의치 지대치 일반
                      <span>
                        <em>1,000</em> 원 / <em>0.75</em> 달러
                      </span>
                    </div>
                  </div>
                </div> */}
              </dd>
            </dl>
            <div className={`${tab === 2 ? 'mSummery mOn' : 'mSummery'}`}>
              <div className="cdSummery mCase">
                <dl>
                  <dt>{t('version2_1.text38')}</dt>
                  <dd>{data?.modifyCnt} {t('version2_1.text39')}</dd>
                </dl>
                <dl>
                  <dt>{t('version2_1.text40')}</dt>
                  <dd>{data?.modifyWarrantyDay} {t('version2_1.text41')}</dd>
                </dl>
              </div>
              <dl>
                <dt>
                  <strong>{t('version2_1.text46')}</strong>
                </dt>
                <dd dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(replaceToBr(data?.note)) }}></dd>
              </dl>
            </div>
            <dl className={`${tab === 4 ? 'mOn' : ''}`}>
              <dt className="notM">
                <strong>{t('version2_1.text47')}</strong>
              </dt>
              <dd className="fileSet designerCase">
                {/*  */}
                <div className="pfImgSwiper">
                  <SwiperImage
                    items={files.map((el, idx) => {
                      return (
                        <span className="imgSet">
                          <span>
                            <img key={`${idx}pimgSet`} src={el['fileUrl']} />
                          </span>
                        </span>
                      );
                    })}
                    perview={'auto'}
                    space="11"
                    pagination={false}
                  />
                </div>
                {/*  */}
              </dd>
              <dt className="notM">
                <strong>{t('version2_3.text10')}</strong>
              </dt>
              <dd className="fileSet designerCase">
                {/*  */}
                <div className="pfImgSwiper">
                  <SwiperImage
                    items={cadfiles?.map((el, idx) => {
                      return (
                        <span className="imgSet">
                          <span>
                            <img key={`${idx}pimgSet`} src={el['fileUrl']} />
                          </span>
                        </span>
                      );
                    })}
                    perview={'auto'}
                    space="11"
                    pagination={false}
                  />
                </div>
                {/*  */}
              </dd>
            </dl>
          </div>
        </div>
      </article>
    </>
  );
};

export default MypageTopDesigner;
