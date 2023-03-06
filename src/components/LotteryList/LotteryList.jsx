import React from 'react';
import PropTypes from 'prop-types';
import styles from './LotteryList.module.scss';
import Lottery from '../Lottery';
import { sortLotteries } from '../../services/lotteryService';

const LotteryList = ({ lotteries, refreshCycle }) => {
  const sortedCycles = sortLotteries(lotteries, 'asc', 'rootId');

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {sortedCycles.map(lottery => (
          <div className={styles.lottery} key={lottery.rootId}>
            <Lottery {...lottery} refreshCycle={refreshCycle} />
          </div>
        ))}
      </div>
    </div>
  );
};

LotteryList.propTypes = {
  lotteries: PropTypes.arrayOf(PropTypes.object),
};

export default LotteryList;
