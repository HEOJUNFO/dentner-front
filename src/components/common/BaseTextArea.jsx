import React, {  useRef } from 'react';
const BaseTextArea = ({ onChange, error, isError = true, ...props }) => {
  const textAreaRef = useRef(null);


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
