import React from 'react';
import { BaseButton } from '@components/common';
import { useTranslation } from 'react-i18next';

const Cad = () => {
  const { t } = useTranslation();

  return (
    <div className="mainCad">
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
  );
};

export default Cad;

{
  /*     <div className="mainCad">
      <div className="infoAreaTit">
        <em>CAD 디자인 파일이 필요하세요?</em>
        <strong>
          덴트너에서 <strong>CAD File</strong>을 의뢰하고,
          <br />
          한국 디자이너를 만나보세요!
        </strong>
        <span className="subT">
          덴트너는 <strong>다양한 File</strong>을 제공합니다
        </span>
      </div>
      <div className="go">
        <BaseButton label={'크라운&캡'} style={{ cursor: 'default' }} />
        <BaseButton label={'인레이(온레이)'} style={{ cursor: 'default' }} />
        <BaseButton label={'프레임'} style={{ cursor: 'default' }} />
        <BaseButton label={'의치 및 배열'} style={{ cursor: 'default' }} />
        <BaseButton label={'스프린트 및 서지컬 가이드'} style={{ cursor: 'default' }} />
        <BaseButton label={'교정'} style={{ cursor: 'default' }} />
        <BaseButton label={'어버트먼트'} style={{ cursor: 'default' }} />
        <BaseButton label={'기타'} style={{ cursor: 'default' }} />
      </div>
    </div>
 */
}
