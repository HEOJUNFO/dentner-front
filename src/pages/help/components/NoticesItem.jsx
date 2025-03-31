import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import parse from "html-react-parser";
const NoticesItem = ({ element }) => {
  const { t } = useTranslation();
  const [toggle, setToggle] = useState(false);
  const formatDate = (registerDt) => {
    return registerDt.split(' ')[0] || registerDt;
  };

  //console.log(element.bbsCn)
  return (
    <dl className={toggle ? 'on' : ''} onClick={() => setToggle(!toggle)}>
      <dt>
        <strong>
          {/* 공지사항 */}
          {t('footer.links.notice')}
        </strong>{' '}
        {element.bbsSj}
      </dt>
      <dd>
        <div>{parse(element?.bbsCn?.replaceAll('\n', '<br/>'))}</div>
        <em>{formatDate(element.registerDt)}</em>
      </dd>
    </dl>
  );
};

export default NoticesItem;
