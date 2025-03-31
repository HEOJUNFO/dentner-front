import React, { useEffect, useRef } from 'react';
const BaseTextArea = ({ onChange, error, isError = true, ...props }) => {
  const textAreaRef = useRef(null);
  const handleScroll = () => {
    if (document.activeElement === textAreaRef.current) {
      textAreaRef.current.blur(); // Remove focus when scrolling
    }
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <>
      <textarea {...props} onChange={onChange} ref={textAreaRef} className={`${error ? 'base-input__input error' : ''}`} />
      {error && isError && <p className="errorP">{error}</p>}
    </>
  );
};

BaseTextArea.defaultProps = {
  maxLength: 120,
};

export default BaseTextArea;
