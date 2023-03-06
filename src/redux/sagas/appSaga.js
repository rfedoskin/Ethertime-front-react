import { put, spawn, takeLatest, delay } from 'redux-saga/effects';
import { CONTRACT_LOAD, APP_LOAD, updateTimer } from '../actions/appActions';

function* startAppTimer() {
  while (true) {
    yield put(updateTimer(Date.now()));
    yield delay(1000);
  }
}

function* loadApp() {
  yield spawn(startAppTimer);

  yield put({ type: CONTRACT_LOAD });
}

export default function* watchAppLoading() {
  yield takeLatest(APP_LOAD, loadApp);
}
