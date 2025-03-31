import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BaseButton } from '@components/common';
import sampleProfile from '@assets/images/sample/sample8.png';
import samplePartner from '@assets/images/sample/sample5.png';
import tipImage11 from '@assets/images/img_modeTip11.png';
import tipImage12 from '@assets/images/img_modeTip12.png';
import tipImage13 from '@assets/images/img_modeTip13.png';
import tipImage14 from '@assets/images/img_modeTip14.png';
import tipImage21 from '@assets/images/img_modeTip21.png';
import tipImage22 from '@assets/images/img_modeTip22.png';
import tipImage23 from '@assets/images/img_modeTip23.png';
import tipImage24 from '@assets/images/img_modeTip24.png';
import stepImage1 from '@assets/images/img_request_step1.png';
import stepImage2 from '@assets/images/img_request_step2.png';
import stepImage3 from '@assets/images/img_request_step3.png';
import stepImage3_1 from '@assets/images/img_request_step3_1.png';
import stepImage4 from '@assets/images/img_request_step4.png';
import serviceImg1 from '@assets/images/img_service01.png';
import serviceImg2 from '@assets/images/img_service02.png';
import centerMap from '@assets/images/img_main_centerMap.png';
import useScroll from '../../components/hooks/useScroll';
import Faq from '../../components/ui/components/Faq';
import { useTranslation } from 'react-i18next';
import Used from '../main/components/Used';
import Partner from '../main/components/Partner';
import Banner from '../main/components/Banner';

const ServicePage = () => {
  const [tab, setTab] = useState(1);
  const { t } = useTranslation();

  const handleTab = (tab) => {
    setTab(tab);
  };
  const [tab2, setTab2] = useState(1);
  const handleTab2 = (tab2) => {
    setTab2(tab2);
  };
  const [tab3, setTab3] = useState(1);
  const handleTab3 = (tab3) => {
    setTab3(tab3);
  };
  const tabRef = useRef();
  const { element, onMoveToElement } = useScroll();
  const { element: topEl, onMoveToElement: onMoveToTopEl } = useScroll();
  const { location, state } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (state?.to === 'quote') {
        return onMoveToElement();
      }
      if (state?.to === 'service_introduce') {
        return onMoveToTopEl();
      }
      if (!state) {
        return onMoveToTopEl();
      }
    }, 300);

    // console.log({ location, state });
  }, [location, state]);

  return (
    <>
      {/* 서비스소개 메인비주얼 */}
      <div ref={topEl} className="serviceVisual">
        <img src={serviceImg1} />
      </div>
      {/* CAD 디자인 */}
      <div className="mainCad serviceCase">
        <div className="infoAreaTit">
          <em>{t('cad.title')}</em>
          <strong>
            {t('cad.description.intro')} <strong>{t('cad.description.cadFile')}</strong> {t('cad.description.action')}
            <br />
            {t('cad.description.conclusion')}
          </strong>
          <span className="subT">
            {t('cad.subTitle.intro')} <strong>{t('cad.subTitle.variousFile')}</strong> {t('cad.subTitle.action')}
          </span>
        </div>
        <div className="go">
          <BaseButton label={t('cad.buttons.crownCap')} style={{ cursor: 'default' }} />
          <BaseButton label={t('cad.buttons.inlayOnlay')} style={{ cursor: 'default' }} />
          <BaseButton label={t('cad.buttons.frame')} style={{ cursor: 'default' }} />
          <BaseButton label={t('cad.buttons.dentureArrangement')} style={{ cursor: 'default' }} />
          <BaseButton label={t('cad.buttons.splintSurgicalGuide')} style={{ cursor: 'default' }} />
          <BaseButton label={t('cad.buttons.orthodontics')} style={{ cursor: 'default' }} />
          <BaseButton label={t('cad.buttons.abutment')} style={{ cursor: 'default' }} />
          <BaseButton label={t('cad.buttons.others')} style={{ cursor: 'default' }} />
        </div>
      </div>
      {/* 비용안내 */}
      <div className="serviceCostInfo">
        <img src={serviceImg2} />
      </div>
      {/* 추천 */}
      <div className="serviceSuggest">
        <div className="infoAreaTit">
          <em>Check!</em>
          <strong>
            <strong>{t('base.dentner')},</strong> {t('service_page.title_recommendation')}
            <br />
          </strong>
        </div>
        <ul>
          <li>{t('service_page.no_designer')}</li>
          <li>{t('service_page.unsure_where_to_order')}</li>
          <li>{t('service_page.need_personal_cad_designer')}</li>
          <li>{t('service_page.designer_salary_burden')}</li>
          <li>{t('service_page.need_invoice_issuing_designer')}</li>
        </ul>
      </div>
      {/* 치과기공소 */}
      <div className="mainCenterMapBack bgW">
        <div className="mainCenterMap">
          <div className="infoAreaTit">
            <em>{t('service_page.need_prosthetics')}</em>
            <strong>
              {t('service_page.introducing_labs')}
              <br />
              <strong>{t('service_page.dental_labs')}</strong>
              {t('service_page.intro_suffix')}
            </strong>
            <span className="subT">{t('service_page.promoting_communication')}</span>
            <span className="infoTxt">
              {t('service_page.select_region_find_labs')}
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

      {/* 용어 */}
      <div ref={element} style={{ height: '10vh' }} />
      <div className="serviceKeyTerms">
        <div className="infoAreaTit">
          <strong>
            <strong>{t('base.dentner')}</strong>
            {t('service_page.terminology')}
            <br />
          </strong>
        </div>
        <div className="key">
          <dl>
            <dt>{t('service_page.term_request_form')}</dt>
            <dd>
              {t('service_page.term_request_form_description_intro')} <em>{t('service_page.term_request_form_description_emphasis')}</em> {t('service_page.term_request_form_description_end')}
            </dd>
          </dl>
          <dl>
            <dt>{t('service_page.term_order_form')}</dt>
            <dd>
              {t('service_page.term_order_form_description_intro')}
              <br />
              <em>{t('service_page.term_order_form_description_emphasis')}</em> {t('service_page.term_order_form_description_end')}
            </dd>
          </dl>
          <dl>
            <dt>{t('service_page.term_quote_form')}</dt>
            <dd>
              {t('service_page.term_quote_form_description_intro')}
              <br />
              <em>{t('service_page.term_quote_form_description_emphasis')}</em> {t('service_page.term_quote_form_description_end')}
              <br />
              <i>* {t('service_page.note_direct_order')}</i>
            </dd>
          </dl>
        </div>
      </div>
      {/* 의뢰서 작성 TIP */}
      <div className="mainTip">
        <div className="infoAreaTit">
          <em>{t('main_tip.title_easy_guide')}</em>
          <strong>
            {t('main_tip.intro_mode_tip')}
            <br />
            {t('main_tip.mode_tip')} <strong>TIP!</strong>
          </strong>
        </div>
        <div className="tabNav mainCase" ref={tabRef}>
          <nav>
            <ul>
              <li className={`${tab === 1 ? 'on' : ''}`}>
                <button style={{ cursor: 'pointer' }} onClick={() => handleTab(1)}>
                  {t('main_tip.tab_nav.simple_mode')}
                </button>
              </li>
              <li className={`${tab === 2 ? 'on' : ''}`}>
                <button style={{ cursor: 'pointer' }} onClick={() => handleTab(2)}>
                  {t('main_tip.tab_nav.detail_mode')}
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {/* -- */}
        {tab === 1 && (
          <div>
            <div className="topSlogan">
              <div>
                <span>
                  <em>{t('main_tip.slogan.simple.multiple_patients')}</em>
                  {t('main_tip.slogan.simple.particle_multiple_patients')} <br />
                  <em>{t('main_tip.slogan.simple.bulk_request')}</em>
                  {t('main_tip.slogan.simple.can_do')}
                </span>
              </div>
            </div>
            <div className="mReqStep">
              <dl>
                <dt>
                  <strong>01</strong> {t('main_tip.steps.step1.write_number')}
                </dt>
                <dd className="txt">
                  {t('main_tip.steps.step1.name_privacy_warning')}
                  <br />
                  <strong>{t('main_tip.steps.step1.write_with_number_or_symbol')}</strong>
                  {t('main_tip.steps.step1.do')}
                </dd>
                <dd>
                  <span>
                    <img src={tipImage11} />
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  <strong>02</strong> {t('main_tip.steps.step2_simple.select_type_tooth')}
                </dt>
                <dd className="txt">
                  {t('main_tip.steps.step2_simple.press_prosthesis_type')}
                  {t('main_tip.steps.step2_simple.press')}
                  <br />
                  <strong>{t('main_tip.steps.step2_simple.choose_prosthesis_type')}</strong>
                  {t('main_tip.steps.step2_simple.do')}
                </dd>
                <dd>
                  <span>
                    <img src={tipImage12} />
                  </span>

                  {t('main_tip.steps.step2_simple.do')}
                </dd>
              </dl>
              <dl>
                <dt>
                  <strong>03</strong> {t('main_tip.steps.step3_simple_enter_quantity.title')}
                </dt>
                <dd className="txt">
                  {t('main_tip.steps.step3_simple_enter_quantity.enter_quantity')}
                  <br />
                  <strong>{t('main_tip.steps.step3_simple_enter_quantity.specify_quantity')}</strong>
                  {t('main_tip.steps.step3_simple_enter_quantity.do')}
                </dd>
                <dd>
                  <span>
                    <img src={tipImage13} />
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  <strong>04</strong> {t('main_tip.steps.step4_upload_file.title')}
                </dt>
                <dd className="txt">
                  {t('main_tip.steps.step4_upload_file.press_upload_file')}
                  <br />
                  <strong>{t('main_tip.steps.step4_upload_file.upload_scan_file')}</strong>
                  {t('main_tip.steps.step4_upload_file.do')}
                </dd>
                <dd>
                  <span>
                    <img src={tipImage14} />
                  </span>
                </dd>
              </dl>
            </div>
          </div>
        )}
        {tab === 2 && (
          <div>
            <div className="topSlogan detailCase">
              <div>
                <span>
                  <em>{t('main_tip.slogan.detail.single_patient')}</em>
                  {t('main_tip.slogan.detail.particle_single_patient')} <br />
                  <em>{t('main_tip.slogan.detail.detail_request')}</em>
                  {t('main_tip.slogan.detail.can_do')}
                </span>
              </div>
            </div>
            <div className="mReqStep">
              <dl>
                <dt>
                  <strong>01</strong> {t('main_tip.steps.step1.write_number')}
                </dt>
                <dd className="txt">
                  {t('main_tip.steps.step1.name_privacy_warning')}
                  <br />
                  <strong>{t('main_tip.steps.step1.write_with_number_or_symbol')}</strong>
                  {t('main_tip.steps.step1.do')}
                </dd>
                <dd>
                  <span>
                    <img src={tipImage11} />
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  <strong>02</strong> {t('main_tip.steps.step2_detail.select_type_tooth')}
                </dt>
                <dd className="txt">
                  {t('main_tip.steps.step2_simple.press_prosthesis_type')}
                  {t('main_tip.steps.step2_simple.press')}
                  <br />
                  <strong>{t('main_tip.steps.step2_detail.choose_tooth_position')}</strong>
                  {t('main_tip.steps.step2_detail.do')}
                </dd>
                <dd>
                  <span>
                    <img src={tipImage22} />
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  <strong>03</strong> {t('main_tip.steps.step3_detail_write_details.title')}
                </dt>
                <dd className="txt">
                  {t('main_tip.steps.step3_detail_write_details.enter_measurements')}
                  <br />
                  <strong>{t('main_tip.steps.step3_detail_write_details.write_detailed_content')}</strong>
                  {t('main_tip.steps.step3_detail_write_details.do')}
                </dd>
                <dd>
                  <span>
                    <img src={tipImage23} />
                  </span>
                </dd>
              </dl>
              <dl>
                <dt>
                  <strong>04</strong> {t('main_tip.steps.step4_upload_file.title')}
                </dt>
                <dd className="txt">
                  {t('main_tip.steps.step4_upload_file.press_upload_file')}
                  <br />
                  <strong>{t('main_tip.steps.step4_upload_file.upload_scan_file')}</strong> {t('main_tip.steps.step4_upload_file.do')}
                </dd>
                <dd>
                  <span>
                    <img src={tipImage24} />
                  </span>
                </dd>
              </dl>
            </div>
          </div>
        )}
      </div>
      {/* 요청 */}
      <div className="mainRequest">
        <div className="infoAreaTit">
          <em>{t('mainpage.guide.designation_request')}</em>
          <strong>
            {t('mainpage.guide.dentner_requests')} <br />
            <strong>{t('mainpage.guide.public')}</strong>
            {t('mainpage.guide.and')}
            <strong>{t('mainpage.guide.designation')}</strong>
            {t('mainpage.guide.can_do')}
          </strong>
        </div>
        <div className="tabNav mainCase" ref={tabRef}>
          <nav>
            <ul>
              <li className={`${tab2 === 1 ? 'on' : ''}`}>
                <button style={{ cursor: 'pointer' }} onClick={() => handleTab2(1)}>
                  {t('mainpage.guide.public')}
                </button>
              </li>
              <li className={`${tab2 === 2 ? 'on' : ''}`}>
                <button style={{ cursor: 'pointer' }} onClick={() => handleTab2(2)}>
                  {t('mainpage.guide.designation')}
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {/* -- */}
        {tab2 === 1 && (
          <div className="mRStep">
            <div>
              <dl>
                <dt>
                  <strong>
                    STEP<strong>1</strong>
                  </strong>
                  {t('mainpage.guide.steps.request')}
                  <br />
                  {t('mainpage.guide.steps.write_ahead')}
                </dt>
                <dd>
                  {t('mainpage.guide.steps.prepare_and_save')}
                  <br />
                  {t('mainpage.guide.steps.save_action')}
                </dd>
              </dl>
              <span>
                <img src={stepImage1} />
              </span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>
                    STEP<strong>2</strong>
                  </strong>
                  {t('mainpage.guide.steps.load_request')}
                  <br />
                  {t('mainpage.guide.steps.write_request')}
                </dt>
                <dd>
                  {t('mainpage.guide.steps.public_request_fill')}
                  <br />
                  {t('mainpage.guide.steps.load_public_request')}
                  <br />
                  {t('mainpage.guide.steps.public_request_fill_final')}
                </dd>
              </dl>
              <span>
                <img src={stepImage2} />
              </span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>
                    STEP<strong>3</strong>
                  </strong>
                  {t('mainpage.guide.steps.receive_quote_intro')}
                  <br />
                  {t('mainpage.guide.steps.receive_quote_action')}
                </dt>
                <dd>
                  {t('mainpage.guide.steps.select_designer_intro')}
                  <br />
                  {t('mainpage.guide.steps.select_designer_action')}
                </dd>
              </dl>
              <span>
                <img src={stepImage3} />
              </span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>
                    STEP<strong>4</strong>
                  </strong>
                  {t('mainpage.guide.steps.match_complete_intro')}
                  <br />
                  {t('mainpage.guide.steps.match_complete_action')}
                </dt>
                <dd>
                  {t('mainpage.guide.steps.match_complete_intro')}
                  <br />
                  {t('mainpage.guide.steps.match_complete_action')}
                </dd>
              </dl>
              <span>
                <img src={stepImage4} />
              </span>
            </div>
            <Link to="/request" className="goReQuest">
              {t('mainpage.go_request')}
            </Link>
          </div>
        )}
        {tab2 === 2 && (
          <div className="mRStep">
            <div>
              <dl>
                <dt>
                  <strong>
                    STEP<strong>1</strong>
                  </strong>
                  {t('mainpage.guide.steps.request')}
                  <br />
                  {t('mainpage.guide.steps.write_ahead')}
                </dt>
                <dd>
                  {t('mainpage.guide.steps.prepare_and_save')}
                  <br />
                  {t('mainpage.guide.steps.save_action')}
                </dd>
              </dl>
              <span>
                <img src={stepImage1} />
              </span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>
                    STEP<strong>2</strong>
                  </strong>
                  {t('mainpage.guide.steps.load_request')}
                  <br />
                  {t('mainpage.guide.steps.write_request')}
                </dt>
                <dd>
                  {t('mainpage.guide.steps.public_request_fill')}
                  <br />
                  {t('mainpage.guide.steps.load_public_request')}
                  <br />
                  {t('mainpage.guide.steps.public_request_fill_final')}
                </dd>
              </dl>
              <span>
                <img src={stepImage2} />
              </span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>
                    STEP<strong>2</strong>
                  </strong>
                  {t('mainpage.guide.steps.prefer_dental_designer')} <br />
                  {t('mainpage.guide.steps.select')} <br />
                  {t('mainpage.guide.steps.request_directly')}
                </dt>
                <dd>
                  {t('mainpage.guide.steps.prev_transaction')}
                  <br />
                  {t('mainpage.guide.steps.prefer_profile')}
                  <br />
                  {t('mainpage.guide.steps.to_dental_designer')}
                  <br />
                  {t('mainpage.guide.steps.can_request_directly')}
                </dd>
              </dl>
              <span>
                <img src={stepImage3_1} />
              </span>
            </div>
            <div>
              <dl>
                <dt>
                  <strong>
                    STEP<strong>4</strong>
                  </strong>
                  {t('mainpage.guide.steps.match_complete_intro')} <br /> {t('mainpage.guide.steps.match_complete_action')}
                </dt>
                <dd>
                  {t('mainpage.guide.steps.match_completed')}
                  <br />
                  {t('mainpage.guide.steps.can_transction')}
                </dd>
              </dl>
              <span>
                <img src={stepImage4} />
              </span>
            </div>
            <Link to="/request" state={{ request: tab2 === 2 ? 'select' : '' }} className="goReQuest">
              {t('mainpage.guide.steps.more_info')}
            </Link>
          </div>
        )}
      </div>

      {/* 덴트너 이용 */}
      <Used />
      {/* <div className="mainUsed">
        <div className="infoAreaTit">
          <strong className="big">
            <span>{t('info_area.many_people')}</span> {t('info_area.use_dentner')}
          </strong>
        </div>
        <div className="num">
          <span>
            <strong>
              <strong>120</strong>
              {t('base.people_num')}
            </strong>
            {t('info_area.subscribers')}
          </span>
          <span>
            <strong>
              <strong>526</strong>
              {t('base.count')}
            </strong>
            {t('info_area.requests')}
          </span>
          <span>
            <strong>
              <strong>7,613,849</strong>
              {t('base.won')}
            </strong>
            {t('info_area.total_amount')}
          </span>
        </div>
      </div> */}

      {/* 고객사 */}
      <Partner />

      {/* FAQ */}
      <div className="mainFaq">
        <Faq type="main" />
      </div>
      {/*  */}
      <div className="sampleBox">
        <Banner type={'C'} />
      </div>
    </>
  );
};

export default ServicePage;
