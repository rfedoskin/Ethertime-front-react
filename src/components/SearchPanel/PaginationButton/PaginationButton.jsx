import React from 'react';
import cx from 'classnames';
import styles from './PaginationButton.module.scss';

const PaginationButton = ({ caption, onClick, isPrev, isNext, isLast, isDisabled }) => (
  <button
    type="button"
    onClick={onClick}
    className={cx(styles.button, {
      [styles.back]: isPrev,
      [styles.forward]: isNext,
      [styles.last]: isLast,
    })}
    disabled={isDisabled}
  >
    {isPrev || isNext ? <div className={styles.arrow} /> : caption}
  </button>
);

export default PaginationButton;
