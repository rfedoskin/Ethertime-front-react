import { call, all, put, takeLatest, takeEvery, delay, select } from 'redux-saga/effects';
import { getContract } from '../reducers/contractReducer';
import { getActiveCycle } from '../reducers/cyclesReducer';
import { getNowTimeInMilliseconds } from '../reducers/appReducer';
import { finishLoadingApp } from '../actions/appActions';
import { TICKET_BUYED } from '../actions/lotteriesActions';
import { CONTRACT_SET } from '../actions/contractActions';
import { UPCOMING_REFRESH, updateUpcomingCycle } from '../actions/upcomingCyclesActions';
import { setCycles, insertCycle, updateCycle } from '../actions/cyclesActions';
import { clearCycle, getWinPlayers } from '../../services/lotteryService';

export function* getCycleInfo(id) {
  const lotto = yield select(getContract);

  let rawCycle = yield call(lotto.methods.getLotteryInfo(id).call);

  const { addresses } = yield call(lotto.methods.getLotteryPlayers(id).call);
  const playersCount = addresses.length;

  rawCycle = {
    ...rawCycle,
    playersCount,
  };

  const cleanCycle = yield call(clearCycle, rawCycle);

  const cycleId = parseInt(id, 10);

  return {
    ...cleanCycle,
    isEnded: false,
    id: cycleId,
  };
}

function* getFinishedCycleInfo(lotteryId) {
  const contract = yield select(getContract);

  try {
    const finishedLotteryInfo = yield call(contract.methods.getFinishedLotteryInfo(lotteryId).call);
    const { totalPlayers, winNumber, winningsCount } = finishedLotteryInfo;

    let winners = {};
    try {
      const lotteryPlayers = yield call(contract.methods.getLotteryPlayers(lotteryId).call);
      winners = getWinPlayers(lotteryPlayers.addresses, winNumber, winningsCount);
    } catch (e) {
      console.log(`Error loading winners of lottery #${lotteryId}`);
    }

    return {
      totalPlayers: parseInt(totalPlayers, 10),
      winNumber: parseInt(winNumber, 10),
      winningsCount: parseInt(winningsCount, 10),
      winners,
    };
  } catch (error) {
    console.log(`Error loading finished lottery #${lotteryId} info`);
    return {};
  }
}

function* loadFinishedCycle(id) {
  const cycleInfo = yield call(getCycleInfo, id);
  const finishedCycleInfo = cycleInfo.status !== 2 ? yield call(getFinishedCycleInfo, id) : {};

  return {
    ...cycleInfo,
    ...finishedCycleInfo,
    isEnded: true,
  };
}

function* restartCycle(rootId) {
  const cycleToRestart = yield select(getActiveCycle, rootId);

  const finishedCycle = yield {
    ...cycleToRestart,
    isEnded: true,
  };

  yield put(insertCycle(finishedCycle));

  const restartedCycleNumber = cycleToRestart.isRestarted
    ? cycleToRestart.number
    : cycleToRestart.number + 1;

  const restartedCycle = yield {
    ...cycleToRestart,
    pot: 0,
    number: restartedCycleNumber,
    playersCount: 0,
    begin: cycleToRestart.end,
    end: cycleToRestart.end + cycleToRestart.cycleTime,
    possiblePayments: [0, 0, 0],
    isRestarted: true,
  };

  yield put(updateCycle(restartedCycle));
}

export function* setLotteryOnRestart(lotteryId) {
  const cleanCycle = yield select(getActiveCycle, lotteryId);

  if (!cleanCycle) {
    return;
  }

  const { rootId, cycleTime } = cleanCycle;
  let { end, begin } = cleanCycle;
  const nowTime = yield select(getNowTimeInMilliseconds);

  let remainingMilliseconds = end * 1000 - nowTime;

  // Если цикл уже завершен и не был финализирован
  if (remainingMilliseconds <= 0) {
    // Проверяем сколько циклов прошло без финализации
    const passedSeconds = nowTime / 1000 - begin;
    const passedCycles = Math.floor(passedSeconds / cycleTime);
    // Для каждого цикла вызываем обработчик окончания лотереи на клиенте
    for (let i = 0; i < passedCycles; i += 1) {
      yield call(restartCycle, rootId);
      begin = end;
      end += cycleTime;
    }
  }

  remainingMilliseconds = end * 1000 - nowTime;
  yield delay(remainingMilliseconds);
  yield call(restartCycle, rootId);

  const cycleTimeMilliseconds = cycleTime * 1000;
  while (true) {
    yield delay(cycleTimeMilliseconds);
    yield call(restartCycle, rootId);
  }
}

function* loadAllCycles() {
  const contract = yield select(getContract);

  let activeCyclesIds = [];

  try {
    activeCyclesIds = yield call(contract.methods.getOpenedLotteries().call);
  } catch (error) {
    const errorObj = JSON.parse(error.message).error;

    switch (errorObj.code) {
      case -32503:
        yield call(
          alert,
          'MetaMask detected another web3! MetaMask will not work reliably with another web3 extension.'
        );
        break;
      default:
        yield call(alert, 'An error has occurred while trying to load lotteries');
    }
  }

  const activeCycles = yield all(
    activeCyclesIds.map(id => {
      const lottery = call(getCycleInfo, id);
      return lottery;
    })
  );

  const finishedCyclesIds = yield all(
    activeCycles
      .map(activeCycle => {
        return activeCycle.status === 0 ? activeCycle.parentId : activeCycle.rootId;
      })
      .filter(finishedId => finishedId !== 0)
  );

  const finishedCycles = yield all(
    finishedCyclesIds
      .map(id => {
        const finishedCycle = call(loadFinishedCycle, id);
        return finishedCycle;
      })
      .filter(finishedCycle => finishedCycle !== null)
  );

  yield put(setCycles(activeCycles, 0));
  yield put(setCycles(finishedCycles, 1));

  yield put(finishLoadingApp());

  yield all(activeCycles.map(cycle => call(setLotteryOnRestart, cycle.rootId)));
}

export function* watchContractLoadingFinished() {
  yield takeLatest(CONTRACT_SET, loadAllCycles);
}

function* updateExistingLottery(action) {
  const cycle = yield call(getCycleInfo, action.id);
  const activeCycle = yield select(getActiveCycle, cycle.rootId);

  // Если тразакция (покупка билета) поздно прошла на недавно завершенную лотерею, нет смысла её обновлять,
  // т.к. в интерфейсе эта информация не понадобится
  if (activeCycle.number !== cycle.number) {
    return;
  }

  yield (cycle.isHighlighted = true);

  yield put(updateCycle(cycle));

  yield delay(3500);

  yield (cycle.isHighlighted = false);

  yield put(updateCycle(cycle));
}

export function* watchTicketBuyed() {
  yield takeEvery(TICKET_BUYED, updateExistingLottery);
}

export function* finishCycle(id) {
  const cycleInfo = yield call(loadFinishedCycle, id);

  yield put(updateCycle(cycleInfo));
}

function* refreshUpcomingCycle(action) {
  const cycle = yield select(getActiveCycle, action.rootId);
  yield put(updateUpcomingCycle(cycle));
}

export function* watchUpcomingCycleUpdate() {
  yield takeLatest(UPCOMING_REFRESH, refreshUpcomingCycle);
}
