import {
  LOAD_ALL_LOTTERIES,
  LOTTERIES_LOADED,
  LOTTERIES_LOADING_ERROR,
  LOAD_LOTTERIES_DETAILS,
  LOTTERIES_PAGE_LOADED,
  CLEAR_SEARCH,
  GET_WINNINGS,
  PLAYER_GOT_WINNINGS,
  PAYING_OUT_ABORTED,
} from '../actions/lotteriesSearchActions';

const initialState = {
  playerAddress: 0,
  lotteriesLoaded: false,
  searchPageIsLoading: false,
  searchError: '',
  lotteries: [],
};

const lotteriesSearchReducer = (state = initialState, action) => {
  const oldState = { ...state };

  switch (action.type) {
    case LOAD_ALL_LOTTERIES: {
      return {
        ...oldState,
        lotteriesLoaded: false,
        searchPageIsLoading: true,
        playerAddress: action.playerAddress,
      };
    }

    case LOTTERIES_LOADED: {
      return {
        ...oldState,
        lotteriesLoaded: true,
        searchPageIsLoading: true,
        lotteries: action.lotteries,
      };
    }

    case LOTTERIES_LOADING_ERROR: {
      return {
        ...oldState,
        lotteriesLoaded: false,
        searchPageIsLoading: false,
        searchError: action.errorMessage,
      };
    }

    case LOAD_LOTTERIES_DETAILS: {
      return {
        ...oldState,
        searchPageIsLoading: true,
      };
    }

    case LOTTERIES_PAGE_LOADED: {
      const { lotteryDetails } = action;
      const { lotteries } = oldState;

      const detailedLotteries = lotteries.map(lottery => {
        const detail = lotteryDetails.find(lotteryDetail => lotteryDetail.id === lottery.id);
        return { ...lottery, ...detail };
      });

      return {
        ...oldState,
        searchPageIsLoading: false,
        lotteries: detailedLotteries,
      };
    }

    case CLEAR_SEARCH: {
      return initialState;
    }

    case GET_WINNINGS: {
      const { lotteryId } = action;
      const { lotteries } = oldState;

      const updatedLotteries = lotteries.map(lottery =>
        lottery.id === lotteryId ? { ...lottery, payingOut: true } : lottery
      );

      return {
        ...oldState,
        lotteries: updatedLotteries,
      };
    }

    case PLAYER_GOT_WINNINGS: {
      const { lotteryId } = action;
      const { lotteries } = oldState;

      const updatedLotteries = lotteries.map(lottery =>
        lottery.id === lotteryId ? { ...lottery, payingOut: false, paidOut: true } : lottery
      );

      return {
        ...oldState,
        lotteries: updatedLotteries,
      };
    }

    case PAYING_OUT_ABORTED: {
      const { lotteryId } = action;
      const { lotteries } = oldState;

      const updatedLotteries = lotteries.map(lottery =>
        lottery.id === lotteryId ? { ...lottery, payingOut: false } : lottery
      );

      return {
        ...oldState,
        lotteries: updatedLotteries,
      };
    }

    default:
      return oldState;
  }
};

export const getLotteriesCount = state => state.lotteriesSearchReducer.lotteries.length;

export const getLotteries = state => state.lotteriesSearchReducer.lotteries;

export const searchPageIsLoading = state => state.lotteriesSearchReducer.searchPageIsLoading;

export const getSearchError = state => state.lotteriesSearchReducer.searchError;

export const getPlayerAddress = state => state.lotteriesSearchReducer.playerAddress;

export default lotteriesSearchReducer;
