import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { BaseInput } from '@components/common';
// import useBaseSelect from '@components/hooks/useBaseSelect';

const BaseSelect = ({ id, items, titleName, valueName, onChange, placeholder, className, selectedValue, error, disabled = false, init, input = false, inputValue, valueChange, ...props }) => {
  // const { selectRef, visible, setVisible, selected, setSelected } = useBaseSelect({ onChange });
  const selectRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (selectedValue && !selected) {
      const initialSelected = items.find((item) => item[valueName] === selectedValue);
      if (initialSelected) {
        setSelected(initialSelected);
      }
    }
  }, [selectedValue, items]);

  useEffect(() => {
    if (!selected) return;
    setVisible(false);
    if (onChange) onChange(selected);
  }, [selected]);

  useEffect(() => {
    if (init) setSelected();
  }, [init]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef, setVisible]);

  return (
    <span ref={selectRef} className={`cSelect ${visible ? 'on' : ''} ${error ? 'error' : ''}`} id={id}>
      <em className={`sValue ${disabled ? 'disabled' : ''}`} onClick={() => !disabled && setVisible(!visible)}>
        {selected ? selected[titleName] : placeholder || items[0]?.[titleName]}
      </em>
      <span className="cArea">
        {items?.map((el, idx) => {
          return (
            <span
              key={`${selectRef}_${idx}`}
              className={placeholder || selected ? (selected && el[valueName] === selected[valueName] ? 'on' : '') : idx === 0 ? 'on' : ''}
              onClick={() => {
                if (input && el[titleName]?.includes('직접입력')) return;
                setSelected({ ...el, pid: id });
              }}
            >
              {el[titleName]}
              {el[titleName]?.includes('직접입력') && input && (
                <>
                  <BaseInput style={{ marginLeft: 5, height: '80%' }} value={inputValue} onChange={(e) => valueChange && valueChange(e)} />
                  <button className="btnB ss" style={{ marginLeft: 5, height: '80%', width: 30, fontSize: 10 }} onClick={() => setSelected({ ...el, pid: id })}>
                    입력
                  </button>
                </>
              )}
            </span>
          );
        })}
      </span>
      {error && <p className="errorP">{error}</p>}
    </span>
  );
};

BaseSelect.displayName = 'BaseSelect';

BaseSelect.propTypes = {
  id: PropTypes.string,
  titleName: PropTypes.string,
  valueName: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

BaseSelect.defaultProps = {
  titleName: 'name',
  valueName: 'value',
  onChange: () => {},
  placeholder: '',
  className: '',
};

export default BaseSelect;
