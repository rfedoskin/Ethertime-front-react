export const SHOW_NEXT_PAGE = 'SHOW_NEXT_PAGE';
export const SHOW_PREV_PAGE = 'SHOW_PREV_PAGE';
export const SHOW_PAGE_BY_NUMBER = 'SHOW_PAGE_BY_NUMBER';
export const RESET_PAGINATION_STATE = 'RESET_PAGINATION_STATE';

export const showNextPage = maxPages => ({ type: SHOW_NEXT_PAGE, maxPages });

export const showPrevPage = () => ({ type: SHOW_PREV_PAGE });

export const showPageByNumber = pageNumber => ({ type: SHOW_PAGE_BY_NUMBER, pageNumber });

export const resetPaginationState = () => ({ type: RESET_PAGINATION_STATE });
