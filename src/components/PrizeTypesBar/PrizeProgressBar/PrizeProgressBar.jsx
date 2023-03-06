import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './prizeProgressBar.module.scss';

const PrizeProgressBar = ({
  title,
  number,
  className,
  capture,
  progress = 0,
  barStyles,
  fill = '#00aeff',
}) => {
  const barStyle = {
    right: `${100 - progress}%`,
    backgroundColor: `${fill}`,
    ...barStyles,
  };

  return (
    <div className={cx(styles.progressContainer, className)}>
      <div className={styles.number}>
        <span>{number}</span>
      </div>
      <div className={styles.barWrapper}>
        <div className={styles.barText}>
          <span>{title}</span>
          {capture && <span>{capture}</span>}
        </div>
        <div className={styles.bar} style={barStyle} />
      </div>
    </div>
  );
};

PrizeProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  progress: PropTypes.number,
  className: PropTypes.string,
  capture: PropTypes.string,
  fill: PropTypes.string,
};

export default PrizeProgressBar;
