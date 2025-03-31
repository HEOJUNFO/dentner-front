import sampleProfile from '@assets/images/no_user.png';
import { BaseButton } from '@components/common';
import React, { useEffect, useState } from 'react';

import { getDentalDesigner } from '@api/Designer';
import { useTranslation } from 'react-i18next';

const DesignerProfile = ({ designerNo, onNav }) => {
  const { t } = useTranslation();
  const [data, setData] = useState();

  const fetchDentalDesigner = async () => {
    const r = await getDentalDesigner(designerNo);

    const { data, statusCode } = r;
    if (data) setData({ ...data });
  };

  useEffect(() => {
    if (designerNo) fetchDentalDesigner();
  }, [designerNo]);

  return (
    <div className="designer">
      <div>
        <span className="back">
          <span className="profileImg">
            <img src={data?.memberProfileImage || sampleProfile} />
          </span>
          <span className="nick">
            <span>{data ? data?.memberNickName : '탈퇴한 회원입니다.'}</span>
            <strong>{data?.oneIntroduction}</strong>
          </span>
        </span>
      </div>

      <span className="twinBtn solo">
        <BaseButton label={t('base.view_profile')} onClick={() => onNav(`/designer/view/${designerNo}`)} />
      </span>
    </div>
  );
};

export default DesignerProfile;
