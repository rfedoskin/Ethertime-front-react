import { createSelector } from 'reselect';
import { getLotteriesCount, getLotteries } from '../reducers/lotteriesSearchReducer';
import { getPageSize, getCurrentPage } from '../reducers/lotteriesSearchPaginationReducer';

export const getOffset = createSelector(
  [getPageSize, getCurrentPage],
  (pageSize, currentPage) => (currentPage - 1) * pageSize
);

export const getPageCount = createSelector(
  [getLotteriesCount, getPageSize],
  (lotteriesCount, pageSize) => Math.ceil(lotteriesCount / pageSize)
);

export const getLotteriesPerPage = createSelector(
  [getLotteries, getOffset, getPageSize],
  (lotteries, offset, pageSize) => lotteries.slice(offset, offset + pageSize)
);
