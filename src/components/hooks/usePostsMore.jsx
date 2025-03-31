import React, { useEffect, useRef, useState } from 'react';
/**
 * 삭제예정
 */
const usePostsMore = () => {
  const moreRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [moreRef, setVisible]);

  const handleClick = ({ onClick }) => {
    setVisible(false);
    if (onClick) {
      onClick();
    }
  };

  return { moreRef, visible, setVisible, handleClick };
};

export default usePostsMore;
