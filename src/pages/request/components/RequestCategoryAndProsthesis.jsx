import { CategoryTag } from '@components/common';
import UserStore from '@store/UserStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { withCommas } from '@utils/common';

const RequestCategoryAndProsthesis = ({ requestFormTypeName, prostheticsList, requestFormSe, targetAmount = 0 , prosthetics}) => {
  const { t } = useTranslation();
  const { user } = UserStore();
  const categorys = requestFormTypeName?.split(',').map((el) => ({ name: el }));
  console.log('prosthetics --->  ' , prosthetics)
  return (
    <>
      <h4>
        <strong>{t('base.category')}</strong>
      </h4>
      <div>
        <CategoryTag items={categorys} />
      </div>
      <h4>
        <strong>
          {t('base.prosthesistype')}/{t('base.amount')}
        </strong>
      </h4>


      <div className="itemList">

          <div  style={{padding:'10px 0px 10px'}}>
              <ul style={{padding: 20 , marginBottom: 21, borderRadius: 8, background: '#fbfcfe'}}>
                  {prosthetics?.map((el, idx) => (
                      <li key={`Request_${idx}`}>
                          <span style={{position:'relative', width: 143, textAlign:'center', flexShrink:0 }}>{el.requestDocName}</span>
                          <em style={{paddingLeft: 50}}>{el.requestDocDesc}</em>
                      </li>
                  ))}
              </ul>
          </div>

        {prostheticsList.map((el, idx) => {
          const sdt = el.requestTypeName?.split(' > ') || [];
          return (
            <div key={`RequestCategoryAndProsthesis_${idx}`}>
              <strong>

                {sdt.map((ele, idxx) => {
                  if (idxx === 0) {
                    return <strong key={`RequestCategoryAndProsthesis__strong_${idx}_${idxx}`}>{ele} &gt; </strong>;
                  } else if (sdt.length - 1 === idxx) {
                    return ele;
                  } else {
                    return <React.Fragment key={`RequestCategoryAndProsthesis__fragment_${idx}_${idxx}`}>{ele} &gt;</React.Fragment>;
                  }
                })}
              </strong>{' '}
              <em>
                {el.count}
                {t('base.count')}
              </em>
            </div>
          );
        })}
      </div>

      {requestFormSe === 'B' && (
        <div className="priceSet">
          <span>
            {user.memberSe === 'A' && t('version2_2.text56')}
            {user.memberSe === 'C' && t('version2_2.text89')}
          </span>
          <strong className="right">
            <em>{withCommas(targetAmount)}</em> <strong>{t('base.won')}</strong>
          </strong>
        </div>
      )}
    </>
  );
};

export default RequestCategoryAndProsthesis;
