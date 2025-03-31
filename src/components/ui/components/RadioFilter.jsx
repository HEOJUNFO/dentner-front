import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BaseInput } from '@components/common';

const RadioFilter = ({ wrap, ddClassName, spanClassName, items, title, groupName, keyName, valueName, titleName, checkValue, onChange, onClick, onTextChange, etcValue }) => {
  return (
    <dl>
      <dt>{title}</dt>
      <dd className={ddClassName}>
        {items.map((el, idx) => (
          <span key={`groupName_${el[valueName]}_${idx}`} className={spanClassName}>
            <BaseInput
              type="radio"
              id={`groupName_${el[valueName]}_${idx}`}
              data-edit={el?.codeEditYn}
              name={groupName}
              value={el[valueName]}
              label={el[titleName]}
              checked={checkValue == el[valueName]}
              onChange={onChange}
              onClick={onClick}
            />

            {el?.codeEditYn && checkValue == el[valueName] && <BaseInput value={etcValue} type="text" onChange={onTextChange} />}
          </span>
        ))}
      </dd>
    </dl>
  );
};

RadioFilter.displayName = 'RadioFilter';

RadioFilter.propTypes = {
  wrap: PropTypes.string,
  ddClassName: PropTypes.string,
  spanClassName: PropTypes.string,
  items: PropTypes.array,
  title: PropTypes.string,
  groupName: PropTypes.string.isRequired,
  keyName: PropTypes.string,
  valueName: PropTypes.string,
  titleName: PropTypes.string,
  checkValue: PropTypes.string,
  onChange: PropTypes.func,
};

RadioFilter.defaultProps = {
  wrap: 'dl',
  ddClassName: '',
  spanClassName: '',
  items: [],
  titleName: 'title',
  valueName: 'value',
  etcValue: '',
};

export default RadioFilter;
