import React from 'react';
import PropTypes from 'prop-types';

const CategoryTag = ({ id, items, key, value, ...props }) => {
  return (
      <span className='itemTag category'>
        {items?.map((el, idx) => {
          return (
            <em key={`${idx}`}>
              {el[key]}
            </em>
          );
        })}
      </span>
  );
};

CategoryTag.displayName = 'ItemTag';

CategoryTag.propTypes = {
  id: PropTypes.string,
  key: PropTypes.string,
};

CategoryTag.defaultProps = {
  key: 'name',
};

export default CategoryTag;
