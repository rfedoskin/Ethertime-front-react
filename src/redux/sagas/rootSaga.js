import { all } from 'redux-saga/effects';

import watchAppLoading from './appSaga';
import watchContractLoad from './contractSaga';
import watchMetamaskConnectRequest, { watchAccountUpdate } from './accountSaga';
import windowResizeSaga from './windowResizeSaga';
import {
  watchContractLoadingFinished,
  watchTicketBuyed,
  watchUpcomingCycleUpdate,
} from './lotteriesSaga';
import {
  watchAllLotteriesLoaded,
  watchLotteriesDetailsLoaded,
  watchGetWinningsRequest,
} from './lotteriesSearchSaga';
import rootSubscriptionSaga from './subscriptions';

export default function* root() {
  yield all([
    watchAppLoading(),
    windowResizeSaga(),
    watchContractLoad(),
    watchContractLoadingFinished(),
    rootSubscriptionSaga(),
    watchTicketBuyed(),
    watchMetamaskConnectRequest(),
    watchAccountUpdate(),
    watchUpcomingCycleUpdate(),
    watchAllLotteriesLoaded(),
    watchLotteriesDetailsLoaded(),
    watchGetWinningsRequest(),
  ]);
}
