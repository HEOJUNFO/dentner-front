import React, { useState } from 'react';

const FaqItem = ({ element }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <dl className={toggle ? 'on' : ''} onClick={() => setToggle(!toggle)}>
      <dt>{element.bbsSj}</dt>
      <dd>{element.bbsCn}</dd>
    </dl>
  );
};

export default FaqItem;
