import React, { useState } from 'react';
import tipImage11 from '@assets/images/img_modeTip11.png';
import tipImage12 from '@assets/images/img_modeTip12.png';
import tipImage13 from '@assets/images/img_modeTip13.png';
import tipImage14 from '@assets/images/img_modeTip14.png';
import tipImage21 from '@assets/images/img_modeTip21.png';
import tipImage22 from '@assets/images/img_modeTip22.png';
import tipImage23 from '@assets/images/img_modeTip23.png';
import tipImage24 from '@assets/images/img_modeTip24.png';
import tipImage11M from '@assets/images/img_modeTip11_m.png';
import tipImage12M from '@assets/images/img_modeTip12_m.png';
import tipImage13M from '@assets/images/img_modeTip13_m.png';
import tipImage14M from '@assets/images/img_modeTip14_m.png';
import tipImage21M from '@assets/images/img_modeTip21_m.png';
import tipImage22M from '@assets/images/img_modeTip22_m.png';
import tipImage23M from '@assets/images/img_modeTip23_m.png';
import tipImage24M from '@assets/images/img_modeTip24_m.png';
import { useTranslation } from 'react-i18next';

const Tips = () => {
  const [tab, setTab] = useState(1);
  const { t, i18n } = useTranslation();

  return (
    <div className="mainTip">
      {/* <div className="infoAreaTit">
        <em>이것만 알면 쉬워요!</em>
        <strong>
          상황에 따라 달라지는
          <br />
          모드별 의뢰서 작성 <strong>TIP!</strong>
        </strong>
      </div>
      <div className="tabNav mainCase">
        <nav>
          <ul>
            <li className={`${tab === 1 ? 'on' : ''}`}>
              <button onClick={() => setTab(1)}>간편모드</button>
            </li>
            <li className={`${tab === 2 ? 'on' : ''}`}>
              <button onClick={() => setTab(2)}>상세모드</button>
            </li>
          </ul>
        </nav>
      </div>

      {tab === 1 && (
        <div>
          <div className="topSlogan">
            <div>
              <span>
                <em>여러 명의 환자</em>를 <br />
                <em>한꺼번에 의뢰</em>할 수 있어요.
              </span>
            </div>
          </div>
          <div className="mReqStep">
            <dl>
              <dt>
                <strong>01</strong> 의뢰번호 작성
              </dt>
              <dd className="txt">
                환자의 개인정보를 위해 이름 대신
                <br />
                <strong>숫자 또는 기호로 의뢰번호를 작성</strong>해 주세요
              </dd>
              <dd>
                <span>
                  <img src={tipImage11} />
                </span>
              </dd>
            </dl>
            <dl>
              <dt>
                <strong>02</strong> 보철종류 선택
              </dt>
              <dd className="txt">
                “보철종류” 선택을 눌러
                <br />
                <strong>원하는 보철종류를 선택</strong>해주세요
              </dd>
              <dd>
                <span>
                  <img src={tipImage12} />
                </span>
              </dd>
            </dl>
            <dl>
              <dt>
                <strong>03</strong> 보철종류 별 개수 입력
              </dt>
              <dd className="txt">
                선택한 각 보철종류마다
                <br />
                <strong>필요한 보철물 개수를 입력</strong>해주세요
              </dd>
              <dd>
                <span>
                  <img src={tipImage13} />
                </span>
              </dd>
            </dl>
            <dl>
              <dt>
                <strong>04</strong> 파일 첨부
              </dt>
              <dd className="txt">
                "파일 첨부하기"를 눌러
                <br />
                <strong>스캔파일을 업로드</strong> 해주세요
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
                <em>한 명의 환자</em>를 <br />
                <em>상세하게 의뢰</em>할 수 있어요.
              </span>
            </div>
          </div>
          <div className="mReqStep">
            <dl>
              <dt>
                <strong>01</strong> 의뢰번호 작성
              </dt>
              <dd className="txt">
                환자의 개인정보를 위해 이름 대신
                <br />
                <strong>숫자 또는 기호로 의뢰번호를 작성</strong>해 주세요
              </dd>
              <dd>
                <span>
                  <img src={tipImage21} />
                </span>
              </dd>
            </dl>
            <dl>
              <dt>
                <strong>02</strong> 보철종류 및 치식 선택
              </dt>
              <dd className="txt">
                <strong>“보철종류” 선택</strong>을 눌러
                <br />
                <strong>원하는 "치식"을 선택</strong>해주세요
              </dd>
              <dd>
                <span>
                  <img src={tipImage22} />
                </span>
              </dd>
            </dl>
            <dl>
              <dt>
                <strong>03</strong> 상세 내용 작성
              </dt>
              <dd className="txt">
                수치값, 디자인 내용등
                <br />
                <strong>상세 내용을 작성</strong>해 주세요
              </dd>
              <dd>
                <span>
                  <img src={tipImage23} />
                </span>
              </dd>
            </dl>
            <dl>
              <dt>
                <strong>04</strong> 파일 첨부
              </dt>
              <dd className="txt">
                "파일 첨부하기"를 눌러
                <br />
                <strong>스캔파일을 업로드</strong> 해주세요
              </dd>
              <dd>
                <span>
                  <img src={tipImage24} />
                </span>
              </dd>
            </dl>
          </div>
        </div>
      )} */}
      <div className="infoAreaTit">
        <em>{t('main_tip.title_easy_guide')}</em>
        <strong>
          {t('main_tip.intro_mode_tip')}
          <br />
          {t('main_tip.mode_tip')} <strong>TIP!</strong>
        </strong>
      </div>
      <div className="tabNav mainCase">
        <nav>
          <ul>
            <li className={`${tab === 1 ? 'on' : ''}`}>
              <button style={{cursor:'pointer'}} onClick={() => setTab(1)}>{t('main_tip.tab_nav.simple_mode')}</button>
            </li>
            <li className={`${tab === 2 ? 'on' : ''}`}>
              <button style={{cursor:'pointer'}} onClick={() => setTab(2)}>{t('main_tip.tab_nav.detail_mode')}</button>
            </li>
          </ul>
        </nav>
      </div>

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
                  <img src={tipImage11} className='pCase' />
                  <img src={tipImage11M} className='mCase' />
                </span>
              </dd>
            </dl>
            <dl>
              <dt>
                <strong>02</strong> {t('main_tip.steps.step2_simple.select_type_tooth')}
              </dt>
              <dd className="txt">
                <strong>{t('main_tip.steps.step2_simple.press_prosthesis_type')}</strong>
                {t('main_tip.steps.step2_simple.press')}
                <br />
                <strong>{t('main_tip.steps.step2_simple.choose_prosthesis_type')}</strong>
                {t('main_tip.steps.step2_simple.do')}
              </dd>
              <dd>
                <span>
                  <img src={tipImage12} className='pCase' />
                  <img src={tipImage12M} className='mCase' />
                </span>
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
                  <img src={tipImage13} className='pCase' />
                  <img src={tipImage13M} className='mCase' />
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
                  <img src={tipImage11} className='pCase' />
                  <img src={tipImage21M} className='mCase' />
                </span>
              </dd>
            </dl>
            <dl>
              <dt>
                <strong>02</strong> {t('main_tip.steps.step2_detail.select_type_tooth')}
              </dt>
              <dd className="txt">
                <strong>{t('main_tip.steps.step2_simple.press_prosthesis_type')}</strong>
                {t('main_tip.steps.step2_simple.press')}
                <br />
                <strong>{t('main_tip.steps.step2_detail.choose_tooth_position')}</strong>
                {t('main_tip.steps.step2_detail.do')}
              </dd>
              <dd>
                <span>
                  <img src={tipImage22} className='pCase' />
                  <img src={tipImage22M} className='mCase' />
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
                  <img src={tipImage23} className='pCase' />
                  <img src={tipImage23M} className='mCase' />
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
                  <img src={tipImage24} className='pCase' />
                  <img src={tipImage24M} className='mCase' />
                </span>
              </dd>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tips;
