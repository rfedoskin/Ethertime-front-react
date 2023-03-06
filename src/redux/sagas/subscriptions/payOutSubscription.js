import { call } from 'redux-saga/effects';
import createSubscriptionSaga from './createSubscriptionSaga';
import { finishCycle } from '../lotteriesSaga';

function* payOutHandler(data) {
  const id = parseInt(data.returnValues.lotteryId, 10);
  yield call(finishCycle, id);
}

const payOutSubscriptionSaga = createSubscriptionSaga('PayOutEvent', payOutHandler);

export default payOutSubscriptionSaga;
