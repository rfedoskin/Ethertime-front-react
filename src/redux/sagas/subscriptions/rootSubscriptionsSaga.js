import { takeLatest, spawn } from 'redux-saga/effects';
import newCycleSubscriptionSaga from './newCycleSubscriptionSaga';
import buyTicketSubscriptionSaga from './buyTicketSubscriptionSaga';
import finishedLotterySubscriptionSaga from './finishedLotterySubscription';
import payOutSubscriptionSaga from './payOutSubscription';
import { CONTRACT_SET } from '../../actions/contractActions';

function* startSubscriptions() {
  yield spawn(buyTicketSubscriptionSaga);
  yield spawn(newCycleSubscriptionSaga);
  yield spawn(finishedLotterySubscriptionSaga);
  yield spawn(payOutSubscriptionSaga);
}

export default function* watchLotteriesSet() {
  yield takeLatest(CONTRACT_SET, startSubscriptions);
}
