export const LOAD_ALL_LOTTERIES = 'LOAD_ALL_LOTTERIES';
export const LOTTERIES_LOADED = 'LOTTERIES_LOADED';
export const LOTTERIES_LOADING_ERROR = 'LOTTERIES_LOADING_ERROR';
export const LOAD_LOTTERIES_DETAILS = 'LOAD_LOTTERIES_DETAILS';
export const LOTTERIES_PAGE_LOADED = 'LOTTERIES_PAGE_LOADED';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const GET_WINNINGS = 'GET_WINNINGS';
export const PLAYER_GOT_WINNINGS = 'PLAYER_GOT_WINNINGS';
export const PAYING_OUT_ABORTED = 'PAYING_OUT_ABORTED';

export const loadPlayerLotteries = playerAddress => ({ type: LOAD_ALL_LOTTERIES, playerAddress });

export const lotteriesLoaded = lotteries => ({ type: LOTTERIES_LOADED, lotteries });

export const lotteriesLoadingError = errorMessage => ({
  type: LOTTERIES_LOADING_ERROR,
  errorMessage,
});

export const loadPlayerLotteriesDetails = () => ({ type: LOAD_LOTTERIES_DETAILS });

export const lotteriesPageLoaded = lotteryDetails => ({
  type: LOTTERIES_PAGE_LOADED,
  lotteryDetails,
});

export const clearSearch = () => ({ type: CLEAR_SEARCH });

export const getPlayerWinnings = lotteryId => ({ type: GET_WINNINGS, lotteryId });

export const gotWinningsOnLottery = lotteryId => ({ type: PLAYER_GOT_WINNINGS, lotteryId });

export const payingOutAborted = lotteryId => ({ type: PAYING_OUT_ABORTED, lotteryId });
