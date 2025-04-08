import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BaseButton, BaseInput } from '@components/common';

const TableSortingM = ({
  className,
  defaultValue,
  titleName,
  valueName,
  groupName,
  items = [],
  onChange,
  input = false,
  eventType = 'change',
  button = false,
  buttonTitle,
  buttonPosition,
}) => {
  const [visible, setVisible] = useState(false);
  let buttonItems = items?.filter((el) => el[titleName] === buttonTitle);
  let selectItems = button
    ? items?.filter((el) => el[titleName] !== buttonTitle)
    : items;
  let selected = selectItems?.find((el) => defaultValue === el[valueName]);

  return (
    <>
      <div className="right sortingSet">
        <span className={className} style={{ position: 'absolute', ...buttonPosition }}>
          {button &&
            buttonItems?.map((el, idx) => {
              let func = onChange;
              if (el.onChange) func = el.onChange;
              return (
                <span key={`button-${idx}`}>
                  <input
                    type="radio"
                    id={`${groupName}_${idx}_btn`}
                    name={groupName}
                    onChange={() => func(el[valueName])}
                  />
                  <label htmlFor={`${groupName}_${idx}_btn`}>{el[titleName]}</label>
                </span>
              );
            })}
        </span>
        <span className="sArea">
          {input && (
            <span className="searchSet mini">
              <BaseInput
                type="text"
                className="txt"
                value={input?.value}
                placeholder={input?.placeholder}
                onChange={input?.onChange}
                onKeyDown={input?.onKeyDown}
              />
              <BaseButton label="검색" className="icon" onClick={input?.onClick} />
            </span>
          )}
          <span className={className}>
            <div className="fillter">
              <em
                className={`${visible ? 'on' : ''}`}
                onClick={() => setVisible(!visible)}
              >
                {selected?.[titleName] || selectItems?.[0]?.[titleName]}
              </em>
              <div>
                {selectItems?.map((el, idx) => {
                  let func = onChange;
                  if (el.onChange) func = el.onChange;
                  return (
                    <span key={`select-${idx}`}>
                      <input
                        type="radio"
                        id={`${groupName}_${idx}`}
                        name={groupName}
                        defaultChecked={defaultValue === el[valueName]}
                        onChange={() => {
                          func(el[valueName]);
                          setVisible(!visible);
                        }}
                      />
                      <label htmlFor={`${groupName}_${idx}`}>{el[titleName]}</label>
                    </span>
                  );
                })}
              </div>
            </div>
          </span>
        </span>
      </div>
    </>
  );
};

TableSortingM.displayName = 'TableSortingM';

TableSortingM.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.any,
  titleName: PropTypes.string,
  valueName: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
};

TableSortingM.defaultProps = {
  className: 'sorting',
  titleName: 'name',
  valueName: 'value',
  groupName: 'sorting',
  items: [],
};

export default TableSortingM;
