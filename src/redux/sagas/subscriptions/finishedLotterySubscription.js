import { call } from 'redux-saga/effects';
import createSubscriptionSaga from './createSubscriptionSaga';
import { finishCycle } from '../lotteriesSaga';

function* finishedLotteryHandler({ ...data }) {
  yield call(console.log, data);
  const id = parseInt(data.returnValues.lotteryId, 10);
  yield call(finishCycle, id);
}

const finishedLotterySubscriptionSaga = createSubscriptionSaga(
  'FinishedLotteryEvent',
  finishedLotteryHandler
);

export default finishedLotterySubscriptionSaga;
