import React from 'react';
import { useSelector } from 'react-redux';
import { getNowTimeInMilliseconds } from '../../../redux/reducers/appReducer';
import { getPastTimeString, getRemainingTimeString } from '../../../services/timeService';

const LotteryAge = ({ lotteryEnd }) => {
  const nowTime = useSelector(getNowTimeInMilliseconds);
  const remainingSeconds = lotteryEnd - nowTime / 1000;

  return (
    <>
      {remainingSeconds >= 0
        ? getRemainingTimeString(remainingSeconds)
        : getPastTimeString(remainingSeconds)}
    </>
  );
};

export default LotteryAge;
