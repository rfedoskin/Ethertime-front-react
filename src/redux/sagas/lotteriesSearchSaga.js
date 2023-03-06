import { call, select, put, all, take, takeLatest, race } from 'redux-saga/effects';
import { getContract } from '../reducers/contractReducer';
import { getNowTimeInMilliseconds } from '../reducers/appReducer';
import {
  LOAD_ALL_LOTTERIES,
  LOAD_LOTTERIES_DETAILS,
  CLEAR_SEARCH,
  GET_WINNINGS,
  lotteriesLoaded,
  lotteriesLoadingError,
  loadPlayerLotteriesDetails,
  lotteriesPageLoaded,
  gotWinningsOnLottery,
  payingOutAborted,
} from '../actions/lotteriesSearchActions';
import { getAccountAddress } from '../reducers/accountReducer';
import { getPlayerAddress } from '../reducers/lotteriesSearchReducer';
import { getLotteriesPerPage } from '../selectors/lotteriesSearchSelectors';
import { formatSearchOutput, formatSearchDetailsOutput } from '../../services/lotteryService';
import { resetPaginationState } from '../actions/lotteriesSearchPaginationActions';

function* getAllPlayerLotteries(action) {
  yield put(resetPaginationState());
  const { playerAddress } = action;
  const isAddress = window.web3.utils.isAddress(playerAddress);

  if (!isAddress) {
    yield put(lotteriesLoadingError('Provided player address is not an address.'));
  } else {
    const contract = yield select(getContract);
    const { getPlayerLotteries } = contract.methods;
    const nowTime = yield select(getNowTimeInMilliseconds);

    try {
      let { playerLotteries } = yield race({
        playerLotteries: call(getPlayerLotteries(playerAddress).call),
        cancel: take(CLEAR_SEARCH),
      });

      if (playerLotteries.ids.length === 0) {
        yield put(lotteriesLoadingError('Lotteries not found'));
      } else {
        playerLotteries = formatSearchOutput(playerLotteries, nowTime);
        yield put(lotteriesLoaded(playerLotteries));
        yield put(loadPlayerLotteriesDetails());
      }
    } catch (e) {
      yield put(lotteriesLoadingError('Error getting player lotteries list from smart-contract.'));
    }
  }
}

function* getPlayerLotteriesDetails() {
  const lotteriesPerPage = yield select(getLotteriesPerPage);
  const playerAddress = yield select(getPlayerAddress);
  const contract = yield select(getContract);
  const { getPlayerLotteryDetails } = contract.methods;

  const finishedLotteries = lotteriesPerPage.filter(lottery => lottery.status === 1);

  const getDetails = finishedLotteries.map(function*(lottery) {
    const { id } = lottery;
    try {
      let lotteryDetails = yield call(getPlayerLotteryDetails(playerAddress, id).call);
      lotteryDetails = formatSearchDetailsOutput(lotteryDetails);
      return { id, ...lotteryDetails };
    } catch (e) {
      yield call(console.log, `Cannot get lottery #${id} details from smart-contract.\n${e}`);
      return { id };
    }
  });

  const { lotteriesDetails } = yield race({
    lotteriesDetails: all(getDetails),
    cancel: take(CLEAR_SEARCH),
  });

  yield put(lotteriesPageLoaded(lotteriesDetails));
}

function* getPlayerWinnigs(action) {
  const { lotteryId } = action;
  const contract = yield select(getContract);
  const accountAddress = yield select(getAccountAddress);
  const { payOut } = contract.methods;

  try {
    const receipt = yield call(payOut(lotteryId).send, { from: accountAddress });
    yield call(
      console.log,
      `Winnings on lottery #${lotteryId} successfully paid out.\nPrize: ${receipt}`
    );
    yield put(gotWinningsOnLottery(lotteryId));
  } catch (error) {
    yield call(
      console.log,
      `Error occured while payout attempt on lottery #${lotteryId}.\n${error}`
    );
    yield put(payingOutAborted(lotteryId));
  }
}

export function* watchAllLotteriesLoaded() {
  yield takeLatest(LOAD_ALL_LOTTERIES, getAllPlayerLotteries);
}

export function* watchLotteriesDetailsLoaded() {
  yield takeLatest(LOAD_LOTTERIES_DETAILS, getPlayerLotteriesDetails);
}

export function* watchGetWinningsRequest() {
  yield takeLatest(GET_WINNINGS, getPlayerWinnigs);
}
