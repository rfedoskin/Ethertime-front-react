import React from 'react';

import IconPrizeAll from '../../Icons/IconPrizeAll';
import IconPrize50 from '../../Icons/IconPrize50';
import IconPrize30 from '../../Icons/IconPrize30';
import IconPrizeFirstSecondThird from '../../Icons/IconPrizeFirstSecondThird';
import IconPrizeFirst from '../../Icons/IconPrizeFirst';

export const swithcerOptions = [
  {
    title: <IconPrizeAll />,
    value: 'all',
  },
  {
    title: <IconPrize50 />,
    value: 'fiftyPercent',
  },
  {
    title: <IconPrize30 />,
    value: 'thirtyPercent',
  },
  {
    title: <IconPrizeFirstSecondThird />,
    value: 'firstSecondThird',
  },
  {
    title: <IconPrizeFirst />,
    value: 'first',
  },
];

export const mapColorWithPrizeStrategy = {
  first: '#7a2a48',
  firstSecondThird: '#78516e',
  all: '#00a0e3',
  fiftyPercent: '#0d709a',
  thirtyPercent: '#617294',
};

export const distributionDescriptions = {
  first: '"1st" - the whole bank takes the wallet with a winning number.',
  firstSecondThird:
    '"1.2.3" - the bank is distributed to first three winners: 1st - 50% of the bank, 2nd - 35%, 3rd - 15%.',
  all: '"ALL" - the bank is distributed to all players, start with a winning number.',
  fiftyPercent:
    '"50%" - the bank is distributed 50% of the players, starting with a winning number.',
  thirtyPercent:
    '"30%" - the bank is distributed 30% of the players, starting with a winning number.',
};

export const distributionShareByStrategy = {
  first: [100, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  firstSecondThird: [100, (100 / 3) * 2, 100 / 3, 0, 0, 0, 0, 0, 0, 0],
  all: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
  fiftyPercent: [100, 80, 60, 40, 20, 0, 0, 0, 0, 0],
  thirtyPercent: [100, (100 / 3) * 2, 100 / 3, 0, 0, 0, 0, 0, 0, 0],
};

export const distributionAmountByStrategy = {
  first: [8.85, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  firstSecondThird: [4.425, 3.0975, 1.3275, 0, 0, 0, 0, 0, 0, 0],
  all: [1.60909, 1.44818, 1.28727, 1.12636, 0.96545, 0.80454, 0.64363, 0.48272, 0.32181, 0.1609],
  fiftyPercent: [2.95, 2.36, 1.77, 1.18, 0.59, 0, 0, 0, 0, 0],
  thirtyPercent: [4.43, 2.95, 1.48, 0, 0, 0, 0, 0, 0, 0],
};
