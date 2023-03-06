import {
  SHOW_NEXT_PAGE,
  SHOW_PREV_PAGE,
  SHOW_PAGE_BY_NUMBER,
  RESET_PAGINATION_STATE,
} from '../actions/lotteriesSearchPaginationActions';

const initialState = {
  pageSize: 5,
  currentPage: 1,
};

const lotteriesSearchReducer = (state = initialState, action) => {
  const oldState = { ...state };

  switch (action.type) {
    case SHOW_NEXT_PAGE: {
      const { maxPages } = action;
      const { currentPage } = oldState;
      const nextPage = currentPage + 1;

      return {
        ...oldState,
        currentPage: nextPage <= maxPages ? nextPage : currentPage,
      };
    }

    case SHOW_PREV_PAGE: {
      const { currentPage } = oldState;

      return {
        ...oldState,
        currentPage: currentPage > 1 ? currentPage - 1 : currentPage,
      };
    }

    case SHOW_PAGE_BY_NUMBER: {
      return {
        ...oldState,
        currentPage: action.pageNumber,
      };
    }

    case RESET_PAGINATION_STATE: {
      return initialState;
    }

    default:
      return oldState;
  }
};

export const getPageSize = state => state.lotteriesSearchPaginationReducer.pageSize;

export const getCurrentPage = state => state.lotteriesSearchPaginationReducer.currentPage;

export default lotteriesSearchReducer;
