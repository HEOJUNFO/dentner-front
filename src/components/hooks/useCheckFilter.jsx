import React, { useEffect, useRef, useState } from 'react';

const useCheckFilter = ({ isMulti, max, onChange }) => {
  const ref = useRef();
  const [checked, setChecked] = useState([]);
  const handleCheck = (value) => {
    ref.current = true;
    if (isMulti) {
      if (checked.includes(value)) {
        const r = checked.filter((el) => el !== value);
        setChecked(r);
      } else {
        if (max) {
          if (checked.length >= max) {
            // 최대선택개수초과

            return;
          }
        }
        const r = [...checked, value];
        setChecked(r);
      }
    } else {
      if (checked.includes(value)) setChecked([]);
      else setChecked([value]);
    }
  };

  useEffect(() => {
    if (onChange && ref.current) {
      if (!isMulti) {
        onChange(checked.join());
      } else {
        onChange(checked);
      }
    }
  }, [checked]);

  return { handleCheck, checked, setChecked };
};

export default useCheckFilter;
