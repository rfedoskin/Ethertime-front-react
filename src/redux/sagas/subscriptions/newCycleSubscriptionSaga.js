import { put, call } from 'redux-saga/effects';
import createSubscriptionSaga from './createSubscriptionSaga';
import { getCycleInfo, setLotteryOnRestart } from '../lotteriesSaga';
import { insertCycle } from '../../actions/cyclesActions';

function* newLotteryHandler(data) {
  const newCycle = yield call(getCycleInfo, data.returnValues.lotteryId);
  yield put(insertCycle(newCycle));
  yield call(setLotteryOnRestart, newCycle.rootId);
}

const newCycleSubscriptionSaga = createSubscriptionSaga('NewLotteryEvent', newLotteryHandler);

export default newCycleSubscriptionSaga;
