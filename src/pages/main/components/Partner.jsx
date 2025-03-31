import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import samplePartner from '@assets/images/sample/s.png';
import samplePartner1 from '@assets/images/sample/ss.png';
import samplePartner2 from '@assets/images/sample/sss.png';
import samplePartner3 from '@assets/images/sample/ssss.png';
import { useTranslation } from 'react-i18next';

const Partner = () => {
  const { t } = useTranslation();
  return (
    <div className="mainPartner">
      <div className="infoAreaTit">
        <strong>
          <span>{t('partner.with_dentner')}</span>
          <br />
          {t('partner.many_company')}
        </strong>
      </div>
      <ul>
        <li>
          <Link to="">
            <img src={samplePartner2} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner1} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner3} />
          </Link>
        </li>
        {/* <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li>
        <li>
          <Link to="">
            <img src={samplePartner} />
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Partner;
