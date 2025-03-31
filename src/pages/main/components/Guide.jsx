import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import stepImage1 from '@assets/images/img_request_step1.png';
import stepImage2 from '@assets/images/img_request_step2.png';
import stepImage3 from '@assets/images/img_request_step3.png';
import stepImage3_1 from '@assets/images/img_request_step3_1.png';
import stepImage4 from '@assets/images/img_request_step4.png';

import { useTranslation } from 'react-i18next';

const Guide = () => {
  const [tab, setTab] = useState(1);
  const { t } = useTranslation();

  return (
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
      <div className="tabNav mainCase">
        <nav>
          <ul>
            <li className={`${tab === 1 ? 'on' : ''}`}>
              <button style={{cursor:'pointer'}} onClick={() => setTab(1)}>{t('mainpage.guide.public')}</button>
            </li>
            <li className={`${tab === 2 ? 'on' : ''}`}>
              <button style={{cursor:'pointer'}} onClick={() => setTab(2)}>{t('mainpage.guide.designation')}</button>
            </li>
          </ul>
        </nav>
      </div>

      {tab === 1 && (
        <div className="mRStep">
          <div>
            {/* <div> */}
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
          {/* <Link to="/request" className="goReQuest">
            {t('mainpage.go_request')}
          </Link> */}
        </div>
      )}
      {tab === 2 && (
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
              <img src={stepImage3} />
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
          {/* <Link to="/request" state={{ request: tab === 1 ? 'public' : 'select' }} className="goReQuest">
            {t('mainpage.guide.steps.more_info')}
          </Link> */}
        </div>
      )}
    </div>
  );
};

export default Guide;

{
  /* 

<div className="mainRequest">
      <div className="infoAreaTit">
        <em>지정요청으로 견적없이 간편하게!</em>
        <strong>
          덴트너에서는 디자이너에게
          <br />
          <strong>공개요청</strong>과 <strong>지정요청</strong>을 할 수 있어요!
        </strong>
      </div>
      <div className="tabNav mainCase">
        <nav>
          <ul>
            <li className={`${tab === 1 ? 'on' : ''}`}>
              <button onClick={() => setTab(1)}>공개요청</button>
            </li>
            <li className={`${tab === 2 ? 'on' : ''}`}>
              <button onClick={() => setTab(2)}>지정요청</button>
            </li>
          </ul>
        </nav>
      </div>

      {tab === 1 && (
        <div className="mRStep">
          <div>
            <dl>
              <dt>
                <strong>
                  STEP<strong>1</strong>
                </strong>
                의뢰서를
                <br />
                미리 작성하세요
              </dt>
              <dd>
                의뢰서를 미리 작성하고,
                <br />
                의뢰서 바구니에 저장하세요
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
                의뢰서를 불러온 후<br />
                요청서를 작성하세요
              </dt>
              <dd>
                공개 요청하기에서 미리 작성한
                <br />
                의뢰서를 불러온 후,
                <br />
                나머지 필수 항목들을 작성하세요
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
                치자이너에게
                <br />
                견적서를 받으세요
              </dt>
              <dd>
                견적서를 준 치자이너 중,
                <br />
                마음에 드는 치자이너를 선택하세요!
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
                매칭완료! <br /> 거래를 진행하세요
              </dt>
              <dd>
                매칭이 완료되어,
                <br />
                거래를 진행할 수 있어요!
              </dd>
            </dl>
            <span>
              <img src={stepImage4} />
            </span>
          </div>
          <Link to="/request" className="goReQuest">
            더 알아보기
          </Link>
        </div>
      )}
      {tab === 2 && (
        <div className="mRStep">
          <div>
            <dl>
              <dt>
                <strong>
                  STEP<strong>1</strong>
                </strong>
                의뢰서를
                <br />
                미리 작성하세요
              </dt>
              <dd>
                의뢰서를 미리 작성하고,
                <br />
                의뢰서 바구니에 저장하세요
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
                의뢰서를 불러온 후<br />
                요청서를 작성하세요
              </dt>
              <dd>
                공개 요청하기에서 미리 작성한
                <br />
                의뢰서를 불러온 후,
                <br />
                나머지 필수 항목들을 작성하세요
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
                원하는 치자이너를 <br />
                선택하고, <br />
                바로 요청하세요
              </dt>
              <dd>
                기존 거래 이력이 있거나,
                <br />
                프로필에서 마음에 드는
                <br />
                치자이너에게 견적 요청 없이,
                <br />
                바로 의뢰할 수 있어요!
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
                매칭완료! <br /> 거래를 진행하세요
              </dt>
              <dd>
                매칭이 완료되어,
                <br />
                거래를 진행할 수 있어요!
              </dd>
            </dl>
            <span>
              <img src={stepImage4} />
            </span>
          </div>
          <Link to="/request" state={{request: tab === 1 ? 'public' : 'select'}} className="goReQuest">
            더 알아보기
          </Link>
        </div>
      )}
    </div>
 */
}
