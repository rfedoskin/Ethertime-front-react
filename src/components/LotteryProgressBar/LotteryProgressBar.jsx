import React from 'react';
import styles from './lotteryProgressBar.module.scss';

const LotteryProgressBar = ({ cashback }) => {
  const { value, currentDiscount } = cashback;

  return (
    <div className={styles.wrapper}>
      <span>{`${currentDiscount}%`}</span>
      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
};

export default LotteryProgressBar;
