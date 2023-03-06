import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './button.module.scss';

const Button = ({ label, onClick, checked, color, className }) => {
  const buttonClasses = cn(styles.button, {
    [styles.buttonOn]: checked,
    [styles.bgDark]: color === 'secondary',
  });

  return (
    <div className={cn(className, styles.wrapper)}>
      {label && <span>{label}</span>}
      <button className={buttonClasses} type="button" onClick={onClick} />
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  checked: PropTypes.bool,
  color: PropTypes.string,
};

export default Button;
