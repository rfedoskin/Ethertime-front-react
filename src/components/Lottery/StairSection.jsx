import React from 'react';
import styles from './lottery.module.scss';
import ProgressBar from '../ProgressBar';
import { cycleStatus as status } from '../../services/lotteryService';
import TransactionLink from '../TransactionLink';

const StairSection = ({ cycleStatus, rootId, remainingSeconds, end, begin, winners = [] }) => {
  const cycleSeconds = end - begin;
  const progress = 100 - (remainingSeconds / cycleSeconds) * 100;

  switch (cycleStatus) {
    case status.finished: {
      const winNumbers = winners.map(winner => winner.number);
      const [firstPrize, secondPrize, thirdPrize] = winNumbers;

      return (
        <>
          <span className={styles.secondResult}>
            {typeof secondPrize === 'number' ? `${secondPrize}` : '-'}
          </span>
          <div className={styles.firstResult}>
            <span className={styles.firstNumber}>
              {typeof firstPrize === 'number' ? `${firstPrize}` : '-'}
            </span>
          </div>
          <span className={styles.thirdResult}>
            {typeof thirdPrize === 'number' ? `${thirdPrize}` : '-'}
          </span>
          <div className={styles.buttonWrapper}>
            <TransactionLink />
          </div>
        </>
      );
    }
    case status.pending: {
      const winNumbers = winners.map(winner => winner.number);
      const [firstPrize, secondPrize, thirdPrize] = winNumbers;

      return (
        <>
          <span className={styles.secondResult}>
            {typeof secondPrize === 'number' ? `${secondPrize}` : '-'}
          </span>
          <div className={styles.firstResult}>
            <span className={styles.firstNumber}>
              {typeof firstPrize === 'number' ? `${firstPrize}` : '-'}
            </span>
          </div>
          <span className={styles.thirdResult}>
            {typeof thirdPrize === 'number' ? `${thirdPrize}` : '-'}
          </span>
        </>
      );
    }
    case status.calculation:
      return (
        <>
          <span className={styles.secondResult} />
          <div className={styles.firstResult}>
            <ProgressBar width="57" height="90" spinner idKey={rootId} idSpacename="stair" />
          </div>
          <span className={styles.thirdResult} />
        </>
      );
    case status.active:
    default:
      return (
        <>
          <span className={styles.secondResult} />
          <div className={styles.firstResult}>
            <ProgressBar width="57" height="90" progress={progress <= 100 ? progress : 100} />
          </div>
          <span className={styles.thirdResult} />
        </>
      );
  }
};

export default StairSection;
