import React from 'react';
import { Link } from 'react-router-dom';
import { useMap } from '../hooks/useMain';
import { useTranslation } from 'react-i18next';
import centerMap from '@assets/images/img_main_centerMap.png'

const Map = () => {
  const { items } = useMap();
  const { t } = useTranslation();

  return (
    <div className="mainCenterMapBack">
      <div className="mainCenterMap">
        <div className="infoAreaTit">
          <em>{t('dentalProsthetics.title')}</em>
          <strong>
            {t('dentalProsthetics.description.intro')}
            <br />
            <strong>{t('dentalProsthetics.description.dentalLab')}</strong>
            {t('dentalProsthetics.description.action')}
          </strong>
          <span className="subT">
            {t('dentalProsthetics.subTitle.intro')} <strong>{t('dentalProsthetics.subTitle.communication')}</strong> {t('dentalProsthetics.subTitle.action')}
          </span>
          <span className="infoTxt">
            {t('dentalProsthetics.infoText')}
            <span></span>
          </span>
        </div>
        <div className="centerMap">
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '711' }}>
            {t('dentalProsthetics.locations.seoul')}
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '713' }}>
            {t('dentalProsthetics.locations.gyeonggi')}
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '712' }}>
            {t('dentalProsthetics.locations.incheon')}
            <span>{t('dentalProsthetics.locations.bucheon')}</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '714' }}>
            {t('dentalProsthetics.locations.chuncheon')}
            <span>{t('dentalProsthetics.locations.gangwon')}</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '716' }}>
            {t('dentalProsthetics.locations.daejeon')}
            <span>{t('dentalProsthetics.locations.chungnam')}</span>
            <span>{t('dentalProsthetics.locations.sejong')}</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '715' }}>
            {t('dentalProsthetics.locations.cheongju')}
            <span>{t('dentalProsthetics.locations.chungbuk')}</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '719' }}>
            {t('dentalProsthetics.locations.daegu')}
            <span>{t('dentalProsthetics.locations.gyeongbuk')}</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '717' }}>
            {t('dentalProsthetics.locations.jeonju')}
            <span>{t('dentalProsthetics.locations.jeonbuk')}</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '718' }}>
            {t('dentalProsthetics.locations.gwangju')}
            <span>{t('dentalProsthetics.locations.jeonnam')}</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '720' }}>
            {t('dentalProsthetics.locations.busan')}
            <span>{t('dentalProsthetics.locations.ulsan')}</span>
            <span>{t('dentalProsthetics.locations.gyeongnam')}</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '721' }}>
            {t('dentalProsthetics.locations.jeju')}
          </Link>
          <img src={centerMap} />
        </div>
      </div>
    </div>
  );
};

export default Map;
{
  /* <div className="infoAreaTit">
          <em>치과보철물 제작이 필요하세요?</em>
          <strong>
            전국 각지에 흩어져있는
            <br />
            <strong>치과기공소</strong>를 소개합니다!
          </strong>
          <span className="subT">
            덴트너는 <strong>다양한 소통을 지향</strong>합니다
          </span>
          <span className="infoTxt">
            지역 선택하고 치과기공소 찾아보기<span></span>
          </span>
        </div>
        <div className="centerMap">
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '711' }}>서울</Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '713' }}>경기</Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '712' }}>
            인천<span>부천</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '714' }}>
            춘천<span>강원</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '716' }}>
            대전<span>충남</span>
            <span>세종</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '715' }}>
            청주<span>충북</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '719' }}>
            대구<span>경북</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '717' }}>
            전주<span>전북</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '718' }}>
            광주<span>전남</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '720' }}>
            부산<span>울산</span>
            <span>경남</span>
          </Link>
          <Link to={'/center'} state={{ searchType: 2, memberAreaFilter: '721' }}>제주</Link>
        </div> */
}
