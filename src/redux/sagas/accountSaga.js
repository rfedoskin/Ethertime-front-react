import { call, put, takeLatest, take, actionChannel } from 'redux-saga/effects';
import Web3 from 'web3';
import {
  ACCOUNT_UPDATE,
  METAMASK_CONNECT,
  updateAccount,
  updateConnectingStatus,
} from '../actions/accountActions';

export function* connectToMetamask(action) {
  if (!action.isConnecting) {
    yield put(updateAccount('', false));
    return;
  }

  yield put(updateConnectingStatus(true));

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      let accounts = yield call(window.ethereum.enable);

      if (!accounts) {
        accounts = yield call(window.web3.eth.getAccounts);
      }

      if (!accounts) {
        throw new Error('No accounts detected');
      }

      const [address] = accounts;

      if (!address) {
        throw new Error('No address detected');
      }

      yield put(updateAccount(address, true));
    } catch (error) {
      yield call(console.log, error.message);
      yield put(updateAccount('', false));
    }
  } else if (window.web3) {
    try {
      const accounts = yield call(window.web3.eth.getAccounts);
      const [address] = accounts;

      if (address) {
        yield put(updateAccount(address, true));
      }
    } catch (e) {
      yield call(console.log, 'User denied access notification');
      // User denied access notification
      yield put(updateAccount('', false));
    }
  }

  yield put(updateConnectingStatus(false));
}

function handleConnectionUpdate(isConnected) {
  localStorage.setItem('isMetamaskConnected', isConnected);
}

export function* watchAccountUpdate() {
  const requestChan = yield actionChannel(ACCOUNT_UPDATE);
  while (true) {
    const { isConnected } = yield take(requestChan);
    yield call(handleConnectionUpdate, isConnected);
  }
}

export default function* watchMetamaskConnectRequest() {
  yield takeLatest(METAMASK_CONNECT, connectToMetamask);
}
