import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const WrapListBox = ({ children }) => {
  return (
    <article>
      <div className="listBox">{children}</div>
    </article>
  );
};

WrapListBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WrapListBox;
