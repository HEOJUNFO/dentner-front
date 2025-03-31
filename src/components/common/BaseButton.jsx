import React from 'react';
import PropTypes from 'prop-types';

const BaseButton = ({ label, onClick, type, className, disabled, style, ...props }) => {
  return (
    <button type={type} className={`${className}`} style={{ cursor: 'pointer', ...style }} onClick={onClick} disabled={disabled} {...props}>
      {label}
    </button>
  );
};

BaseButton.displayName = 'BaseButton';

BaseButton.propTypes = {
  label: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

BaseButton.defaultProps = {
  onClick: () => {},
  type: 'button',
  className: '',
  disabled: false,
};

export default BaseButton;
