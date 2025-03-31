import React, { useEffect, useRef, useState } from 'react';
/**
 * 삭제예정
 */

const useBaseSelect = ({ onChange }) => {
  const selectRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    setVisible(false);
    onChange(selected);
  }, [selected]);

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

  return { selectRef, visible, setVisible, selected, setSelected };
};

export default useBaseSelect;
