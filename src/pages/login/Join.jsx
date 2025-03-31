import { BaseButton } from '@components/common';
import { useNav } from '@components/hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
/**
 * 회원가입 유형 선택 페이지
 * @returns
 */
const Join = () => {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const { handleNav, state } = useNav();
  return (
    <>
      <div className={`memberLayout kindMember`}>
        <div className="joinStep1">
          <h2>
            {/* 회원가입 */}
            {t('base.join')}
          </h2>
          <p className="subT">
            {t('version2_1.text114')}{' '}
            <strong>
              {/* 회원유형 */}
              {t('join.client_type')}
            </strong>
            {/* 을 선택해주세요. */}
            {t('version2_1.text115')}
          </p>
          <div>
            <dl style={{ cursor: 'pointer' }} onClick={() => handleNav('/login/join/client', state)}>
              <dt>
                {/* 의뢰인 */}
                {t('faq.client')}
              </dt>
              <dd className="txt">
                <span>
                  {/* CAD 파일을 의뢰할 수 있어요! */}
                  {t('version2_1.text120')}
                </span>
                <span>
                  {/* 한국의 치과기공소를 만날 수 있어요! */}
                  {t('version2_1.text119')}
                </span>
              </dd>
              <dd>
                <BaseButton label={t('version2_1.text118')} className={'btnL ss'} />
                {/*  onClick={() => navigate('/login/join/client')} */}
              </dd>
            </dl>
            <dl style={{ cursor: 'pointer' }} onClick={() => handleNav('/login/join/center', state)}>
              <dt>
                {/* 치과기공소 */}
                {t('faq.dental_lab')}
              </dt>
              <dd className="txt">
                <span>
                  {/* 치과기공소를 홍보할 수 있어요! */}
                  {t('main_other.promote_dental_lab')}
                </span>
                <span>
                  {/* CAD파일을 거래할 수 있어요! */}
                  {t('main_other.trade_cad_files')}
                </span>
              </dd>
              <dd>
                <button className="btnL ss">
                  {/* 치과기공소로 회원가입 */}
                  {t('version2_1.text117')}
                </button>
              </dd>
            </dl>
            <dl style={{ cursor: 'pointer' }} onClick={() => handleNav('/login/join/designer', state)}>
              <dt>
                {/* 치자이너 */}
                {t('faq.dental_designer')}
              </dt>
              <dd className="txt">
                <span>
                  {/* CAD파일을 거래할 수 있어요! */}
                  {t('main_other.trade_cad_files')}
                </span>
              </dd>
              <dd>
                <button className="btnL ss">
                  {/* 치자이너로 회원가입 */}
                  {t('version2_1.text116')}
                </button>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;
