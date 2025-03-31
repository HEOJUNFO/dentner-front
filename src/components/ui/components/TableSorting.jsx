import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BaseButton, BaseInput } from '@components/common';

const TableSorting = ({ className, defaultValue, titleName, valueName, groupName, items = [], onChange, input = false, eventType = 'change' }) => {
  return (
    <>
      <div className="right sortingSet">
        <span className="sArea">
          {input && (
            <span className="searchSet mini">
              {/* <input type="text" className="txt" placeholder="요청서와 연관된 내용 검색" />         */}
              <BaseInput type="text" className={'txt'} value={input?.value} placeholder={input?.placeholder} onChange={input?.onChange} onKeyDown={input?.onKeyDown} />
              <BaseButton label={'검색'} className={'icon'} onClick={input?.onClick} />
            </span>
          )}
          <span className={className}>
            {items.map((el, idx) => {
              let func = onChange;
              if (el.onChange) func = el.onChange;
              return (
                <span key={`sort_${idx}`}>
                  {eventType === 'change' && <input type="radio" id={`${groupName}_${idx}`} checked={defaultValue === el[valueName]} name={groupName} onChange={() => func(el[valueName])} />}
                  {eventType === 'click' && <input type="radio" id={`${groupName}_${idx}`} checked={defaultValue === el[valueName]} name={groupName} readOnly onClick={() => func(el[valueName])} />}

                  <label htmlFor={`${groupName}_${idx}`}>{el[titleName]}</label>
                </span>
              );
            })}
          </span>
        </span>
      </div>
    </>
  );
};

TableSorting.displayName = 'TableSorting';

TableSorting.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  titleName: PropTypes.string,
  valueName: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

TableSorting.defaultProps = {
  className: 'sorting',
  titleName: 'name',
  valueName: 'value',
  groupName: 'sorting',
  items: [],
};

export default TableSorting;
