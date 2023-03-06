import { put, takeLeading } from 'redux-saga/effects';
import { CONTRACT_ADDRESS, ROPSTEN_ABI } from '../../abis';
import { CONTRACT_LOAD, setContract } from '../actions/contractActions';

function* loadContractData() {
  const { web3 } = window;

  if (!web3) {
    return;
  }

  const lotto = new web3.eth.Contract(ROPSTEN_ABI, CONTRACT_ADDRESS);

  yield put(setContract(lotto));
}

export default function* watchContractLoad() {
  yield takeLeading(CONTRACT_LOAD, loadContractData);
}
