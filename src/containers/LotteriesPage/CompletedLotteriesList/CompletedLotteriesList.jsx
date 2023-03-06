import React from 'react';
import { connect } from 'react-redux';
import LotteryList from '../../../components/LotteryList';

const CompletedLotteriesList = ({ finishedCycles }) => {
  return <LotteryList lotteries={finishedCycles} />;
};

const mapStateToProps = ({ cyclesReducer }) => ({ finishedCycles: cyclesReducer.finishedCycles });

export default connect(mapStateToProps)(CompletedLotteriesList);
