import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BaseButton } from '@components/common';
import { useClient } from './hooks/useClient';
import Korean from './components/Korean';
import Foreigner from './components/Foreigner';
import { useTranslation } from 'react-i18next';

const Client = () => {
  const { joinTab, setJoinTab, koreanRef, foreignerRef, handleSubmit } = useClient();
  const { t } = useTranslation();

  return (
    <div className={`memberLayout`}>
      <div className="joinStep2">
        <h2>{t('join.email')}</h2>

        <div className="tws">
          <dl>
            <dt>
              {t('join.client_type')}
              <sup>{t('base.required')}</sup>
            </dt>
            <dd className="typeChoice">
              <BaseButton className={`${joinTab === 1 ? 'on' : ''}`} label={t('base.korean')} onClick={() => setJoinTab(1)} />
              <BaseButton className={`${joinTab === 2 ? 'on' : ''}`} label={t('base.foreigner')} onClick={() => setJoinTab(2)} />
            </dd>
          </dl>

          {joinTab === 1 && <Korean ref={koreanRef} />}
          {joinTab === 2 && <Foreigner ref={foreignerRef} />}
        </div>
        <BaseButton className={'btnB mt50'} label={t('join.do_join')} onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Client;
