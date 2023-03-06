import React from 'react';
import { getRemainingTimeString } from '../../services/timeService';
import styles from './remainingTimer.module.scss';

const RemainingTimer = ({ remainingSeconds }) => {
  const isLotteryEnds = remainingSeconds <= 10;
  const remainingString = getRemainingTimeString(remainingSeconds);

  return (
    <div>
      <div className={styles.remainingTime}>
        {!isLotteryEnds ? (
          <span>{remainingString}</span>
        ) : (
          <span>
            {remainingString.slice(0, -2)}
            <span className={styles.colTimeSecondsDanger}>{remainingString.slice(-2)}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default RemainingTimer;
