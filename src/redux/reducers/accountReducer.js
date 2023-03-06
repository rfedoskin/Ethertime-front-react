import { ACCOUNT_UPDATE, CONNECTING_UPDATE } from '../actions/accountActions';

const initialState = {
  isConnected: false,
  isConnecting: false,
  accountAddress: '',
};

const accountReducer = (state = initialState, action) => {
  const oldState = { ...state };

  switch (action.type) {
    case ACCOUNT_UPDATE: {
      return {
        ...oldState,
        isConnected: action.isConnected,
        accountAddress: action.address,
      };
    }
    case CONNECTING_UPDATE:
      return {
        ...oldState,
        isConnecting: action.isConnecting,
      };
    default:
      return oldState;
  }
};

export const getAccountAddress = state => state.accountReducer.accountAddress;

export default accountReducer;
