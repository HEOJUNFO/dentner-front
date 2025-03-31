import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ItemTag, SwiperImage } from '@components/common';
import { Rating } from 'react-simple-star-rating';

import sampleProfile from '@assets/images/no_user.png';

import useMyPage from '../hooks/useMyPage';
import useMypageTopCenter from '../hooks/useMypageTopCenter';

const MypageTopCenter = ({ userInfo }) => {
  const { data, centerInfo, items } = useMypageTopCenter();

  const [sStep, setSearchTab] = useState(0);
  const handleSearchTab = (sStep) => {
    setSearchTab(sStep);
  };
  const [tab, setTab] = useState(1);
  const handleTab = (tab) => {
    setTab(tab);
  };

  // const items = [{ name: '지르코니아' }, { name: 'Bar type' }, { name: '투명교정' }, { name: 'Framework' }, { name: 'All on X (Porcelain)' }];

  return (
    <>
      <article className="mTopOffice">
        <span className="profileImg">
          <img src={centerInfo?.memberProfileImage || sampleProfile} />
        </span>
        <div className="mTOBack">
          <div className="bIBack">
            <div className="baseInfoBack">
              <div className="baseInfo">
                <div>
                  <strong>{centerInfo?.memberDentistryName}</strong>
                  <span className="localTag">
                    <em>{centerInfo?.memberAreaName}</em>
                  </span>
                </div>
                <div>
                  <div className="itemTag line">
                    {centerInfo?.establishYear && <span>{`${centerInfo?.establishYear}년`}</span>}
                    {centerInfo?.employeeCntName && <em>{centerInfo?.employeeCntName}</em>}
                  </div>
                </div>
                <p className="notM">{centerInfo?.oneIntroduction}</p>
              </div>
              <ItemTag items={items} className="itemTag" />
            </div>
            <span className="localSet notM">
              지역
              <strong>{centerInfo?.memberAreaName}</strong>
            </span>
          </div>

          <div className="tabNav mypageSummery">
            <nav className="center">
              <ul>
                <li className={`${tab === 1 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(1)}>한줄소개</button>
                </li>
                <li className={`${tab === 2 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(2)}>회사소개</button>
                </li>
                <li className={`${tab === 3 ? 'on' : ''}`}>
                  <button onClick={() => handleTab(3)}>회사사진</button>
                </li>
              </ul>
            </nav>
          </div>
          <div className="dIBack">
            <dl className={`${tab === 1 ? 'mCase mOn' : 'mCase'}`}>
              <dt className="notM">
                <strong>한줄 소개</strong>
              </dt>
              <dd className="paragraph">
                Apple 치카푸카는 150평 대규모 치과로 임플란트, 치아교정, 치아성형(라미네이트), 충치치료(신경치료) 및 일반진료까지 모든 분야 진료가 가능합니다. 넓은 공간에서 최고의 의료진에게
              </dd>
            </dl>
            <dl className={`${tab === 2 ? 'mOn' : ''}`}>
              <dt className="notM">
                <strong>회사 소개</strong>
              </dt>
              <dd className="paragraph">{centerInfo?.aboutUs}</dd>
            </dl>
            <dl className={`${tab === 3 ? 'mOn' : ''}`}>
              <dt className="notM">
                <strong>회사 사진</strong>
              </dt>
              <dd className="fileSet centerCase">
                {/*  */}
                <div className="pfImgSwiper">
                  <SwiperImage
                    items={centerInfo?.imageList?.map((el, idx) => {
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

export default MypageTopCenter;
