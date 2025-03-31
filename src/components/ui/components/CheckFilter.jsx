import React, { useEffect } from 'react';
import useCheckFilter from '@components/hooks/useCheckFilter';
import PropTypes from 'prop-types';

const CheckFilter = ({ className, items, titleName, valueName, isMulti, max, onChange }) => {
  const { handleCheck, checked } = useCheckFilter({ isMulti, max, onChange });

  return (
    <div className="reQuestSorting">
      {items.map((el, idx) => {
        return (
          <span key={`${el[valueName]}_${idx}`}>
            <input type="checkbox" id={`${el[titleName]}`} checked={checked.includes(el[valueName])} onChange={() => handleCheck(el[valueName])} />
            <label htmlFor={`${el[titleName]}`}>{el[titleName]}</label>
          </span>
        );
      })}
    </div>
  );
};

CheckFilter.displayName = 'CheckFilter';

CheckFilter.propTypes = {
  items: PropTypes.array,
  titleName: PropTypes.string,
  valueName: PropTypes.string,
  isMulti: PropTypes.bool,
  max: PropTypes.number,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

CheckFilter.defaultProps = {
  items: [],
  titleName: 'title',
  valueName: 'value',
  isMulti: false,
};

export default CheckFilter;
