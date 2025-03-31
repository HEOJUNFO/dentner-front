import React, { useRef } from 'react';

const BaseTextArea = ({ onChange, error, isError = true, value, ...props }) => {
  const textAreaRef = useRef(null);
  
  // null 값을 빈 문자열로 변환
  const safeValue = value === null ? '' : value;

  return (
    <>
      <textarea 
        {...props} 
        value={safeValue} 
        onChange={onChange} 
        ref={textAreaRef} 
        className={`${error ? 'base-input__input error' : ''}`} 
      />
      {error && isError && <p className="errorP">{error}</p>}
    </>
  );
};

BaseTextArea.defaultProps = {
  maxLength: 120,
};

export default BaseTextArea;