import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LotteryList from '../../../components/LotteryList';
import { getStartedCycles } from '../../../redux/selectors/lotteriesSelectors';
import { getUpcomingCycles } from '../../../redux/reducers/upcomingCyclesReducer';
import {
  setUpcomingCycles,
  refreshUpcomingCycle,
} from '../../../redux/actions/upcomingCyclesActions';

const UpcomingLotteriesList = ({
  activeCycles,
  fixedUpcomingCycles,
  fixUpcomingCycles,
  refreshCycle,
}) => {
  useEffect(() => {
    fixUpcomingCycles(activeCycles);
  }, []);

  return <LotteryList lotteries={fixedUpcomingCycles} refreshCycle={refreshCycle} />;
};

const mapStateToProps = state => {
  return {
    activeCycles: getStartedCycles(state),
    fixedUpcomingCycles: getUpcomingCycles(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fixUpcomingCycles: cycles => dispatch(setUpcomingCycles(cycles)),
    refreshCycle: rootId => dispatch(refreshUpcomingCycle(rootId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingLotteriesList);
