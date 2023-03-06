import { SORTING_UPDATE } from '../actions/lotteriesActions';

const initialState = {
  orderBy: '',
  sortDirection: 'asc',
};

const lotteriesReducer = (state = initialState, action) => {
  const oldState = { ...state };

  switch (action.type) {
    case SORTING_UPDATE: {
      const { orderId } = action;

      let { sortDirection } = oldState;

      if (orderId === oldState.orderBy) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortDirection = 'asc';
      }

      return {
        ...oldState,
        sortDirection,
        orderBy: orderId,
      };
    }

    default:
      return oldState;
  }
};

export const getActiveOrderBy = state => {
  return state.lotteriesReducer.orderBy;
};

export const getActiveSortDirection = state => {
  return state.lotteriesReducer.sortDirection;
};

export default lotteriesReducer;
