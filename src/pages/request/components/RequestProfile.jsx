import React from 'react';
import { Link } from 'react-router-dom';
import { ItemTag } from '@components/common';
import { nameMaskingFormat } from '@utils/common';
import sampleProfile from '@assets/images/no_user.png';
import { useTranslation } from 'react-i18next';

const RequestProfile = ({ isMine, registerNo, memberProfileImage, memberNickName, memberSwName, swEtc }) => {
  const { t } = useTranslation();
  let cads = [];
  if (memberSwName) cads = memberSwName.split(',').map((el) => ({ name: el }));
  if (swEtc) cads.push({ name: `${t('version2_2.text1')}:` + swEtc });

  return (
    <div className="order">
      <span className="back">
        <span className="profileImg">
          <img src={memberProfileImage || sampleProfile} />
        </span>
        <span className="nick">
          <strong>{isMine ? memberNickName : nameMaskingFormat(memberNickName)}</strong>
          <ItemTag items={cads} className="itemTag" />
        </span>
      </span>
      <Link to={`/profile/view/${registerNo}`} className="btnB">
      {t('base.view_profile')}
      </Link>
    </div>
  );
};

export default RequestProfile;
