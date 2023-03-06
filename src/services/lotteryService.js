import { store } from '../redux/reducers/appReducer';

export function getCashback(isActive, remainingTime, cycleTime) {
  let currentDiscount = 0;
  let value = 0;
  const quaterTime = cycleTime / 4;

  if (isActive && remainingTime >= quaterTime) {
    currentDiscount = Math.floor(remainingTime / quaterTime);

    const a = quaterTime * (currentDiscount + 1); // Получаем верхнюю временную границу текущей четверти (3 четверть 120-секундного цикла = 90)
    const b = a - remainingTime; // Получаем кол-во секунд, прошедшее с начала текущей четверти
    const c = quaterTime - b; // Получаем кол-во прошедших секунд относительно длительности одной четверти
    value = (c / quaterTime) * 100; // Получаем процент завершенности текущей четверти
  }

  return {
    value,
    currentDiscount,
  };
}

export const getTimeTillEnd = lotteryEnd => {
  const now = store.getState().nowTime / 1000;

  return Math.max(0, lotteryEnd - now);
};

export function sortLotteries(lotteries, sortDirection, sortField) {
  if (sortField === '') {
    return lotteries.sort((lotteryA, lotteryB) => {
      return lotteryA.rootId >= lotteryB.rootId ? 1 : -1;
    });
  }

  let resultLotteries = lotteries;

  if (sortField === 'timeTillEnd') {
    resultLotteries = resultLotteries.map(lottery => {
      return {
        ...lottery,
        timeTillEnd: getTimeTillEnd(lottery.end),
      };
    });
  }
  if (sortField === 'etherback') {
    resultLotteries = resultLotteries.map(lottery => {
      let remainingSeconds = lottery.end - store.getState().nowTime / 1000;
      remainingSeconds = Math.max(0, remainingSeconds);

      const cachback = getCashback(lottery.withDiscount, remainingSeconds, lottery.cycleTime);

      return {
        ...lottery,
        etherback: cachback.currentDiscount,
      };
    });
  }

  if (sortDirection === 'asc') {
    return resultLotteries.sort((lotteryA, lotteryB) => {
      return lotteryA[sortField] >= lotteryB[sortField] ? 1 : -1;
    });
  }

  return resultLotteries.sort((lotteryA, lotteryB) => {
    return lotteryA[sortField] <= lotteryB[sortField] ? 1 : -1;
  });
}

export function getPossiblePayments(n, pot) {
  if (n === 0) {
    return [0, 0, 0];
  }

  /* Доля = % * 100 (не более 10000)
  Формула: Pk = 10000 * 2 * (n - k) / (n * (n + 1)); k = 0...(n-1) */
  const result = [];
  const divider = n * (n + 1);
  for (let k = 0; k < n; k += 1) {
    let p = (n - k) * 20000;
    p = Math.floor(p / divider);
    result[k] = Math.floor(pot * ((p / 100) * 0.01));
  }
  return result;
}

function getWinnersCount(prizeType, playersCount) {
  let winnersNum = 0;

  switch (prizeType) {
    case 0:
      winnersNum = Math.ceil(playersCount * 0.1);
      break;
    case 1:
      winnersNum = Math.ceil(playersCount * 0.3);
      break;
    case 2:
      winnersNum = Math.ceil(playersCount * 0.5);
      break;
    case 3:
      winnersNum = playersCount;
      break;
    case 4:
      winnersNum = 1;
      break;
    case 5:
      winnersNum = 3;
      break;
    default:
      winnersNum = 0;
  }

  return winnersNum;
}

export function clearCycle(rawCycle) {
  const cleanLottery = {
    rootId: parseInt(rawCycle.rootId, 10),
    withDiscount: rawCycle.withDiscount,
    price: parseInt(rawCycle.price, 10),
    begin: parseInt(rawCycle.begin, 10),
    end: parseInt(rawCycle.end, 10),
    number: parseInt(rawCycle.number, 10),
    pot: parseInt(rawCycle.pot, 10),
    status: parseInt(rawCycle.status, 10),
    prizeType: parseInt(rawCycle.prizeType, 10),
    parentId: parseInt(rawCycle.parentId, 10),
    isContinued: rawCycle.isContinued,
    isHighlighted: false,
    isRestarting: false,
    playersCount: rawCycle.playersCount,
  };

  cleanLottery.cycleTime = cleanLottery.end - cleanLottery.begin;

  const winnersCount = getWinnersCount(cleanLottery.prizeType, cleanLottery.playersCount);
  cleanLottery.possiblePayments = getPossiblePayments(winnersCount, cleanLottery.pot);

  return cleanLottery;
}

export const cycleStatus = {
  active: 'active',
  finished: 'finished',
  calculation: 'calculation',
  pending: 'pending',
};

export function getCycleStatus(isEnded, status, winningsCount, isPayedOut) {
  if (isEnded) {
    if (status === 0) {
      return cycleStatus.calculation;
    }

    if (winningsCount < 1) {
      return cycleStatus.finished;
    }

    return isPayedOut ? cycleStatus.finished : cycleStatus.pending;
  }

  return cycleStatus.active;
}

export function formatSearchOutput(result, nowTime) {
  let activeCycles = [];
  let completedCycles = [];

  result.ends.forEach((end, idx) => {
    const endStamp = parseInt(end, 10);

    const cycle = {
      id: parseInt(result.ids[idx], 10),
      rootId: parseInt(result.rootIds[idx], 10),
      end: endStamp,
      winNumber: parseInt(result.winNumbers[idx], 10),
      playerNumbers: result.playerNumbers[idx].map(number => parseInt(number, 10)),
      status: parseInt(result.statuses[idx], 10),
    };

    if (endStamp - nowTime / 1000 > 0) {
      activeCycles.push(cycle);
    } else {
      completedCycles.push(cycle);
    }
  });

  activeCycles = activeCycles.sort((cycleA, cycleB) => (cycleA.end >= cycleB.end ? 1 : -1));
  completedCycles = completedCycles.sort((cycleA, cycleB) => (cycleA.end <= cycleB.end ? 1 : -1));

  return [...activeCycles, ...completedCycles];
}

export function formatSearchDetailsOutput(result) {
  return {
    totalPrize: parseInt(result.totalPrize, 10),
    paidOut: result.paidOut,
    payingOut: false,
    won: result.won,
  };
}

export function getWinPlayers(addresses, winIndex, winningsCount) {
  const players = addresses.map((address, index) => {
    return {
      number: index,
      address,
    };
  });

  const playersCount = players.length;

  const tillEnd = playersCount - winIndex;
  const sortedPlayers = [...players.splice(winIndex, tillEnd), ...players];

  return sortedPlayers.slice(0, winningsCount);
}
