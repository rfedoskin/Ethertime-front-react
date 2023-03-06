import React from 'react';
import PropTypes from 'prop-types';
import styles from './switch.module.scss';

const Switch = ({ checked = false, onChange, color, doubleSide, id }) => {
  let bgColor;
  switch (color) {
    case 'secondary':
      bgColor = '#68c5f0';
      break;
    case 'primary':
    default:
      bgColor = '#bad405';
  }

  const labelStyle = doubleSide
    ? { backgroundColor: bgColor }
    : { backgroundColor: checked && bgColor };

  return (
    <label className={styles.label} style={labelStyle} htmlFor={id}>
      <input
        className={styles.checkbox}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <span className={styles.button} />
    </label>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  doubleSide: PropTypes.bool,
};

export default Switch;
