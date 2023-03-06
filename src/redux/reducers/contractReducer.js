import { CONTRACT_SET } from '../actions/contractActions';

const initialState = {
  contract: null,
};

const contractReducer = (state = initialState, action) => {
  const oldState = { ...state };

  switch (action.type) {
    case CONTRACT_SET:
      return {
        ...oldState,
        contract: action.contract,
      };
    default:
      return oldState;
  }
};

export default contractReducer;

export const getContract = state => {
  return state.contractReducer.contract;
};
