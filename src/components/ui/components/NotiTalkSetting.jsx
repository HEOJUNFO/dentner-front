import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BaseInput, BaseButton } from '@components/common';
import { notis, apps } from '@constants/code';
import useNotiTalkSetting from '@components/hooks/useNotiTalkSetting';
import { useTranslation } from 'react-i18next';

const NotiTalkSetting = ({ onChange }) => {
  const { talkOk, params, handleChange, handleAlarmSet } = useNotiTalkSetting({ onChange });
  const { t } = useTranslation();

  return (
    <>
      <dl>
        <dt>
          {t('mypage.talk_set')}
          <sup>필수항목</sup>
        </dt>
        <dd className="talkChoice">
          <em>
          {t('version2_3.text121')}
            <br />{t('version2_3.text122')}
          </em>
          <span className="talkSet">
            {notis['ko'].map((el, idx) => (
              <span key={`notis${idx}`}>
                <BaseInput
                  type="radio"
                  defaultChecked={params.memberAlarmAt.value === el.value}
                  name="memberAlarmAt"
                  id={`memberAlarmAt${idx}`}
                  label={t(`mypage.${el.name}`)}
                  value={el.value}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                />
              </span>
            ))}
          </span>
        </dd>
      </dl>
      <dl style={{ display: `${params.memberAlarmAt.value === 'Y' ? 'block' : 'none'}` }}>
        <dt>
          {t('mypage.talk')}
          <sup>필수항목</sup>
        </dt>
        <dd className="talkChoice">
          <em>{t('mypage.talk_type')}</em>
          <span className="talkSet short">
            {apps['ko'].map((el, idx) => (
              <span key={`apps${idx}`}>
                <BaseInput
                  type="checkbox"
                  defaultChecked={params?.memberAlarmSe?.value?.includes(el.value)}
                  name="memberAlarmSe"
                  id={`memberAlarmSe${idx}`}
                  label={t(`${el.name}`)}
                  value={el.value}
                  onChange={(e) => handleAlarmSet( e.target.value)}
                />
              </span>
            ))}
          </span>
        </dd>
      </dl>
    </>
  );
};

export default NotiTalkSetting;
