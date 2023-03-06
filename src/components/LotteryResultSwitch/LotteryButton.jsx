import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './lotteryButton.module.scss';

const LotteryButton = ({ className, isActive, children, onClick }) => {
  const activeButtonClasses = cn(styles.lotteryButton, className, {
    [styles.lotteryButtonActive]: isActive,
  });

  return (
    <button className={activeButtonClasses} type="button" onClick={onClick}>
      {React.Children.map(children, child => React.cloneElement(child, { isActive }))}
    </button>
  );
};

LotteryButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

LotteryButton.defaultProps = {
  isActive: false,
};

export default LotteryButton;
