import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ className, disabled, onClick, children, value, itemStyle }) => {
  const handleClick = event => {
    if (!disabled) {
      onClick(value, event);
    }
  };

  return (
    <div
      role="button"
      className={className}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleClick}
      style={itemStyle}
    >
      {children}
    </div>
  );
};

MenuItem.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node]).isRequired,
  value: PropTypes.string.isRequired,
};

export default MenuItem;
