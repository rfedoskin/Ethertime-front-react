import React from 'react';
import PropTypes from 'prop-types';
import styles from './lotteryPrizeType.module.scss';

const LotteryPrizeType = ({ type }) => {
  const paramsByType = [
    { text: '10%', className: 'label10' },
    { text: '30%', className: 'label30' },
    { text: '50%', className: 'label50' },
    { text: 'ALL', className: 'labelAll' },
    { text: '1 st', className: 'label1' },
    { text: '1.2.3', className: 'label123' },
  ];
  const { text, className } = paramsByType[type];

  return <span className={styles[className]}>{text}</span>;
};

LotteryPrizeType.propTypes = {
  type: PropTypes.oneOf([0, 1, 2, 3, 4, 5]).isRequired,
};

export default LotteryPrizeType;
