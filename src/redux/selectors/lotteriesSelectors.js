import { createSelector } from 'reselect';
import { getActiveCycles } from '../reducers/cyclesReducer';
import { getActiveSortDirection, getActiveOrderBy } from '../reducers/lotteriesReducer';
import { getNowTimeInSeconds } from '../reducers/appReducer';
import { sortLotteries } from '../../services/lotteryService';

export const getStartedCycles = createSelector(
  [getNowTimeInSeconds, getActiveCycles],
  (nowInSeconds, activeCycles) => {
    return activeCycles.filter(cycle => cycle.begin <= nowInSeconds);
  }
);

export const getFilteredLotteries = createSelector(
  [getActiveCycles, getActiveSortDirection, getActiveOrderBy],
  (activeCycles, sortDirection, orderBy) => {
    const filteredLotteries = sortLotteries(activeCycles, sortDirection, orderBy);
    return filteredLotteries;
  }
);

export const nothing = null;
