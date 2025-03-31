import React from 'react';
import PropTypes from 'prop-types';

const ItemTag = ({ id, items, key = 'name', value, className, ...props }) => {
  return (
    <span className={className}>
      {items?.map((el, idx) => {
        return <em key={`${idx}`}>{el[key]}</em>;
      })}
    </span>
  );
};

ItemTag.displayName = 'ItemTag';

ItemTag.propTypes = {
  id: PropTypes.string,
  key: PropTypes.string,
};

ItemTag.defaultProps = {
  key: 'name',
};

export default ItemTag;
