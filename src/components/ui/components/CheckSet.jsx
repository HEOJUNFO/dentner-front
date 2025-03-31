import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const CheckSet = ({ id, onChange, label, value }) => {
  return (
    <span className="checkSet">
      <input type="checkbox" id={id} checked={value} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </span>
  );
};

CheckSet.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.node.isRequired,
  value: PropTypes.bool.isRequired,
};

export default CheckSet;
